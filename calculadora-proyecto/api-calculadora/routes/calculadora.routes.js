const express = require('express');
const router = express.Router();
const calculadoraControllers = require('../controllers/calculadoraControllers.js');

router
    .post('/sortAsc', calculadoraControllers.ordenarAscendente)    
    .post('/sortDesc', calculadoraControllers.ordenarDescendente)  
    .post('/equation', calculadoraControllers.resolverEcuacion)

module.exports = router;