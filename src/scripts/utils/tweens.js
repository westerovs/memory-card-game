const scaleTween = (game, target, props) => {
  const {x = 1, y = 1, duration = 50} = props
  
  return game.add.tween(target.scale)
    .to({x, y}, duration, Phaser.Easing.Linear.None, true)
}

const tweenSetAlpha = (game, sprite, alpha, second = 0.5, secondDelay = 0) => {
  return game.add
    .tween(sprite)
    .to({alpha}, Phaser.Timer.SECOND * second, Phaser.Easing.Linear.None, true, secondDelay * 1000)
}

export {
  scaleTween,
  tweenSetAlpha,
}
