import AudioManager from '../components/AudioManager.js';
import Timer from '../components/Timer.js'
import Card from '../components/Card.js'
import MiniMap from '../components/MiniMap.js';
import { getPositionsCards } from '../utils/utils.js';

/*
Для отладки включить this.isShowCardDebug = true
*/

export default class Game extends Phaser.State {
  constructor() {
    super()
    
    this.cardsContainer = null
    this.oppenedCard = null // current open card
    this.oppenedCardCount = 0
    this.isShowCardDebug = false
    
    // components
    this.audioManager = new AudioManager(this)
    this.timer = new Timer(this, this.audioManager, this.startGame)
  }

  create() {
    this.#createBackground()
    this.#createCards()
    this.#setPositionContainer()
    
    this.audioManager.initAudio()
    this.timer.init()
    
    this.#setDebugStatus()
    this.#initMinimap()
    
    this.startGame()
  }
  
  #createBackground() {
    this.add.sprite(0, 0, 'bg')
  }
  
  startGame = () => {
    this.oppenedCard = null
    this.oppenedCardCount = 0
    this.#initCards()
  }
  
  #initCards = () => {
    this.cardsContainer.children.forEach(card => {
      card.close()
    })
  }
  
  #createCards() {
    this.cardsContainer = this.game.add.group()
    const positions = getPositionsCards(this.game.config.CARDS.rows, this.game.config.CARDS.cols,
      {
        width: this.game.config.CARDS.cardWidth,
        height: this.game.config.CARDS.cardHeight,
        offset: this.game.config.CARDS.cardOffset,
      })

    let countId = 1
    for (let i = 1; i <= this.game.config.CARDS.maxCards; i++) {
      this.cardsContainer.add(new Card(
        this.game, this.game.config.CARDS.key, countId, positions[i - 1].x, positions[i - 1].y
      ))
    
      countId++
      if (countId >= 7) countId = 1
    }

    this.cardsContainer.onChildInputDown.add(this.#onCardClicked)
  }
  
  #onCardClicked = (card) => {
    if (card.opened) return false
    
    this.audioManager.sounds.card.play()
    
    // уже есть открытая карта
    if (this.oppenedCard) {
      // если равны - то запоминаем
      if (this.oppenedCard.id === card.id) {
        this.oppenedCard = null
        this.oppenedCardCount++
        this.audioManager.sounds.success.play()
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
    
    card.open()
    
    // проверка на то, что все карты открыты
    const numberOfPairs = this.cardsContainer.children.length / 2
    if (this.oppenedCardCount === numberOfPairs) {
      this.startGame()
      this.audioManager.sounds.complete.play()
    }
  }
  
  #setPositionContainer() {
    this.cardsContainer.position.set(200, 350)
  }
  
  #initMinimap() {
    const miniMap = new MiniMap(this, this.game.config);

    for (let i = 1; i <= 6; i++) {
      const heart = this.game.add.sprite(0, 0, 'card' + i)
      miniMap.addItem(heart)
    }
  
    // Add some items to the miniMap.
    if (this.scale.isLandscape) {
      console.log('isLandscape')
      miniMap.lineHorizontal()
      miniMap.setPosition(1000, 500)
    } else {
      console.log('isPortrait')
      miniMap.lineVertical()
      miniMap.setPosition(100, 100)
    }

  }
  
  #setDebugStatus = () => {
    if (this.isShowCardDebug) {
      this.cardsContainer.forEach(card => {
        card.debug()
      })
    }
  }
}
