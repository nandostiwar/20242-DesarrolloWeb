const {add, subtract, multiply, prom, maq, men} = require('../operaciones/operaciones.js');

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
function Promedio(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = prom(number1, number2);
    res.json({
        resultado: result
    })
}
function mayor_que(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = maq(number1, number2);
    res.json({
        resultado: result
    })
}
function Menor(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = men(number1, number2);
    res.json({
        resultado: result
    })
}
module.exports = {
    sumar,
    restar,
    multiplicar,
    Promedio,
    mayor_que,
    Menor
}