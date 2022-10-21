/* eslint-disable */

/*
карты при инициализации все alive true
если карта открыта она alive false!
*/

// паттерн стейт
import { tweenSetAlpha } from '../../utils/tweens.js';

const STATE_HINT = {
  SEARCH_COUPLE: 'SEARCH_COUPLE', // Если открыта одна карта, хинт находит её пару
  SEARCH_IDLE: 'SEARCH_IDLE',  // Если найдена пара, или первый ход - хинт рандомно тыкает на любую
}
let state        = STATE_HINT.SEARCH_IDLE

export default class Hint {
  constructor(game, targets, frame) {
    this.game = game
    this.targets = targets
    this.frame = frame
    this.hint    = frame
  
    this.timer = null
    this.timeVisible = 2000
    
    this.timerDelay  = 3000
    this.openCard = null
    this.hint.isShow = false
    this.isDisabedInput = false
    
    this.game.isDestroyed = false
    
    this.init()
  }
  
  init() {
    this.createTimer()
    this.timerDelay = 5000
  
    this.onHandlerClick()
    
    // signals
    this.game.Signals.isCardActive.add((card) => {
      card.alive = false // костыль, т.к не успевает получить данные до конца анимации
      this.openCard = card
      state = STATE_HINT.SEARCH_COUPLE
    })
    this.game.Signals.isCardMatched.add(() => {
      state = STATE_HINT.SEARCH_IDLE
    })
    this.game.Signals.checkHintState.add(() => this.checkHintState())
    this.game.Signals.onResizeSignal.add(() => this.resetHint)
  }

  resetHint = () => {
    this.hide()
    this.timer.destroy()
    this.createTimer()
  }
  
  destroy = () => {
    this.game.isDestroyed = true
    this.hide()
    this.timer.destroy()
    console.log('hint destroy')
  }
  
  show = () => {
    this.hint.isShow = true
    tweenSetAlpha(this.game, this.hint, 1)
  
    if (this.frame.frameName === 'hint.png') {
      this.game.add.tween(this.hint.scale)
        .to({x: 0.9, y: 0.9,
        }, 250, Phaser.Easing.Linear.None, true, 250)
        .repeat(3)
        .yoyo(true)
    }
    if (this.frame.frameName === 'card-glow.png') {
      this.game.add.tween(this.hint.scale)
        .to({x: 0.9, y: 0.9,
        }, 250, Phaser.Easing.Linear.None, true)
        .repeat(3)
        .yoyo(true)
    }
  
    this.game.time.events.add(this.timeVisible, () => {
      this.resetHint()
    })
  }
  
  hide = () => {
    this.hint.isShow = false
    tweenSetAlpha(this.game, this.hint, 0)
  }
  
  // timer
  createTimer = () => {
    if (this.timer) {
      this.timer.destroy()
    }
    
    this.timer = this.game.time.create(false)
    this.timer.loop(this.timerDelay, () => {
      this.tick()
    })
    this.timer.start()
  }
  
  tick = () => {
    if (this.hint.isShow) this.hide()
    else this.show()
  
    if (this.game.isDestroyed) return
    this.checkHintState()
  }
  
  // position
  getAliveElements = () => {
    const aliveElements = []
  
    this.targets.filter((element) => {
      if (!element.alive) return
    
      aliveElements.push(element)
    })
    
    return aliveElements
  }
  
  getCurrentPosition = () => {
    const aliveElements = this.getAliveElements()
    
    if (aliveElements.length === 0) {
      console.warn('--- DESTROY HINT ---')
      this.destroy()
      return
    }
    
    // когда два разных хинта, рандом некорректно работает
    // const aliveElement = Phaser.ArrayUtils.getRandomItem(aliveElements)
    const aliveElement = aliveElements[0]
    
    return {
      x: Math.trunc(aliveElement.x),
      y: Math.trunc(aliveElement.y),
    }
  }
  
  setPosition = () => {
    if (this.game.isDestroyed) return
  
    const {x, y} = this.getCurrentPosition()
    this.hint.position.set(x, y)
  }
  
  // click
  onHandlerClick = () => {
    if (this.game.isDestroyed) return
  
    this.game.canvas.addEventListener('pointerdown', () => {
      if (this.isDisabedInput) return
      
      this.resetHint()
    })
  }
  
  // [0] -----------------------------------
  findCouple = () => {
    const cards = this.getAliveElements()
    
    cards.find(card => {
      if (this.openCard._id === card._id) {
        this.hint.position.set(card.x, card.y)
      }
    })
  }
  
  checkHintState = () => {
    // console.warn('***** state ', state, ' *****')
    
    switch (state) {
      case 'SEARCH_COUPLE':
        this.findCouple()
        break
      case 'SEARCH_IDLE':
        this.setPosition()
        break
    }
  }
}
