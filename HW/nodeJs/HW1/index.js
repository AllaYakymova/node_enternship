const http = require('http');//HTTP-модуль
const url = require('url');//url parser module
const {ChessBoard} = require('../funcs/task#1');
const {compareEnvelopes} = require('../funcs/task#2');

const myChessTest = new ChessBoard(3, 3, 'o');
console.log('Task#1:', myChessTest.implementBoard());

//Создать сервер
http.createServer((req, res) => {
  // res.writeHead(200, { 'Content-Type' : 'text/html' });
  // const [a, b] = req.url.split('/').slice(1);
  // const query = url.parse(req.url, true).query;
  // const { task, l, w, s, a, b, c, d } = query;
  // if(task === 1) {
  //   const chessBoardString = new ChessBoard(l,w, s);
  //   res.write(`<p>${chessBoardString}</p>`);
  res.write('Hello');
  res.end();
// };
// if (task === 1) {
//   const res = compareEnvelopes({a, b}, {c, d});
//   res.write(`<p>${res}</p>`);
//   res.end();
}).
listen(8080);

console.log('Server on http://localhost:8080');

// ?task=1&w=4&l=10&s=o
// ?task=2&a=4&b=10&c=11&d=43
