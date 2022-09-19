import Card from './Card.js';

export default class GameScene extends Phaser.State {
  constructor() {
    super('Game')

    this.cardsContainer = null
    this.oppenedCard = null // current open card
    this.oppenedCardCount = 0
  }
  
  preload() {
    this.load.image('bg', './src/img/background.jpg')
    this.load.image('card', './src/img/cards/card-shirt.png')
    
    for (let i = 1; i <= 5; i++) {
      this.load.image(`card${i}`, `./src/img/cards/card${i}.png`)
    }
  }
  
  create() {
    this.#createBackground()
    this.#createCards()
    this.#start()
  }
  
  #start = () => {
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

    this.game.config.CARDS.forEach(cardId => {
      for (let i = 0; i < this.game.config.maxTwins; i++) {
        this.cardsContainer.add(new Card(this.game, 'card', cardId))
      }
    })
    
    this.cardsContainer.onChildInputDown.add(this.#onCardClicked)
  }
  
  #onCardClicked = (card) => {
    if (card.opened) return false
    
    // уже есть открытая карта
    if (this.oppenedCard) {
      // если равны - то запоминаем
      if (this.oppenedCard.id === card.id) {
        this.oppenedCard = null
        this.oppenedCardCount++
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
      this.#start()
    }
  }
  
  getCardPositions() {
    const positions = []
  
    const cardWidth  = 200
    const cardHeight = 300
    const offsetCardBetween = 10
    
    const offsetCenterGame  = {
      x: (this.game.config.width - cardWidth * this.game.config.cols) / 2,
      y: (this.game.config.height - cardHeight * this.game.config.rows) / 2,
    }
    
    for (let row = 0; row < this.game.config.rows; row++) {
      for (let col = 0; col < this.game.config.cols; col++) {
        positions.push({
          x: offsetCenterGame.x + (offsetCardBetween + cardWidth) * col,
          y: offsetCenterGame.y + (offsetCardBetween + cardHeight) * row
        })
      }
    }
    
    // возвращает перемешанные позиции
    return Phaser.ArrayUtils.shuffle(positions)
  }
}
