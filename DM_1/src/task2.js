"use strict";

// Есть два конверта со сторонами (a,b) и (c,d). Требуется определить, можно ли один конверт вложить в другой. Программа должна обрабатывать ввод чисел с плавающей точкой.
// Входные параметры: объекты конверт1 и конверт2
// Выход: номер конверта, если вложение возможно, 0 – если вложение невозможно.

export default function compareEnvelopes(env1, env2) {
  const side1_1 = Number.parseFloat(env1.a),
    side1_2 = Number.parseFloat(env1.b),
    side2_1 = Number.parseFloat(env2.c),
    side2_2 = Number.parseFloat(env2.d),
    longSide1 = Math.max(side1_1, side1_2),
    longSide2 = Math.max(side2_1, side2_2),
    shortSide2 = Math.min(side2_1, side2_2),
    shortSide1 = Math.min(side1_1, side1_2);
  if (longSide1 > longSide2 && shortSide1 > shortSide2) {
    return 2; //  2 конверт входит
  } else if (longSide2 > longSide1 && shortSide2 > shortSide1) {
    return 1; //  1 конверт входит
  } else {
    return 0;
  }
}
