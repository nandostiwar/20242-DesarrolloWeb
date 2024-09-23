const fs = require('fs');
const { sortAscending, sortDescending, solveEquation } = require('../operaciones/operaciones.js');


function guardarOperacion(tipo, resultado) {
    const filePath = './operaciones.json';

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
}


function ordenarAscendente(req, res) {
    const { numbers } = req.body;
    const sortedNumbers = sortAscending(numbers);
   

    guardarOperacion('ascendente', sortedNumbers);
   
    res.json({
        sorted: sortedNumbers
    });
}


function ordenarDescendente(req, res) {
    const { numbers } = req.body;
    const sortedNumbers = sortDescending(numbers);
   

    guardarOperacion('descendente', sortedNumbers);
   
    res.json({
        sorted: sortedNumbers
    });
}


function resolverEcuacion(req, res) {
    const { equation, values } = req.body;
    const result = solveEquation(equation, values);
   

    guardarOperacion('ecuacion', result);
   
    res.json({
        result: result
    });
}

module.exports = {
    ordenarAscendente,
    ordenarDescendente,
    resolverEcuacion
};
