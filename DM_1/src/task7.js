// "use strict";
//
// const context = {
//   min: 5,
//   max: 10,
//   length: null,
// };
//
// function fibo(n) {
//   if (n === 0 || n === 1) {
//     return  n;
//   } else if (n < 0) {
//     return fibo(n + 2) - fibo(n + 1);
//   } else {
//     return fibo(n - 1) + fibo(n - 2);
//   }
// }
// fibo(11);
//
//
//
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
