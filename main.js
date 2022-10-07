// entry point
import bootstrap from './bootstrap.js'
import Preload from './src/scripts/states/preload/Preload.js'
import Game from './src/scripts/Game.js'
import { config } from './src/scripts/configs/config.js'

const getStates = () => {
  return [
    {
      key: config.constants.States.PRELOAD,
      constructor: new Preload(config),
    },
    {
      key: config.constants.States.GAME,
      constructor: new Game(),
    },
  ]
}

config.states = getStates()

bootstrap(config)

