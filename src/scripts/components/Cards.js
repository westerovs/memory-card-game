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
  
    this.currentOpenCard = null // current open card
    this.currentOpenCardCount = 0
    this.isShowCardDebug = false
  }
  
  init = () => {
    this.createCards()
    this.setPositionContainer()
  }
  
  createCards = () => {
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
    this.#setDebugStatus()
  }
  
  initCards = () => {
    this.currentOpenCard = null
    this.currentOpenCardCount = 0
    
    this.children.forEach(card => card.init())
    this.#showCards()
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
  
  #showCards = () => {
    this.children.forEach(card => {
      card.runAnimation(this.game, {x: 1, y: 1, alpha: 1})
    })
  }
  
  #onCardClicked = (card) => {
    if (card.cardIsOpened) return
  
    // this.game.audioManager.sounds.card.play()
    
    // если клик произошёл и уже открыта одна из карт
    if (this.currentOpenCard) this.#openedCardAction(card)
    else {
      //  если две карты уже открыты, или не было ещё клика
      // если карты не равны, то делаем текущей следующую
      this.currentOpenCard = card
      console.log('если две карты уже открыты, или не было ещё клика')
    }

    card.open(() => this.#gameWin())
  }
  
  #openedCardAction = (card) => {
    const secondCard = card
    
    // если две карты равны
    if (this.currentOpenCard._id === card._id) {
      console.log(' ------------------ ')
      console.log('КАРТЫ РАВНЫ')
      console.log(' ------------------ ')
      this.currentOpenCard = null
      this.currentOpenCardCount++
      // this.game.audioManager.sounds.success.play()
      this.game.isCardCouple.dispatch(card._id)
    }
    // если разные - скрыть прошлую
    else {
      if (this.config.VERSION.classic) {
        this.currentOpenCard.close()
        this.currentOpenCard = card
      }
      if (this.config.VERSION.alternative) {
        this.game.canvas.style.pointerEvents = 'none'
        this.game.time.events.add(Phaser.Timer.SECOND, () => {
          secondCard.close()
          this.game.canvas.style.pointerEvents = 'auto'
        })
      }
    }
  }

  #gameWin = () => {
    // запускает финальное действие, только после завершения анимации последней карты
    const numberOfPairs = this.children.length / 2 // 6

    if (this.currentOpenCardCount === numberOfPairs) {
      this.game.restartGame()
      // this.game.audioManager.sounds.complete.play()
      this.game.gameWin()
    }
  }

  setPositionContainer() {
    this.position.set(200, 350)
  }
  
  #setDebugStatus = () => {
    if (this.isShowCardDebug) this.forEach(card => card.debug())
  }
}
