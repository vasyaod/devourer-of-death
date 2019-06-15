var banner = $("#banner-message")
const size = 50
const bottom = 250
const left = 430

var disk = {
  isVisible: true,
  x: left / 2 - size / 2,
  y: bottom / 2 - size / 2,
  lastCollectedTm: 0
}
const diskElem = $("#disk")

var obj1 = {
  isVisible: true,
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  score: 0,
  canJump: true,
  effectTm: 0,
  elem: $("#obj1"),
  scoreElem: $("#score1"),
  isBorder: false,
  keys: {
    left: 65,
    right: 68,
    up: 87,
    down: 40
  }
}

var obj2 = {
  isVisible: true,
  x: left,
  y: 0,
  vx: 0,
  vy: 0,
  score: 0,
  canJump: true,
  effectTm: 0,
  elem: $("#obj2"),
  scoreElem: $("#score2"),
  isBorder: false,
  scored: false,
  keys: {
    left: 37,
    right: 39,
    up: 38,
    down: 40
  }
}

const objs = [obj1, obj2]
const allObjs = [obj1, obj2, disk]

function refresh(obj) {
  obj.elem.css("left", obj.x + "px")
  obj.elem.css("top", obj.y + "px")
  obj.scoreElem.text(obj.score)
  
  if (obj.isBorder)
    obj.elem.css("border-width", "5px")
  else
    obj.elem.css("border-width", "0px")

  if (disk.isVisible) {
    diskElem.css("visibility", "visible")
    diskElem.css("left", disk.x + "px")
    diskElem.css("top", disk.y + "px")
  } else {
    diskElem.css("visibility", "hidden")
  }
  
}

function inCollision(obj1, obj2) {
  if (inRectangle(obj1.x, obj1.y, obj2)) {
    return true;
  }
  if (inRectangle(obj1.x + size, obj1.y, obj2)) {
    return true;
  }
  if (inRectangle(obj1.x, obj1.y + size, obj2)) {
    return true;
  }
  if (inRectangle(obj1.x + size, obj1.y + size, obj2)) {
    return true;
  }
  return false;
}

function inRectangle(x, y, obj) {
  if (obj.x <= x && obj.x + size > x &&
    obj.y <= y && obj.y + size > y) {
    //      console.log("!!!!")
    return true;
  } else {
    return false;
  }
}

setInterval(function () {
  const tm = Date.now()

  if (!disk.isVisible && Date.now() - disk.lastCollectedTm > 30000) {
    disk.isVisible = true
  }

  objs.forEach(function (obj) {
    const prev = Object.assign({}, obj)
    obj.x = obj.x + obj.vx
    if (obj.vx > 0) {
      obj.vx = obj.vx - 1
    }
    if (obj.vx < 0) {
      obj.vx = obj.vx + 1
    }

    if (obj.x < 0 || obj.x > left) {
      obj.vx = -obj.vx
    }

    if (obj.x < 0) {
      obj.x = 0
    }

    if (obj.x > left) {
      obj.x = left
    }

    // Y changes
    if (obj.y < bottom) {
      obj.vy = obj.vy + 5
      obj.y = obj.y + obj.vy
    }

    if (obj.y > bottom) {
      obj.y = bottom
    }

    if (obj.y == bottom) {
      obj.scored = false
      obj.isBorder = false
    }

    if (!obj.canJump && Date.now() - obj.effectTm > 10000) {
      obj.canJump = true
    }

    allObjs.forEach( objOpp => {
      if (obj != objOpp && inCollision(obj, objOpp)) {
        if (objOpp != disk) {
          if (prev.y + size < objOpp.y && obj.y + size >= objOpp.y && obj.scored == false) {
            obj.scored = true
            obj.score = obj.score + 1
          }

          const vx = (objOpp.vx + obj.vx) / 2
          objOpp.vx = vx
          obj.vx = vx
          const vy = (objOpp.vy + obj.vy) / 2
          objOpp.vy = vy
          obj.vy = vy

          obj.x = prev.x
          obj.y = prev.y
        } else if (disk.isVisible) {
          disk.isVisible = false
          disk.lastCollectedTm   = Date.now()
          const a = obj1 == obj ? obj2 : obj1
          a.canJump = false
          a.effectTm = Date.now()
        }
      }
    })
    refresh(obj)
  });

}, 100);

$(document).keydown(function (event) {
  objs.forEach( obj => {
    if (event.which == obj.keys.right) {
      // 	if (obj.y == bottom) {
      obj.vx = 20
      //   }
      ///    obj.x = obj.x - 50
    }
    if (event.which == obj.keys.left) {
      //	if (obj.y == bottom) {
      obj.vx = -20
      //  }
      //    obj.x = obj.x - 50
    }
    if (event.which == obj.keys.down) {
      //   obj.y = obj.y + 50
    }
    if (event.which == obj.keys.up && obj.canJump) {
      if (obj.y == bottom) {
        obj.y = bottom - 1
        obj.vy = -50
      }
    }
  });

  objs.forEach( obj => {
    refresh(obj)
  });
})