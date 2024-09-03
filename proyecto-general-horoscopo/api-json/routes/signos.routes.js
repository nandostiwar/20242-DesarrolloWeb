module.exports = router;
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

// Ruta para la autenticación
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Leer el archivo credenciales.json
    const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, 'credenciales.json'), 'utf-8'));

    // Verificar credenciales
    if (credentials[username] && credentials[username] === password) {
        res.json({ role: username === 'admin' ? 'admin' : 'user' });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.listen(4000, () => {
    console.log('Backend running on port 4000');
});
