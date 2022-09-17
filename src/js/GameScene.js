import Card from './Card.js';

export default class GameScene extends Phaser.State {
  constructor() {
    super('Game')

    this.cards = []
  }
  
  preload() {
    this.load.image('bg', './src/img/background.jpg')
    this.load.image('card', './src/img/cards/card.png')
  }
  
  create() {
    this.#createBackground()
    this.#createCards()
  }
  
  #createBackground() {
    this.add.sprite(0, 0, 'bg')
  }
  
  #createCards() {
    const positions = this.getCardPositions()
    
    positions.forEach(position => {
      this.cards.push(new Card(this.game, position.x, position.y, 'card'))
    })
    
  }
  
  getCardPositions() {
    const positions = []
    
    const cardWidth         = 200
    const cardHeight        = 300
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
