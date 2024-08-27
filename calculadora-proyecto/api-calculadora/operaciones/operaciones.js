
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

function greater_than(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    if (number1 > number2) {
        return number1;
    } else {
        return number2;
    }
}

function less_than(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    if (number1 < number2) {
        return number1;
    } else {
        return number2;
    }
}

function percent(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    let percentnum = number1 + number2;
    return percentnum / 2;
}



module.exports = {
    add,
    subtract,
    multiply,
    greater_than,
    less_than,
    percent
}