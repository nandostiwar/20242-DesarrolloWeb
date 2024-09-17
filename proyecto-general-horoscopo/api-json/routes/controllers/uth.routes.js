const express = require('express');
const router = express.Router();
const { authenticateUser } = require('./controllers/signoController');

// Ruta para autenticación
router.post('/login', authenticateUser);

module.exports = router;
