'use strict';

const validSchema = {
  isInteger: function (num, is0) {
    return Number.isInteger(+num) || (is0 && +num === 0) ? true : console.log({ status: 'failed', reason: `Number ${num} is not an integer`,
    }) && false;
  },
  isMin: function (num, min) {
    return num >= min ? true : console.log({status: 'failed', reason: `Number ${num} is below min ${min}`}) && false;
  },
  isMax: function (num, max) {
    return num <= max ? true : console.log({status: 'failed', reason: `Number ${num} is bigger then max ${max}`}) && false;
  },
  isEqual: function (x, y) {
    return x === y ? true : console.log({status: 'failed', reason: 'width and length are not equal'}) && false;
  },
  isEmpty: function (x) {
    return x.length !== 0 ? true : console.log({status: 'failed', reason: 'The value is missing'}) && false;
  },
  isABiggerB: function (a, b) {
    return a > b ? true : console.log({status: 'failed', reason: `Number ${a} is not bigger then ${b}`}) && false;
  },
  isValidVerticesName: function (obj) {
    let vertName =  obj.vertices.toLowerCase();
    let vertices = Object.keys(obj).filter(el => el !== 'vertices');
    const isVertices = vertices.filter(el => vertName.includes(el)).length;
    if (isVertices === 3 ) {
      return true;
    } else if (vertices.some(el => !vertName.includes(el)) && isVertices < 3) {
      return console.log({status: 'failed', reason: `Vertices name of ${obj.vertices} contain not existing vertices.`}) && false
    }
  },
  isAdequacy: function (x, triangle) {
    return Number.isNaN(+x, ) ? console.log({status: 'failed', reason: `Check the triangle ${triangle} for adequacy was failed`}) && false : true
  },
  isMinLength: function (str, min) {
    return str.length >= min ? true : console.log({status: 'failed', reason: `${str} length is shorter then min ${min}`}) && false;
  },
  isMaxLength: function (str, max) {
    return str.length <= max ? true : console.log({status: 'failed', reason: `${str} is longer then max ${max}`}) && false;
  },
  isNumber: function (x) {
    return typeof x === 'number' ? true : console.log({status: 'failed', reason: `${x} is not a number`}) && false;
  }

};

export default validSchema;
