"use strict";

// #1 option to convert an integer to a binary
function integerToBinary (integer) {
  return (integer >>> 0).toString(2);
}

// #2 option to convert an integer to a binary
function integerToBinary1(integer) {
  let rest = integer;
  let arr = [];
  while (rest !== 0) {
    let remainder = rest % 2;
    rest = Math.floor(rest / 2);
    arr = [remainder, ...arr];
  }
  return arr.join("");
}

export default function integerToBinarySum(integer) {
  if (Number.isInteger(integer) && integer > 0) {
    let binary = integerToBinary(integer);
    return binary
      .split("")
      .reduce((a, b) => a + b);
  } else {
    console.log("Enter a non-negative integer");
  }
}

console.log(integerToBinary(1234));
console.log(integerToBinary1(1234));
