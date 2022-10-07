export const config = {
  width: window.innerWidth,
  height: window.innerHeight,
  renderer: Phaser.CANVAS,
  scaleMode  : Phaser.ScaleManager.SHOW_ALL,
  alignH     : true,
  alignV     : true,
  enableDebug: true,
  antialias  : true,
  mouseWheel : true,
  canvasID   : 'game',
  
  constants: {
    States: {
      PRELOAD: 'PRELOAD',
      GAME: 'GAME'
    },
  },
  
  // Other
  VERSION: {
    classic    : true,
    alternative: false
  },
  CARDS: {
    data: [1, 2, 3, 4, 5, 6], // номер прибавляется к имени карты 'card' + id + '.png'
    key: 'card',
    maxCards: 12,
    cardWidth: 200,
    cardHeight: 300,
    cardOffset: 10,
    rows: 3,
    cols: 4,
  },
  timeout: 999,
}
