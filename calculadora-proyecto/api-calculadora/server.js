const express = require('express');
const cors = require('cors');
const calculadoraRoutes = require('./routes/calculadora.routes');

const app = express();

// Middleware
app.use(cors()); // Habilita CORS para que el front-end pueda comunicarse con el back-end
app.use(express.json()); // Para procesar solicitudes JSON

// Rutas
app.use('/sort', calculadoraRoutes);
app.use('/calculate', calculadoraRoutes);

// Puerto
const PORT = process.env.PORT || 3000; // 3000 es un valor por defecto si no se define PORT en el entorno
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
