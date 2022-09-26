import {scaleTween} from '../utils/tweens.js'

export default class Card extends Phaser.Sprite {
  constructor(scene, key, id, x, y) {
    super(scene, x, y, key)

    this.scene = scene
    this.scene.add.existing(this)
    this.key = key
    this.id = id

    this.anchor.set(0.5)
    this.cardOpened = false
    this.inputEnabled = true
  }
  
  // переворачивает карту
  flip() {
    if (this.cardOpened) this.turnCard('card' + this.id)
    else this.turnCard('card')
  }
  
  turnCard(texture) {
    scaleTween(this.scene, this, {x: 0}).onComplete.add(() => {
      this.loadTexture(texture)
      scaleTween(this.scene, this, {x: 1})
    })
  }
  
  open() {
    this.cardOpened = true
    this.flip()
  }
  
  close() {
    if (this.cardOpened) {
      this.cardOpened = false
      this.flip()
    }
  }
  
  debug() {
    this.turnCard('card' + this.id)
  }
}
