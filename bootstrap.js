import Boot from './src/scripts/states/preload/Boot.js'

document.body.addEventListener('contextmenu', (event) => {
  event.preventDefault()
  return false
})

export function gameResize(width, height) {
  if (width === 0 || height === 0) return
  if (!window._GAME || !window._GAME.isBooted) return
  if (window._GAME && window._GAME.baseURI) return
  
  // каждый раз при ресайзе пересчитываем всё
  const gameScale = (window.devicePixelRatio > 1) ? 2 : 1
  const windowWidth = width * window.devicePixelRatio
  const windowHeight = height * window.devicePixelRatio

  window._GAME.width = windowWidth
  window._GAME.height = windowHeight
  window._GAME.config.width = width * gameScale
  window._GAME.config.height = height * gameScale

  window._GAME.scale.setGameSize(windowWidth, windowHeight)
  window._GAME.scale.refresh()

  // если render Canvas
  if (window._GAME.renderType === 1) {
    window._GAME.renderer.resize(windowWidth, windowHeight)
    Phaser.Canvas.setSmoothingEnabled(window._GAME.context, true)
  }

  window._GAME.camera.setSize(windowWidth, windowHeight)

  const currentState = window._GAME.state.getCurrentState()
  if (currentState && currentState.resize) {
    currentState.resize(windowWidth, windowHeight)
  }
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
  
  
  // ----------------- resize listener
  const resizeWatchdog = setInterval(() => {
    if (window.innerWidth > 11 && window.innerHeight > 11) {
      // если игра загрузилась
      if (GAME && GAME.isBooted) {
        clearInterval(resizeWatchdog)
      }
      console.log(`window.innerWidth: ${ window.innerWidth }; window.innerHeight: ${ window.innerHeight }`)
      gameResize(window.innerWidth, window.innerHeight)
    }
  }, 50)
  
  
  let resizeInWait = false
  window.addEventListener('resize', () => {
    if (resizeInWait) return
  
    resizeInWait = true
    const resizeWatchdog2 = setInterval(() => {
      // проверка что высота и ширина есть и что они не равны
      if (window.innerWidth > 0 && window.innerHeight > 0 && (window.innerWidth !== window.innerHeight)) {
        resizeInWait = false
        clearInterval(resizeWatchdog2)
        gameResize(window.innerWidth, window.innerHeight)
      }
    }, 10)
  }, false)
}

export default function bootstrap(config) {
  gameStart(config)
}


