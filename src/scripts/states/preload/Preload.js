export default class Preload extends Phaser.State {
  constructor(config) {
    super()
  
    this.config = config
  }
  
  preload() {
    this.load.image('bg', './src/assets/images/background.jpg')
    this.load.image('card', './src/assets/images/cards/card-shirt.png')
    this.load.image('sound-on', './src/assets/images/icons/sound-on.png')
    this.load.image('sound-off', './src/assets/images/icons/sound-off.png')
  
    for (let i = 1; i <= 6; i++) {
      this.load.image(`card${i}`, `./src/assets/images/cards/card${i}.png`)
    }
  
    this.load.audio('card', './src/assets/sounds/card.mp3')
    this.load.audio('complete', './src/assets/sounds/complete.mp3')
    this.load.audio('success', './src/assets/sounds/success.mp3')
    this.load.audio('theme', './src/assets/sounds/theme.mp3')
    this.load.audio('timeout', './src/assets/sounds/timeout.mp3')
  }
  
  create() {
    this.state.start(this.config.constants.States.GAME)
  }
}

