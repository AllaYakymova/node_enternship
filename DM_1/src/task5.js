"use strict";
import validSchema from './validSchema.js';

// function
export default function compareLuckyMethods(range) {

  const sumArrElements = arr => (arr.reduce((a, b) => a + b));

  function getEvenOddLuckyTicketSums(arr) {
    let evenNumbers = [];
    let oddNumbers = [];
    let index = 1;
    arr.filter(el => {
      if (index % 2 === 0) {
        evenNumbers.push(el);
      } else {
        oddNumbers.push(el);
      }
      index++;
    });
    const evenNumbersSum = sumArrElements(evenNumbers);
    const oddNumbersSum = sumArrElements(oddNumbers);
    if (evenNumbersSum === oddNumbersSum) {
      return 1;
    } else {
      return 0;
    }
  }

  function get3To3LuckyTicketSums(arr) {
    const firstPartSum = sumArrElements(arr.slice(0, 3));
    const secondPartSum = sumArrElements(arr.slice(3, 6));
    if (firstPartSum === secondPartSum) {
      return 1;
    } else {
      return 0;
    }
  }

  let validation = (min, max) => {
    const _1 = validSchema.isInteger(+min, true);
    const _2 = validSchema.isInteger(+max, true);
    const _3 = validSchema.isMin(min, 0);
    const _4 = validSchema.isMin(max, 0);
    const _5 = validSchema.isMax(min, 999999);
    const _6 = validSchema.isMax(max, 999999);
    const _7 = validSchema.isEmpty(min);
    const _8 = validSchema.isEmpty(max);
    const _9 = validSchema.isABiggerB(max, min);
    return _1 && _2 && _3 && _4 && _5 && _6 && _7 && _8 && _9
  };

  const isValid = validation(range.min, range.max);

  return (() => {
    if (isValid) {
      const min = range.min;
      const max = range.max;
      let count3To3 = 0;
      let countEvenOdd = 0;
      const totalScore = {};
      for (let i = min; i <= max; i++) {
        const preprocessedNumber = `${'0'.repeat(6 - min.toString().length)}${i}`.split('');
        const numberArr = preprocessedNumber.map(el => +el);
        let res1 = get3To3LuckyTicketSums(numberArr);
        let res2 = getEvenOddLuckyTicketSums(numberArr);
        if (res1 > res2) {
          count3To3++;
        } else if (res1 < res2) {
          countEvenOdd++;
        }
      }
    if (count3To3 > countEvenOdd) {
      totalScore.approach = "count 3 to 3";
      totalScore.bestScore = count3To3;
      totalScore.worstScore = countEvenOdd;
    } else if (count3To3 < countEvenOdd) {
      totalScore.approach = "count evens & odds";
      totalScore.bestScore = countEvenOdd;
      totalScore.worstScore = count3To3;
    } else {
      totalScore.approach = "draw: the same score";
      totalScore.bestScore = countEvenOdd;
      totalScore.worstScore = count3To3;
    }
    return totalScore;
    }
  })()
}
