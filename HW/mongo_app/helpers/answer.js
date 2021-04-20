
exports.answer = function (res, code, data) {
  res.writeHead(code);
  res.write(data);
  res.end();
};

