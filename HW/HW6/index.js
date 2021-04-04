'use strict';

let field = [[1, 2, 1], [2, 1, 1], [2, 2, 1]];

//task #1
/**
 * @return {string, number}
 */
function TicTacToeGame(field) {
  let winner = [];
  let united = field.reduce((acc, el) => [...acc, ...el], []);
  if (united.filter(el => el !== 0 && el !== 1 && el !== 2).length > 0) return 'There is not a valid data on the board';
  if (united.filter(el => el === 0).length > 0) return -1; // checking of empty spots

  let horizontalCheck = field.reduce((acc, el) => [...new Set(el)].length === 1 ? el[0] : acc, 0);
  if (horizontalCheck !== 0) winner.push(horizontalCheck);

  let leftDiagonal = field.reduce((acc, el, i) => [...acc, el[i++]], []);
  if ([...new Set(leftDiagonal)].length === 1) winner.push(leftDiagonal[0]);

  let rightDiagonal = field.reverse().reduce((acc, el, i) => [...acc, el[i++]], []);
  if ([...new Set(rightDiagonal)].length === 1) winner.push(rightDiagonal[0]);

  for (let x = 0; x < 3; x++) {
    let vertical = [...new Set(field.reduce((acc, el) => [...acc, el[x]], []))];
    if (vertical.length === 1) winner.push(vertical[0]);
  }
  if ([...new Set(winner)].length === 2) return 0;
  return winner[0] === 1 ? 'X' : 'O';
}

console.log(TicTacToeGame(field));

//task #2
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
      console.log(result); // не пойму, здесь отображается result
      i = i === 0 ? i + decoderArr.length : i + decoderArr.length + 1;
    }
  }
  console.log(result);// а здесь result не отображается (((
  return result;
}

let str = 'Yesterday, we bumped into Laura. It had to happen, but you can\'t deny the timing couldn\'t be worse. The "m1ission" to try and seduce her was a complete failure last month. By the way, she still has the ring I gave her. Anyhow, it hasn\'t been a pleasurable experience to go through it. I wanted to feel done with it first. Y2sterday, we bumped into Laura. It had to happen, but you can\'t deny the timing couldn\'t be worse. The "m2ission" to try and seduce her was a complete failure last month. By the way, she still has the ring I gave her. Anyhow, it hasn\'t been a pleasurable experience to go through it. I wanted to feel done with it first. Y3sterday, we bumped into Laura. It had to happen, but you can\'t deny the timing couldn\'t be worse. The "m3ission" to try and seduce her was a complete failure last month. By the way, she still has the ring I gave her. Anyhow, it hasn\'t been a pleasurable experience to go through it. I wanted to feel done with it first.';

decoder(str);


