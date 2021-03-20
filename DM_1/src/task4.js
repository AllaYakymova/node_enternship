"use strict";
// алгоритм Манакера
//https://medium.com/@alexprozoroff/%D0%B0%D0%BB%D0%B3%D0%BE%D1%80%D0%B8%D1%82%D0%BC-%D0%BC%D0%B0%D0%BD%D0%B0%D0%BA%D0%B5%D1%80%D0%B0-9560dc13a975

// transform N-character string into 2N+1 character one word => |w|o|r|d|
const preprocessString = str => `|${str.split("").join("|")}|`;

//return the result substring by the input string and calculated lengths
//canada, [0,1,0,1,0,3,0,1,0,3,0,1,0] -> ana
function getLongest (str, pal) {
  //Maximum palindrome's length and index
  const [length, index] = pal.reduce((max, x, i, arr) => (x > arr[max[1]] ? [x, i] : max), [0, 0]),
    startIndex = (index - length) / 2 | 0;

  return str.substring(startIndex, startIndex + length);
}

//Manacher's algorithm
//Longest Palindromic Substring
export default function findPalindrom(number) {
  const preprocessedString = preprocessString(number.toString());
  const lengths = [];
  console.log(preprocessedString);

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
  console.log(result);
  return result;
}
