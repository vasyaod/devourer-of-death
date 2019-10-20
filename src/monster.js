function createMonster(x, y) {
  return {
    isVisible: true,
    init: id => {
      return `
        <img id="${id}" src="monster.png" weight="100" height="100"
          style="top:0px; 
                left:0px; 
                width:100px; 
                height:100px;
                position: absolute;"
        />
      `
    },
    tick: obj => {

    },
    collision: (obj, prev, objOpp, prevOpp) => {
    },
    x: x,
    y: y,
    width: 100,
    height: 100
  }
}