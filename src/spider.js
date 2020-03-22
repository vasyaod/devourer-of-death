function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function createSpider (x, y) {
  return { ... {},
    isVisible: true,
    init: id => {
      return `
        <img id="${id}" src="zombi-pig-50.png" weight="50" height="50"
          style="top:10px;
                 left:10px;
                 width:50px;
                height:50px;
                position: absolute;"
        />
      `
    },
    tick: obj => {
      const raduis = 200
      const player = objs.find(o => 
        o.isPlayer && 
        o.isVisible && 
        Math.pow(o.x - obj.x, 2) + Math.pow(o.y - obj.y, 2) < Math.pow(raduis, 2)
      )
      
      let targetX
      let targetY
      if (player != null) {
        targetX = player.x
        targetY = player.y
        // obj.x = obj.x + getRandomArbitrary(-5, 5) * 3
        // obj.y = obj.y + getRandomArbitrary(-5, 5) * 3
      } else {
        targetX = obj.initialX
        targetY = obj.initialY
      }
      
      obj.x = obj.x + 2 * ((targetX - obj.x > 0) ? +1 : -1)
      obj.y = obj.y + 2 * ((targetY - obj.y > 0) ? +1 : -1)
  },
    collision: (obj, prev, objOpp, prevOpp) => {
//      objOpp.vy = 0
      
      objOpp.isVisible = false
      objOpp.doNotColider = true
      if (objOpp.x != prevOpp.x) {
        objOpp.x = prevOpp.x
//        objOpp.vx = -prevOpp.vx
      }
      if (objOpp.y != prevOpp.y) {
        objOpp.y = prevOpp.y
//         objOpp.vy = -prevOpp.vy * 5
      }
    },
    x: x,
    y: y,
    initialX: x,
    initialY: y,
    width: 50,
    height: 50
  }
}