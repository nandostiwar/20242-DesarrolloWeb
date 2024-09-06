const express = require('express');
const router = express.Router();
const signoController = require('../controllers/signoController.js');

router
    .get('/', signoController.getAllSignos)
    .get('/:signo', signoController.getOneSigno)
    .post('/:signo', signoController.updateSigno)
    .post('/login', signoController.setCredenciales)
    .post('/changePassword', signoController.changePassword);

module.exports = router;