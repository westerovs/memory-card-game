/* eslint-disable */

import { blinkingAlpha } from '../../utils/tweens.js';

export default class Container {
  constructor(game, cfg) {
    this.game = game
    this._cfg = cfg
    this.sprites = this.game.sprites

    this.boards = []
  }
  
  startGame = () => {
    this.initGlow()
  }
    
    //  ------------------- GLOW
  initGlow = () => {
    const glow1 = this.game.add.image(0, 0, 'cards', 'card-board-glow.png')
    glow1.anchor.set(0.5)
    glow1.alpha = 0
    const glow2 = this.game.add.image(0, 0, 'cards', 'card-board-glow.png')
    glow2.anchor.set(0.5)
    glow2.alpha = 0
    
    const board1 = this.game.add.image(538, 547, 'cards', 'final-board1.png')
    board1.anchor.set(0.5)
    const board2 = this.game.add.image(828, 811, 'cards', 'final-board2.png')
    board2.anchor.set(0.5)
    
    // const {board1, board2} = this.sprites
    board1.addChild(glow1)
    board2.addChild(glow2)
    
    this.boards.push(glow1, glow2)
    this.runAnimation(glow1, glow2)
  }
  
  runAnimation = (glow1, glow2) => {
    blinkingAlpha(this.game, glow1, 1, 0, 1)
      .then(() => blinkingAlpha(this.game, glow2, 1, 0, 1))
      .then(() => this.runAnimation(glow1, glow2))
  }
}
