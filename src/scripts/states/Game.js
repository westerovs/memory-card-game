import AudioManager from '../components/AudioManager.js';
import Timer from '../components/Timer.js'
import Cards from '../components/Cards.js';
import MiniMap from '../components/MiniMap.js';



export default class Game extends Phaser.State {
  constructor() {
    super('GAME')
    
    // components
    this.cards = null

    this.audioManager = new AudioManager(this)
    this.timer = new Timer(this, this.audioManager, this.restartGame, this.gameOver)
  }

  create() {
    this.#createBackground()
  
    this.cards = new Cards(this.game, this.game.config, this.state)
    this.cards.createCards()
    this.cards.setPositionContainer()
  
    this.game.startGame = this.startGame
    this.game.restartGame = this.restartGame
    // todo переписать на сигналы
    this.game.gameWin = this.gameWin
    this.game.gameOver = this.gameOver
    this.game.audioManager = this.audioManager
  
    this.audioManager.initAudio()
    this.timer.init()
    
    this.#initMinimap()
    this.startGame()
  }
  
  restartGame = () => {
    console.log('Restart Game')
    this.cards.hideCards()
  }
  
  gameOver = () => {
    console.log('GAME OVER')
  }
  
  gameWin = () => {
    console.log('GAME WIN')
  }
  
  startGame = () => {
    this.cards.initCards()
    
    this.timer.timer.resume()
  }
  
  #createBackground() {
    this.add.sprite(0, 0, 'bg')
  }
  
  #initMinimap() {
    const miniMap = new MiniMap(this, this.game.config);
    
    for (let i = 1; i <= 6; i++) {
      const card = this.game.add.sprite(0, 0, 'card' + i)
      miniMap.addItem(card)
    }
  
    // Add some items to the miniMap.
    if (this.scale.isLandscape) {
      console.log('isLandscape')
      miniMap.lineHorizontal()
      miniMap.setPosition(1000, 500)
    } else {
      console.log('isPortrait')
      miniMap.lineVertical()
      miniMap.setPosition(100, 100)
    }

  }
}
