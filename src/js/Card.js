export default class Card extends Phaser.Sprite {
  constructor(scene, x, y, key, id) {
    super(scene, x, y, key)

    this.scene = game
    this.scene.add.existing(this)
    this.key = key
    this.id = id
    
    this.oppened = false
    this.inputEnabled = true
  }
  
  open() {
    this.oppened = true
    this.loadTexture(this.key + this.id)
  }
  
  close() {
    console.log('CLOSE')
    this.oppened = false
    this.loadTexture('card')
  }
  
}
