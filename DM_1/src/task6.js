"use strict";
import validSchema from './validSchema.js';



export default function numericalSequence(length, minSquare) {

  let validation = (length, minSquare) => {
    const _1 = validSchema.isNumber(length);
    const _2 = validSchema.isNumber(minSquare);
    const _3 = validSchema.isInteger(length);
    const _4 = validSchema.isInteger(minSquare);
    const _5 = validSchema.isMin(length, 1);
    const _6 = validSchema.isMin(minSquare, 1);
    const _7 = validSchema.isMax(length, 1000000);
    const _8 = validSchema.isMax(minSquare, 1000000);
    const _9 = validSchema.isEmpty(length.toString());
    const _10 = validSchema.isEmpty(minSquare.toString());
    const err = [_1, _2, _3, _4, _5, _6, _7, _8, _9, _10].find(el => el !== true);
    return err ? err : true;
  };

  let isValid = validation(length, minSquare);
  let str = '';
  if(typeof isValid === 'object') return JSON.stringify(isValid);
  if(isValid) {
    const minNumber = Math.ceil(Math.sqrt(minSquare));
    const range = minNumber+length;
    for(let i = minNumber; i < range; i++) {
      str = `${str.length !== 0 ? `${str},` : str}${i}`;
    }
    return str;
  }
}

