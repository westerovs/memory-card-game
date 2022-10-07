import Cards from './Cards.js';
import MiniMap from './MiniMap.js';
// import AudioManager from './AudioManager.js';
// import Timer from './Timer.js';

export default class StartGame {
  constructor(game, config) {
    // components
    this.game = game
    this.cards = null
    this.miniMap = null
    
    this.bg = null
    // this.audioManager = new AudioManager(this.game)
    // this.timer = new Timer(this.game, this.audioManager, this.restartGame, this.gameOver)
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
    // this.game.audioManager = this.audioManager
    
    // this.audioManager.initAudio()
    // this.timer.init()
    
    this.#initMinimap()
    this.startGame()
    this.#initSignals()
  }
  
  startGame = () => {
    this.cards.initCards()
    // this.timer.timer.resume()
  }
  
  restartGame = () => {
    console.log('Restart Game')
    this.cards.hideCards()
  }
  
  #initSignals = () => {
    this.game.isCardCouple = new Phaser.Signal()
    this.game.isCardCouple.add(id => this.miniMap.showCard(id))
  }
  
  gameOver = () => {
    console.log('GAME OVER')
  }
  
  gameWin = () => {
    console.log('GAME WIN')
  }
  
  #createBackground() {
    this.bg = this.game.add.sprite(0, 0, 'bg')
  }
  
  #initMinimap() {
    this.miniMap = new MiniMap(this.game, this.game.config);
    
    for (let i = 1; i <= 6; i++) {
      const card = this.game.add.sprite(0, 0, 'card' + i)
      this.miniMap.addItem(card, i)
    }
    
    // Add some items to the miniMap.
    if (this.game.scale.isLandscape) {
      this.miniMap.lineHorizontal()
      this.miniMap.setPosition(1000, 500)
    } else {
      this.miniMap.lineHorizontal()
      this.miniMap.setPosition(1000, 500)
      
      // this.miniMap.lineVertical()
      // this.miniMap.setPosition(100, 100)
    }
    
  }
}
