"use strict";

const sumArrElements = arr => (arr.reduce((a, b) => a + b));

function getEvenOddLuckyTicketSums(arr) {
  let evenNumbers = [];
  let oddNumbers = [];
  let index = 1;
  arr.filter(el => {
    if (index % 2 === 0) {
      evenNumbers = [...evenNumbers, el];
    } else {
      oddNumbers = [...oddNumbers, el];
    }
    index++;
  });
  const evenNumbersSum = sumArrElements(evenNumbers);
  const oddNumbersSum = sumArrElements(oddNumbers);
  // console.log(arr, oddNumbers, evenNumbers);
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

export default function compareLuckySums(range) {
  const min = range.min;
  const max = range.max;
  let count3To3 = 0;
  let countEvenOdd = 0;
  const totalScore = {};
  for (let i = +min; i <= +max; i++) {
    const preprocessedNumber = i.toString().split("");
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
    totalScore["best approach"] = "count 3 to 3";
    totalScore["winner score"] = count3To3;
    totalScore["loosing score"] = countEvenOdd;
  } else if (count3To3 < countEvenOdd) {
    totalScore["best approach"] = "count evens & odds";
    totalScore["winner score"] = countEvenOdd;
    totalScore["loosing score"] = count3To3;
  } else {
    totalScore["best approach"] = "draw: the same score";
    totalScore["draw score"] = countEvenOdd;
    totalScore["draw score"] = count3To3;
  }
  console.log(totalScore);
  return totalScore;
}
