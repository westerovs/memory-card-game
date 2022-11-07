export const config = {
  width      : window.innerWidth,
  height     : window.innerHeight,
  renderer   : Phaser.CANVAS,
  scaleMode  : Phaser.ScaleManager.SHOW_ALL,
  alignH     : true,
  alignV     : true,
  enableDebug: true,
  antialias  : true,
  mouseWheel : true,
  canvasID   : 'game',

  constants: {
    gameScale: 1,
    
    States: {
      PRELOAD: 'PRELOAD',
      GAME   : 'GAME'
    },
  
    FF_BASE: 'Arial'
  },
  
  // Other
  gameSettings: {
    // --- ↓ cards config ↓ ---
    CARDS: {
      data             : [1, 2, 3, 4, 5, 6], // номер прибавляется к имени карты 'card' + id + '.png'
      key              : 'card',
      maxCards         : 12,
      cardWidth        : 120,
      cardHeight       : 168,
      cardOffset       : {x: 4, y: 14},
      cardOffsetMinimap: {
        vertical: {
          x: 10,
          y: 15,
        },
        horizontal: {
          x: 17,
          y: 0,
        },
      },
      rows: 3,
      cols: 4,
    },
    previewDelay   : 1000, // время показа карт при старте игры
    // --- ↑ cards config ↑ ---
    shuffle        : false,
    isReRenderCards: false, // если нужно по окончанию обновить все карты
  },

}
