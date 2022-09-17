import GameScene from './GameScene.js';

const config = {
  renderer: Phaser.AUTO,
  width: 1280,
  height: 720,
  state: new GameScene(),
  
  // Игровые данные. Лучше потом вынести в отдельный конфиг
  rows: 2,
  cols: 5
}

window.game = new Phaser.Game(config);




