const { ascendente, descendente, evaluarEcuacion } = require('../operaciones/operaciones.js');
const fs = require('fs');
const path = require('path');

function ascendenteHandler(req, res) {
    const { number1, number2, number3, number4 } = req.body;
    const numeros = [parseInt(number1), parseInt(number2), parseInt(number3), parseInt(number4)];
    const resultado = ascendente(numeros);

    // Guardar operación en JSON
    guardarOperacion('ascendente', resultado);

    res.json({ resultado });
}

function descendenteHandler(req, res) {
    const { number1, number2, number3, number4 } = req.body;
    const numeros = [parseInt(number1), parseInt(number2), parseInt(number3), parseInt(number4)];
    const resultado = descendente(numeros);

    // Guardar operación en JSON
    guardarOperacion('descendente', resultado);

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

    // Guardar operación en el JSON
    guardarOperacion('ecuacion', resultado);
}

// Función para guardar las operaciones en un archivo JSON
function guardarOperacion(tipo, resultado) {
    const filePath = path.join(__dirname, 'operaciones.json'); // Usa una ruta absoluta

    let data = [];
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        data = JSON.parse(fileData);
    }

    const nuevaOperacion = {
        tipo,
        resultado,
        fecha: new Date().toISOString()
    };
    data.push(nuevaOperacion);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`Guardando operación: ${tipo} con resultado: ${resultado}`);
}

module.exports = {
    ascendenteHandler,
    descendenteHandler,
    ecuacionHandler
};