export default class GameScene extends Phaser.State {
  constructor() {
    super('Game')

  }
  
  preload() {
    this.load.image('bg', './src/img/background.png')
    this.load.image('card', './src/img/cards/card.png')
  }
  
  create() {
    this.#createBg()
    this.#createCards()
  }
  
  #createBg() {
    this.add.sprite(0, 0, 'bg')
  }
  
  #createCards() {
    const positions = this.getCardPositions()
  
    positions.forEach(position => {
      this.add.sprite(position.x, position.y, 'card')
    })
  }
  
  getCardPositions() {
    const positions = []
    
    const cardWidth         = 196
    const cardHeight        = 306
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
