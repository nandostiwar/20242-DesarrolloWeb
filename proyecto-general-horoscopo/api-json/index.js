const express = require('express');
const { urlencoded, json } = require('express');
const signoRoutes = require('./routes/signos.routes.js'); // Rutas de signos
const authRoutes = require('./routes/auth.routes.js'); // Rutas de autenticación
const cors = require('cors');

const app = express();

// Middleware para parsear el cuerpo de las solicitudes
app.use(json());
app.use(urlencoded({ extended: true }));

// Habilitar CORS
app.use(cors());

// Rutas de la API
app.use('/v1/signos', signoRoutes);
app.use('/v1', authRoutes); // Monta las rutas de autenticación en /v1

// Iniciar el servidor
app.listen(4000, () => {
    console.log('Listening at port 4000');
});
