/* eslint-disable */
import {scaleTween} from '../../utils/tweens.js'

export default class Card extends Phaser.Sprite {
  constructor({scene, frame, id, delayIndex, x, y}) {
    super(scene, x, y, frame)

    this.scene = scene
    this.frame = frame
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
    this.alive = false

    this.callback = callback
    this.flip()
  }

  runAnimation = (game, params, delay = 50) => {
    game.add.tween(this.scale)
      .to({x: params.x, y: params.y},
        250, Phaser.Easing.Linear.None, true, delay * this.delayIndex)
    
    game.add.tween(this)
      .to({alpha: params.alpha},
        250, Phaser.Easing.Linear.None, true, delay * this.delayIndex)
      .onComplete.add(() => {
        if (params.callBack) params.callBack()
    })
  }

  // переворачивает карту
  flip = (duration = 50) => {
    if (this.cardIsOpened) this.#turnCard( `card${this._id}`, duration)
    else this.#turnCard( 'cardShirt', duration)
  }

  #turnCard(frame, duration) {
    scaleTween(this.scene, this, {x: 0, duration})
      .onComplete.add(() => {
        this.loadTexture(frame)
        scaleTween(this.scene, this, {x: 1, duration})
          .onComplete.add(() => {
          if (this.callback) this.callback()
        })
    })
  }

  close() {
    if (this.cardIsOpened) {
      this.cardIsOpened = false
      this.alive = true
      this.flip()
    }
  }
}
