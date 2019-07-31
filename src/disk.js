const diskTick = obj => {
  if (!obj.isVisible && Date.now() - obj.lastCollectedTm > 5000) {
    obj.isVisible = true
    obj.x =  Math.floor(Math.random() * (left - 50 + 1)) + 50;
    obj.y =  Math.floor(Math.random() * (bottom - 50 + 1)) + 50;
    return
  }
}

function createDisk(id) {
  return {
    id: id,
    isDisk: true,
    isVisible: true,
    tick: diskTick,
    collision: obj => {
      if (obj.isVisible) {
        console.log(id)
        obj.isVisible = false
        obj.lastCollectedTm = Date.now()
      }
    },
    x: left / 2 - $("#disk").width() / 2,
    y: bottom / 2 - $("#disk").height() / 2,
    width: $("#disk").width(),
    height: $("#disk").height(),
    lastCollectedTm: 0,
    elem: $("#disk")
  }
}