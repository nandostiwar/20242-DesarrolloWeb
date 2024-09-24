const express = require('express');
const { urlencoded, json } = require('express');
const fs = require('fs/promises');
const router = require('./routes/signos.routes.js');
const cors = require('cors');

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.use('/v1/signos', router);

// Función para validar credenciales desde archivos JSON
const validateCredentials = async (username, password) => {
    try {
        if (username === 'user') {
            const data = await fs.readFile('./User.json', 'utf-8');
            const { username: storedUser, password: storedPassword } = JSON.parse(data);
            return storedUser === username && storedPassword === password;
        } else if (username === 'admin') {
            const data = await fs.readFile('./admin.json', 'utf-8');
            const { username: storedUser, password: storedPassword } = JSON.parse(data);
            return storedUser === username && storedPassword === password;
        }
        return false;
    } catch (err) {
        console.error('Error reading file', err);
        return false;
    }
};

// Ruta para manejar el login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const isValid = await validateCredentials(username, password);

    if (isValid) {
        if (username === 'user') {
            res.json({ role: 'user', redirectTo: '/userHome' });
        } else if (username === 'admin') {
            res.json({ role: 'admin', redirectTo: '/adminHome' });
        }
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Servidor corriendo en puerto 4000
app.listen(4000, () => {
    console.log('Listening at port 4000');
});
