const { sortAsc, sortDesc, calculateEquation } = require('../operaciones/operaciones');

// Controlador para ordenar los valores de manera ascendente
exports.sortAsc = (req, res) => {
  const { values } = req.body;
  try {
    const sortedValues = sortAsc(values);
    res.json({ sortedValues });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controlador para ordenar los valores de manera descendente
exports.sortDesc = (req, res) => {
  const { values } = req.body;
  try {
    const sortedValues = sortDesc(values);
    res.json({ sortedValues });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controlador para calcular la ecuación 2(valor1) + 3(valor2)
exports.calculateEquation = (req, res) => {
    const { values } = req.body;
    try {
      const equationResult = calculateEquation(values);
      res.json({ equationResult });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
