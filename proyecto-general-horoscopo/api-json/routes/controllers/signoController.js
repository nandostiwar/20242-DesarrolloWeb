const fs = require('fs/promises');
const path = require('path');

// Función para leer los archivos JSON y autenticar el usuario
const authenticateUser = async (username, password) => {
    try {
        let userData;
        if (username === 'user') {
            const userFile = await fs.readFile(path.join(__dirname, '../../db/user.json'), 'utf-8');
            userData = JSON.parse(userFile);
        } else if (username === 'admin') {
            const adminFile = await fs.readFile(path.join(__dirname, '../../db/admin.json'), 'utf-8');
            userData = JSON.parse(adminFile);
        } else {
            return { authenticated: false, role: null }; // Usuario no encontrado
        }

        // Comparar credenciales
        if (userData.username === username && userData.password === password) {
            return { authenticated: true, role: username }; // Autenticado
        } else {
            return { authenticated: false, role: null }; // Credenciales incorrectas
        }
    } catch (error) {
        console.error("Error al autenticar:", error);
        return { authenticated: false, role: null }; // Error al leer el archivo
    }
};

// Nueva ruta para el inicio de sesión
const login = async (req, res) => {
    const { username, password } = req.body;

    // Autenticación
    const authResult = await authenticateUser(username, password);

    if (authResult.authenticated) {
        res.json({ message: "Login exitoso", role: authResult.role });
    } else {
        res.status(401).json({ message: "Credenciales incorrectas" });
    }
};

// Función para cambiar la contraseña
const changePassword = async (req, res) => {
    const { username, currentPassword, newPassword } = req.body;
    let filePath;
    
    // Determina si es user o admin y establece la ruta correcta
    if (username === 'user') {
        filePath = path.join(__dirname, '../../db/user.json');
    } else if (username === 'admin') {
        filePath = path.join(__dirname, '../../db/admin.json');
    } else {
        return res.status(400).json({ message: 'Usuario no válido' });
    }

    try {
        // Leer archivo correspondiente (user.json o admin.json)
        const userData = await fs.readFile(filePath, 'utf-8');
        const userJson = JSON.parse(userData);

        // Verificar si la contraseña actual es correcta
        if (userJson.password !== currentPassword) {
            return res.status(401).json({ message: 'Contraseña actual incorrecta' });
        }

        // Actualizar la contraseña
        userJson.password = newPassword;

        // Escribir los cambios en el archivo
        await fs.writeFile(filePath, JSON.stringify(userJson, null, 2), 'utf-8');

        res.status(200).json({ message: 'Contraseña cambiada exitosamente' });
    } catch (error) {
        console.error('Error cambiando la contraseña:', error);
        res.status(500).json({ message: 'Error del servidor al cambiar la contraseña' });
    }
};

const getAllSignos = async (req, res) => {
    const signo = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const signosJson = JSON.parse(signo);
    res.json(signosJson);
};

const getOneSigno = async (req, res) => {
    const oneSigno = req.params.signo;
    const perfil = req.query.perfil || 'general'; // Nuevo parámetro de consulta para el perfil
    const allSignos = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);
    const result = objSignos[oneSigno] && objSignos[oneSigno][perfil] 
        ? objSignos[oneSigno][perfil] 
        : "Información no disponible para este perfil";
    res.json(result);
};

const updateSigno = async (req, res) => {
    const signoEditar = req.params.signoEditar;
    const { textoEditar, perfil } = req.body;
    const allSignos = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);
    
    if (!objSignos[signoEditar]) {
        objSignos[signoEditar] = {};
    }
    
    const objUpdate = {
        ...objSignos,
        [signoEditar]: {
            ...objSignos[signoEditar],
            [perfil]: textoEditar
        }
    };
    
    await fs.writeFile(path.join(__dirname, '../../db/signos.json'), JSON.stringify(objUpdate, null, 2), {encoding: 'utf-8'});
    res.json({
        message: "Updated"
    });
};

module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno,
    login, // Exportar la nueva función de login
    changePassword // Añadir nueva función exportada
};