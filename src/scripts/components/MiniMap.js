import { getPositionsCards } from '../utils/utils.js';

export default class MiniMap extends Phaser.Group {
  constructor(game, config) {
    super(game)
    this.game = game
    this.config = config
  }
  
  addItem(item) {
    this.add(item)
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
  
  setPosition(x, y) {
    this.position.set(x, y)
  }
}
