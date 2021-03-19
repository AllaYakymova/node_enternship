'use strict';

let x = '4of Fo1r pe6ople g141ood th5e the2 sfp0';

function arrangeWordsByNumbers(string) {
    let getNumber = (word) => +word.match(/\d+/)[0];

    let newString = string.split(' ')
        .map(item => {
            let number = getNumber(item);
            if (0 < number && number < 10) {
                return item
            } else {
                return false
            }
        })
        .filter(item => item)
        .sort((a, b) => getNumber(a) > getNumber(b) ? 1 : -1)
        .join(" ");
    console.log(newString);
    return newString;
}

arrangeWordsByNumbers(x);
