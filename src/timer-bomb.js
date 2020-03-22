function createTimerBomb (x, y) {
  return { ... {},
    isVisible: true,
    countdown: 50,
    init: id => {
      return `
        <div id="${id}" style="position: absolute;">
          <img 
            id="frame1" 
            style="width:50px; height:50px; position: absolute;"
            src="bomb-1-50.png" weight="50" height="50"/>
          <img 
            id="frame2" 
            style="width:100px; height:100px; position: absolute; top:-50px; left:-50px;"
            src="bomb-2-100.png" weight="100" height="100"/>
          <img 
            id="frame3" 
            style="width:200px; height:200px; position: absolute; top:-100px; left:-100px;"
            src="bomb-3-200.png" weight="200" height="200"/>
        </div>
      `
    },
    tick: obj => {
      if (obj.isVisible) {
        if (obj.countdown > 0) {
          obj.countdown = obj.countdown - 1
          
          if (obj.countdown < 3) {
            obj.elem[0].querySelector("#frame1").style.visibility = "hidden"
            obj.elem[0].querySelector("#frame2").style.visibility = "hidden"
            obj.elem[0].querySelector("#frame3").style.visibility = "visible"
          }
          else if (obj.countdown < 6) {
            obj.elem[0].querySelector("#frame1").style.visibility = "hidden"
            obj.elem[0].querySelector("#frame2").style.visibility = "visible"
            obj.elem[0].querySelector("#frame3").style.visibility = "hidden"
          } else {
            obj.elem[0].querySelector("#frame1").style.visibility = "visible"
            obj.elem[0].querySelector("#frame2").style.visibility = "hidden"
            obj.elem[0].querySelector("#frame3").style.visibility = "hidden"
          }

        } else if (obj.countdown == 0) {
          obj.countdown = obj.countdown - 1
          objs.forEach(mapObj => {
            if (mapObj.x > obj.x - 150 && mapObj.x < obj.x + 150 &&
                mapObj.y > obj.y - 150 && mapObj.y < obj.y + 150 &&
                mapObj.bombDestroy) {
              mapObj.bombDestroy(mapObj, obj)
            }
          })
          obj.isVisible = false
          obj.doNotColider = true

          obj.elem[0].querySelector("#frame1").style.visibility = "hidden"
          obj.elem[0].querySelector("#frame2").style.visibility = "hidden"
          obj.elem[0].querySelector("#frame3").style.visibility = "hidden"
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