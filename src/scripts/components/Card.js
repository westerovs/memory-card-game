import {scaleTween} from '../utils/tweens.js'

export default class Card extends Phaser.Sprite {
  constructor({scene, key, id, delayIndex, x, y}) {
    super(scene, x, y, key)

    this.scene = scene
    this.scene.add.existing(this)
    this.key = key
    this.id = id
    this.delayIndex = delayIndex

    this.anchor.set(0.5)
    this.scale.set(0)
    this.alpha = 0
    this.cardOpened = false
    this.inputEnabled = true
    this.callback = null
  }
  
  init() {
    this.close()
  }
  
  runAnimation(game, params) {
    game.add.tween(this.scale)
      .to({x: params.x, y: params.y,}, 250, Phaser.Easing.Linear.None, true, 50 * this.delayIndex)
    game.add.tween(this)
      .to({alpha: params.alpha,}, 250, Phaser.Easing.Linear.None, true, 50 * this.delayIndex)
      .onComplete.add(() => {
        if (params.callBack) params.callBack()
    })
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
        .onComplete.add(() => {
        if (this.callback) this.callback()
      })
    })
  }
  
  open(callback) {
    this.cardOpened = true
    this.callback = callback
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
