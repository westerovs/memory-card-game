import StartGame from '../components/StartGame.js'
import getFactor from '../utils/factor.js'
import resize from '../utils/resize.js'

// точка входа, первый стейт
export default class Game extends Phaser.State {
  constructor() {
    super()
  
    this.game = null
    this.startGame = null
  }

  //
  create(game) {
    this.game = game
    this.startGame = new StartGame(game)
    this.startGame.create()
    
    this.resize()
  }
  
  resize(){
    console.log('resize')
    const {startGame} = this
    resize(startGame.bg, getFactor(this.game), this.game)
    
    // console.log(' ------------------ ')
    // console.log(getFactor(this.game))
    // console.log(' ------------------ ')
    // const {width, height, factor, landscape} = resize(startGame.bg, getFactor(this.game), this.game)
    // startGame.updateGame(width, height, factor, landscape)
  }


}
