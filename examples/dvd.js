window.dvdExample = [
`object.color = '#00ff00'
object.colors = [ 0, 0xff, 0 ]
object.colorIndex = 2
object.colorDir = 1
object
object.x = 400
object.y = 400
object.speedX = 1.5
object.speedY = 1
object.height = 100
object.width = 150
object.text = 'DVD'

object.onTick = function (object) {
  if (object.colors[object.colorIndex] == 0xff || object.colors[object.colorIndex] == 0) {
    object.colorIndex = (object.colorIndex + 1) % 3
    object.colorDir = object.colors[object.colorIndex] == 0 ? 1 : -1
  }
  object.colors[object.colorIndex] += object.colorDir
  object.color = '#' + object.colors.map(color => color.toString(16).padStart(2, '0')).join('')
}

object.onOutOfBoundsX = function (object) {
  object.speedX *= -1
}

object.onOutOfBoundsY = function (object) {
  object.speedY *= -1
}`
]
