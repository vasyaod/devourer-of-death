function createSpider () {
  return {
    isVisible: true,
    tick: obj => {

    },
    collision: (obj, prev, objOpp, prevOpp) => {
      objOpp.vy = 0
      objOpp.x = prevOpp.x
      objOpp.y = prevOpp.y
    },
    x: left / 2 - $("#spider").width() / 2 + 50,
    y: bottom / 2 - $("#spider").height() / 2 + 50,
    width: $("#spider").width(),
    height: $("#spider").height(),
    lastCollectedTm: 0,
    elem: $("#spider")
  }
}