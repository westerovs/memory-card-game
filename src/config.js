import Preload from './scripts/states/preload/Preload.js';
import Game from './scripts/states/Game.js';

export const config = {
  width: 1366,
  height: 1366,
  renderer: Phaser.AUTO,
  scaleMode  : Phaser.ScaleManager.SHOW_ALL,
  constants: {
    States: {
      PRELOAD: 'PRELOAD',
      GAME: 'GAME'
    },
  },
  getStates() {
    return [
      {
        key        : this.constants.States.PRELOAD,
        constructor: new Preload(this),
      },
      {
        key        : this.constants.States.GAME,
        constructor: new Game(this),
      },
    ]
  },
  
  // Other
  VERSION: {
    classic    : true,
    alternative: false
  },
  
  CARDS: {
    data: [1, 2, 3, 4, 5, 6], // номер прибавляется к имени карты 'card' + id + '.png'
    key: 'card',
    maxCards: 12,
    cardWidth: 200,
    cardHeight: 300,
    cardOffset: 10,
    rows: 3,
    cols: 4,
  },
  
  timeout: 999,
}
