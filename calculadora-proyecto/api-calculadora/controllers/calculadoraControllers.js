const {add, subtract, multiply, greater_than, less_than, percent } = require('../operaciones/operaciones.js');

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

function mayor_que(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = greater_than(number1, number2);
    res.json({
        resultado: result
    })
}

function menor_que(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = less_than(number1, number2);
    res.json({
        resultado: result
    })
}

function promedio(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = percent(number1, number2);
    res.json({
        resultado: result
    })
}

module.exports = {
    sumar,
    restar,
    multiplicar,
    mayor_que,
    menor_que,
    promedio
}