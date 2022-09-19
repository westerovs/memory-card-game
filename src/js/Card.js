export default class Card extends Phaser.Sprite {
  constructor(scene, x, y, key, id) {
    super(scene, x, y, key + id)

    this.scene = game
    this.scene.add.existing(this)
    
    this.key = key
    this.id = id
    
    this.inputEnabled = true
    this.events.onInputDown.add(() => this.#onClick())
  }
  
  #onClick(){
    console.log(this.key + this.id)

    // this.loadTexture(this.key + this.id)
  }
  
}
