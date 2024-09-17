const express = require('express');
const bodyParser = require('body-parser');
const calculadoraRoutes = require('./routes/calculadora.routes');

const app = express();
const port = 3500;

app.use(bodyParser.json());

// Usar las rutas definidas
app.use('/v1/calculadora', calculadoraRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});