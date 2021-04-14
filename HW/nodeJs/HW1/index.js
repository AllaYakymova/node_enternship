const http = require('http'); //HTTP-модуль
const url = require('url'); //url parser module
const {ChessBoard} = require('../funcs/task#1');
const {compareEnvelopes} = require('../funcs/task#2');


//Создать сервер
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  const query = url.parse(req.url, true).query;
  const {task, l, w, s, a, b, c, d} = query;
  if (task === '1') {
    const chessBoardString = new ChessBoard(+l, +w, s);
    const result = chessBoardString.implementBoard();
    res.write(`<p><strong>Task #${task}</strong></p><p>${result}</p>`);
    res.end();
  }
  if (task === '2') {
    const result = compareEnvelopes({a: +a, b: +b}, {c: +c, d: +d});
    console.log(result);
    res.write(`<p><strong>Task #${task}</strong>: ${result}</p>`);
    res.end();
  }
})
  .listen(8080);


// ?task=1&w=10&l=10&s=x
// ?task=2&a=4&b=10&c=11&d=43
