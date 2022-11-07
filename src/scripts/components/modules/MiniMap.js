/* eslint-disable */
import { createBoard, getPositionsCards } from '../../utils/utils.js'
import {tweenSetAlpha} from '../../utils/tweens.js'

export default class MiniMap extends Phaser.Group {
  constructor(game, config) {
    super(game)

    this.game = game
    this.config = config
    this.offset = config.CARDS.cardOffsetMinimap

    this.cards = []
    this.horizontalBoard = null
    this.verticalBoard = null
  }

  init() {
    this.horizontalBoard = createBoard.call(this, this.game, 215, 0, 'minimapBoardHorizontal')
    this.verticalBoard = createBoard.call(this, this.game, 34, 98, 'minimapBoardVertical')
    
    this.resize(this.game.scale.isGameLandscape)
    this.game.Signals.onResizeSignal.add((isLandscape => this.resize(isLandscape)))
    this.game.Signals.isCardMatched.add(id => this.showCard(id))
  
    this.runAnimation({alpha: 0.5,})
  }
  
  hide(delay = 0.5) {
    this.cards.forEach((card, i) => {
      tweenSetAlpha(this.game, card, 0, 0.1 * i + 1)
    })
    tweenSetAlpha(this.game, this, 0, delay)
  }
  
  addItem(card, id) {
    this.add(card)
    this.cards.push(card)
    
    card._id = id
    card.anchor.set(0.5)
    card.alpha = 0
    card.scale.set(0.58)
  }
  
  runAnimation = (params, delay = 50) => {
    this.cards.forEach((card, delayIndex) => {
      this.game.add.tween(card)
        .to({alpha: params.alpha,}, 250, Phaser.Easing.Linear.None, true)
    })
  }
  
  setLineHorizontal = () => {
    let x  = 0
    let y  = 0
  
    for (let i = 0; i < this.cards.length; i++) {
      const child = this.cards[i]
      child.position.set(x, y)
      x += child.width + this.offset.horizontal.x
    }
  }

  setLineVertical() {
    const positions = getPositionsCards(3, 2,
      {
        width : this.config.CARDS.cardWidth / 2,
        height: this.config.CARDS.cardHeight / 2,
        offset: this.offset.vertical,
      })

    for (let i = 0; i < this.cards.length; i++) {
      const child = this.cards[i]
      child.position.set(positions[i].x, positions[i].y)
    }
  }

  showCard(id) {
    const card = this.cards.find((card) => card._id === id)
    tweenSetAlpha(this.game, card, 1)
  }

  setPosition(x, y) {
    this.position.set(x, y)
  }

  resize(isLandscape) {
    if (isLandscape) {
      this.setLineVertical()
      this.setPosition(1095, 484)
      this.horizontalBoard.alpha = 0
      this.verticalBoard.alpha = 1
    }
    // вертикальная
    else {
      this.setLineHorizontal()
      this.setPosition(465, 1080)
      this.horizontalBoard.alpha = 1
      this.verticalBoard.alpha = 0
    }
  }
}
