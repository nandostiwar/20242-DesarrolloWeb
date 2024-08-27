const { add, subtract, multiply } = require('../operaciones/operaciones.js');

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
    })
}

function multiplicar(req, res) {
    const { body } = req;
    const { number1, number2 } = body;
    const result = multiply(number1, number2);
    res.json({
        resultado: result
    })
}

function mayor(req, res) {
    const { body } = req;
    const { number1, number2 } = body;
    let result = 0;
    if (parseInt(number1) > parseInt(number2)) { result = parseInt(number1) }
    else { result = parseInt(number2) }
    res.json({
        resultado: result
    })
}

function menor(req, res) {
    const { body } = req;
    const { number1, number2 } = body;
    let result = 0;
    if (parseInt(number1) < parseInt(number2)) {
        result = parseInt(number1);
    } else {
        result = parseInt(number2);
    }
    res.json({
        resultado: result
    });
}

function promedio(req, res) {
    const { body } = req;
    const { number1, number2 } = body;
    const result = (parseInt(number1) + parseInt(number2)) / 2;
    res.json({
        resultado: result
    });
}

module.exports = {
    sumar,
    restar,
    multiplicar,
    mayor,
    menor,
    promedio
};