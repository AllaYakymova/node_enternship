"use strict";

let x = "4of Fo1r pe6ople g14ood th5e the2 sfp0";
let y ="";

function arrangeWordsByNumbers(string) {
  let getNumber = word => +word.match(/\d+/)[0];

  if(string.length !== 0) {
    return string.split(" ")
      .map(item => {
        let number = getNumber(item);
        if (0 < number && number < 10) {
          return item;
        } else {
          return false;
        }
      })
      .filter(item => item)
      .sort((a, b) => (getNumber(a) > getNumber(b) ? 1 : -1))
      .join(" ");
  } else {
    return string;
  }
}

console.log(arrangeWordsByNumbers(x));
console.log("empty string:", arrangeWordsByNumbers(y));
