window.vibrateExample = [
`object.color = 'red'
object.x = 474
object.y = 343
object.speedX = 0
object.speedY = 0
object.height = 100
object.width = 100

object.onTick = function onTick (object) {
  object.x += 10 * (Math.random() - 0.5)
  object.y += 10 * (Math.random() - 0.5)
}`
]
