import ChessDesk from "./src/task1.js";
import compareEnvelopes from "./src/task2.js";
import arrangeTrianglesBySquare from "./src/task3.js";
import findPalindrom from "./src/task4.js";
import compareLuckyMethods from "./src/task5.js";
import {envelope1, envelope2, triangles, range} from "./src/data.js";

//task #1
const myChess = new ChessDesk();
myChess.listener();

// task #2
console.log(compareEnvelopes(envelope1, envelope2));

// task #3
console.log('Task#3:', arrangeTrianglesBySquare(triangles));

// task #4
console.log('Task#4:', findPalindrom(-1344338443));

// task #5
console.log('Task#5:', compareLuckyMethods(range));

// task #6

// task #7
