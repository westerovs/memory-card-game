/* eslint-disable */
import Container from './Container.js';
import UI from '../../components/UI.js';
import getFactor from "../../utils/factor"
import resize from "../../utils/resize"
import { scaleTween, blinkingAlpha } from '../../utils/tweens.js';

// улучшенная версия со значительным рефакторингом
export default class StateFinal extends Phaser.State {
  constructor(cfg) {
    super()
    this._cfg = cfg
    
    this.sprites = {}
    this.Signals = {}
    this.factor = null
  
    // components
    this.ui = null
  }
  
  create(game) {
    this.game = game
    this.game.camera.fadeIn()
    
    this.game._cfg = this._cfg
    
    this.game.sprites = this.sprites
    this.game.Signals = this.Signals
    
    this.game.LAYERS = {
      BACKGROUNDS    : this.game.add.group(),
      GAME  : this.game.add.group(),
      UI: this.game.add.group(),
    }
    
    this.#initSignals()
    this.#createBg()
    this.#createUi()
    this.#createGame()
    this.resize()
  }
  
  resize() {
    const {width, height, factor, landscape} = resize(this.game.LAYERS.BACKGROUNDS, getFactor(this.game), this.game)
    this.game.Signals.onResizeSignal.dispatch(landscape)
    this.factor = factor
    this.game.factor = this.factor
    
    this.ui?.updateUiLayer(width, height, factor, landscape)
  }
  
  #createBg() {
    this.game.LAYERS.BACKGROUNDS.create(0, 0, 'bg_preload')
  }
  
  #createUi() {
    this.ui = UI.get(game)
  }
  
  #initSignals() {
    this.game.Signals.onResizeSignal = new Phaser.Signal()
  }
  
  // entry point
  #createGame() {
    this.container = new Container(this.game, this._cfg)
    this.container.startGame()
  }
}
