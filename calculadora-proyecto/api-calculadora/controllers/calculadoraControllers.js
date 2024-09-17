// calculadoraControllers.js

const { realizarOperacion, ordenarValores } = require('./operaciones');

// Controlador para la operación matemática
const calcularOperacion = (req, res) => {
    const { expresion, valores } = req.body;
    try {
        const resultado = realizarOperacion(expresion, valores);
        res.status(200).json({ resultado });
    } catch (error) {
        res.status(400).json({ error: 'Error al calcular la operación' });
    }
};

// Controlador para ordenar los valores
const ordenar = (req, res) => {
    const { valores, tipo } = req.body;
    try {
        const resultado = ordenarValores(valores, tipo);
        res.status(200).json({ resultado });
    } catch (error) {
        res.status(400).json({ error: 'Error al ordenar los valores' });
    }
};

module.exports = {
    calcularOperacion,
    ordenar
};
