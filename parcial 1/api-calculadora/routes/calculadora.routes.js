const express = require('express');
const router = express.Router();
const calculadoraControllers = require('../controllers/calculadoraControllers.js');

router
    .post('/ascendente', calculadoraControllers.ordenarAscendente)
    .post('/descendente', calculadoraControllers.ordenarDescendente)
   

module.exports = router;