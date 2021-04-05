"use strict";

function numericalSequence(length, minSquare) {
  let isValid = validationNumericalSequence(length, minSquare);
  let str = '';
  let minNumber = Math.ceil(Math.sqrt(minSquare));
  let range = minNumber+length;
  if(isValid) {
    for(let i = minNumber; i < range; i++) {
      str = `${str.length !== 0 ? `${str},` : str}${i}`;
    }
  }
  return str;
}

console.log(numericalSequence(10, 25));


function validationNumericalSequence(length, minSquare) {
  if (length && minSquare) {
    if (Number.isInteger(+length) && Number.isInteger(+minSquare)) {
      if(length >= 1 && length <= 1000000 && minSquare >= 1 && minSquare <= 1000000) {
        return true;
      } else return {
          status: 'failed',
          reason: 'wrong diapason'
      }
    } else return {
      status: 'failed',
      reason: 'invalid arguments'
    }
  } else return {
    status: 'failed',
    reason: 'empty arguments'
  }
}
