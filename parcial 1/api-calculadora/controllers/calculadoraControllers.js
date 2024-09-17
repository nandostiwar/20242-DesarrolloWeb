const {add, subtract, multiply} = require('../operaciones/operaciones.js');

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

const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../calculadora.routes/numbers.json'); // Verifica esta ruta

// Función para ordenar los números seleccionados en orden ascendente
const ordenarAscendente = (req, res) => {
    const { numbers } = req.body;

    if (!Array.isArray(numbers) || numbers.length === 0) {
        return res.status(400).json({ message: 'No se proporcionaron números válidos.' });
    }

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err); // Mostrar el error en consola para depuración
            return res.status(500).json({ message: 'Error al leer el archivo.' });
        }

        const items = JSON.parse(data);

        // Filtrar y ordenar los elementos seleccionados
        const selectedItems = items.filter(item => numbers.includes(item.number));
        selectedItems.sort((a, b) => a.number - b.number);

        res.json({ resultados: selectedItems });
    });
};

// Función para ordenar los números seleccionados en orden descendente
const ordenarDescendente = (req, res) => {
    const { numbers } = req.body;

    if (!Array.isArray(numbers) || numbers.length === 0) {
        return res.status(400).json({ message: 'No se proporcionaron números válidos.' });
    }

    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err); // Mostrar el error en consola para depuración
            return res.status(500).json({ message: 'Error al leer el archivo.' });
        }

        const items = JSON.parse(data);

        // Filtrar y ordenar los elementos seleccionados
        const selectedItems = items.filter(item => numbers.includes(item.number));
        selectedItems.sort((a, b) => b.number - a.number);

        res.json({ resultados: selectedItems });
    });
};

module.exports = {
    ordenarAscendente,
    ordenarDescendente,
};



module.exports = {
    sumar,
    restar,
    multiplicar,
    ordenarAscendente,
    ordenarDescendente,
}