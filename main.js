// entry point
import bootstrap from './bootstrap.js'
import StatePreload from './src/scripts/states/Preload.js'
import StateGame from './src/scripts/states/stateGame/StateGame.js'
// import StateFinal from './src/scripts/states/stateFinal/StateFinal.js'

import { config } from './configs/config.js'

const getStates = () => {
  return [
    {
      key: config.constants.States.PRELOAD,
      constructor: new StatePreload(config),
    },
    {
      key: config.constants.States.GAME,
      constructor: new StateGame(config.gameSettings),
    },
    // {
    //   key        : config.constants.States.FINAL,
    //   constructor: new StateFinal(config.finalSettings),
    // },
  ]
}

config.states = getStates()

bootstrap(config)

