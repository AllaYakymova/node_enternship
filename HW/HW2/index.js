"use strict";
//concat
const concat = (a, b) => [...a, ...b];

console.log(concat([1,2,3,4], [5,6,7,8]));


// lastIndexOf
function lastIndexOf(arr, element) {
  let indexes = [];
  arr.forEach((el, index) => el === element && indexes.unshift(index));
  return indexes[0];
}
console.log(lastIndexOf([6,1,2,6,3,4,5,6], 6));


//includes
const includes = (arr, element) => arr.filter(el => el === element).length > 0;

console.log(includes([1,2,4,6,8], 5));


// repeat
const repeat = (str, count) => {
  let newString = "";
  for(let i = 0; i <= count; i++) {
    newString = newString + str;
  }
  return newString;
};

console.log(repeat('qwerty', 3));


// substr
const substr = (str, start, length) => str.split("").splice(start, length).join("");

console.log(substr('qwerty', 2, 4));


// substring
const substring = (str, start, end) => str.split("").slice(start, end).join("");

console.log(substring('qwerty', 2, 6));
