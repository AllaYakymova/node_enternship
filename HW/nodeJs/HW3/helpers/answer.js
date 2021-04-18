
exports.answer = function(res, data) {
  res.write(data);
  res.end();
};

