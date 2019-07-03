const diskTick = obj => {
  if (!obj.isVisible && Date.now() - obj.lastCollectedTm > 5000) {
    obj.isVisible = true
    disk.x = disk.x =  Math.floor(Math.random() * (left - 50 + 1)) + 50;
    return
  }
}

var disk = {
  isDisk: true,
  isVisible: true,
  tick: diskTick,
  collision: () => {},
  x: left / 2 - $("#disk").width() / 2,
  y: bottom / 2 - $("#disk").height() / 2,
  width: $("#disk").width(),
  height: $("#disk").height(),
  lastCollectedTm: 0,
  elem: $("#disk")
}