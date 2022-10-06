import StartGame from '../components/StartGame.js';

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
    
    // this.container = new Container(game)
    // this.container.createGame()
    //
    // this.resize()
  }
  
  resize(){
    // const {container} = this
    // const {width, height, factor, landscape} = resize(container.bg, getFactor(game), game)
    // container.updateGame(width, height, factor, landscape)
  }
  //

}
