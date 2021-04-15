'use strict';
const {validSchema} = require('./validSchema.js');

exports.getFibLine = function(context) {

  let argType = validSchema.isArgType(context, Object);

  if (argType) {
    const min = context.min;
    const max = context.max;
    const length = context.length && context.length;

    let valid = (min, max, length) => {
      const _1 = min !== undefined ? validSchema.isInteger(min) : true;
      const _2 = max !== undefined ? validSchema.isInteger(max) : true;
      const _3 = min !== undefined && max !== undefined ? validSchema.isABiggerB(max, min) : true;
      const _4 = length !== undefined ? validSchema.isInteger(length) : true;
      const _5 = min !== undefined ? validSchema.isMin(min, 1) : true;
      const _6 = max !== undefined ? validSchema.isMin(max, 1) : true;
      const _7 = min !== undefined ? validSchema.isMax(min, 1000000) : true;
      const _8 = max !== undefined ? validSchema.isMax(max, 1000000) : true;
      const err = [_1, _2, _3, _4, _5, _6, _7, _8].find(el => el !== true);
      return err ? err : true;
    };

    const nextFibNumber = n => {
      const a = (1 + Math.pow(5, 0.5)) / 2;
      return Math.round(Math.pow(a, n) / Math.pow(5, 0.5));
    };

    const isValid = valid(min, max, length);

    if (typeof isValid === 'object') return JSON.stringify(isValid);
    if (isValid) {
      let i = min || 1;
      const arr = [];
      while (true) {
        const res = nextFibNumber(i);
        i++;
        if (max && res <= max) {
          arr.push(res);
        } else if (!max && (length && arr.length < length)) {
          arr.push(res);
        } else {
          break;
        }
      }
      return arr;
    }
  } else return JSON.stringify(argType);
};
