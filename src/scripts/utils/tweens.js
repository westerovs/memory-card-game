const scaleTween = (game, target, props) => {
  const {x = 1, y = 1, duration = 50} = props
  
  return game.add.tween(target.scale)
    .to({x, y}, duration, Phaser.Easing.Linear.None, true)
}


export {
  scaleTween
}
