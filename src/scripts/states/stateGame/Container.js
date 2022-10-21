/* eslint-disable */
import Controller from '../../components/Controller.js'
import { tweenSetAlpha } from '../../utils/tweens.js'
import {callNextState} from '../../utils/utils.js'

export default class Container {
  constructor(game, cfg) {
    this.game = game
    this._cfg = cfg
    
    this.sprites = this.game.sprites
  }
  
  startGame = () => {
    this.#initSignals()
    
    // init
    this.controller = new Controller(this.game, this.game.state)
    this.controller.init()

    // restart if enabled in config
    if (this._cfg.isReRenderCards) this.restartingGame()
  }
  
  restartingGame = () => {
    // если нужно будет несколько уровней сделать
    this.game.showAndInitCards = this.controller.showAndInitCards // todo сделать нормально
  }
  
  #endGame = () => {
    console.warn('GAME WIN! VICTORY!')
    this.game.isDestroyed = true // todo hint crutch
    this.controller.hide(1) // todo сделать нормальный destroy
    
    tweenSetAlpha(this.game, this.sprites.logo, 0, 1)
    tweenSetAlpha(this.game, this.sprites.cta, 0, 1)
  
    // clear signals
    for (const key of Object.getOwnPropertyNames(this.game.Signals)) {
      delete this.game.Signals[key]
    }
    
    callNextState(this.game, this.game.constants.States.FINAL)
  }
  
  #initSignals = () => {
    this.game.Signals.isCardMatched = new Phaser.Signal()
    this.game.Signals.isCardErrorMatched = new Phaser.Signal()
    this.game.Signals.isCardActive = new Phaser.Signal()
    this.game.Signals.checkHintState = new Phaser.Signal()
    this.game.Signals.winGame = new Phaser.Signal()
  
    // если карты сматчены
    this.game.Signals.isCardMatched.add(() => console.log('isCardMatched, update Text'))
    // если карты неправильно сматчены
    this.game.Signals.isCardErrorMatched.add(() => console.log('карты неправильно сматчены!'))
    // полное окончание игры
    this.game.Signals.winGame.add(() => this.#endGame())
  }
}
