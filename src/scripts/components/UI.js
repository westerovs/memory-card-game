export default class UI extends Phaser.Group {
  static get(game) {
    if (!this._instance) {
      this._instance = new UI(game)
      
      return this._instance
    }
    
    return this._instance
  }
  
  constructor(game) {
    super(game)

    this.gameScale = game.constants.gameScale
    this.logo = this.createLogo()
  }
  
  
  createLogo = () => {
    const logo = this.game.stage.add(this.game.make.image(0, 0, 'logo'))
    this.game.sprites.logo = logo
    logo.anchor.set(0.5)

    return logo
  }

  updateUiLayer(width, height, factor, landscape) {
    const {logo, gameScale} = this

    const centerX = 0.5 * width
    const centerY = height / 2
    
    if (landscape) {
      logo.scale.set(1 * gameScale * factor)
      logo.position.set(centerX - 450 * factor, centerY)
    } else {
      logo.scale.set(1 * gameScale * factor)
      logo.position.set(centerX, 250 * factor)
    }
  }
}
