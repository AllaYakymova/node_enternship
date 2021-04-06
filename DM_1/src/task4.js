"use strict";
import validSchema from './validSchema.js';

export default
function findPalindrom(number) {

  const preprocessString = str => `|${str.split("").join("|")}|`;  // word => |w|o|r|d|

//return the result substring by the input string and calculated lengths
//canada, [0,1,0,1,0,3,0,1,0,3,0,1,0] -> ana
  function getLongest (str, pal) {
    //Maximum palindrome's length and index
    const [length, index] = pal.reduce((max, x, i, arr) => (x > arr[max[1]] ? [x, i] : max), [0, 0]),
      startIndex = (index - length) / 2 | 0;
    return str.substring(startIndex, startIndex + length);
  }

  const validation = (number) => {
    const _1 = validSchema.isInteger(number, false);
    const _2 = validSchema.isNumber(number);
    const _3 = validSchema.isMinLength(number.toString(), 2);
    const _4 = validSchema.isMaxLength(number.toString(), 20);
    return _1 && _2 && _3 && _4
  };
  const isValid = validation(number);
  if(isValid) {
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
    const result = getLongest(number.toString(), lengths);
    return result > 1 ? result : 0;
  } else {
    return 0;
  }
}

console.log(findPalindrom(135563864443));

// алгоритм Манакера
//https://medium.com/@alexprozoroff/%D0%B0%D0%BB%D0%B3%D0%BE%D1%80%D0%B8%D1%82%D0%BC-%D0%BC%D0%B0%D0%BD%D0%B0%D0%BA%D0%B5%D1%80%D0%B0-9560dc13a975
// http://e-maxx.ru/algo/palindromes_count
// https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D0%B8%D1%81%D0%BA_%D0%B4%D0%BB%D0%B8%D0%BD%D0%BD%D0%B5%D0%B9%D1%88%D0%B5%D0%B9_%D0%BF%D0%BE%D0%B4%D1%81%D1%82%D1%80%D0%BE%D0%BA%D0%B8-%D0%BF%D0%B0%D0%BB%D0%B8%D0%BD%D0%B4%D1%80%D0%BE%D0%BC%D0%B0
