const {add, subtract, multiply, menorqueX,mayorqueX,promedioX} = require('../operaciones/operaciones.js');

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

function menorque(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = menorqueX(number1, number2);
    res.json({
        resultado: result
    })
}
function mayorque(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result =mayorqueX(number1, number2);
    res.json({
        resultado: result
    })
}
function promedio(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = promedioX(number1, number2);
    res.json({
        resultado: result
    })
}
module.exports = {
    sumar,
    restar,
    multiplicar,
    menorque,
    mayorque,
    promedio
}