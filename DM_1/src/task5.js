"use strict";

function getEvenOddLuckyTicketSums(arr) {
  let evenNumbers = [];
  let oddNumbers = [];
  let index = 0;
  arr.filter(el => {
    if (index % 2 === 0) {
      evenNumbers = [...evenNumbers, el];
    } else {
      oddNumbers = [...oddNumbers, el];
    }
    index++;
  });
  const evenNumbersSum = evenNumbers.reduce((a, b) => a + b);
  const oddNumbersSum = oddNumbers.reduce((a, b) => a + b);
  if (evenNumbersSum === oddNumbersSum) {
    return 1;
  } else {
    return 0;
  }
}

function get3To3LuckyTicketSums(arr) {
  const firstPartSum = arr.slice(0, 3).reduce((a, b) => a + b);
  const secondPartSum = arr.slice(3, 6).reduce((a, b) => a + b);
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
  if(count3To3 > countEvenOdd) {
    totalScore["best approach"] = "count 3 to 3";
    totalScore["winner score"] = count3To3;
    totalScore["loosing score"] = countEvenOdd;
  } else if(count3To3 < countEvenOdd) {
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
