const express = require('express');
const router = express.Router();
const calculadoraController = require('../controllers/calculadoraControllers');

// Ruta para ordenar en orden ascendente
router.post('/sort/asc', calculadoraController.sortAsc);

// Ruta para ordenar en orden descendente
router.post('/sort/desc', calculadoraController.sortDesc);

// Ruta para calcular la ecuación 2(valor1) + 3(valor2)
router.post('/calculate', calculadoraController.calculateEquation);

module.exports = router;
