"use strict";
//concat
const concat = (a, b) => [...a, ...b].join("");

console.log(concat('qwerty', "ytrewq"));


// lastIndexOf
function lastIndexOf(str, element) {
  let indexes = [];
  str.split("").forEach((el, index) => el === element && indexes.unshift(index + 1));
  return indexes[0];
}

console.log(lastIndexOf("qwerty", "w"));


//includes
const includes = (str, substr) => !!str.match(substr);

console.log(includes("qwerty", 'er'));


// repeat
const repeat = (str, count) => {
  let newString = "";
  for (let i = 0; i <= count; i++) {
    newString = newString + str;
  }
  return newString;
};

console.log(repeat("qwerty", 3));


// substr
const substr = (str, start, length) => str.split("").splice(start, length).join("");

console.log(substr("qwerty", 2, 4));


// substring
const substring = (str, start, end) => str.split("").slice(start, end).join("");

console.log(substring("qwerty", 2, 6));
