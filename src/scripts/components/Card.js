import {scaleTween} from '../utils/tweens.js'

export default class Card extends Phaser.Sprite {
  constructor({scene, key, id, delayIndex, x, y}) {
    super(scene, x, y, key)

    this.scene = scene
    this.scene.add.existing(this)
    this.key = key
    this._id = id
    this.delayIndex = delayIndex

    this.anchor.set(0.5)
    this.scale.set(0)
    this.alpha = 0
    this.cardIsOpened = false
    this.inputEnabled = true
    this.callback = null
  }
  
  init() {
    this.close()
  }
  
  open(callback) {
    this.cardIsOpened = true
    this.callback = callback
    this.flip()
  }
  
  runAnimation = (game, params) => {
    game.add.tween(this.scale)
      .to({x: params.x, y: params.y,}, 1, Phaser.Easing.Linear.None, true, )
    game.add.tween(this)
      .to({alpha: params.alpha,}, 1, Phaser.Easing.Linear.None, true, )
      .onComplete.add(() => {
        if (params.callBack) params.callBack()
    })
  }
  
  // переворачивает карту
  flip() {
    if (this.cardIsOpened) this.turnCard('card' + this._id)
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
  
  close() {
    if (this.cardIsOpened) {
      this.cardIsOpened = false
      this.flip()
    }
  }
  
  debug() {
    this.turnCard('card' + this._id)
  }
}
