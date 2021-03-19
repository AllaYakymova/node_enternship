'use strict';

let x = '4of Fo1r pe6ople g11ood th5e the2 sfp0';

function arrangeWordsByNumbers(string) {
    let newString = string.split(' ')
        .map(item => {
            let z = +item.match(/\d+/)[0];
            if (0 < z && z < 10) {
                return item
            } else {
                return false
            }
        })
        .filter(item => item)
        .sort((a, b) => {
            let numberA = a.match(/\d/)[0];
            let numberB = b.match(/\d/)[0];
            return numberA > numberB ? 1 : -1;
        })
        .join(" ");
    console.log(newString);
    return newString;
}

arrangeWordsByNumbers(x);
