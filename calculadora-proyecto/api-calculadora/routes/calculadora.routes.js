const express = require('express');
const router = express.Router();
const calculadoraControllers = require('../controllers/calculadoraControllers.js');

router
    .post('/sumar', calculadoraControllers.sumar)
    .post('/restar', calculadoraControllers.restar)
    .post('/multiplicar', calculadoraControllers.multiplicar)
    .post('/menorque' , calculadoraControllers.menorque)
    .post('/mayorque', calculadoraControllers.mayorque)
    .post('/promedio', calculadoraControllers.promedio)
module.exports = router;