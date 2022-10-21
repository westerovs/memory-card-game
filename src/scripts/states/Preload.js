import { config } from '../../../configs/config.js';

export default class Preload extends Phaser.State {
  constructor(config) {
    super()
  
    this.config = config
  }
  
  preload() {
    // backgrounds
    this.load.image('bg', './src/assets/images/backgrounds/bg.jpg')
    this.load.image('bgPreload', './src/assets/images/backgrounds/bg-preload.jpg')
    
    // logo
    this.load.image('logo', './src/assets/images/ui/logo.png')

    // cards
    this.load.image('cardShirt', './src/assets/images/cards/card-shirt.png')
    this.load.image('cardGlow', './src/assets/images/cards/card-glow.png')
    for (let i = 1; i <= 6; i++) {
      this.load.image(`card${i}`, `./src/assets/images/cards/card${i}.png`)
    }
  
    // boards
    this.load.image('cardBoard', './src/assets/images/boards/card-board.png')
    this.load.image('cardBoardGlow', './src/assets/images/boards/card-board-glow.png')
    this.load.image('minimapBoardHorizontal', './src/assets/images/boards/minimap-board-horizontal.png')
    this.load.image('minimapBoardVertical', './src/assets/images/boards/minimap-board-vertical.png')
  
    // hint
    this.load.image('hint', './src/assets/images/hint.png')

    // sound
    this.load.image('sound-on', './src/assets/images/icons/sound/sound-on.png')
    this.load.image('sound-off', './src/assets/images/icons/sound/sound-off.png')
  
    this.load.audio('card', './src/assets/sounds/card.mp3')
    this.load.audio('complete', './src/assets/sounds/complete.mp3')
    this.load.audio('success', './src/assets/sounds/success.mp3')
    this.load.audio('theme', './src/assets/sounds/theme.mp3')
    this.load.audio('timeout', './src/assets/sounds/timeout.mp3')
  }
  
  create() {
    game.constants = config.constants
    this.state.start(this.config.constants.States.GAME)
  }
  
  createBg = () => {
    this.background = this.game.add.sprite(0, 0, 'bg')
  }
  
  createRect = (game, container, x, y, w, h) => {
    const rect = game.add.graphics(0, 0);
    rect.beginFill(0x000000);
    rect.fillAlpha = 0.1
    rect.anchor.set(0.5)
    rect.drawRect(x, y, w, h);
    rect.endFill();
  }
}

