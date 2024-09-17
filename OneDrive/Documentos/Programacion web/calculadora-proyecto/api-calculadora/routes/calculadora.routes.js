const express = require('express');
const router = express.Router();
const calculadoraControllers = require('../controllers/calculadoraControllers.js');

router
    .post('/sumar', calculadoraControllers.sumar)
    .post('/restar', calculadoraControllers.restar)
    .post('/multiplicar', calculadoraControllers.multiplicar)
    .post('/Promedio', calculadoraControllers.Promedio)
    .post('/mayor_que', calculadoraControllers.mayor_que)
    .post('/Menor', calculadoraControllers.Menor)
    
module.exports = router;