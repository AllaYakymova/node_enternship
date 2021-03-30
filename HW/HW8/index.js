'use strict';

// let document = document.body;
let wrapper = document.getElementById('spinner-wrap');
let spinner1 = document.createElement('div');
let spinner2 = document.createElement('div');
let spinner3 = document.createElement('div');
let spinner4 = document.createElement('div');
spinner1.classList.add('spinner1');
spinner2.classList.add('spinner2');
spinner3.classList.add('spinner3');
spinner4.classList.add('spinner4');
wrapper.append(spinner1);
wrapper.append(spinner2);
wrapper.append(spinner3);
wrapper.append(spinner4);

setInterval((counter) => {
  if (counter.count === 10) {
    counter.count = 0;
  }
  spinner1.style.width = `${counter.count * 2}px`;
  counter.count++;

}, 600, {count: 0});

setInterval((counter) => {
  spinner2.style.transform = `rotate(${counter.count}deg)`;
  counter.count = counter.count + 20;

}, 600, {count: 20});


setInterval((counter) => {
  if (counter.count < 5) {
    spinner3.style.transform = `translateX(${counter.count}px)`;
    counter.count++;
  }
  if (counter.count === 5) {
    spinner3.style.transform = `rotate(90deg)`;
    counter.count = 0;
  }
}, 600, {count: 0});

setInterval((counter) => {
  if (counter.count < 5) {
    spinner3.style.transform = `translateX(${counter.count}px)`;
    counter.count++;
  }
  if (counter.count === 5) {
    spinner3.style.transform = `rotate(90deg)`;
    counter.count = 0;
  }
}, 600, {count: 0});

setInterval((counter) => {
  if (counter.count === 10) {
    spinner4.style.opacity = '0';
    counter.count=0;
  }
  spinner4.setAttribute("style", `background-color: ${'rgb(' + randomiser(0, 255) + ', ' + randomiser(0, 255) + ', ' + randomiser(0, 255) + ')'}`);
  if(counter.count % 2 !== 0) {
    spinner4.style.clipPath = `polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)`;
  } else {
    spinner4.style.clipPath = `polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)`;
  }
  counter.count++;

}, 600, {count: 0});

const randomiser = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min;

let spin1 = {
  1: '( =   )',
  2: '(  =  )',
  3: '(   = )',
  4: '(    =)',
  5: '(   = )',
  6: '(  =  )',
  7: '( =   )',
  8: '(=    )',
};

setInterval(
  (counter) => {
    if (counter.count === 0) {
      counter.count = 8;
    }
    console.clear();
    console.log(counter.spin[counter.count]);

    counter.count --;
  }, 1000, {spin: spin1, count: 0});

let spin3 = {
  1: 1,
  2: 2,
  3: 5,
  4: 4,
  5: 3,
  6: 5,
};

setInterval(
  (counter) => {
    if (counter.count === 0) {
      counter.count = 6;
    }
    console.clear();
    console.log(String.fromCharCode(counter.spin[counter.count]));

    counter.count--;
  },
  250,
  { spin: spin3, count: 0 }
  );

let spin5 = {
  1: 47,
  2: 45,
  3: 92,
  4: 124,
};

setInterval(
  (counter) => {
    if (counter.count === 0) {
      counter.count = 4;
    }
    console.clear();
    console.log(String.fromCharCode(counter.spin[counter.count]));

    counter.count--;
  },
  250,
  {spin: spin5, count: 0}
  );
