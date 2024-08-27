const express = require('express');
const router = express.Router();
const calculadoraControllers = require('../controllers/calculadoraControllers.js');

router.post('/sumar', calculadoraControllers.sumar);
router.post('/restar', calculadoraControllers.restar);
router.post('/multiplicar', calculadoraControllers.multiplicar);
router.post('/dividir', calculadoraControllers.dividir);
router.post('/numeroMayor', calculadoraControllers.numeroMayor);
router.post('/numeroMenor', calculadoraControllers.numeroMenor);
router.post('/promedio', calculadoraControllers.promedio);

module.exports = router;