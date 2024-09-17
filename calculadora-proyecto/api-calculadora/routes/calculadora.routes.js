const express = require('express');
const router = express.Router();
const { ordenarValores, calcularEcuacion } = require('../controllers/calculadoraControllers');

// Ruta para ordenar valores
router.post('/ordenar', ordenarValores);

// Ruta para calcular la ecuación
router.post('/calcular', calcularEcuacion);

module.exports = router;
