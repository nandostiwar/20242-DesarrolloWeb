const express = require('express');
const router = express.Router();
const signoController = require('./controllers/signoController.js');

router
    .get('/', signoController.getAllSignos)
    .get('/:signo', signoController.getOneSigno)
    .patch('/:signoEditar', signoController.updateSigno)
    .post('/login', signoController.login)
    .post('/changePassword', signoController.changePassword)
    .post('/createUser', signoController.createUser);
    

module.exports = router;

