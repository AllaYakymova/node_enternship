"use strict";
let arrayPush = {
  arr: ["пастернак", "картошка"],
};
let arrayPop = {
  arr: [1, 2, 3, 4],
};
let arrayShift = {
  arr: [1, 2, 3, 4],
};
let arrayUnshift = {
  arr: [1, 2, 3, 4],
};

// push добавляет один или более элементов в конец массива и возвращает новую длину массива.
function push(...arg) {
  const addedArg = [...arg];
  this.arr = [...this.arr, ...addedArg];
  return this.arr.length;
}

let pushMutable = push.bind(arrayPush);

console.log("push", pushMutable(1, [2, 3]), arrayPush.arr);

// pop удаляет последний элемент из массива и возвращает его значение.
function pop() {
  const deletedEl = this.arr[this.arr.length - 1];
  this.arr.length = this.arr.length - 1;
  return deletedEl;
}

let popMutable = pop.bind(arrayPop);

console.log("pop", popMutable(), arrayPop.arr);

// shift удаляет первый элемент из массива и возвращает его значение. Этот метод изменяет длину массива.
function shift() {
  const deletedEl = this.arr[0];
  const arrLength = this.arr.length - 1;
  let resultArr = [];
  for (let i = 1; i <= arrLength; i++) {
    resultArr = [...resultArr, this.arr[i]];
  }
  this.arr = resultArr;
  return deletedEl;
}

let shiftMutable = shift.bind(arrayShift);
console.log("shift", shiftMutable(), arrayShift.arr);

// unshift добавляет один или более элементов в начало массива и возвращает новую длину массива.
function unshift(...arg) {
  this.arr = [...arg, ...this.arr];
  return this.arr.length;
}

const unshiftMutable = unshift.bind(arrayUnshift);
console.log("unshift", unshiftMutable(9, 8, 7, 6, "f"), arrayUnshift.arr);


// concat возвращает новый массив, состоящий из массива, на котором он был вызван, соединённого с другими массивами и/или значениями, переданными в качестве аргументов.
const concat = (arr, ...arg) => {
  const [addedArg] = arg;
  return [...arr, ...addedArg];
};

const arr = ["пастернак", "картошка"];
const arrAdded = [1, [2, 3], {"test": 6}];
console.log("concat", concat(arr, arrAdded), arr);


//////////////////////////////////////////////////

let reduceArr = ["Apple", "Banana", "Pineapple"];
let reduceArr2 = ["Apple", "Banana", "Pineapple"];
let reduceArr3 = ["Apple", "Banana", "Pineapple"];

//// REDUCE - MAP
const reduceMap = arr => arr.reduce((acc, el) => [...acc, el.slice(0, 1)], []);

console.log(reduceMap(reduceArr));


//// REDUCE - FILTER
const reduceFilter = arr => arr.reduce((acc, el) =>
  el.slice(0, 1).toLowerCase() === "a" ? [...acc, el] : [...acc], []);

console.log(reduceFilter(reduceArr2));


//// REDUCE - FOREACH
const reduceForEach = arr => arr.reduce((acc, el, i) => [...acc, `${i + 1}: ${el}`], []);

console.log(reduceForEach(reduceArr3));
