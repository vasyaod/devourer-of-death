let objs = [obj1, obj2, disk]

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

  objs.forEach(obj => {
    const prev = {...obj}
    obj.tick(obj)
    objs.forEach( objOpp => {
      if (obj != objOpp && inCollision(obj, objOpp)) {
        obj.collision(obj, prev, objOpp)
      }
    })
    refresh(obj)
  });

}, 100);

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
      if (event.which == obj.keys.up && obj.canJump) {
        if (obj.y == bottom) {
          obj.y = bottom - 1
          obj.vy = -50
        }
      }
    }
  });

  objs.forEach( obj => {
    refresh(obj)
  });
})