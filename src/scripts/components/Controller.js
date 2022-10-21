/* eslint-disable */
import Cards from './cards/Cards.js';
import MiniMap from './modules/MiniMap.js';
import Hint from './modules/Hint.js'
import { tweenSetAlpha } from '../utils/tweens.js';

export default class Controller {
  constructor(game, state) {
    this.game = game
    this.state = state
  
    // components
    this.cardsContainer   = null
    this.miniMap = null
    
    this.previewDelay = this.game._cfg.previewDelay
  }
  
  init() {
    this.createCardsContainer()
    this.showAndInitCards()
    this.#initMinimap()
  }
  
  createCardsContainer() {
    this.cardsContainer = new Cards(this.game, this.game._cfg, this.state)
    this.cardsContainer.init()
  }
  
  showAndInitCards = () => {
    this.cardsContainer.initCards()
    this.cardsContainer.hidePreviewCard(
      this.previewDelay,
      () => {
        this.cardsContainer.checkStatusInput(true)
        this.#createHints()
      }
    )
  }
  
  hide = (delay) => {
    tweenSetAlpha(this.game, this.cardsContainer, 0, delay)
    this.miniMap.hide(delay)
  }
  
  #initMinimap = () => {
    this.miniMap = new MiniMap(this.game, this.game._cfg);

    const uniqueCards = this.game._cfg.CARDS.data.length
    
    for (let i = 1; i <= uniqueCards; i++) {
      const card = this.game.add.image(0, 0, `card${i}`)
      this.miniMap.addItem(card, i)
    }
  
    this.miniMap.init()
  }
  
  #createHints = () => {
    const cards = this.cardsContainer.cards
    
    const glow = this.game.add.image(0, 0, 'cardGlow')
    glow.alpha = 0
    glow.anchor.set(0.5)
    const hint = this.game.add.image(0, 0, 'hint')
    hint.alpha = 0
  
    this.cardsContainer.add(glow)
    this.cardsContainer.add(hint)

    new Hint(this.game, cards, hint)
    new Hint(this.game, cards, glow)
  }
}
