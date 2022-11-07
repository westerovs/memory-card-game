/* eslint-disable */

import {tweenSetAlpha} from '../utils/tweens.js';

export default class ChangePhrases {
  constructor(game) {
    this.game = game
  
    this.counterError = 0
    this.maxCount = 3
  
    this.styleText = {
      fontSize  : 40,
      font      : this.game.constants.FF_BASE,
      fontWeight: 'bold',
      fill      : 'white',
      align     : 'center',
    }
    this.phrases = [
      'You can do it!',
      'Try again!',
      'Don\'t give up!',
    ]
    this.successText = 'Match cards!'
  
    this.text = null
    this.#createText()
  
    this.game.Signals.isCardMatched.add(() => this.setSuccessText())
  }
  
  get getCount() {
    return this.counterError
  }
  
  #createText = () => {
    this.text = this.game.add.text(400, 320, this.successText, this.styleText)
  }
  
  setSuccessText = () => {
    this.text.setText(this.successText)
    this.text.fill = 'white'
  }
  
  checkText = () => {
    if (this.counterError >= this.maxCount) {
      this.counterError = 0
    }
    
    this.text.setText(this.phrases[this.counterError])
    this.text.fill = 'tomato'
  
    this.counterError++
  }
}
