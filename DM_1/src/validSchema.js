'use strict';

const validSchema = {
  isInteger: function (num, is0) {
    return Number.isInteger(num) || (is0 && num === 0) ? true : console.log({status: 'failed', reason: `Number ${num} is not an integer`}) && false
  },
  isMin: function (num, min) {
    return num >= min ? true : console.log({status: 'failed', reason: `Number ${num} is below min ${min}`}) && false
  },
  isMax: function (num, max) {
    return num <= max ? true : console.log({status: 'failed', reason: `Number ${num} is bigger then max ${max}`}) && false
  },
  isEqual: function (x, y) {
    return x === y ? true : console.log({status: 'failed', reason: 'width and length are not equal'}) && false
  },
  isEmpty: function (x) {
    return x.length !== 0 ? true : console.log({status: 'failed', reason: 'The value is missing'}) && false
  },
  isABiggerB: function (a, b) {
    return a > b ? true : console.log({status: 'failed', reason:  `Number ${a} is not bigger then ${b}`}) && false
  },
};

export default validSchema;
