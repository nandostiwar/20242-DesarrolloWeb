const express = require('express');
const router = express.Router();
const signoController = require('./controllers/signoController.js');

// Rutas para manejar signos
router
    .get('/', signoController.getAllSignos)          // Obtener todos los signos
    .get('/:signo', signoController.getOneSigno)      // Obtener un signo específico
    .patch('/:signoEditar', signoController.updateSigno); // Actualizar un signo

// Ruta para autenticación
router.post('/auth', signoController.authenticateUser);

module.exports = router;
