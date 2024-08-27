/**
 * Sumar dos cantidades numéricas
 * @param {Number} a 
 * @param {Number} b 
 * @returns Number
 */
function add(a, b) {
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return number1 + number2;
}

function subtract(a, b) {
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return number1 - number2;
}

function multiply(a, b) {
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return number1 * number2;
}

/**
 * Obtener el número mayor de dos cantidades numéricas
 * @param {Number} a 
 * @param {Number} b 
 * @returns Number
 */
function max(a, b) {
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return Math.max(number1, number2);
}

/**
 * Obtener el número menor de dos cantidades numéricas
 * @param {Number} a 
 * @param {Number} b 
 * @returns Number
 */
function min(a, b) {
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return Math.min(number1, number2);
}

/**
 * Obtener el promedio de dos cantidades numéricas
 * @param {Number} a 
 * @param {Number} b 
 * @returns Number
 */
function average(a, b) {
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return (number1 + number2) / 2;
}

module.exports = {
    add,
    subtract,
    multiply,
    max,
    min,
    average
}
