const fs = require('fs');
const path = require('path');

// Ruta al archivo credenciales.json
const credencialesPath = path.join(__dirname, '../db/credenciales.json');

// Función para leer las credenciales
function leerCredenciales() {
    const data = fs.readFileSync(credencialesPath);
    return JSON.parse(data).usuarios;
}

// Función para verificar las credenciales del usuario
function verificarCredenciales(username, password) {
    const usuarios = leerCredenciales();
    const usuario = usuarios.find(user => user.username === username && user.password === password);
    return usuario !== undefined;
}

// Función para actualizar la contraseña del usuario
function actualizarContraseña(username, nuevaContraseña) {
    const usuarios = leerCredenciales();
    const usuarioIndex = usuarios.findIndex(user => user.username === username);

    if (usuarioIndex !== -1) {
        usuarios[usuarioIndex].password = nuevaContraseña;
        fs.writeFileSync(credencialesPath, JSON.stringify({ usuarios }, null, 2));
        return true;
    }

    return false;
}

module.exports = {
    verificarCredenciales,
    actualizarContraseña
};
