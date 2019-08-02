const bottom = 250
const left = 730

const playerTick = obj => {
  if (obj.isXMove) {
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
    
    obj.isXMove = false
    obj.nonRefreshable = true
  } else {
    // Y changes
//    if (obj.y < bottom) {
      obj.vy = obj.vy + 5
      obj.y = obj.y + obj.vy
//    }
    if (obj.y > 5000) {
      obj.vy = 0
      obj.y = 0
    }
    // if (obj.y > bottom) {
    //   obj.y = bottom
    // }

    // if (obj.y == bottom) {
    //   obj.scored = false
    //   obj.isBorder = false
    // }

    if (!obj.canJump && Date.now() - obj.effectTm > 10000) {
      obj.canJump = true
    }

    obj.isXMove = true
    obj.nonRefreshable = false
  }
  obj.isCollision = false
}

const playerCollision = (obj, prev, objOpp) => {
  obj.isCollision = true
  if (objOpp.isPlayer) {
//    if (prev.y + prev.height < objOpp.y && obj.y + obj.height >= objOpp.y && obj.scored == false) {
//      obj.scored = true
//      obj.score = obj.score + 1
//    }
    if (obj.x != prev.x) {
      const vx = (objOpp.vx + obj.vx) / 2
      objOpp.vx = vx * 5
      if (objOpp.vx > 40)
        objOpp.vx = 40

      obj.vx = vx

      obj.x = prev.x
    }

    if (obj.y != prev.y) {
      const vy = (objOpp.vy + obj.vy) / 2
      objOpp.vy = vy * 5
      obj.vy = vy

      obj.y = prev.y
    }

  } else if (objOpp.isDisk && objOpp.isVisible) {
    obj.score = obj.score + 1
  }
}

var obj1 = {
  isPlayer: true,
  isVisible: true,
  tick: playerTick,
  collision: playerCollision,
  x: 0,
  y: 0,
  width: 50,
  height: 50,
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
  width: 50,
  height: 50,
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