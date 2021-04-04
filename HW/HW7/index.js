'use strict';

// Mission: Hidden Message
function decoder(string) {
  let result = '';
  if (string.length === 0) return string;
  let dotCounter = [...string.matchAll(/\./g)].map(el => el.index); // индексы и начало точек

  let getDecoderText = (str, start, wordsCount) => str.slice(start, dotCounter[wordsCount] + 1); // текст для поиска слов, зошифрованных в 1 предложении

  for (let i = 0; i <= dotCounter.length;) {
    let decoderSentence; // шифровочное предложение
    if(i === 0) {
      decoderSentence = string.slice(i, dotCounter[i]);
    } else {
      decoderSentence = string.slice(dotCounter[i] + 1, dotCounter[i + 1]);
    }
    const decoderArr = decoderSentence.replace(/[,"]/gm, '').trim().toLowerCase().split(' ').map(el => el.length);
    const detectedText = getDecoderText(string, i === 0 ? dotCounter[i] + 1 : dotCounter[i + 1] + 1, i === 0 ? decoderArr.length + i : decoderArr.length + i + 1);

    if (decoderSentence.length !== 0) {
      let strArr = detectedText.replace(/[,"]/g, '').toLowerCase().split('.').map(el => el.trim()).filter(el => el.length !== 0);
      let res = decoderArr.reduce((acc, el, i) => [...acc, ...strArr[i].split(' ').slice(el - 1, el)], []).join(' ');
      res = res[0].toUpperCase() + res.slice(1);
      res = `${res}. `;
      result += res;
      i = i === 0 ? i + decoderArr.length : i + decoderArr.length + 1;
    }
  }
  return result;
}

let str = 'Yesterday, we bumped into Laura. It had to happen, but you can\'t deny the timing couldn\'t be worse. The "m1ission" to try and seduce her was a complete failure last month. By the way, she still has the ring I gave her. Anyhow, it hasn\'t been a pleasurable experience to go through it. I wanted to feel done with it first. Y2sterday, we bumped into Laura. It had to happen, but you can\'t deny the timing couldn\'t be worse. The "m2ission" to try and seduce her was a complete failure last month. By the way, she still has the ring I gave her. Anyhow, it hasn\'t been a pleasurable experience to go through it. I wanted to feel done with it first. Y3sterday, we bumped into Laura. It had to happen, but you can\'t deny the timing couldn\'t be worse. The "m3ission" to try and seduce her was a complete failure last month. By the way, she still has the ring I gave her. Anyhow, it hasn\'t been a pleasurable experience to go through it. I wanted to feel done with it first.';

// decoder(str);

////////////////////////////////////////////////////////////////
// Battle ships: Sunk damaged or not touched?

function damagedOrSunk(board, attacks) {
  let field = JSON.parse(JSON.stringify(board));
  let result = {sunk: 0, damaged: 0, notTouched: 0, points: 0};
// starting coordinates
  let x0 = field.length;
  let y0 = 0;

  let boats = board.reduce((acc, el) => [...acc, ...el], []).reduce((acc, el) => {
    if (el === 1) acc.boat1++;
    if (el === 2) acc.boat2++;
    if (el === 3) acc.boat3++;
    return acc;
  }, {boat1: 0, boat2: 0, boat3: 0});

  const countPoints = function () {
    return this.sunk + this.damaged * 0.5 - this.notTouched;
  };

  let shots = attacks.map(el => field[x0 - el[1]][y0 + el[0] - 1]);
  for (let ship in boats) {
    let boatNo = ship.slice(-1);
    let shotBoatLength = shots.filter(el => el === +boatNo).length;
    if (shotBoatLength === boats[ship]) result.sunk++;
    if (shotBoatLength < boats[ship] && shotBoatLength > 0) result.damaged++;
    if (shotBoatLength === 0) result.notTouched++;
  }
  result.points = countPoints.call(result);
  return validation(field, field[0].length) && result;
}


let board = [
  [0, 0, 0, 2, 2, 0],
  [0, 3, 0, 0, 0, 0],
  [0, 3, 0, 1, 0, 0],
  [0, 3, 0, 1, 0, 0],
];
let attacks = [[2, 1], [1, 3], [4, 2], [4, 1]];

let together = (x) => board.map(el => el.filter((num, i) => num === x ), []);
console.log(together(1));

console.log(damagedOrSunk(board, attacks));

function validation(board, width) {
  let square = board.filter(el => el.length !== +width).length; // all arrays have equal length
  let res = board.reduce((acc, el) => [...acc, ...el], []).filter(el => el !== 0 && el !== 1 && el !== 2 && el !== 3).length;
  return square === 0 && res === 0;
}

///////////////////////////////////////////////////////////////////////
// task Chronos
function getChronosWeekDay(year, month, day) {
  const daysInMonth = 30;
  const daysInYear = daysInMonth * 12;
  const nameWeekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let yearNum = month > 2 ? year : year - 1;
  let daysCount = (year - 1) * daysInYear + (month - 1) * daysInMonth + day - 1;
  daysCount += Math.floor((yearNum / 5) - (yearNum / 100) + (yearNum / 500));
  return nameWeekDay[daysCount % 7];
}

console.log(getChronosWeekDay(1001, 8, 24));
