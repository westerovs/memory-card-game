import Card from './Card.js';


export default class GameScene extends Phaser.State {
  constructor() {
    super('Game')

    this.cardsContainer = null
    this.oppenedCard = false // current open card
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
  }
  
  #createBackground() {
    this.add.sprite(0, 0, 'bg')
  }
  
  #createCards() {
    this.cardsContainer = this.game.add.group()
    const positions = Phaser.ArrayUtils.shuffle(this.getCardPositions().slice())
  
    this.game.config.CARDS.forEach(cardId => {
      for (let i = 0; i < 2; i++) {
        const lastPosition = positions.pop()
        this.cardsContainer.add(new Card(this.game, lastPosition.x, lastPosition.y, 'card', cardId))
      }
    })
    
    this.cardsContainer.onChildInputDown.add(this.#onCardClicked)
  }
  
  #onCardClicked = (card) => {
    if (card.oppened) return false
    
    // уже есть открытая карта
    if (this.oppenedCard) {
      // если равны - то запоминаем
      if (this.oppenedCard.id === card.id) {
        this.oppenedCard = null
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
    
    return positions
  }
}
