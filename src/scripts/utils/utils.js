const getPositionsCards = (rows, cols, props) => {
  const {
          width = 0, height = 0, offset = 0, shuffle = false
        } = props
  const positions = []
  
  const cardWidth  = width
  const cardHeight = height
  const offsetCardBetween = offset
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      positions.push({
        x: (offsetCardBetween + cardWidth) * col,
        y: (offsetCardBetween + cardHeight) * row
      })
    }
  }
  
  // возвращает перемешанные позиции
  return shuffle ? Phaser.ArrayUtils.shuffle(positions) : positions
}

export {
  getPositionsCards
}

