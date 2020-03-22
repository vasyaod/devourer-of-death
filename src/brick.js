function createBrick(x, y) {
  return { ... {},
    isVisible: true,
    init: id => {
      return `
        <img id="${id}" src="brick-50.png" weight="50" height="50"
          style="top:10px; 
                left:10px; 
                width:50px; 
                height:50px;
                position: absolute;"
        />
      `
    },
    tick: obj => {

    },
    bombDestroy: (obj, bomb) => {
      obj.isVisible = false
      obj.doNotColider = true
    },
    collision: (obj, prev, objOpp, prevOpp) => {
      objOpp.vy = 0

      if (objOpp.x != prevOpp.x) {
        objOpp.x = prevOpp.x
        objOpp.vx = -prevOpp.vx
      }
      if (objOpp.y != prevOpp.y) {
        objOpp.y = prevOpp.y
      }
//      objOpp.vy = -prevOpp.vy
    },
    x: x,
    y: y,
    width: 50,
    height: 50
  }
}