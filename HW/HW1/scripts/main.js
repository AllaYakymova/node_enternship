import integerToBinarySum from "./module1.js";
import arrangeWordsByNumbers from "./module2.js";
import menStillStanding from "./module3.js";

// task #1
integerToBinarySum(1234);


// // task #2
let x = "4of Fo1r pe6ople g14ood th5e the2 sfp0";
let y ="";

console.log(arrangeWordsByNumbers(x));
console.log("empty string:", arrangeWordsByNumbers(y));

// task #3
let cards = ["A2R", "A8Y", "B5R", "A10R", "B6Y", "B1R", "A6Y", "A7Y", "A3R", "B2Y", "A2Y", "A8Y", "A5R", "A10R", "A6Y", "A1R", "A6Y", "A7Y", "A9R", "A2Y"];
let cards1 = [];
let cards2 = ["A4Y", "A4Y"];
let cards3 = ["A4Y", "A4R"];
let cards4 = ["A4Y", "A5R", "B5R", "A4Y", "B6Y"];
let cards5 = ["A4R", "A4R", "A4R"];
let cards6 = ["A4R", "A6R", "A8R", "A10R", "A11R"];
console.log(menStillStanding(cards, 11));
console.log(menStillStanding(cards1, 11));
console.log(menStillStanding(cards2, 11));
console.log(menStillStanding(cards3, 11));
console.log(menStillStanding(cards4, 11));
console.log(menStillStanding(cards5, 11));
console.log(menStillStanding(cards6, 11));

