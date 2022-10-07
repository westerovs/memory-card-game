export default function resize(bg, factor, game) {
  const {width, height, world, renderer, camera} = game
  
  const worldWidth  = bg.width
  const worldHeight = bg.height
  
  const landscape = game.scale.isGameLandscape
  
  const focusX = (worldWidth - width / factor) / 2
  const focusY = (worldHeight - height / factor) / 2
  
  
  world.setBounds(focusX, focusY, bg.width, bg.height)
  
  world.resize(worldWidth * factor, worldHeight * factor)
  renderer.resize(width, height)
  camera.setSize(width, height)
  camera.setBoundsToWorld()
  camera.scale.set(factor)
  
  
  bg.width  = worldWidth
  bg.height = worldHeight
  
  camera.setPosition(focusX * factor, focusY * factor)
  return {factor, landscape, width, height}
}
