const express = require('express');
const router = express.Router();
const calculadoraControllers = require('../controllers/calculadoraControllers.js');

router
    .post('/ascendente', calculadoraControllers.ascendenteHandler)
    .post('/descendente', calculadoraControllers.descendenteHandler)
    .post('/ecuacion', calculadoraControllers.ecuacionHandler);

module.exports = router;