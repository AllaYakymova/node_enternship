const http = require('http'); //HTTP-модуль
const url = require('url'); //url parser module
const {ChessBoard} = require('../funcs/task#1');
const {compareEnvelopes} = require('../funcs/task#2');
const {findPalindrom} = require('../funcs/task#4');
const {compareLuckyMethods} = require('../funcs/task#5');
const {numericalSequence} = require('../funcs/task#6');
const {getFibLine} = require('../funcs/task#7');


//Создать сервер
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  const query = url.parse(req.url, true).query;
  const {task, l, w, s, a, b, c, d, pal, range1, range2, length, square, min, max, len} = query;
  if (task === '1') {
    const chessBoardString = new ChessBoard(+l, +w, s);
    const result = chessBoardString.implementBoard();
    res.write(`<p><strong>Task #${task}</strong></p><p>${result}</p>`);
  }
  if (task === '2') {
    const result = compareEnvelopes({a: +a, b: +b}, {c: +c, d: +d});
    res.write(`<p><strong>Task #${task}</strong>: ${result}</p>`);
  }
  if (task === '4') {
    const result = findPalindrom(pal);
    res.write(`<p><strong>Task #${task}</strong>: ${result}</p>`);
  }
  if (task === '5') {
    const result = compareLuckyMethods([range1, range2]);
    res.write(`<p><strong>Task #${task}</strong>: ${result.winner}</p>`);
    res.end();
  }
  if (task === '6') {
    const result = numericalSequence(length, square);
    res.write(`<p><strong>Task #${task}</strong>: ${result.toString()}</p>`);
  }
  if (task === '7') {
    const result = getFibLine([min, max, len]);
    res.write(`<p><strong>Task #${task}</strong>: ${result.toString()}</p>`);
  }
  res.end();
}).listen(8080);


// ?task=1&w=10&l=10&s=x
// ?task=2&a=4&b=10&c=11&d=43
// ?task=4&pal=234343425
// ?task=5&range1=1&range2=111
// ?task=6&length=4&square=5
// ?task=7&min=4&max=12
