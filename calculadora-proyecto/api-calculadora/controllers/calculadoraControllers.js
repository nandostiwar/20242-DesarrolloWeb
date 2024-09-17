const { ascendente, descendente, evaluarEcuacion } = require('../operaciones/operaciones.js');
const fs = require('fs');

function ascendenteHandler(req, res) {
    const { number1, number2, number3, number4 } = req.body;
    const numeros = [parseInt(number1), parseInt(number2), parseInt(number3), parseInt(number4)];
    const resultado = ascendente(numeros);
    res.json({ resultado });
}

function descendenteHandler(req, res) {
    const { number1, number2, number3, number4 } = req.body;
    const numeros = [parseInt(number1), parseInt(number2), parseInt(number3), parseInt(number4)];
    const resultado = descendente(numeros);
    res.json({ resultado });
}

function ecuacionHandler(req, res) {
    const { ecuacion, values } = req.body;

    const valores = {
        a: parseInt(values.a),
        b: parseInt(values.b),
        c: parseInt(values.c),
        d: parseInt(values.d)
    };

    const resultado = evaluarEcuacion(ecuacion, valores);

    if (typeof resultado === 'number') {
        res.json({ resultado });
    } else {
        res.status(400).json({ error: resultado });
    }

    // Guardar la operación en el JSON
    guardarOperacion('ecuacion', resultado);
}

function guardarOperacion(tipo, resultado) {
    const filePath = './operaciones.json';

    // Leer el archivo JSON actual
    let data = [];
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        data = JSON.parse(fileData);
    }

    // Agregar nueva operación
    const nuevaOperacion = {
        tipo,
        resultado,
        fecha: new Date().toISOString()
    };
    data.push(nuevaOperacion);

    // Escribir el nuevo contenido en el archivo
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = {
    ascendenteHandler,
    descendenteHandler,
    ecuacionHandler
};
