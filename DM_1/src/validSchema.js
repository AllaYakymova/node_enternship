'use strict';

const validSchema = {
  isInteger: function (num, is0= false) {
    return Number.isInteger(+num) || (is0 && +num === 0) ? true : { status: 'failed', reason: `Number ${num} is not an integer`};
  },
  isMin: function (num, min) {
    return num >= min ? true : {status: 'failed', reason: `Number ${num} is less then min ${min}`};
  },
  isMax: function (num, max) {
    return num <= max ? true : {status: 'failed', reason: `Number ${num} is bigger then max ${max}`};
  },
  isEqual: function (x, y) {
    return x === y ? true : {status: 'failed', reason: 'Width and length are not equal'};
  },
  isEmpty: function (x) {
    return x && x.length !== 0 ? true : {status: 'failed', reason: 'The value is missing'};
  },
  isABiggerB: function (a, b) {
    return a > b ? true : {status: 'failed', reason: `Number ${a} is not bigger then ${b}`};
  },
  isValidVerticesName: function (obj) {
    let vertName =  obj.vertices.toLowerCase();
    let vertices = Object.keys(obj).filter(el => el !== 'vertices');
    const isVertices = vertices.filter(el => vertName.includes(el)).length;
    if (isVertices === 3 ) {
      return true;
    } else if (vertices.some(el => !vertName.includes(el)) && isVertices < 3) {
      return {status: 'failed', reason: `Vertices name of ${obj.vertices} contain not existing vertices.`}
    }
  },
  isAdequacy: function (x, triangle) {
    return Number.isNaN(x) ? {status: 'failed', reason: `Check the triangle ${triangle} for adequacy was failed`} : true
  },
  isOnlyNumbers: function (num) {
    return /^-?[0-9]+$/.test(num) ? true : { status: 'failed', reason: `String contains not only digits`,
    };
  },
  isMinLength: function (str, min) {
    return str.length >= min ? true : {status: 'failed', reason: `${str} length is shorter then min ${min}`};
  },
  isMaxLength: function (str, max) {
    return str.length <= max ? true : {status: 'failed', reason: `${str} is longer then max ${max}`};
  },
  isNumber: function (x) {
    return typeof x === 'number' ? true : {status: 'failed', reason: `${x} is not a number`};
  },
  isExtraEl: function (x, count) {
    if(x.length === count) {
      return true;
    } else if(x.length > count) {
      return {status: 'failed', reason: `Object has extra element(/s)`};
    }
  },
  isMissingEl: function (x, count) {
    if(x.length === count) {
     return true;
    } else if(x.length < count) {
      return {status: 'failed', reason: `Object has missing element(/s)`};
    }
  },
  isArgType: function (arg, type) {
    return arg instanceof type ? true : {status: 'failed', reason: `Entered argument has wrong type`}
  }
};


export default validSchema;
