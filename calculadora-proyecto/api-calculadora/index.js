const express = require('express');
const cors = require('cors');
const calculadoraRoutes = require('./routes/calculadora.routes.js');  // Importa tus rutas

const app = express();

app.use(cors());
app.use(express.json());

// Usa el router para las rutas calculadora
app.use('/v1/calculadora', calculadoraRoutes);

app.listen(3500, () => {
    console.log('Server running on port 3500');
});
