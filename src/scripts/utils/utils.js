const getPositionsCards = (rows, cols, props) => {
  const {
          width = 0, height = 0, offset, shuffle = false
        } = props
  const positions = []
  
  const cardWidth  = width
  const cardHeight = height
  const offsetCardBetween = offset
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      positions.push({
        x: (offsetCardBetween.x + cardWidth) * col,
        y: (offsetCardBetween.y + cardHeight) * row
      })
    }
  }
  
  // возвращает перемешанные позиции
  return shuffle ? Phaser.ArrayUtils.shuffle(positions) : positions
}

const createBoard = function (game, x = 0, y = 0, frame) {
  const board = game.make.image(x, y, frame)
  board.anchor.set(0.5)
  board.position.set(x, y)
  
  this.add(board)
  this.sendToBack(board)
  return board
}

const setPointerEvents = (game, status, delay = 0) => {
  game.time.events.add(delay, () => {
    game.canvas.style.pointerEvents = status
  })
}

const callNextState = (game, stateName, secondDelay = 500) => {
  const camera = game.camera
  
  game.time.events.add(secondDelay, () => {
    camera.fade()
    
    camera.onFadeComplete.addOnce(() => {
      game.state.start(stateName, true)
    })
  })
}

export {
  getPositionsCards,
  createBoard,
  setPointerEvents,
  callNextState,
}

