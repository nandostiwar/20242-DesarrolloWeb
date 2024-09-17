// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const calculadora = require('./calculadora'); // Asegúrate de que la ruta sea correcta

const app = express();
const PORT = 3500;

app.use(bodyParser.json());

// Ruta para manejo de ordenamiento ascendente
app.post('/v1/calculadora/ascendente', (req, res) => {
  const { numbers } = req.body;

  if (!numbers || !Array.isArray(numbers)) {
    return res.status(400).json({ error: 'Invalid numbers array' });
  }

  // Ordenar números ascendentemente
  numbers.sort((a, b) => a - b);

  // Guardar en archivo JSON
  const filePath = path.join(__dirname, 'data-ascendente.json');
  fs.writeFile(filePath, JSON.stringify(numbers, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save data' });
    }
    res.status(200).json({ message: 'Data saved successfully', data: numbers });
  });
});

// Ruta para manejo de ordenamiento descendente
app.post('/v1/calculadora/descendente', (req, res) => {
  const { numbers } = req.body;

  if (!numbers || !Array.isArray(numbers)) {
    return res.status(400).json({ error: 'Invalid numbers array' });
  }

  // Ordenar números descendentemente
  numbers.sort((a, b) => b - a);

  // Guardar en archivo JSON
  const filePath = path.join(__dirname, 'data-descendente.json');
  fs.writeFile(filePath, JSON.stringify(numbers, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save data' });
    }
    res.status(200).json({ message: 'Data saved successfully', data: numbers });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
