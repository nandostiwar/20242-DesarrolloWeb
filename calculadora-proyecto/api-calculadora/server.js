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
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
