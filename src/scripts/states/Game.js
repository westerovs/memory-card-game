import AudioManager from '../components/AudioManager.js';
import Timer from '../components/Timer.js'
import Card from '../components/Card.js'

/*
Для отладки включить this.isShowCardDebug = true
*/

export default class Game extends Phaser.State {
  constructor() {
    super()
    
    this.cardsContainer = null
    this.oppenedCard = null // current open card
    this.oppenedCardCount = 0
    this.isShowCardDebug = true
    
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
    this.startGame()
    
    this.#setDebugStatus()
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
    const positions = this.#setPositionsCards().slice()

    let countId = 1
    for (let i = 1; i <= this.game.config.CARDS.maxCards; i++) {
      this.cardsContainer.add(new Card(this.game, 'card', countId, positions[i-1].x, positions[i-1].y))

      countId++
      if (countId >= 7) {
        countId = 1
      }
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
  
  #setPositionsCards() {
    const positions = []
    
    const cardWidth  = this.game.config.CARDS.cardWidth
    const cardHeight = this.game.config.CARDS.cardHeight
    const offsetCardBetween = this.game.config.CARDS.cardOffset
    const rows = this.game.config.CARDS.rows
    const cols = this.game.config.CARDS.cols

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        positions.push({
          x: (offsetCardBetween + cardWidth) * col,
          y: (offsetCardBetween + cardHeight) * row
        })
      }
    }
    
    // возвращает перемешанные позиции
    return Phaser.ArrayUtils.shuffle(positions)
  }
  
  #setPositionContainer() {
    this.cardsContainer.position.set(150, 150)
  }
  
  #setDebugStatus = () => {
    if (this.isShowCardDebug) {
      this.cardsContainer.forEach(card => {
        card.debug()
      })
    }
  }
}
