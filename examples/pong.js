window.pongExample = [

`object.color = 'blue'
object.x = 40
object.y = 290
object.speedX = 0
object.speedY = 0
object.height = 300
object.width = 30

object.onKeyUp = function onKeyUp (key, object) {
  if (key == 'w') object.speedY = 0
  if (key == 's') object.speedY = 0
}

object.onKeyDown = function onKeyDown (key, object) {
  if (key == 'w') object.speedY = -2
  if (key == 's') object.speedY = 2
}`,


`object.color = 'red'
object.x = 900
object.y = 300
object.speedX = 0
object.speedY = 0
object.height = 300
object.width = 30

object.onKeyUp = function onKeyUp (key, object) {
  if (key == 'o') object.speedY = 0
  if (key == 'l') object.speedY = 0
}

object.onKeyDown = function onKeyDown (key, object) {
  if (key == 'o') object.speedY = -2
  if (key == 'l') object.speedY = 2
}`,


`object.color = 'green'
object.x = 450
object.y = 400
object.speedX = 2 * Math.sign(Math.random() - .5)
object.speedY = 2 * Math.sign(Math.random() - .5)
object.height = 50
object.width = 50
object.redScore = 0
object.blueScore = 0

const blueScore = createObject(function(object) {
  object.color = 'yellow'
  object.height = 30
  object.width = 30
  object.x = 100
  object.y = 30
  object.text = 0
})

const redScore = createObject(function(object) {
  object.color = 'yellow'
  object.height = 30
  object.width = 30
  object.x = 800
  object.y = 30
  object.text = 0
})

object.onCollision = function onCollision (object, otherObject) {
  if (otherObject.color === 'red' || otherObject.color === 'blue') {
    object.speedX *= -1
  }
}

object.onTick = function onTick(object) {
  if (object.x < 0) {
    object.x = 450
    object.y = 400
    redScore.text += 1
  }
  if (object.x > 970) {
    object.x = 450
    object.y = 400
    blueScore.text += 1
  }
  if (object.y < 0 || object.y > 970) {
    object.speedY *= -1
  }
}`

]
