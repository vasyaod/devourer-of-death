const diskTick = obj => {
  if (!obj.isVisible && Date.now() - obj.lastCollectedTm > 30000) {
    obj.isVisible = true
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