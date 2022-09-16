class Game {
  constructor() {
    this.game  = null
    this.init()
  }
  
  init() {
    this.game = new Phaser.Game(
      1366,
      1366,
      Phaser.CANVAS,
      null,
      {
        preload: this.preload,
        create : this.create,
        update : this.update,
      })
  }
  
  preload = () => {
    this.game.load.image('block1', './src/img/block1.png')
  }
  
  create = () => {
    this.game.add.sprite(100, 100, 'block1')
  }
  
  update = () => {
  
  }
}

new Game()

