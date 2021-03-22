"use strict";
//concat
const concat = (a, b) => [...a, ...b].join("");

console.log(concat('qwerty', "ytrewq"));


// lastIndexOf
const lastIndexOf = (str, substr) => {
  let indexes = [];
  str.split("").forEach((el, index) => el === substr.slice(0,1) && indexes.unshift(index));
  for(let i = 0; i <= indexes.length; i++) {
    if(str.substr(indexes[0], substr.length) === substr) {
      return indexes[i];
    }
  }
};

console.log(lastIndexOf("qwertyererrh", "er"));


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
