window.multiplyExample = [

`object.color = 'green'
object.x = 100
object.y = 100
object.speedX = 1 * Math.sign(Math.random() - .5)
object.speedY = 1 * Math.sign(Math.random() - .5)
object.height = 30
object.width = 30
object.tillDivide = 200

object.onTick = function onTick (object) {
  if (object.x < 0) object.speedX = 1
  if (object.x > 1000) object.speedX = -1
  if (object.y < 0) object.speedY = 1
  if (object.y > 1000) object.speedY = -1
  object.tillDivide -= 1
  if (object.tillDivide <= 0 && objects.length < 100) {
    object.tillDivide = 100
    const divide = createObject(object.init)
    divide.x = object.x + Math.random() * 10
    divide.y = object.y + Math.random() * 10
    divide.speedX = (Math.random() - .5) * 2
    divide.speedY = (Math.random() - .5) * 2
  }
}`,


`object.color = 'red'
object.x = 400
object.y = 400
object.speedX = 0
object.speedY = 0
object.height = 100
object.width = 100
object.text = 'Move with wasd'

object.onKeyUp = function onKeyUp (key, object) {
  if (key == 'a') object.speedX = 0
  if (key == 'd') object.speedX = 0
  if (key == 's') object.speedY = 0
  if (key == 'w') object.speedY = 0
}

object.onKeyDown = function onKeyDown (key, object) {
  if (key == 'a') object.speedX = -1
  if (key == 'd') object.speedX = 1
  if (key == 's') object.speedY = 1
  if (key == 'w') object.speedY = -1
}

object.onCollision = function onCollision (object, otherObject) {
  if (!object.lost) {
    object.height -= 1
    object.width -= 1
    otherObject.color = 'orange'
    if (object.height <= 0) {
      object.lost = true
    }
  } else {
    object.height = 100
    object.width = 300
    object.x = 350
    object.y = 450
    object.text = 'YOU LOSE'
  }
}`

]
