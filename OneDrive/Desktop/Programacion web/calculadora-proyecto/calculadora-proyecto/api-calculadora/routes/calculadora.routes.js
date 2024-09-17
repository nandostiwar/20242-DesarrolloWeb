const express = require('express');
const router = express.Router();
const calculadoraControllers = require('../controllers/calculadoraControllers.js');

router
    .post('/ascendente', calculadoraControllers.ordenarAsc)
    .post('/descendente', calculadoraControllers.ordenarDesc)
    .post('/ecuacion', calculadoraControllers.calcularEcuacion);

module.exports = router;