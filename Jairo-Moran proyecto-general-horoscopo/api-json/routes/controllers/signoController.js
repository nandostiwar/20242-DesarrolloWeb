const fs = require('fs/promises');
const path = require('path');

// Nueva ruta para el inicio de sesión
const login = async (req, res) => {
    const { username, password } = req.body; // Datos del formulario
    const userFilePath = path.join(__dirname, '../../db/user.json');
    const adminFilePath = path.join(__dirname, '../../db/admin.json');

    try {
        // Leer archivos user.json y admin.json
        const [userData, adminData] = await Promise.all([
            fs.readFile(userFilePath, 'utf8'),
            fs.readFile(adminFilePath, 'utf8')
        ]);

        const users = JSON.parse(userData);
        const admins = JSON.parse(adminData);

        // Asegúrate de que ambos archivos son arrays
        const allUsers = Array.isArray(users) ? users : [];
        const allAdmins = Array.isArray(admins) ? admins : [];

        // Buscar el usuario en ambas listas (usuarios y administradores)
        const user = allUsers.find(u => u.username === username && u.password === password);
        const admin = allAdmins.find(a => a.username === username && a.password === password);

        if (user) {
            return res.status(200).json({ message: 'Login exitoso', role: 'user' });
        } else if (admin) {
            return res.status(200).json({ message: 'Login exitoso', role: 'admin' });
        } else {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error en el servidor' });
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

const createAccount = async (req, res) => {
    const { username, password, role } = req.body;
  
    if (!username || !password || !role) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }
  
    try {
      const filePath = role === 'admin' 
        ? path.join(__dirname, '../../db/admin.json') 
        : path.join(__dirname, '../../db/user.json');
  
      const fileData = await fs.readFile(filePath, 'utf-8');
      const users = JSON.parse(fileData);
  
      // Comprobar si el usuario ya existe
      const userExists = users.some(user => user.username === username);
      if (userExists) {
        return res.status(400).json({ message: 'El usuario ya existe.' });
      }
  
      // Agregar el nuevo usuario
      users.push({ username, password });
  
      await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');
  
      res.status(201).json({ success: true, message: 'Cuenta creada con éxito.' });
    } catch (error) {
      console.error('Error al crear cuenta:', error);
      res.status(500).json({ success: false, message: 'Error al crear la cuenta.' });
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
    changePassword, // Añadir nueva función exportada
    createAccount
};
