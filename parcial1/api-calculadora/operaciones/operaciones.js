/**
 * Sumar dos cantidades numéricas
 * @param {Number} a 
 * @param {Number} b 
 * @returns Number
 */
function add(a, b) {
    let number1 = parseFloat(a);
    let number2 = parseFloat(b);
    return number1 + number2;
}

/**
 * Restar dos cantidades numéricas
 * @param {Number} a 
 * @param {Number} b 
 * @returns Number
 */
function subtract(a, b) {
    let number1 = parseFloat(a);
    let number2 = parseFloat(b);
    return number1 - number2;
}

/**
 * Multiplicar dos cantidades numéricas
 * @param {Number} a 
 * @param {Number} b 
 * @returns Number
 */
function multiply(a, b) {
    let number1 = parseFloat(a);
    let number2 = parseFloat(b);
    return number1 * number2;
}

/**
 * Evaluar una expresión matemática con variables y valores proporcionados.
 * @param {String} expression - La expresión matemática a evaluar (Ej. "2*a + 3*b").
 * @param {Object} values - Objeto con los valores para las variables (Ej. {a: 5, b: 3}).
 * @returns {Number} - Resultado de la evaluación de la expresión.
 */
function evaluateExpression(expression, values) {
    if (typeof expression !== 'string') {
        throw new Error('La expresión debe ser una cadena de texto.');
    }

    if (typeof values !== 'object' || values === null) {
        throw new Error('Los valores deben ser un objeto.');
    }

    let sanitizedExpression = expression;

    // Reemplazar cada variable en la expresión con su valor correspondiente
    for (const [variable, value] of Object.entries(values)) {
        if (isNaN(parseFloat(value))) {
            throw new Error(`El valor para la variable ${variable} no es un número válido.`);
        }
        const regex = new RegExp(`\\b${variable}\\b`, 'g');
        sanitizedExpression = sanitizedExpression.replace(regex, value);
    }

    // Evaluar la expresión
    try {
        const result = new Function(`return ${sanitizedExpression};`)();
        if (isNaN(result)) {
            throw new Error('El resultado de la expresión no es un número.');
        }
        return result;
    } catch (error) {
        throw new Error('Error en la evaluación de la expresión: ' + error.message);
    }
}

module.exports = {
    add,
    subtract,
    multiply,
<<<<<<< HEAD
    evaluateExpression
};
=======
    max,
    min,
    average
};
>>>>>>> 222354932adeb1520dbd8e5cd8b2423a84272d16
