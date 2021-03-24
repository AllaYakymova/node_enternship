import ChessDesk from "./src/task1.js";
import compareEnvelopes from "./src/task2.js";
import arrangeTrianglesBySquare from "./src/task3.js";
import findPalindrom from "./src/task4.js";
import compareLuckySums from "./src/task5.js";
import {envelope1, envelope2, triangles, range} from "./src/data.js";

let myChess = new ChessDesk();
console.log(myChess.setString());
// myChess.implementDesk();

console.log(compareEnvelopes(envelope1, envelope2));

arrangeTrianglesBySquare(triangles);

findPalindrom(1344338443);

compareLuckySums(range);
