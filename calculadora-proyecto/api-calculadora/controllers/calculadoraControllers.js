const fs = require('fs');
const { sortAscending, sortDescending, solveEquation } = require('../operaciones/operaciones.js');

// Función para guardar los resultados en un archivo JSON
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
// Controlador para ordenar de forma ascendente
function ordenarAscendente(req, res) {
    const { numbers } = req.body;
    const sortedNumbers = sortAscending(numbers);
   
    // Guardar la operación en el JSON
    guardarOperacion('ascendente', sortedNumbers);
   
    res.json({
        sorted: sortedNumbers
    });
}

// Controlador para ordenar de forma descendente
function ordenarDescendente(req, res) {
    const { numbers } = req.body;
    const sortedNumbers = sortDescending(numbers);
   
    // Guardar la operación en el JSON
    guardarOperacion('descendente', sortedNumbers);
   
    res.json({
        sorted: sortedNumbers
    });
}
// Controlador para resolver ecuaciones
function resolverEcuacion(req, res) {
    const { equation, values } = req.body;
    const result = solveEquation(equation, values);
   
    // Guardar la operación en el JSON
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