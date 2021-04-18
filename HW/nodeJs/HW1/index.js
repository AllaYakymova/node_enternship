const http = require('http'); //HTTP-модуль
const url = require('url'); //url parser module
const {ChessBoard} = require('../funcs/task#1');
const {compareEnvelopes} = require('../funcs/task#2');
const {findPalindrom} = require('../funcs/task#4');
const {compareLuckyMethods} = require('../funcs/task#5');
const {numericalSequence} = require('../funcs/task#6');
const {getFibLine} = require('../funcs/task#7');


http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  const query = url.parse(req.url, true).query;
  const {task} = query;
  if (task === '1') {
    const {task, l, w, s} = query;
    const chessBoardString = new ChessBoard(+l, +w, s);
    const result = chessBoardString.implementBoard();
    res.write(`<p><strong>Task #${task}</strong></p><p>${result}</p>`);
  }
  if (task === '2') {
    const {task, a, b, c, d} = query;
    const result = compareEnvelopes({a: +a, b: +b}, {c: +c, d: +d});
    res.write(`<p><strong>Task #${task}</strong>: ${result}</p>`);
  }
  if (task === '4') {
    const {task, pal} = query;
    const result = findPalindrom(pal);
    res.write(`<p><strong>Task #${task}</strong>: ${result}</p>`);
  }
  if (task === '5') {
    const {task, range1, range2} = query;
    const result = compareLuckyMethods([+range1, +range2]);
    console.log(result);
    res.write(`<p><strong>Task #${task}</strong>: ${result}</p>`);
    res.end();
  }
  if (task === '6') {
    const {task, length, square} = query;
    const result = numericalSequence(+length, +square);
    res.write(`<p><strong>Task #${task}</strong>: ${result.toString()}</p>`);
  }
  if (task === '7') {
    const {task, min, max, len} = query;
    const result = getFibLine([+min, +max, +len]);
    res.write(`<p><strong>Task #${task}</strong>: ${result.toString()}</p>`);
  }
  res.end();
})
  .listen(8080);

console.log('Server on http://localhost:8080');

// ?task=1&w=10&l=10&s=x
// ?task=2&a=4&b=10&c=11&d=43
// ?task=4&pal=234343425
// ?task=5&range1=1&range2=111
// ?task=6&length=4&square=5
// ?task=7&min=4&max=12
