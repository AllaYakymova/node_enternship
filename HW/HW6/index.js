'use strict';

let field = [[1, 2, 1], [2, 1, 1], [2, 2, 1]];


function TicTacToeGame(field) {
  let winner = [];
  if (field.reduce((acc, el) => [...acc, ...el], []).filter(el => el === 0).length > 0) return -1; // checking of empty spots

  let horizontalCheck = field.reduce((acc, el) => [...new Set(el)].length === 1 ? el[0] : acc, 0);
  if (horizontalCheck !== 0) winner.push(horizontalCheck);

  let leftDiagonal = field.reduce((acc, el, i) => [...acc, el[i++]], []);
  if ([...new Set(leftDiagonal)].length === 1) winner.push(leftDiagonal[0]);

  let rightDiagonal = field.reverse().reduce((acc, el, i) => [...acc, el[i++]], []);
  if ([...new Set(rightDiagonal)].length === 1) winner.push(rightDiagonal[0]);

  for (let x = 0; x < 3; x++) {
    let vertical = [...new Set(field.reduce((acc, el) => [...acc, el[x]], []))];
    if (vertical.length === 1) winner.push(vertical[0]);
  }
  if ([...new Set(winner)].length === 2) return 0;
  return winner[0] === 1 ? 'X' : 'O';
}

console.log(TicTacToeGame(field));


