const express = require('express');
const router = express.Router();
const calculadoraControllers = require('../controllers/calculadoraControllers.js');

router
    .post('/ordenarAscendente', calculadoraControllers.ordenarAscendente)
    .post('/ordenarDescendente', calculadoraControllers.ordenarDescendente)
    .post('/evaluarEcuacion', calculadoraControllers.evaluarEcuacion);

module.exports = router;
