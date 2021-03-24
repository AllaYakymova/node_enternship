"use strict";
//concat
const concat = (a, b) => [...a, ...b].join("");

// console.log(concat('qwerty', "ytrewq"));


// lastIndexOf
const lastIndexOf = (str, substr, fromIndex ) => {
  let indexes = [];
  let lastIndex = 0;
  substr = substr.toString();
  str.slice(fromIndex).split("").forEach((el, index) => el === substr.slice(0,1) && indexes.unshift(index));
  for (let i = 0; i <= indexes.length-1; i++) {
      if (str.substr(indexes[i], substr.length) === substr) {
        return indexes[i];
      }
      lastIndex = -1;
    }
  if (lastIndex === -1 || indexes.length === 0) {
    return -1;
  }
};

// console.log(lastIndexOf("С5ини,5й кит, каси,5тка", 5));
// console.log(lastIndexOf("канал", "а", 2));
// console.log(lastIndexOf("канал", "а", 0));
// console.log(lastIndexOf("канал", "а,"));




//includes
const includes = (str, substr) => !!str.match(substr);

// console.log(includes("qwerty", 'Er'));


// repeat
const repeat = (str, count) => {
  let newString = "";
  if(count < 0) {
    console.error('Refer Error')
  } else if(count === 0) {
    return newString;
  }
  for (let i = 0; i <= count; i++) {
    newString = newString + str;
  }
  return newString;
};

console.log(repeat("qwerty", 3));
console.log(repeat("qwerty", 0));
console.log(repeat("qwerty", -1));


// substr
const substr = (str, start, length) => str.split("").splice(start, length).join("");

// console.log(substr("qwerty", 2, 4));


// substring
const substring = (str, start, end) => str.split("").slice(start, end).join("");

// console.log(substring("qwerty", 2, 6));
