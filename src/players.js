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
//  if (objOpp.isStone) {
//    console.log("Stone")
//  }
  if (objOpp.isPlayer || objOpp.isStone) {
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

function createPlayer(x, y, imgSrc, keys, scoreElem) {
  return {
    init: id => {
      return `
        <img id="${id}" src="${imgSrc}" width="50" height="50"
          style="top:0;
                left:0;
                width:50px; 
                height:50px;
                position: absolute;
                border-style: solid;
                border-width: 5px;
                border-color: #aaff00;"/>
      `
    },
    isPlayer: true,
    isVisible: true,
    tick: playerTick,
    collision: playerCollision,
    bombDestroy: (obj, bomb) => {
      const t = (Math.abs(obj.x - bomb.x) + Math.abs((obj.y - bomb.y)))
      obj.vx = (obj.x - bomb.x) / t * 100
      obj.vy = (obj.y - bomb.y) / t * 100

//      obj.isVisible = false
//      obj.doNotColider = true
    },
    x: x,
    y: y,
    width: 50,
    height: 50,
    vx: 0,
    vy: 0,
    score: 0,
    bombs: 0,
    canJump: true,
    effectTm: 0,
    scoreElem: scoreElem, // $("#score1"),
    isBorder: false,
    keys: keys
    // , {
    //   left: 65,
    //   right: 68,
    //   up: 87,
    //   down: 40
    // }
  }
}