const { add, subtract, multiply, evaluateExpression } = require('../operaciones/operaciones.js');

// Funciones de operaciones básicas
function sumar(req, res) {
    const { body } = req;
    const { number1, number2 } = body;
    const result = add(number1, number2);
    res.json({
        resultado: result
    });
}

function restar(req, res) {
    const { body } = req;
    const { number1, number2 } = body;
    const result = subtract(number1, number2);
    res.json({
        resultado: result
    });
}

function multiplicar(req, res) {
    const { body } = req;
    const { number1, number2 } = body;
    const result = multiply(number1, number2);
    res.json({
        resultado: result
    });
}

// Función para evaluar la expresión matemática
function calcular(req, res) {
    const { equation, numbers } = req.body;

    try {
        const resultado = evaluateExpression(equation, numbers);
        res.json({ resultado });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Funciones para ordenar los números
function ordenarAscendente(req, res) {
    const { numbers } = req.body;

    if (!Array.isArray(numbers)) {
        return res.status(400).json({ error: 'Los números deben ser una lista.' });
    }

    const sortedNumbers = numbers.sort((a, b) => a - b);
    res.json({ sortedNumbers });
}

function ordenarDescendente(req, res) {
    const { numbers } = req.body;

    if (!Array.isArray(numbers)) {
        return res.status(400).json({ error: 'Los números deben ser una lista.' });
    }

    const sortedNumbers = numbers.sort((a, b) => b - a);
    res.json({ sortedNumbers });
}

module.exports = {
    sumar,
    restar,
    multiplicar,
    calcular,
    ordenarAscendente,
    ordenarDescendente
};
