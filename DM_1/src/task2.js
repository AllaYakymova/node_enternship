'use strict';

import validSchema from './validSchema.js';

export default function compareEnvelopes(env1, env2) {
  const valid = (env1, env2) => {
    let _1 = validEnvElements(Object.values(env1));
    let _2 = validEnvElements(Object.values(env2));
    let _3 = validation(Object.values(env1));
    let _4 = validation(Object.values(env2));
    const err = [_1, _2, _3, _4].find(el => el !== true);
    return err ? err : true;
  };
  const isValid = valid(env1, env2);

  if (isValid === true) {
    const side1_1 = Number.parseFloat(env1.a),
      side1_2 = Number.parseFloat(env1.b),
      side2_1 = Number.parseFloat(env2.c),
      side2_2 = Number.parseFloat(env2.d),
      longSide1 = Math.max(side1_1, side1_2),
      shortSide1 = Math.min(side1_1, side1_2),
      longSide2 = Math.max(side2_1, side2_2),
      shortSide2 = Math.min(side2_1, side2_2),
      square1 = longSide1 * shortSide1,
      square2 = longSide2 * shortSide2;
    let H, W, h, w;
    let inner;
    if (square1 >= square2) {
      H = shortSide1;
      W = longSide1;
      h = shortSide2;
      w = longSide2;
    } else if (square1 < square2) {
      H = shortSide2;
      W = longSide2;
      h = shortSide1;
      w = longSide1;
    }
    let d2 = w * w + h * h;
    if (h < H && w < W || H * Math.sqrt(d2 - W * W) + W * Math.sqrt(d2 - H * H) <= w * w - h * h) {
      inner = (W === longSide1 ? `Envelope with sides ${Object.values(env2)} is fit into envelope with sides ${Object.values(env1)}` : `Envelope with sides ${Object.values(env1)} is fit into envelope with sides ${Object.values(env2)}`);
      return inner;
    } else {
      return 0;
    }
  } else {
    return JSON.stringify(isValid);
  }
}

function validation([h, w]) {
  const _1 = validSchema.isNumber(w);
  const _2 = validSchema.isNumber(h);
  const _3 = validSchema.isMin(w, 1);
  const _4 = validSchema.isMin(h, 1);
  const _5 = validSchema.isMax(w, 1000000);
  const _6 = validSchema.isMax(h, 1000000);
  const err = [_1, _2, _3, _4, _5, _6].find(el => el !== true);
  return err ? err : true;
}

function validEnvElements(env) {
  const _1 = validSchema.isExtraEl(env, 2);
  const _2 = validSchema.isMissingEl(env, 2);
  const err = [_1, _2].find(el => el !== true);
  return err ? err : true;
}

// console.log(compareEnvelopes(envelope1_1, envelope1_2));
// console.log(compareEnvelopes(envelope2_1, envelope2_2));
// console.log(compareEnvelopes(envelope3_1, envelope3_2));
// console.log(compareEnvelopes(envelope4_1, envelope4_2));
