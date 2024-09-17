const express = require('express');
const { ordenarAscendente, ordenarDescendente, resolverEcuacion } = require('./controllers/calculadoraControllers.js');

const router = express.Router();

router.post('/ascendente', ordenarAscendente);
router.post('/descendente', ordenarDescendente);
router.post('/ecuacion', resolverEcuacion); // Nueva ruta para resolver ecuaciones

module.exports = router;

