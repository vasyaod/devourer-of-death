const bottom = 250
const left = 430

const playerTick = obj => {
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
}

const playerCollision = (obj, prev, objOpp) => {
  if (!objOpp.isDisk) {
    if (prev.y + prev.height < objOpp.y && obj.y + obj.height >= objOpp.y && obj.scored == false) {
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
  } else if (objOpp.isDisk && objOpp.isVisible) {
    objOpp.isVisible = false
    objOpp.lastCollectedTm   = Date.now()
    const a = obj1 == obj ? obj2 : obj1
    a.canJump = false
    a.effectTm = Date.now()
  }
}

var obj1 = {
  isPlayer: true,
  isVisible: true,
  tick: playerTick,
  collision: playerCollision,
  x: 0,
  y: 0,
  width: $("#obj1").width(),
  height: $("#obj1").height(),
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
  isPlayer: true,
  isVisible: true,
  tick: playerTick,
  collision: playerCollision,
  x: left,
  y: 0,
  width: $("#obj2").width(),
  height: $("#obj2").height(),
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