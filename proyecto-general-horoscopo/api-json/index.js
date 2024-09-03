const express = require('express');
const { urlencoded, json } = require('express');
const signosRouter = require('./routes/signos.routes.js'); // Rutas de signos
const authRouter = require('./routes/authRoutes.js'); // Rutas de autenticación
const cors = require('cors');

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.use(cors());

// Usar las rutas de signos
app.use('/v1/signos', signosRouter);

// Usar las rutas de autenticación
app.use('/api', authRouter);

app.listen(4000, () => {
    console.log('Backend running on port 4000');
});
