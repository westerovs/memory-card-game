export default function getFactor(game) {
  const {width, height, scale} = game
  
  const isLandscape = scale.isGameLandscape
  const defaultWidth  = 1366
  const defaultHeight = 585
  const windowAspectRatio  = width / height
  const defaultAspectRatio = defaultWidth / defaultHeight
  
  if (isLandscape) {
    if (windowAspectRatio <= defaultAspectRatio) return width / defaultWidth
    if (windowAspectRatio > defaultAspectRatio) return height / defaultHeight
  }
  else {
    if (windowAspectRatio >= 1 / defaultAspectRatio) return height / defaultWidth
    if (windowAspectRatio < 1 / defaultAspectRatio) return width / defaultHeight
  }
  
}
