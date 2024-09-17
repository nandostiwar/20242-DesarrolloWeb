const express = require('express');
const router = express.Router();
const calculadoraControllers = require('../controllers/calculadoraControllers.js');

router
    .post('/ordenar', calculadoraControllers.ordenarCheckboxes)
    .post('/sumar', calculadoraControllers.sumar)
    .post('/restar', calculadoraControllers.restar)
    .post('/multiplicar', calculadoraControllers.multiplicar)
    .post('/mayor', calculadoraControllers.mayor_que)
    .post('/menor', calculadoraControllers.menor_que)
    .post('/promedio', calculadoraControllers.promedio)

module.exports = router;