import { getPositionsCards } from '../../utils/utils.js'
import { tweenSetAlpha } from '../../utils/tweens.js'

export default class MiniMap extends Phaser.Group {
  constructor(game, config) {
    super(game)
    this.game = game
    this.config = config
    
    this.cardsPreview = []
  }
  
  addItem(item, id) {
    item._id = id
    this.add(item)
    this.cardsPreview.push(item)
    item.alpha = 0.5
  }
  
  lineVertical() {
    const length = this.children.length;
    let y  = 0
    
    for (let i = 0; i < length; i++) {
      const child = this.getChildAt(i)
      child.y = y
      child.scale.set(0.5)
      y += child.height
    }
  }
  
  lineHorizontal() {
    const length = this.children.length;
  
    const positions = getPositionsCards(2, 3,
      {
        width : this.config.CARDS.cardWidth / 2,
        height: this.config.CARDS.cardHeight / 2,
        offset: this.config.CARDS.cardOffset / 2,
      })
  
    for (let i = 0; i < length; i++) {
      const child = this.getChildAt(i)
      child.scale.set(0.5)
      child.position.set(positions[i].x, positions[i].y)
    }
  }
  
  showCard(id) {
    const card = this.cardsPreview.find(card => card._id === id)
    tweenSetAlpha(this.game, card, 1)
  }
  
  setPosition(x, y) {
    this.position.set(x, y)
    this.#createRect(this.game, this, 0, 0, this.width, this.height)
  }
  
  #createRect = (game, container, x, y, w, h) => {
    const rect = game.make.graphics(0, 0)
    rect.beginFill(0x211E18)
    rect.anchor.set(0.5)
    rect.drawRect(x, y, w, h)
    rect.endFill()
    
    container.add(rect)
    this.sendToBack(rect)
    
    return rect
  }
}
