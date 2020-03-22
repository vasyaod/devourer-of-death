let objs = []
let indexs = 0
function initMap(map) {
  var bricks = []
  const mapLines = map.split("\n")
  for (var j = 0; j < mapLines.length; j++) {
    const str = mapLines[j]
    for (var i = 0; i < str.length; i++) {
      if(str.charAt(i) == "*") {
        bricks.push(createBrick(i * 50, j * 50))
      }
      if(str.charAt(i) == "s") {
        bricks.push(createSpring(i * 50, j * 50))
      }
      if(str.charAt(i) == "p") {
        bricks.push(createSpider(i * 50, j * 50))
      }
      if(str.charAt(i) == "e") {
        bricks.push(createExit(i * 50, j * 50))
      }
      if(str.charAt(i) == "m") {
        bricks.push(createMonster(i * 50, j * 50))
      }
      if(str.charAt(i) == "t") {
        bricks.push(createStone(i * 50, j * 50))
      }
    }
  }

  _objs = [
    createPlayer(
      1 * 50, 
      1 * 50, 
      "./robot-small.png",
      {
        left: 65,
        right: 68,
        up: 87,
        down: 40,
        action1: 70,
        action2: 71,
      },
      $("#score1")
    ),
    createPlayer(
      2 * 50, 
      2 * 50, 
      "./dragon-2-50.png",
      {
        left: 37,
        right: 39,
        up: 38,
        down: 40,
        action1: 45,
        action2: 46,
      },
      $("#score2")
    ),
    createDisk(), 
    createDisk(), 
    createDisk(), 
    createDisk()
  ]
  .concat(bricks)
  .map((obj, index) => {
    return {...obj, 
      id: index
  //    elemId: "element-" + index
    }
  })

  $("#banner-message2").empty()
  objs = []
  _objs.forEach(obj => {
    addObjectToMap(obj)
  })
}

function addObjectToMap(obj) {
  if (obj.init) {
    indexs = indexs + 1;
    const html = $.parseHTML(obj.init("element-" + obj.id + "-" + indexs))
    $("#banner-message2").append(html);
    obj.elem = $("#element-" + obj.id + "-" + indexs)
  }

  objs.push(obj)
  return obj
}

var currentMap = 2

function changeMap() {
  currentMap++
  if (currentMap >= maps.length) {
    currentMap = 0
  }
  
  initMap(maps[currentMap])
}

initMap(maps[currentMap])

function refresh(obj) {
  obj.elem.css("left", obj.x + "px")
  obj.elem.css("top", obj.y + "px")
  
  if (obj.scoreElem)
    obj.scoreElem.text(obj.score)

  if (obj.isBorder)
    obj.elem.css("border-width", "5px")
  else
    obj.elem.css("border-width", "0px")

  if (obj.isVisible) {
    obj.elem.css("visibility", "visible")
  } else {
    obj.elem.css("visibility", "hidden")
  }
}

function inCollision(obj1, obj2) {
  if (inRectangle(obj1.x +1 , obj1.y + 1, obj2)) {
    return true;
  }
  if (inRectangle(obj1.x + obj1.width - 1, obj1.y + 1, obj2)) {
    return true;
  }
  if (inRectangle(obj1.x + 1, obj1.y + obj1.height - 1, obj2)) {
    return true;
  }
  if (inRectangle(obj1.x + obj1.width - 1, obj1.y + obj1.height - 1, obj2)) {
    return true;
  }
  return false;
}

function inRectangle(x, y, obj) {
  if (obj.x <= x && obj.x + obj.width > x &&
    obj.y <= y && obj.y + obj.height > y) {
    //      console.log("!!!!")
    return true;
  } else {
    return false;
  }
}

setInterval( () => {
  const prevObjs = objs.map(obj => {return {...obj}})
  objs.forEach(obj => {
    obj.tick(obj)
    objs.forEach( objOpp => {
      if (obj != objOpp && inCollision(obj, objOpp) && !obj.doNotColider && !objOpp.doNotColider) {
        obj.collision(obj, prevObjs[obj.id], objOpp, prevObjs[objOpp.id])
      }
    })
  })
  
  objs.forEach(obj => {
    if (obj.nonRefreshable != true) {
      refresh(obj)
    }
  })

}, 50);

$(document).keydown(function (event) {
//  console.log(">", event.which)
  objs.forEach( obj => {
    if (obj.isPlayer) {
      if (event.which == obj.keys.right) {
        // 	if (obj.y == bottom) {
        obj.vx = 20
        //   }
        ///    obj.x = obj.x - 50
      }
      if (event.which == obj.keys.left) {
        //	if (obj.y == bottom) {
        obj.vx = -20
        //  }
        //    obj.x = obj.x - 50
      }
      if (event.which == obj.keys.down) {
        //   obj.y = obj.y + 50
      }
      
      if (event.which == obj.keys.up  && obj.canJump ) {
        if (obj.y == bottom || obj.vy == 0 /*|| obj.isCollision*/) {
          obj.vy = -50
        }

        if (obj.y == bottom) {
          obj.y = bottom - 1
        }
      }

      if (event.which == obj.keys.action1 && obj.score > 0) {
        obj.score = obj.score - 1
        addObjectToMap(createTimerBomb(obj.x, obj.y))
      }

      if (event.which == obj.keys.action2 && obj.remoteBomb) {
        obj.remoteBomb.destroy(obj.remoteBomb)
        obj.remoteBomb = null
      } else if (event.which == obj.keys.action2 && obj.score > 0) {
        obj.score = obj.score - 1
        obj.remoteBomb = addObjectToMap(createRemoteBomb(obj.x, obj.y))
      }
    }
  });

  // objs.forEach( obj => {
  //   refresh(obj)
  // });
})