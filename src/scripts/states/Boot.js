// задача класса = загрузить бэк и после загрузки, передать
// управление в прелоадер

export default class Boot extends Phaser.State {
  constructor(config) {
    super()
  
    this.config = config
  }
  
  preload() {
    // this.load.image('bg-start', './src/assets/images/bg.jpg')
  }
  
  create() {
    this.state.start(this.config.constants.States.PRELOAD)
  }
}
