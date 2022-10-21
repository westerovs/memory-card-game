import Boot from './src/scripts/states/Boot.js'

document.body.addEventListener('contextmenu', (event) => {
  event.preventDefault()
  return false
})

// улучшает качество картинки, из dpi1 делает dpi2
const fixDpi = (game) => {
  const dpi    = window.devicePixelRatio
  const canvas = game.canvas
  
  if (dpi === 1) {
    canvas.style.width  = `${ canvas.width }px`
    canvas.style.height = `${ canvas.height }px`
    
    canvas.width  = canvas.width * 2
    canvas.height = canvas.height * 2
    
    game.scale.setGameSize(canvas.width, canvas.height)
    game.scale.refresh()
  }
}

function gameResize(width, height) {
  if (width === 0 || height === 0) return
  if (!window.GAME || !window.GAME.isBooted) return
  if (window.GAME && window.GAME.baseURI) return
  
  // каждый раз при ресайзе пересчитываем всё
  const gameScale = (window.devicePixelRatio > 1) ? 2 : 1
  const windowWidth = width * window.devicePixelRatio
  const windowHeight = height * window.devicePixelRatio

  window.GAME.width = windowWidth
  window.GAME.height = windowHeight
  window.GAME.config.width = width * gameScale
  window.GAME.config.height = height * gameScale

  window.GAME.scale.setGameSize(windowWidth, windowHeight)
  window.GAME.scale.refresh()

  // если render Canvas
  if (window.GAME.renderType === 1) {
    window.GAME.renderer.resize(windowWidth, windowHeight)
    Phaser.Canvas.setSmoothingEnabled(window.GAME.context, true)
  }

  window.GAME.camera.setSize(windowWidth, windowHeight)

  const currentState = window.GAME.state.getCurrentState()
  if (currentState && currentState.resize) {
    fixDpi(window.GAME)
    if (window.devicePixelRatio === 1) currentState.resize(windowWidth * 2, windowHeight * 2)
    else currentState.resize(windowWidth, windowHeight)
  }
}

function gameStart(config) {
  const GAME = new Phaser.Game(config)

  GAME.state.add('BOOT', new Boot(config))
  GAME.state.start('BOOT')
  
  config.states.forEach((state) => {
    GAME.state.add(state.key, state.constructor)
  })
  
  window.GAME = GAME
  GAME.constants = config.constants

  
  // ----------------- resize listener
  const resizeWatchdog = setInterval(() => {
    if (window.innerWidth > 11 && window.innerHeight > 11) {
      // если игра загрузилась
      if (GAME && GAME.isBooted) {
        clearInterval(resizeWatchdog)
      }
      // console.log(`window.innerWidth: ${window.innerWidth}; window.innerHeight: ${window.innerHeight}`)
      gameResize(window.innerWidth, window.innerHeight)
    }
  }, 50)
  
  let resizeInWait = false
  window.addEventListener('resize', () => {
    if (resizeInWait) return
    
    resizeInWait = true
    const resizeWatchdog2 = setInterval(() => {
      if (window.innerWidth > 0 && window.innerHeight > 0 && window.innerWidth !== window.innerHeight) {
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

