"use strict";
let arrayPush = {
  arr: [1, 2, 3, 4],
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
let arrayConcat = {
  arr: [1, 2, 3, 4],
};

// push добавляет один или более элементов в конец массива и возвращает новую длину массива.
function push(...arg) {
  let [addedArg] = arg;
  this.arr = [...this.arr, ...addedArg];
  return this.arr.length;
}
let pushMutable = push.bind(arrayPush);

console.log('push', pushMutable([9,8,7,6]), arrayPush.arr);

// pop удаляет последний элемент из массива и возвращает его значение.
function pop() {
  let deletedEl = this.arr[this.arr.length - 1];
  this.arr = this.arr.filter((el, i) => i < this.arr.length - 1 && el);
  return deletedEl;
}
let popMutable = pop.bind(arrayPop);

console.log('pop', popMutable(), arrayPop.arr);

// shift удаляет первый элемент из массива и возвращает его значение. Этот метод изменяет длину массива.
function shift() {
  let deletedEl = this.arr[0];
  this.arr[0] = false;
  this.arr = this.arr.filter(el => el );
  return deletedEl;
}
let shiftMutable = shift.bind(arrayShift);
console.log('shift', shiftMutable(), arrayShift.arr);

// unshift добавляет один или более элементов в начало массива и возвращает новую длину массива.
function unshift (...arg) {
  this.arr = [...arg, ...this.arr];
  return this.arr.length;
}
let unshiftMutable = unshift.bind(arrayUnshift);
console.log('unshift', unshiftMutable(9,8,7,6,'f'), arrayUnshift.arr);

// concat возвращает новый массив, состоящий из массива, на котором он был вызван, соединённого с другими массивами и/или значениями, переданными в качестве аргументов.
function concat (...arg) {
  this.arr = [...this.arr, ...arg];
  return this.arr
}
let concatMutable = concat.bind(arrayConcat);
console.log('concat', concatMutable([1, 4, 5, 6], 'f'));



let reduceArr = ['Apple', 'Banana', 'Pineapple'];
let reduceArr2 = ['Apple', 'Banana', 'Pineapple'];
let reduceArr3 = ['Apple', 'Banana', 'Pineapple'];

//// REDUCE - MAP
let reduceMap = reduceArr.reduce((acc, el) => [...acc, el.slice(0,1)], []);

console.log(reduceMap);


//// REDUCE - FILTER
let reduceFilter = reduceArr2.reduce((acc, el) =>
  el.slice(0,1).toLowerCase() === 'a' ? [...acc, el] : [...acc], []);

console.log(reduceFilter);


//// REDUCE - FOREACH
let reduceForEach = reduceArr3.reduce((acc, el, i) => [...acc, `${i+1}: ${el}`], []);

console.log(reduceForEach);
