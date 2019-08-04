let objs = [
  obj1, 
  obj2, 
  createDisk(), 
  createDisk(), 
  createDisk(), 
  createDisk(), 
  createBrick(0, 300), 
  createBrick(50, 300), 
  createBrick(100, 300), 
  createBrick(150, 300), 
  createBrick(200, 300), 
  createBrick(250, 300), 
  createBrick(300, 300), 
  createBrick(350, 300), 
  createBrick(400, 300), 
//  createBrick(450, 300), 
//  createBrick(500, 300), 
  createBrick(550, 300), 
  createBrick(600, 300), 
  createBrick(650, 300), 
  createBrick(700, 300), 
  createBrick(750, 300), 

  createSpider()
].map((obj, index) => {
  return {...obj, 
    id: index
//    elemId: "element-" + index
  }
})

objs.forEach(obj => {
  if (obj.init) {
    const html = $.parseHTML(obj.init("element-" + obj.id))
    $("#banner-message2").append(html);
    obj.elem = $("#element-" + obj.id)
  }
})

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
  if (inRectangle(obj1.x, obj1.y, obj2)) {
    return true;
  }
  if (inRectangle(obj1.x + obj1.width, obj1.y, obj2)) {
    return true;
  }
  if (inRectangle(obj1.x, obj1.y + obj1.height, obj2)) {
    return true;
  }
  if (inRectangle(obj1.x + obj1.width, obj1.y + obj1.height, obj2)) {
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
      if (obj != objOpp && inCollision(obj, objOpp)) {
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
    }
  });

  // objs.forEach( obj => {
  //   refresh(obj)
  // });
})