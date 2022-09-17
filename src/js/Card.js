export default class Card extends Phaser.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key)

    this.scene = game
    this.scene.add.existing(this)
  }
  
}
