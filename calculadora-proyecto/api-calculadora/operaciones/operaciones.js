
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
function prom(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
    return (number1+number2)/2;
}
function men(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
 if (number1<number2) {
        return number1
        
    } else {
        return number2
        
    }
}

function may(a, b){
    let number1 = parseInt(a);
    let number2 = parseInt(b);
 if (number1<number2) {
        return number2
        
    } else {
        return number1
        
    }
}


module.exports = {
    add,
    subtract,
    multiply,
    prom,
    men,
    may
}