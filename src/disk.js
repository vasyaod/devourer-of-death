function createDisk() {
  return {
    init: (id) => {
      return `
        <img id="${id}" src="0.png" weight="50" height="50"
          style="top:10px; 
                left:10px; 
                width:50px; 
                height:50px;
                position: absolute;"
        />
      `
    },
    isDisk: true,
    isVisible: true,
    tick: obj => {
      if (!obj.isVisible && Date.now() - obj.lastCollectedTm > 5000) {
        obj.isVisible = true
        obj.x =  Math.floor(Math.random() * (left - 50 + 1)) + 50;
        obj.y =  Math.floor(Math.random() * (bottom - 50 + 1)) + 50;
        return
      }
    },
    collision: obj => {
      if (obj.isVisible) {
        obj.isVisible = false
        obj.lastCollectedTm = Date.now()
      }
    },
    x: left / 2 - 50 / 2,
    y: bottom / 2 - 50 / 2,
    width: 50,
    height: 50,
    lastCollectedTm: 0,
  }
}