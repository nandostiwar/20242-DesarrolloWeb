const express = require('express');
const router = express.Router();
const signoController = require('./controllers/signoController.js');
const { login, changePassword } = require('./controllers/signoController.js');

// Middleware para manejar errores
const errorHandler = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    };
};

router
    .get('/', errorHandler(signoController.getAllSignos))
    .get('/:signo', errorHandler(signoController.getOneSigno))
    .patch('/:signoEditar', errorHandler(signoController.updateSigno))
    .post('/login', errorHandler(login))
    .post('/change-password', errorHandler(changePassword));

module.exports = router;