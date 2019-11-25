function createBomb (x, y) {
  return { ... {},
    isVisible: true,
    countdown: 50,
    init: id => {
      return `
        <img id="${id}" src="bomb.jpg" weight="50" height="50"
          style="top:10px; 
                 left:10px; 
                 width:50px; 
                height:50px;
                position: absolute;"
        />
      `
    },
    tick: obj => {
      if (obj.countdown > 0) {
        obj.countdown = obj.countdown - 1
      } else if (obj.countdown == 0) {
        obj.countdown = obj.countdown - 1
        objs.forEach(mapObj => {
          if (mapObj.x > obj.x - 150 && mapObj.x < obj.x + 150 &&
              mapObj.y > obj.y - 150 && mapObj.y < obj.y + 150) {
            mapObj.isVisible = false
            mapObj.doNotColider = true
          }
        })
      }
    },
    collision: (obj, prev, objOpp, prevOpp) => {

    },
    x: x,
    y: y,
    width: 50,
    height: 50
  }
}