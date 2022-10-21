/* eslint-disable */

export default class ChangePhrases {
  constructor(game) {
    this.game = game
  
    this.counterError = 0
    this.maxCount = 3
    this.phrases = [
      'You can do it!',
      'Try again!',
      'Don\'t give up!',
    ]
  }
  
  get getCount() {
    return this.counterError
  }
  
  checkText = () => {
    if (this.counterError >= this.maxCount) {
      this.counterError = 0
    }

    console.log(this.phrases[this.counterError])
    // this.game.texts.sellingText.setText(this.phrases[this.counterError])
    this.counterError++
  }
}
