
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

function divide(a, b) {
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return number2 !== 0 ? number1 / number2 : 'No se puede dividir por cero';
}

function max(a, b) {
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return Math.max(number1, number2);
}

function min(a, b) {
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return Math.min(number1, number2);
}

function average(a, b) {
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return (number1 + number2) / 2;
}

module.exports = {
    add,
    subtract,
    multiply,
    divide,
    max,
    min,
    average
};
