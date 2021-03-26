'use strict';

function ipsBetween(...arg) {
  let [...aps] = arg;
  const validation = (aps) => aps.filter(el => /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(el) && el.slice(0, 3) <= 239 && el).length === aps.length;
  const iPsCount = (api) => api.split('.').reverse().reduce((acc, el, i) => acc + el * Math.pow(2, i * 8), 0);
  return validation(aps) && aps[1] > aps[0] ? iPsCount(aps[1]) - iPsCount(aps[0]) : 'Enter correct aps';
}

console.log(ipsBetween("0.0.0.0", "60.25n.255.254"));
console.log(ipsBetween("10.0.0.0", "141.0.0.10"));
console.log(ipsBetween("0.0.0.1", "40.4.4.4"));
