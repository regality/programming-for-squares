let gameSize = 1000
const scale = px => Math.round(px / (1000 / gameSize))
const scalei = px => Math.round(px / (gameSize / 1000))
$(resizePanels)
$(window).on('resize', resizePanels)
function resizePanels () {
  let height = window.innerHeight
  let width = window.innerWidth
  if (width > height && width > 800) {
    if (width - height <= 270) {
      height = width - 270
    }
    gameSize = height
    $('#game').css({ height: `${height}px`, width: `${height}px` })
    $('#controls').css({ height: `${height}px`, width: `${width - height}px` })
    $('#controls > div').css({ width: '100%' })
  } else {
    gameSize = width
    $('#game').css({ height: `${width}px`, width: `${width}px` })
    $('#controls').css({ height: `500px`, width: `${width}px` })
    if (width > 600) {
      $('#controls > div').css({ width: `${Math.floor(width / 3) - 30}px` })
    } else {
      $('#controls > div').css({ width: `${width}px` })
    }
  }
  objects.forEach(object => {
    updateStyles(object)
  })
}

const objectHtml = `
  <div class="object">
    <div class="text"></div>
    <div class="delete" style="display:none;">
      X
    </div>
    <div class="editing" style="display:none;">
      <textarea></textarea>
    </div>
  </div>
`
let objects = []
const initialObjects = []
const game = $('#game')
let interval
try {
  const saved = localStorage.getItem('squares')
  if (saved) {
    $('#share-input').val(shareCode)
    $('#load').trigger('click')
  }
} catch (e) {}
$('#multiplier-example').click(() => {
  $('#share-input').val(JSON.stringify(multiplyExample))
  $('#load').trigger('click')
})
$('#pong-example').click(() => {
  $('#share-input').val(JSON.stringify(pongExample))
  $('#load').trigger('click')
})
$('#dvd-example').click(() => {
  $('#share-input').val(JSON.stringify(dvdExample))
  $('#load').trigger('click')
})
$('#vibrate-example').click(() => {
  $('#share-input').val(JSON.stringify(vibrateExample))
  $('#load').trigger('click')
})
$('#start').click(() => {
  $('#start').attr('disabled', true)
  $('#stop').attr('disabled', false)
  for (let i = 0; i < objects.length; ++i) {
    objects[i].editing = false
    updateEditing()
  }
  interval = setInterval(() => {
    objects.forEach(object => {
      object.y += object.speedY
      object.x += object.speedX
    })
    objects.forEach(object => {
      let collisions = objects.filter((object2, i) => {
        if (object === object2) return false
        let tl = { x: object2.x,                 y: object2.y                  }
        let tr = { x: object2.x + object2.width, y: object2.y                  }
        let bl = { x: object2.x                , y: object2.y + object2.height }
        let br = { x: object2.x + object2.width, y: object2.y + object2.height }
        let points = [ tl, tr, bl, br ]
        for (let i = 0; i < points.length; ++i) {
          const point = points[i]
          if (point.x > object.x && point.x < object.x + object.width &&
              point.y > object.y && point.y < object.y + object.height) {
            return true
          }
        }
        tl = { x: object.x,                y: object.y                 }
        tr = { x: object.x + object.width, y: object.y                 }
        bl = { x: object.x               , y: object.y + object.height }
        br = { x: object.x + object.width, y: object.y + object.height }
        points = [ tl, tr, bl, br ]
        for (let i = 0; i < points.length; ++i) {
          const point = points[i]
          if (point.x > object2.x && point.x < object2.x + object2.width &&
              point.y > object2.y && point.y < object2.y + object2.height) {
            return true
          }
        }
      })
      collisions.forEach(object2 => {
        if (object.onCollision) object.onCollision(object, object2)
      })
    })
    objects.forEach(object => {
      if ((object.x < 0 || object.x + object.width > 1000) && object.onOutOfBoundsX) {
        object.onOutOfBoundsX(object)
      }
      if ((object.y < 0 || object.y + object.height > 1000) && object.onOutOfBoundsY) {
        object.onOutOfBoundsY(object)
      }
    })
    objects.forEach(object => {
      if (object.onTick) object.onTick(object)
    })
    objects.forEach(object => {
      updateStyles(object)
    })
  }, 10)
})
$("#stop").click(() => {
  $('#start').attr('disabled', false)
  $('#stop').attr('disabled', true)
  clearInterval(interval)
})
$("#reset").click(() => {
  $('#start').attr('disabled', false)
  $('#stop').attr('disabled', true)
  clearInterval(interval)
  const resetObjects = []
  objects.forEach(object => {
    object.el.remove()
    if (object.original) {
      const resetObject = createObject(eval('(' + object.init.toString() + ')'))
      resetObject.original = true
      resetObjects.push(resetObject)
    }
  })
  objects = resetObjects
})

$('#save').on('click', function () {
  const shareCode = getShareCode()
  try {
    localStorage.setItem('squares', shareCode)
  } catch (e) {}
  $('#share-input').val(shareCode)
})
$('#load').on('click', function () {
  $('#get-started').remove()
  objects.forEach(object => {
    object.el.remove()
  })
  objects = []
  const initFuncs = JSON.parse($('#share-input').val())
  initFuncs.forEach(initFunc => {
    const newObject = createObject(eval(`(function init (object) {\n${initFunc}\n})`))
    newObject.original = true
  })
  objects.forEach(object => object.original = true)
})
$(document).on('keydown', e => {
  objects.forEach(object => {
    object.onKeyDown(e.key, object)
  })
})
$(document).on('keyup', e => {
  objects.forEach(object => {
    object.onKeyUp(e.key, object)
  })
})
game.click(e => {
  $('#get-started').remove()
  for (let i = 0; i < objects.length; ++i) {
    if (objects[i].editing) {
      objects[i].editing = false
      return updateEditing()
    }
  }
  const object = createObject(eval(
`(function init (object) {
object.color = 'red'
object.x = ${scalei(e.offsetX)} // can be from 0 to 1000
object.y = ${scalei(e.offsetY)} // can be from 0 to 1000
object.speedX = 1
object.speedY = 0
object.height = 100
object.width = 100
object.text = "Press start, then press 'a'"

// this is called when a key is pressed on the keyboard
// key can be 'a', 'b', '1', '2', 'ArrowUp', 'ArrowLeft', 'Tab', etc.
object.onKeyUp = function (key, object) {
  if (key == 'a') {
    object.speedX *= -1
  }
}

// this is the same as onKeyUp, but is called when the key is released
object.onKeyDown = function (key, object) {
}

// this is called when the object overlaps with another object
object.onCollision = function (object, otherObject) {
}

// this is called when the object leaves the main square from the sides
object.onOutOfBoundsX = function (object) {
}

// this is called when the object leaves the main square from the top or bottom
object.onOutOfBoundsY = function (object) {
}

// this fires every 10 milliseconds
object.onTick = function (object) {
}
})`))
  object.original = true
  object.editing = true
  updateEditing()
})
function createObject (init) {
  let object = {
    el: $(objectHtml),
    color: 'red',
    textColor: 'black',
    text: '',
    height: 100,
    width: 100,
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    speedX: 0,
    speedY: 0,
    editing: false,
    init: init,
    onKeyUp: eval('(function onKeyUp (key, object) {\n})'),
    onKeyDown: eval('(function onKeyDown (key, object) {\n})'),
    onCollision: eval('(function onCollision (object, otherObject) {\n})'),
    onOutOfBoundsX: eval('(function onOutOfBoundsX (object) {\n})'),
    onOutOfBoundsY: eval('(function onOutOfBoundsY (object) {\n})'),
    onTick: eval('(function onTick (object) {\n})')
  }
  init(object)
  updateStyles(object)
  game.append(object.el)
  objects.push(object)
  object.el.click(e => {
    e.stopPropagation()
    if (object.editing) return
    objects.forEach(object => object.editing = false)
    object.editing = true
    updateEditing()
  })
  object.el.hover(
    () => object.el.find('.delete').show(),
    () => object.el.find('.delete').hide()
  )
  object.el.find('.delete').on('click', e => {
    e.stopPropagation()
    object.el.remove()
    objects = objects.filter(obj => obj !== object)
  })
  object.el.find('textarea').on('keyup', function (e) {
    const init = $(this).val()
    const destructure = `
    (function init (object) {
${init}
    })`
    try {
      const parsedInit = eval(destructure)
      object.init = parsedInit
      object.init(object)
      updateStyles(object)
      $(this).css({ border: '4px solid green' })
    } catch (e) {
      $(this).css({ border: '4px solid red' })
      console.log(e)
    }
  })
  return object
}

function updateEditing () {
  objects.forEach(object => {
    if (object.editing) {
      object.el.find('.editing textarea').val(getObjectCode(object))
      object.el.find('.editing').show()
      object.el.css({ zIndex: 10 })
      updateStyles(object)
    } else {
      object.el.find('.editing').hide()
      object.el.css({ zIndex: 1 })
    }
  })
}

function updateStyles (object) {
  const styles = {
    position: 'absolute',
    left: `${scale(object.x)}px`,
    top: `${scale(object.y)}px`,
    height: `${scale(object.height)}px`,
    width: `${scale(object.width)}px`,
    color: object.textColor,
    backgroundColor: object.color
  }
  object.el.css(styles)
  object.el.find('.text').text(object.text)
  if (object.editing) {
    let top = 0
    let left = 0
    if (scale(object.y) + 500 > gameSize) {
      top = 480 - object.y
    }
    if (scale(object.x) + 500 > gameSize) {
      left = 480 - object.x
    }
    object.el.find('.editing textarea').css({ top: `${top}px`, left: `${left}px` })
  }
}

function getObjectCode (object) {
  return object.init.toString().trim().split('\n').slice(1).slice(0, -1).join('\n')
}

function getShareCode () {
  return JSON.stringify(objects.filter(object => object.original).map(object => {
    return getObjectCode(object)
  }))
}
