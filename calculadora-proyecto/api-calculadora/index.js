// index.js

const express = require('express');
const bodyParser = require('body-parser');
const calculadoraRoutes = require('./calculadora.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/calculadora', calculadoraRoutes);

// Servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
