import ChessBoard from "./src/task1.js";
import compareEnvelopes from "./src/task2.js";
import arrangeTrianglesBySquare from "./src/task3.js";
import findPalindrom from "./src/task4.js";
import compareLuckyMethods from "./src/task5.js";
import numericalSequence from './src/task6.js';
import getFibLine from './src/task7.js';
import {envelope1, envelope2, triangles, range, context} from "./src/data.js";

//task #1
const myChessDesktop = new ChessBoard();
myChessDesktop.listener();

const myChessTest = new ChessBoard(3,3, 'o');
console.log('Task#1:', myChessTest.implementBoard());


// task #2
console.log('Task#2', compareEnvelopes(envelope1, envelope2));

// task #3
console.log('Task#3:', arrangeTrianglesBySquare(triangles));
//
// task #4
console.log('Task#4:', findPalindrom(12234534431232));

// task #5
console.log('Task#5:', compareLuckyMethods(range));

// task #6
console.log('Task#6:', numericalSequence(2, 3));

// task #7
console.log('Task#7:', getFibLine(context));
