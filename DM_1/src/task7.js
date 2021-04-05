"use strict";

const context = {
  min: 5,
  max: 10,
  length: null,
};

function fibo(n) {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}

console.log(fibo(7));


// формула Бине https://habr.com/ru/post/449616/
const nextFibNumber = n => {
  const a = (1 + 5 ** 0.5) / 2;
  return Math.round(a ** n / 5 ** 0.5);
};

function getFibLine(min, max, length) {
  let i = min;
  const arr = [];

  while (true) {
    let res = nextFibNumber(i);
    i++;
    if (res <= max && (length ? arr.length < length : true)) {
      arr.push(res)
    } else {
      break;
    }
  }
  return arr
}

console.log(getFibLine(5, 25, 3));


// function validationNumber( value) {
//   let number = null;
//   while (number === null || isNaN(number)) {
//     number = prompt(`Enter the ${value}`, number);
//   }
//   return number;
// }
// let f0 = +validationNumber("f0");
// let f1 = +validationNumber("f1");
// let n = +validationNumber ("n");
//
// let res = 0;
// function fibonachi(f0,f1, n) {
//   // let tmp = 0;
//   if (n <= 1){
//     return 1;
//   }
//   else {
//     if (f0 < 0 || f1 < 0 ){
//       res = f0 - f1;
//       f0 = f1;
//       f1 = res;
//       console.log(res*(-1));
//       fibonachi(f0,f1,n-1);
//     }
//     else {
//       res = f0 + f1;
//       f0 = f1;
//       f1 = res;
//       console.log(res);
//       fibonachi(f0,f1,n-1);
//       /*
//       tmp = f0;
//       console.log(f1);
//       fibonachi(f0=f1,f1=f1+f0-tmp,n-1);
//       */
//     }
//   }
//
// }
// fibonachi(f0,f1,n);
//
//
// export default function fibonacci(n) {
//   const fibSequence = [1];
//
//   let currentValue = 1;
//   let previousValue = 0;
//
//   if (n === 1) {
//     return fibSequence;
//   }
//
//   let iterationsCounter = n - 1;
//
//   while (iterationsCounter) {
//     currentValue += previousValue;
//     previousValue = currentValue - previousValue;
//
//     fibSequence.push(currentValue);
//
//     iterationsCounter -= 1;
//   }
//
//   return fibSequence;
// }
//
// // console.log(fibo(10));
