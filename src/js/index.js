/*
this.game.config.width - размер игры
*/
const state = new Phaser.State('Game')

state.preload = function () {
  this.load.image('bg', './src/img/background.png')
  this.load.image('card', './src/img/cards/card.png')
}

state.create = function () {
  // create bg
  this.add.sprite(0, 0, 'bg')
  // create cards
  const positions = this.getCardPositions()
  
  positions.forEach(position => {
    this.add.sprite(position.x, position.y, 'card')
  })
}

state.getCardPositions = function () {
  const positions = []
  
  const cardWidth  = 196
  const cardHeight = 306
  const offsetCardBetween = 10
  const offsetCenterGame = {
    x: (config.width - cardWidth * config.cols) / 2,
    y: (config.height - cardHeight * config.rows) / 2,
  }
  
  for (let row = 0; row < config.rows; row++) {
    for (let col = 0; col < config.cols; col++) {
      positions.push({
        x: offsetCenterGame.x + (offsetCardBetween + cardWidth) * col,
        y: offsetCenterGame.y + (offsetCardBetween + cardHeight) * row
      })
    }
  }

  return positions
}

const config = {
  renderer: Phaser.AUTO,
  width: 1280,
  height: 720,
  state,
  
  // Игровые данные. Лучше потом вынести в отдельный конфиг
  rows: 2,
  cols: 5
}

window.game = new Phaser.Game(config);




