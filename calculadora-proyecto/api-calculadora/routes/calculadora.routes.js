const express = require('express');
const router = express.Router();
const calculadoraControllers = require('../controllers/calculadoraControllers.js');

router
    .post('/sumar', calculadoraControllers.sumar)
    .post('/restar', calculadoraControllers.restar)
    .post('/multiplicar', calculadoraControllers.multiplicar)
    .post('/promedio', calculadoraControllers.promedio)
    .post('/menor', calculadoraControllers.menor)
    .post('/mayor', calculadoraControllers.mayor)

module.exports = router;