const fs = require('fs');
const {ordenarAscendente,ordenarDescendente,evaluarEcuacion} = require('../operaciones/operaciones.js');

function guardarOperacion(tipo, resultado) {
    const filePath = './operaciones.json';
    let data = [];

    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        if (fileData) {
            data = JSON.parse(fileData);
        }
    }

    // Agregar nueva operación
    const nuevaOperacion = {
        tipo,
        resultado,
        fecha: new Date().toISOString()
    };

    data.push(nuevaOperacion);
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log('Operación guardada correctamente.');
    } catch (error) {
        console.error('Error al guardar el archivo:', error);
    }
}
function ordenarAsc (req, res)  {
    const { numeros } = req.body;
  
    if (!Array.isArray(numeros) || numeros.length === 0) {
      return res.status(400).json({ mensaje: "No se enviaron números válidos." });
    }
  
    const numerosOrdenados = ordenarAscendente(numeros);
    return res.json({ numerosOrdenados });
  };
  
  // Controlador para ordenar de manera descendente
  function ordenarDesc  (req, res)  {
    const { numeros } = req.body;
  
    if (!Array.isArray(numeros) || numeros.length === 0) {
      return res.status(400).json({ mensaje: "No se enviaron números válidos." });
    }
  
    const numerosOrdenados = ordenarDescendente(numeros);
    return res.json({ numerosOrdenados });
  };
  function calcularEcuacion  (req, res)  {
    const { ecuacion, valores } = req.body;
    if (!ecuacion || !valores) {
      return res.status(400).json({ mensaje: "Ecuación o valores no proporcionados." });
    }
    try {
      const resultado = evaluarEcuacion(ecuacion, valores);
      return res.json({ resultado });
    } catch (error) {
      return res.status(500).json({ mensaje: error.message });
    }
  };
module.exports = {
    ordenarAsc,
    ordenarDesc,
    calcularEcuacion,
    guardarOperacion

}