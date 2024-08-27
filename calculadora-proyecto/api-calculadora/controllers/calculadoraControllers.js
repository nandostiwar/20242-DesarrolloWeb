const {add, subtract, multiply, divide, max, min, average} = require('../operaciones/operaciones.js');

function sumar(req, res) {
    const {body} = req;
    const {number1, number2} = body;
    const result = add(number1, number2);
    res.json({
        resultado: result
    });
}

function restar(req, res) {
    const {body} = req;
    const {number1, number2} = body;
    const result = subtract(number1, number2);
    res.json({
        resultado: result
    });
}

function multiplicar(req, res) {
    const {body} = req;
    const {number1, number2} = body;
    const result = multiply(number1, number2);
    res.json({
        resultado: result
    });
}

function dividir(req, res) {
    const {body} = req;
    const {number1, number2} = body;
    const result = divide(number1, number2);
    res.json({
        resultado: result
    });
}

function numeroMayor(req, res) {
    const {body} = req;
    const {number1, number2} = body;
    const result = max(number1, number2);
    res.json({
        resultado: result
    });
}

function numeroMenor(req, res) {
    const {body} = req;
    const {number1, number2} = body;
    const result = min(number1, number2);
    res.json({
        resultado: result
    });
}

function promedio(req, res) {
    const {body} = req;
    const {number1, number2} = body;
    const result = average(number1, number2);
    res.json({
        resultado: result
    });
}

module.exports = {
    sumar,
    restar,
    multiplicar,
    dividir,
    numeroMayor,
    numeroMenor,
    promedio
}
