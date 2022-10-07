import Boot from './src/scripts/states/preload/Boot.js'

document.body.addEventListener('contextmenu', (event) => {
  event.preventDefault()
  return false
})

export function gameResize(width, height) {

}

function gameStart(config) {
  const GAME = new Phaser.Game(config)

  GAME.state.add('BOOT', new Boot(config))
  GAME.state.start('BOOT')
  
  config.states.forEach((state) => {
    GAME.state.add(state.key, state.constructor)
  })
  
  window._GAME = GAME
  GAME.constants = config.constants
}

export default function bootstrap(config) {
  gameStart(config)
}


