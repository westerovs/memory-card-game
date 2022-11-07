/* eslint-disable */
import { createBoard, getPositionsCards, setPointerEvents } from '../../utils/utils.js'
import Card from './Card.js'
import ChangePhrases from '../ChangePhrases.js'

export default class Cards extends Phaser.Group {
  constructor(game, cfg, state) {
    super(game)
    this.game = game
    this._cfg = cfg
    this.state = state
    
    this.cards = []
    this.currentOpenCard = null // current open card
    this.counterMatchedCards = 0 // считает кол-во одинаковых пар
    this.durationShowSecondCard = 1500 // for alternative version
    
    // components
    this.changePhrases = new ChangePhrases(game)
  }
  
  init = () => {
    this.#renderCards()
    this.onChildInputDown.add(this.#onCardClicked)
  }
  
  #renderCards = () => {
    const positions = getPositionsCards(this._cfg.CARDS.rows, this._cfg.CARDS.cols,
      {
        width: this._cfg.CARDS.cardWidth,
        height: this._cfg.CARDS.cardHeight,
        offset: this._cfg.CARDS.cardOffset,
        shuffle: this.game._cfg.shuffle,
      })

    let countId = 1
    let delayIndex = 0
    
    for (let i = 1; i <= this._cfg.CARDS.maxCards; i++) {
      const card = new Card({
        scene: this.game,
        // key  : 'cards',
        frame  : `card${countId}`,
        id   : countId,
        delayIndex: delayIndex,
        x: positions[i - 1].x,
        y: positions[i - 1].y
      })
      this.add(card)
      this.cards.push(card)
    
      countId++
      delayIndex++
      if (countId >= 7) countId = 1
    }
  }
  
  hidePreviewCard = (previewDelay, callback) => {
    this.game.time.events.add(previewDelay, () => {
      this.cards.forEach(card => card.flip(100))
      callback()
    })
  }
  
  initCards = () => {
    this.currentOpenCard = null
    this.counterMatchedCards = 0
    
    this.cards.forEach(card => card.init())
    this.#showCards()
    
    createBoard.call(this, this.game, 180, 172, 'cardBoard')
    this.#resize(this.game.scale.isGameLandscape)
    this.game.Signals.onResizeSignal.add((isLandscape => this.#resize(isLandscape)))
    this.checkStatusInput()
  }
  
  // включает, или выключает ввод
  checkStatusInput = (status = false) => {
    this.children.forEach(child => {
      if (child._id) child.inputEnabled = status
    })
  }
  
  #showCards = () => {
    this.cards.forEach(card => card.runAnimation(this.game, {x: 1, y: 1, alpha: 1}))
  }
  
  #hideCards = () => {
    let count = 0
    
    const restartCards = () => {
      count++
      if (count >= this._cfg.CARDS.maxCards) {
        if (this._cfg.isReRenderCards && this.game.showAndInitCards) {
          this.game.showAndInitCards() // включить, если нужно отрендерить новые карты
        }
        
        // посылает сигнал о окончании игры и переходе к final state
        this.game.Signals.winGame.dispatch(true)
      }
    }
    
    this.cards.forEach(card => {
      card.runAnimation(this.game, {
        x: 0, y: 0,
        alpha: 0,
        callBack: restartCards
      })
    })
  }
  
  #resize(isLandscape) {
    if (isLandscape) this.position.set(500, 514)
    else this.position.set(500, 510)
  }
  
  #onCardClicked = (card) => {
    if (card.cardIsOpened) return
  
    this.game.Signals.isCardActive.dispatch(card)
  
    // если клик произошёл и уже открыта одна из карт
    if (this.currentOpenCard) this.#openedCardAction(card)
    else {
      this.game.Signals.checkHintState.dispatch(card)
      //  если две карты уже открыты, или не было ещё клика
      // если карты не равны, то делаем текущей следующую
      this.currentOpenCard = card
    }
  
    card.open(() => this.#checkFinalCard())
  }
  
  #openedCardAction = (card) => {
    const secondCard = card
  
    // если две карты равны
    if (this.currentOpenCard._id === card._id) {
      this.currentOpenCard = null
      this.counterMatchedCards++
      
      this.game.Signals.isCardMatched.dispatch(card._id) // посылает один из сигналов в миникарту
      // this.game.Signals.checkHintState.dispatch(card)
    }
    // если разные - скрыть прошлую
    else {
      this.game.Signals.isCardErrorMatched.dispatch()
      this.changePhrases.checkText()
  
      this.currentOpenCard.close()
      this.currentOpenCard = card

      this.game.Signals.checkHintState.dispatch(card)
    }
  }
  
  // если три раза неправильно выбрать карту
  closedCardWhenErrorsMatch = () => {
    if (this.changePhrases.getCount >= this.changePhrases.maxCount) {
      this.currentOpenCard.close()
      this.currentOpenCard = null
    }
  }
  
  #checkFinalCard = () => {
    // запускает финальное действие, только после завершения анимации последней карты
    const numberOfPairs = this.cards.length / 2 // 6

    if (this.counterMatchedCards === numberOfPairs) {
      this.#hideCards()
    }
  }
}
