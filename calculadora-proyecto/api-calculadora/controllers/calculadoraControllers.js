const {add, subtract, multiply, greater_than, less_than, percent } = require('../operaciones/operaciones.js');

function ordenarCheckboxes(req, res) {
    const { number1, number2, checkboxes } = req.body;

    // Verificar que el array de checkboxes esté presente y sea un array
    if (!checkboxes || !Array.isArray(checkboxes)) {
        return res.status(400).json({ error: 'Se requiere un array de checkboxes' });
    }

    // Ordenar los números de los checkboxes de forma ascendente
    const sortedCheckboxes = checkboxes.sort(function(a, b) {
        return a - b;
    });

    // Devolver los números ordenados
    res.json({
        resultado: sortedCheckboxes,
    });
}

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
    promedio,
    ordenarCheckboxes
}