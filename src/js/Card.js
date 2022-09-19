export default class Card extends Phaser.Sprite {
  constructor(scene, key, id) {
    super(scene, 0, 0, key)

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
