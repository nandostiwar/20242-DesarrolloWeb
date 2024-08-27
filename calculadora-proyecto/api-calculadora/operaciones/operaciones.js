
/**
 * Sumar dos cantidades numéricas
 * @param {Number} a 
 * @param {Number} b 
 * @returns Number
 */
function add(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return number1 + number2;
}

function subtract(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return number1 - number2;
}

function multiply(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return number1 * number2;
}

function great(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    if (number1 > number2) {
        return number1;
    } else {
        return number2;
    }
}

function less(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    if (number1 < number2) {
        return number1;
    } else {
        return number2;
    }
}

function avg(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    let div = 2;
    let prom = number1 + number2;
    return prom / div;
}

module.exports = {
    add,
    subtract,
    multiply,
    great,
    less,
    avg
}