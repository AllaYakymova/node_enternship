'use strict';


// task #1
function getSolution(...arg) {
  let [arr, res] = arg;

  let validation = (arr, res) => {
    return arr.filter(el => Number.isFinite(el) && el >= 0 && el <= 20).length === arr.length && arr.length > 1 && arr.length <= 22 && res >= -10 && res <= 10;
  };

  if (validation(arr, res)) {
    return function getSum(arr, res) {
      if (!arr.length) return res === 0;
      return getSum(arr.slice(1), res - arr[0]) || getSum(arr.slice(1), arr[0] - res);
    };
  }
}

let result1 = getSolution ([1, 3, 4, 6, 8], -2);
let result2 = getSolution([2, 3, 15], -10);
let result3 = getSolution([15, 2, 3], 10);
let result4 = getSolution([1, 5, 3, 2, 5], -2);


console.log(result1([1, 3, 4, 6, 8], -2));
console.log(result2([2, 3, 15], -10));
console.log(result3([15, 2, 3], 10));
console.log(result4([1, 5, 3, 2, 5], -2));



// task #2
function countdown(ms) {
  let moduleMs = Math.abs(ms);

  let hours = Math.floor((moduleMs / (3600000)));
  let minutes = Math.floor((moduleMs / 60000) % 60);
  let seconds = Math.floor((moduleMs / 1000) % 60);
  const scoreArr = [hours, minutes, seconds];
  let stringCountScore = scoreArr.map(t => t.toString().length < 2 ? `0${t}` : t).join(':');

  return `${ms >= 0 ? '+' : '-'}${stringCountScore}`
}

console.log(countdown(-154800000)); //'-43:00:00'
console.log(countdown(0)); // '+00:00:00'
console.log(countdown(61000)); // '+00:01:01'
console.log(countdown(360000000)); // '+100:00:00'
