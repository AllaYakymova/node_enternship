'use strict';

// один вариант преобразования натурального числа в бинарное
let integerToBinary = integer => (integer >>> 0).toString(2);

function integerToBinarySum(integer) {
    if (Number.isInteger(integer) && integer > 0) {
        let binary = integerToBinary(integer);
        return binary
            .split('')
            .filter(num => +num === 1).length;
    } else {
        console.log('Enter non-negative integer')
    }
}

integerToBinarySum(1234);

