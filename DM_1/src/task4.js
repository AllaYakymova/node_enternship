'use strict';
import validSchema from './validSchema.js';

export default function findPalindrom(number) {

  const preprocessString = str => `|${str.split('').join('|')}|`;  // word => |w|o|r|d|

  function getLongest(str, pal) {
    //Maximum palindrome's length and index
    const [length, index] = pal.reduce((max, x, i, arr) => (x > arr[max[1]] ? [x, i] : max), [0, 0]),
      startIndex = (index - length) / 2 | 0;
    return str.substring(startIndex, startIndex + length);
  }

  const validation = (number) => {
    const _1 = validSchema.isInteger(+number);
    const _2 = validSchema.isMinLength(Math.abs(+number).toString(), 2);
    const _3 = validSchema.isMaxLength(Math.abs(+number).toString(), 16);
    const err = [_1, _2, _3].find(el => el !== true);
    return err ? err : true;
  };

  let isOnlyNumbers, isNegativeNumber;
  if (typeof number === 'string') {
    isOnlyNumbers = validSchema.isOnlyNumbers(number);
    if(number.slice(0,1) === '-') {
      isNegativeNumber = true;
    }
  }
  if (typeof number === 'number') {
    if(number < 0) {
      isNegativeNumber = true;
    }
    isOnlyNumbers = true;
  }

    if (isOnlyNumbers === true) {
      const isValid = validation(number);

      if (typeof isValid === 'object') return JSON.stringify(isValid);
      if (isValid) {
        const preprocessedString = preprocessString(number.toString());
        const lengths = [];

        //Center and end indexes for the current palindrome
        let center = 0,
          end = 0;

        //getting the palindromes lengths array
        for (let i = 0, l = preprocessedString.length; i < l; i++) {
          if (end > i) {
            lengths[i] = Math.min(end - i, lengths[center - (i - center)]);
          } else {
            lengths[i] = 0;
          }

          // calculate length of ith palindrome
          while ((preprocessedString[i + 1 + lengths[i]] === preprocessedString[i - 1 - lengths[i]])) {
            lengths[i]++;
          }

          //reset palindrome center if there are no more intersections
          if (end < i + lengths[i]) {
            center = i;
            end = i + lengths[i];
          }
        }
        let result = getLongest(number.toString(), lengths);
        if(typeof number === 'number') result = +result;

        return result > 1 ? isNegativeNumber ? -result : result : 0;
      } else return 0;
    } else {
      return JSON.stringify(isOnlyNumbers);
    }
}

// алгоритм Манакера
