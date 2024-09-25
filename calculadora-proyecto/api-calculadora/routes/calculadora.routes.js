const express = require('express');
const router = express.Router();
const calculadoraControllers = require('../controllers/calculadoraControllers');



// Definición de rutas usando los controladores
router
    .post('/sortAsc', calculadoraControllers.ordenarAscendente)    // Ordenar de forma ascendente
    .post('/sortDesc', calculadoraControllers.ordenarDescendente)  // Ordenar de forma descendente
    .post('/equation', calculadoraControllers.resolverEcuacion);    // Resolver ecuaciones

module.exports = router;


