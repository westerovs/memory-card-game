/*
this.game.config.width - размер игры
*/
const state = new Phaser.State('Game')

state.preload = function () {
  console.log('preload')
  this.load.image('bg', './src/img/background.png')
}

state.create = function () {
  this.add.sprite(0, 0, 'bg')
  console.log(this.game)
  console.log('create')
}

const config = {
  renderer: Phaser.AUTO,
  width: 1280,
  height: 720,
  state,
  
  // state: {
  //   init: function() {
  //     this.game.debug.font = '14px monospace';
  //     this.game.debug.lineHeight = 18;
  //   },
  //
  //   preload: function() {
  //     this.load.baseURL = 'https://cdn.jsdelivr.net/gh/samme/phaser-examples-assets@v1.0.0/';
  //     this.load.crossOrigin = 'anonymous';
  //     this.load.image('dude', 'sprites/phaser-dude.png');
  //     this.load.image('starfield', 'skies/starfield.png');
  //   },
  //
  //   create: function() {
  //     this.add.tileSprite(0, 0, 800, 800, 'starfield');
  //     this.add.sprite(400, 300, 'dude');
  //   },
  //
  //   render: function() {
  //     var debug = this.game.debug;
  //
  //     // debug.object(this.game.config, 10, 20, {
  //     //   label: 'game.config',
  //     //   color: 'auto',
  //     // });
  //
  //     debug.phaser(20, 780);
  //   }
  // }
}

window.game = new Phaser.Game(config);




