const express = require('express');
const router = express.Router();
const calculadoraControllers = require('../controllers/calculadoraControllers.js');

router
    .post('/sumar', calculadoraControllers.sumar)
    .post('/restar', calculadoraControllers.restar)
    .post('/multiplicar', calculadoraControllers.multiplicar)
    .post('/Mayor', calculadoraControllers.may)
    .post('/Menor', calculadoraControllers.men)
    .post('/Promedio', calculadoraControllers.prome)

module.exports = router;