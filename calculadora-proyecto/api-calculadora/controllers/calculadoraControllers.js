const {add, subtract, multiply, great, less, avg} = require('../operaciones/operaciones.js');

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

function may(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = great(number1, number2);
    res.json({
        resultado: result
    });
}

function men(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = less(number1, number2);
    res.json({
        resultado: result
    });
}

function prome(req, res){
    const {body} = req;
    const {number1, number2} = body;
    const result = avg(number1, number2);
    res.json({
        resultado: result
    });
}


module.exports = {
    sumar,
    restar,
    multiplicar,
    may,
    men,
    prome
}