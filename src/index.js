import Boot from './scripts/states/preload/Boot.js'
import Preload from './scripts/states/preload/Preload.js'
import Game from './scripts/states/Game.js'

const config = {
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
  CARDS: {
    data: [1, 2, 3, 4, 5],
    cardWidth: 200,
    cardHeight: 300,
    cardOffset: 30,
    maxTwins: 2, // кол-во одинаковых карт
    rows: 2,
    cols: 5,
  },
  
  // cardWidth: 200,
  // cardHeight: 300,
  // cardOffset: 30,

  timeout: 30,
}

const game = new Phaser.Game(config)
game.state.add('BOOT', new Boot(config))
game.state.start('BOOT')

// добавляет все стейты в игру
config.getStates().forEach(state => {
  game.state.add(state.key, state.constructor)
})





