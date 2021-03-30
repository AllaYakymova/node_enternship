'use strict';


let board = [
  [0,0,0,2,2,0],
  [0,3,0,0,0,0],
  [0,3,0,1,0,0],
  [0,3,0,1,0,0]
];
let attacks = [[2, 1], [1, 3], [4, 2]];

// task #1
function damagedOrSunk(board, attacks) {
  let field = [...board];
  let result = { sunk: 0, damaged: 0, notTouched: 0, points: 0};
// starting coordinates
  let x0 = field.length-1;
  let y0 = 0;

  let boats = board.reduce((acc, el) => [...acc, ...el], []).reduce((acc, el) => {
    if(el === 1) acc.boat1++;
    if(el === 2) acc.boat2++;
    if(el === 3) acc.boat3++;
     return acc;
  }, {boat1: 0, boat2: 0, boat3: 0});

  const countPoints = function() {
    return this.sunk + this.damaged * 0.5 - this.notTouched
  };

  let shots = attacks.map(el => field[ x0 - el[1] + 1][y0 + el[0] - 1]);
  for (let ship in boats) {
    let boatNo = ship.slice(-1);
    let shotBoatLength = shots.filter(el => el === +boatNo).length;
    if(shotBoatLength === boats[ship]) result.sunk++;
    if(shotBoatLength < boats[ship] && shotBoatLength > 0) result.damaged++;
    if (shotBoatLength === 0) result.notTouched++;
  }
  result.points = countPoints.call(result);
  return validation(field, field[0].length) && result
}

console.log(damagedOrSunk(board, attacks));

function validation(board, width) {
  let square = board.filter(el => el.length !== +width).length; // all arrays have equal length
  let res = board.reduce((acc, el) => [...acc, ...el], []).filter(el => el !== 0 && el !== 1 && el !== 2 && el !== 3).length;
  return square === 0 && res === 0
}

// // check the ship is sunk
// function getIsSunk(obj) {
//   let pointsAround = [];
//   for(let a in obj) {
//     (obj[a].x >= 0 && obj[a].x < field.length) && (obj[a].y >= 0 && obj[a].y < width) && pointsAround.push(field[obj[a].x][obj[a].y]);
//   }
//   return pointsAround.filter(el => el !== 0).length > 0 && false
// }

// let coordinatesAround = {
//   a1: {x: coordY+1, y: coordX-1},
//   a2: {x: coordY, y: coordX-1},
//   a3: {x: coordY-1, y: coordX-1},
//   a4: {x: coordY-1, y: coordX},
//   a5: {x: coordY-1, y: coordX+1},
//   a6: {x: coordY, y: coordX+1},
//   a7: {x: coordY+1, y: coordX+1},
//   a8: {x: coordY+1, y: coordX},
// };

// let sunk = getIsSunk(coordinatesAround);
// console.log(sunk);

// let coordY = x0 - y + 1;
// let coordX = y0 + x - 1;

// let x = el[0];
// let y = el[1];
// return  field[ x0 - y + 1][y0 + x - 1];
