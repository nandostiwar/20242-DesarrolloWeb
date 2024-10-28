const express = require('express');
const router = express.Router();
const { login, changePassword, createAccount, getCodigos, registrarCodigo } = require('./controllers/sorteoController.js');

router
    .post('/login', login) // Ruta para login
    .post('/change-password', changePassword) // Nueva ruta para cambiar la contraseña
    .post('/registro', createAccount) // Nueva ruta para crear cuentas
    .post('/createAdmin', createAdmin) // Nueva ruta para crear administradores
    .get('/codigos', getCodigos)
    .post('/codigos', registrarCodigo);

module.exports = router;
