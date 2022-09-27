/*
Для отладки включить this.isShowCardDebug = true
При включении возможны рывки анимации
*/
import { getPositionsCards } from '../utils/utils.js'
import Card from './Card.js'

export default class Cards extends Phaser.Group {
  constructor(game, config, state) {
    super(game)
    this.game = game
    this.config = config
    this.state = state
  
    this.oppenedCard = null // current open card
    this.oppenedCardCount = 0
    this.isShowCardDebug = true
  }
  
  init = () => {
    this.createCards()
    this.setPositionContainer()
  }
  
  createCards = () => {
    // this = this.game.add.group()
    
    // todo оптимизировать вызов
    const positions = getPositionsCards(this.config.CARDS.rows, this.config.CARDS.cols,
      {
        width: this.config.CARDS.cardWidth,
        height: this.config.CARDS.cardHeight,
        offset: this.config.CARDS.cardOffset,
      })
    
    let countId = 1
    let delayIndex = 0
    for (let i = 1; i <= this.config.CARDS.maxCards; i++) {
        this.add(new Card({
          scene: this.game,
          key  : this.game.config.CARDS.key,
          id   : countId,
          delayIndex: delayIndex,
          x: positions[i - 1].x,
          y: positions[i - 1].y
        }))
      
      countId++
      delayIndex++
      if (countId >= 7) countId = 1
    }
    
    this.onChildInputDown.add(this.#onCardClicked)
    // this.#setDebugStatus()
  
  }
  
  initCards = () => {
    this.oppenedCard = null
    this.oppenedCardCount = 0
    
    this.children.forEach(card => card.init())
    this.#showCards()
  }
  
  #showCards = () => {
    this.children.forEach(card => {
      card.runAnimation(this.game, {x: 1, y: 1, alpha: 1})
    })
  }

  hideCards = () => {
    let count = 0
    const cardComplete = () => {
      count++

      if (count >= this.config.CARDS.maxCards) {
        // this.#startGame() // когда все карты улетели
        this.game.startGame()
      }
    }

    this.children.forEach(card => {
      card.runAnimation(this.game, {
        x: 0, y: 0,
        alpha: 0,
        callBack: cardComplete
      })
    })
  }
  
  #onCardClicked = (card) => {
    if (card.cardOpened) return false

    this.game.audioManager.sounds.card.play()

    // уже есть открытая карта
    if (this.oppenedCard) {
      // если равны - то запоминаем
      if (this.oppenedCard.id === card.id) {
        this.oppenedCard = null
        this.oppenedCardCount++
        this.game.audioManager.sounds.success.play()
      }
      // если разные - скрыть прошлую
      else {
        this.oppenedCard.close()
        this.oppenedCard = card
      }
    }
    // ещё нет открытой карты
    else {
      // если ещё нет - то записываем карту в текущую
      this.oppenedCard = card
    }

    card.open(() => this.#gameWin())
  }

  #gameWin = () => {
    // запускает финальное действие, только после завершения анимации последней карты
    const numberOfPairs = this.children.length / 2 // 6

    if (this.oppenedCardCount === numberOfPairs) {
      this.game.restartGame()
      this.game.audioManager.sounds.complete.play()
      this.game.gameWin()
    }
  }

  setPositionContainer() {
    this.position.set(200, 350)
  }
  
  #setDebugStatus = () => {
    if (this.isShowCardDebug) {
      this.forEach(card => {
        card.debug()
      })
    }
  }
}
