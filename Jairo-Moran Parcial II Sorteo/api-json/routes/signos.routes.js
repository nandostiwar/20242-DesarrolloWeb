const express = require('express');
const router = express.Router();
const signoController = require('./controllers/signoController.js');
const { login, changePassword, createAccount } = require('./controllers/signoController.js');

router
    .get('/', signoController.getAllSignos)
    .get('/:signo', signoController.getOneSigno)
    .patch('/:signoEditar', signoController.updateSigno)
    .post('/login', login) // Ruta para login
    .post('/change-password', changePassword) // Nueva ruta para cambiar la contraseña
    .post('/create-account', createAccount); // Nueva ruta para crear cuentas

module.exports = router;
