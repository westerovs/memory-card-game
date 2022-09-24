// timer должен быть выше бэкграунда !
export default class Timer {
  constructor(state, audioManager, callBack) {
    this.state = state
    this.audioManager = audioManager
    this.callBack = callBack
    
    this.timer = null
    this.timeout = null
    this.timeoutText = ''
  }
  
  init = () => {
    this.#createText()
    
    this.timeout = this.state.game.config.timeout
    this.timer = this.state.game.time.create(false)

    this.timer.loop(1000, () => this.#onTimerTick())
    this.timer.start()
  }
  
  #onTimerTick() {
    this.timeoutText.setText(`TIME: ${ this.timeout }`)
    
    if (this.timeout <= 0) {
      this.timeout = this.state.game.config.timeout
      this.audioManager.sounds.timeout.play()
      this.callBack()
    } else {
      this.timeout--
    }
  }
  
  #createText = () => {
    this.timeoutText = this.state.add.text(100, 130, '', {
      font: '36px CurseCasual',
      fill: '#ffffff'
    });
  }
  

}
