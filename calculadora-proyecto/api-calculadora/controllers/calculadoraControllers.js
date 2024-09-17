const { evaluarEcuacion } = require('../operaciones/operaciones');

// Controlador para ordenar los valores
const ordenarValores = (req, res) => {
  const { values, order } = req.body;
  const sortedValues = values.sort((a, b) => (order === 'ascendente' ? a - b : b - a));
  res.json({ sortedValues });
}; 

// Controlador para calcular la ecuación
const calcularEcuacion = (req, res) => {
  const { values, ecuacion } = req.body;
  try {
    const result = evaluarEcuacion(values, ecuacion);
    res.json({ result });
  } catch (error) {
    res.json({ result: 'Error en la ecuación' });
  }
};

module.exports = {
  ordenarValores,
  calcularEcuacion,
};