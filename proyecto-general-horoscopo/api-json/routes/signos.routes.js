const express = require('express');
const router = express.Router();
const signoController = require('./controllers/signoController.js');

// Rutas para signos
router
    .get('/', signoController.getAllSignos)
    .get('/:signo', signoController.getOneSigno)
    .patch('/:signoEditar', signoController.updateSigno)
    .post('/login', signoController.login)
    .post('/changePassword', signoController.changePassword)  // Ruta para cambiar la contraseña
    .post('/createUser', signoController.createUser); // Ruta para crear un nuevo usuario

module.exports = router;

