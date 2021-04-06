"use strict";
import validSchema from './validSchema.js';

export default class LuckyTicketsCounter {
  constructor(range = {min: 0, max: 0}) {
    this.range = range;
  }
  firstNumber = 0;
  secondNumber = 0;
  board = document.getElementById("task5__board");

  sumArrElements = arr => (arr.reduce((a, b) => a + b));

  getEvenOddLuckyTicketSums = (arr) => {
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
    const evenNumbersSum = this.sumArrElements(evenNumbers);
    const oddNumbersSum = this.sumArrElements(oddNumbers);
    console.log('class EvenOdd', evenNumbersSum, oddNumbersSum);
    if (evenNumbersSum === oddNumbersSum) {
      return 1;
    } else {
      return 0;
    }
  };

  get3To3LuckyTicketSums = (arr) => {
    const firstPartSum = this.sumArrElements(arr.slice(0, 3));
    const secondPartSum = this.sumArrElements(arr.slice(3, 6));
    if (firstPartSum === secondPartSum) {
      return 1;
    } else {
      return 0;
    }
  };

  compareLuckySums = () => {
    const isGetData = this.getData();
    if(isGetData) {
      const min = this.range.min;
      const max = this.range.max;
      console.log(typeof min);
      let sixDigitsNumber = (num, i) => `${'0'.repeat(6 - num.length)}${num}`;
      this.firstNumber = sixDigitsNumber(this.range.min);
      this.secondNumber = sixDigitsNumber(this.range.max);
      let count3To3 = 0;
      let countEvenOdd = 0;
      const totalScore = {};
      console.log(`${'0'.repeat(6 - min.length)}`);
      for (let i = min; i <= max; i++) {
        const preprocessedNumber = `${'0'.repeat(6 - min.length)}${i}`.split('');
        const numberArr = preprocessedNumber.map(el => +el);
        console.log(numberArr);
        let res1 = this.get3To3LuckyTicketSums(numberArr);
        let res2 = this.getEvenOddLuckyTicketSums(numberArr);
        // console.log("class", res1, res2);
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
  };

  getData = () => {
    let form = document.getElementById('ticketForm');
    let min = document.getElementById('minNumber').value;
    let max = document.getElementById('maxNumber').value;

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
    if (validation(min, max)) {
      this.range.min = min;
      this.range.max = max;
      console.log(this.range.min, this.range.max);
      form.reset();
      return true;
    } else {
      return false
    }
  };

  implementBoard = () => {
    let result = this.compareLuckySums();
    if (this.board) this.board.innerHTML = '';
    this.board.innerHTML = `<p>First number: <strong>${this.firstNumber}</strong></p><p>Second number: <strong>${this.secondNumber}</strong></p><p>The best approach: <strong>${result.approach}</strong></p><p>Best score: <strong>${result.bestScore}</strong></p><p>Worst score: <strong>${result.worstScore}</strong></p>`;
  };

  listener = () => {
    document.getElementById('ticketsCompare').addEventListener('click', this.implementBoard);
  };
}


// function
function compareMethods(range) {

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

const range = {
  min: 888888,
  max: 999999,
};

console.log(compareMethods(range));
