import {scaleTween} from './utils/tweens.js'

export default class Card extends Phaser.Sprite {
  constructor(scene, key, id) {
    super(scene, 0, 0, key)

    this.scene = game
    this.scene.add.existing(this)
    this.key = key
    this.id = id
    
    this.anchor.set(0.5)
    this.opened = false
    this.inputEnabled = true
  }
  
  flip(texture) {
    scaleTween(this.scene, this, {x: 0}).onComplete.add(() => {
      this.loadTexture(texture)
      scaleTween(this.scene, this, {x: 1})
    })
  }
  
  open() {
    this.opened = true
    // this.loadTexture('card' + this.id)
    this.flip('card' + this.id)
  }
  
  close() {
    this.opened = false
    // this.loadTexture('card')
    this.flip('card')
  }
  
}
