'use Strict';

function ipsBetween(...arg) {
  let [...aps] = arg;

  const validation = (aps) => (aps.filter(el => el.split('.').length - 1 === 3 && el.slice(0, 3) <= 239 && el).length === aps.length);

  const iPsCount = (api) => api.split('.').reverse().map((el, i) => +el << (i * 8)).reduce((acc, el) => acc + el);

  const result = {
    "Excluding start and end addresses": (iPsCount(aps[1]) - iPsCount(aps[0]) - 1),
    "Including start and end addresses": (iPsCount(aps[1]) - iPsCount(aps[0]) + 1),
  };

  return validation(aps) && aps[1] > aps[0] ? result : 'Enter correct aps';
}

console.log(ipsBetween("0.0.0.0", "240.0.0.50"));
console.log(ipsBetween("20.0.0.10", "20.0.1.0"));
console.log(ipsBetween("1.1.1.1", "4.4.4.4"));
