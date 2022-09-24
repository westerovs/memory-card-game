import {scaleTween} from '../utils/tweens.js'

export default class Card extends Phaser.Sprite {
  constructor(scene, key, id) {
    super(scene, 0, 0, key)

    this.scene = scene
    this.scene.add.existing(this)
    this.key = key
    this.id = id
    
    this.anchor.set(0.5)
    this.opened = false
    this.inputEnabled = true
  }
  
  flip() {
    scaleTween(this.scene, this, {x: 0}).onComplete.add(() => {
      const texture = this.opened ? 'card' + this.id : 'card'
      this.loadTexture(texture)
      scaleTween(this.scene, this, {x: 1})
    })
  }
  
  open() {
    this.opened = true
    this.flip()
  }
  
  close() {
    if (this.opened) {
      this.opened = false
      this.flip()
    }
  }
}
