const express = require('express');
const { urlencoded, json } = require('express');
const router = require('./routes/calculadora.routes.js');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); // Asegúrate de que CORS está configurado antes de cualquier otro middleware
app.use(json()); // Procesa las solicitudes con JSON
app.use(urlencoded({ extended: true })); // Procesa las solicitudes con datos URL-encoded

// Rutas
app.use('/v1/calculadora', router);

// Puerto
app.listen(3500, () => {
    console.log("Listening at port 3500");
});
