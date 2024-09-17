// calculadora.routes.js

const express = require('express');
const { calcularOperacion, ordenar } = require('./calculadoraControllers');
const router = express.Router();

// Ruta para calcular la operación matemática
router.post('/calcular', calcularOperacion);

// Ruta para ordenar los valores
router.post('/ordenar', ordenar);

module.exports = router;

