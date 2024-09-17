const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3500;

// Importar rutas
const calculadoraRoutes = require('./routes/calculadora.routes');

app.use(cors());
app.use(express.json());

// Usar las rutas
app.use('/api/calculadora', calculadoraRoutes);


app.listen(3500, ()=>{
    console.log("Listening at port 3500");
})