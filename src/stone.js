function createStone (x, y) {
  return { ... {},
    isVisible: true,
    isStone: true,
    doNotColider: false,
    init: id => {
      return `
        <img id="${id}" src="stone-50.png" weight="50" height="50"
          style="top:10px; 
                 left:10px; 
                 width:50px; 
                height:50px;
                position: absolute;"
        />
      `
    },
    tick: obj => {
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

        obj.isXMove = true
        obj.nonRefreshable = false
      }
      obj.isCollision = false
    },

    collision: (obj, prev, objOpp, prevOpp) => {
      obj.isCollision = true
      //console.log("!!!!")
      // if (obj.x != prev.x) {
      //   const vx = (objOpp.vx + obj.vx) / 2
      //   objOpp.vx = vx * 5
      //   if (objOpp.vx > 40)
      //     objOpp.vx = 40
  
      //   obj.vx = vx
  
      //   obj.x = prev.x
      // }
  
      // if (obj.y != prev.y) {
      //   const vy = (objOpp.vy + obj.vy) / 2
      //   objOpp.vy = vy * 5
      //   obj.vy = vy
  
      //   obj.y = prev.y
      // }
    },
    bombDestroy: (obj, bomb) => {
      const t = (Math.abs(obj.x - bomb.x) + Math.abs((obj.y - bomb.y)))
      obj.vx = (obj.x - bomb.x) / t * 100
      obj.vy = (obj.y - bomb.y) / t * 100
      //obj.isVisible = false
      //obj.doNotColider = true
    },
    x: x,
    y: y,
    width: 50,
    height: 50,
    vx: 0,
    vy: 0,
  }
}