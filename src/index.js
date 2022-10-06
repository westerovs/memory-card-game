import Boot from './scripts/states/preload/Boot.js'
import { config } from './config.js'

const game = new Phaser.Game(config)
game.state.add('BOOT', new Boot(config))
game.state.start('BOOT')

// добавляет все стейты в игру
config.getStates().forEach(state => {
  game.state.add(state.key, state.constructor)
})

window._game = game





