const express = require('express');
const { ordenarAscendente, ordenarDescendente, resolverEcuacion } = require('./controllers/calculadoraControllers.js');

const router = express.Router();

router.post('/ascendente', ordenarAscendente);
router.post('/descendente', ordenarDescendente);
router.post('/ecuacion', resolverEcuacion); 

module.exports = router;
