import AudioManager from '../components/AudioManager.js';
import Timer from '../components/Timer.js'
import Card from '../components/Card.js'

export default class Game extends Phaser.State {
  constructor() {
    super()
    
    this.cardsContainer = null
    this.oppenedCard = null // current open card
    this.oppenedCardCount = 0
    
    // components
    this.audioManager = new AudioManager(this)
    this.timer = new Timer(this, this.audioManager, this.start)
  }

  create() {
    this.#createBackground()

    this.#createCards()
    this.#setCenterContainer()
    
    this.start()
    this.audioManager.initAudio()
    this.timer.init()
  
  }
  
  start = () => {
    this.oppenedCard = null
    this.oppenedCardCount = 0
    this.#initCards()
  }
  
  #initCards = () => {
    // перетасовать и закрыть все карты
    const positions = this.getCardPositions().slice()
    
    this.cardsContainer.children.forEach(card => {
      card.close()
      const lastPosition = positions.pop()
      card.position.set(lastPosition.x, lastPosition.y)
    })
  }
  
  #createBackground() {
    this.add.sprite(0, 0, 'bg')
  }
  
  #createCards() {
    this.cardsContainer = this.game.add.group()
    
    this.game.config.CARDS.data.forEach(cardId => {
      for (let i = 0; i < this.game.config.CARDS.maxTwins; i++) {
        this.cardsContainer.add(new Card(this.game, 'card', cardId))
      }
    })
    
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
      this.start()
      this.audioManager.sounds.complete.play()
    }
  }
  
  getCardPositions() {
    const positions = []
    
    const cardWidth  = this.game.config.CARDS.cardWidth
    const cardHeight = this.game.config.CARDS.cardHeight
    const offsetCardBetween = this.game.config.CARDS.cardOffset
    
    for (let row = 0; row < this.game.config.CARDS.rows; row++) {
      for (let col = 0; col < this.game.config.CARDS.cols; col++) {
        positions.push({
          x: (offsetCardBetween + cardWidth) * col,
          y: (offsetCardBetween + cardHeight) * row
        })
      }
    }
    
    // возвращает перемешанные позиции
    return Phaser.ArrayUtils.shuffle(positions)
  }
  
  #setCenterContainer() {
    const offsetCardBetween = this.game.config.CARDS.cardOffset

    this.cardsContainer.position.set(
      (100 + this.cardsContainer.width + (offsetCardBetween * 4)) / 2,
      (150 + this.cardsContainer.height + (offsetCardBetween * 2)) ,
    )
  }
}
