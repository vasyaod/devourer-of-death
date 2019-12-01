function createRemoteBomb (x, y) {
  return { ... {},
    isVisible: true,
    countdown: 5,
    detonated: false,
    init: id => {
      return `
        <div id="${id}" style="position: absolute;">
          <img 
            id="frame1"
            style="width:50px; height:50px; position: absolute;"
            src="bomb.jpg" weight="50" height="50"/>
        </div>
      `
    },
    destroy: obj => {
      obj.detonated = true
    },
    tick: obj => {
      if (obj.detonated) {
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