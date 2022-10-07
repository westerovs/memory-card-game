import CardsContainer from './components/CardsContainer.js'
import getFactor from './utils/factor.js'
import resize from './utils/resize.js'

// точка входа, первый стейт
export default class Game extends Phaser.State {
  constructor() {
    super()
  
    this.game = null
    this.startGame = null
  }

  create(game) {
    this.game = game
    this.startGame = new CardsContainer(game)
    this.startGame.create()
    
    this.resize()
  }
  
  resize(){
    const {startGame} = this
    resize(startGame.bg, getFactor(this.game), this.game)
  }


}
