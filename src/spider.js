

const spiderCollision = (obj, prev, objOpp, prevOpp) => {
  objOpp.vy = 0
  objOpp.x = prevOpp.x
  objOpp.y = prevOpp.y
}

const spiderTick = obj => {

}

function createSpider () {
  return {
    isVisible: true,
    tick: spiderTick,
    collision: spiderCollision,
    x: left / 2 - $("#spider").width() / 2 + 50,
    y: bottom / 2 - $("#spider").height() / 2 + 50,
    width: $("#spider").width(),
    height: $("#spider").height(),
    lastCollectedTm: 0,
    elem: $("#spider")
  }
}