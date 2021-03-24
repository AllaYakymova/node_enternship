'use strict';

// Task #1
const guestList = "Fred:Corwill;Wilfred:Corwill;Barney:Tornbull;Betty:Tornbull;Bjon:Tornbull;Raphael:Corwill;Alfred:Corwill";

function meeting(guestList) {
  const arrangeName = (el, divider) => {
    let index = el.indexOf(divider);
    const firstName = el.slice(0, index).toUpperCase();
    const lastName = el.slice(index + 1).toUpperCase();
    return [lastName, firstName];
  };

  const sortNames = (a, b) => {
    if (a[0] > b[0]) return 1;
    if (a[0] < b[0]) return -1;
    if (a[0] === b[0]) {
      if (a[1] > b[1]) return 1;
      else if (a[1] < b[1]) return -1;
    }
  };

  return guestList
    .split(';')
    .map(el => arrangeName(el, ':'))
    .sort(sortNames)
    .map(el => `(${el.join(', ')})`)
    .join(' ');
}

console.log(meeting(guestList));


// Task #2
const chairs = [['XXXXX', 18], ['XXXXX', 6], ['XX', 4], ['XX', 5]];

function meeting2(chairs, count) {
  let spare = 0;
  let freeChairs = [];
  if(count === 0 || count === undefined) return 'Game On';
  chairs.some(el => {
    const persons = el[0].length;
    let free = el[1] - persons >= 0 ? el[1] - persons : 0;
    spare = spare + free;
    freeChairs.push(free < 0 ? 0 : free);
    return spare >= count;
  });
  return spare >= count ? freeChairs : 'Not enough!';
}

console.log(meeting2(chairs, 15));
console.log(meeting2([['XXX', 3], ['XXXXX', 6], ['XXXXXX', 9]], 4)); // [0, 1, 3]
console.log(meeting2([['XXX', 1], ['XXXXXX', 6], ['X', 2], ['XXXXXX', 8], ['X', 3], ['XXX', 1]], 5)); // [0, 0, 1, 2, 2]
console.log(meeting2([['XX', 2], ['XXXX', 6], ['XXXXX', 4]], 0)); // 'Game On'


// Task #3
let points = [[2,2],[2,8], [5,5], [6,3], [6,7],[7,4], [7,9]];

function findPoints(points) {
  let closestPoints = [];
  let q = Infinity;

   points.some((point, i) => {
     for(let j = 0; j < points.length; j++) {
       if(j !== i ) {
         let res = Math.abs(point[0] - points[j][0]) + Math.abs(point[1] - points[j][1]);
         if(res < q) {
           q = res;
           closestPoints = [point, points[j]]
         }
       }
     }
   });
  return closestPoints
}

console.log(findPoints(points));

//[[6,3], [7,4]] или [[7,4], [6,3]]
