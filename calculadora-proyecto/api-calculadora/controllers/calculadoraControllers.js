const {add, subtract, multiply, prom, men,may} = require('../operaciones/operaciones.js');

function sumar(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = add(number1, number2);
    res.json({
        resultado: result
    });
}

function restar(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = subtract(number1, number2);
    res.json({
        resultado: result
    })
}

function multiplicar(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = multiply(number1, number2);
    res.json({
        resultado: result
    })
}

function promedio(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = prom(number1, number2);
    res.json({
        resultado: result
    })
}
function menor(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = men(number1, number2);
    res.json({
        resultado: result
    })
}
function mayor(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = may(number1, number2);
    res.json({
        resultado: result
    })
}

module.exports = {
    sumar,
    restar,
    multiplicar,
    promedio,
    menor,
    mayor
}