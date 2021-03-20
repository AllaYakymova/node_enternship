'use strict';

function integerToBinarySum(integer) {
    if (Number.isInteger(integer) && integer > 0) {
        let binary = integerToBinary(integer);
        return binary
            .split('')
            .reduce((a, b) => +a + +b);
    } else {
        console.log('Enter a non-negative integer')
    }
}

console.log(integerToBinarySum(1234));


// один вариант преобразования натурального числа в бинарное
function integerToBinary (integer) {
    return (integer >>> 0).toString(2);
}

// второй вариант преобразования натурального числа в бинарное
function integerToBinary1(integer) {
    let rest = integer;
    let arr = [];
    while (rest !== 0) {
        let remainder = rest % 2;
        rest = Math.floor(rest / 2);
        arr = [...arr, remainder];
    }
    return arr.reverse().join('');
}

console.log(integerToBinary(1234));
console.log(integerToBinary1(1234));
