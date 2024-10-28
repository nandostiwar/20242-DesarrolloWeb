const fs = require('fs/promises');
const path = require('path');

const userFilePath = path.join(__dirname, '../../db/user.json');
const adminFilePath = path.join(__dirname, '../../db/admin.json');
const registrosFilePath = path.join(__dirname, '../../db/registros.json');

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [userData, adminData] = await Promise.all([
            fs.readFile(userFilePath, 'utf8'),
            fs.readFile(adminFilePath, 'utf8')
        ]);

        const users = JSON.parse(userData);
        const admins = JSON.parse(adminData);

        const allUsers = Array.isArray(users) ? users : [];
        const allAdmins = Array.isArray(admins) ? admins : [];

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

const changePassword = async (req, res) => {
    const { username, currentPassword, newPassword } = req.body;
    let filePath;
    
    if (username === 'user') {
        filePath = path.join(__dirname, '../../db/user.json');
    } else if (username === 'admin') {
        filePath = path.join(__dirname, '../../db/admin.json');
    } else {
        return res.status(400).json({ message: 'Usuario no válido' });
    }

    try {
        const userData = await fs.readFile(filePath, 'utf-8');
        const userJson = JSON.parse(userData);

        if (userJson.password !== currentPassword) {
            return res.status(401).json({ message: 'Contraseña actual incorrecta' });
        }

        userJson.password = newPassword;
        await fs.writeFile(filePath, JSON.stringify(userJson, null, 2), 'utf-8');

        res.status(200).json({ message: 'Contraseña cambiada exitosamente' });
    } catch (error) {
        console.error('Error cambiando la contraseña:', error);
        res.status(500).json({ message: 'Error del servidor al cambiar la contraseña' });
    }
};

const createAccount = async (req, res) => {
    const { nombre, fechaNacimiento, cedula, correo, celular, ciudad, password, role } = req.body;

    if (!nombre || !fechaNacimiento || !cedula || !correo || !celular || !ciudad || !password || !role) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const today = new Date().toISOString().split('T')[0];
    if (fechaNacimiento > today) {
        return res.status(400).json({ message: 'La fecha de nacimiento no puede ser futura.' });
    }

    try {
        const filePath = role === 'admin' 
            ? path.join(__dirname, '../../db/admin.json') 
            : path.join(__dirname, '../../db/user.json');

        const fileData = await fs.readFile(filePath, 'utf-8');
        const users = JSON.parse(fileData);

        const userExists = users.some(user => user.cedula === cedula || user.correo === correo);
        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya existe.' });
        }

        users.push({ nombre, fechaNacimiento, cedula, correo, celular, ciudad, password });
        await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');

        res.status(201).json({ success: true, message: 'Cuenta creada con éxito.' });
    } catch (error) {
        console.error('Error al crear cuenta:', error);
        res.status(500).json({ success: false, message: 'Error al crear la cuenta.' });
    }
};

const createAdmin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const adminFilePath = path.join(__dirname, '../../db/admin.json');

    try {
        const adminData = await fs.readFile(adminFilePath, 'utf-8');
        const admins = JSON.parse(adminData);

        const adminExists = admins.some(admin => admin.username === username);
        if (adminExists) {
            return res.status(400).json({ message: 'El administrador ya existe.' });
        }

        admins.push({ username, password });
        await fs.writeFile(adminFilePath, JSON.stringify(admins, null, 2), 'utf-8');

        res.status(201).json({ message: 'Administrador creado con éxito.' });
    } catch (error) {
        console.error('Error al crear el administrador:', error);
        res.status(500).json({ message: 'Error al crear el administrador.' });
    }
};

// Ruta para obtener todos los códigos registrados
const getCodigos = async (req, res) => {
    try {
      const data = await fs.readFile(registrosFilePath, 'utf-8');
      const registros = JSON.parse(data);
      res.status(200).json(registros);
    } catch (error) {
      console.error('Error al obtener los registros:', error);
      res.status(500).json({ message: 'Error al obtener los registros' });
    }
  };
  
// Ruta para registrar un nuevo código
const registrarCodigo = async (req, res) => {
    const { codigo } = req.body;
    const now = new Date();
    
    if (!/^\d{3}$/.test(codigo)) {
      return res.status(400).json({ message: 'El código debe ser un número de 3 dígitos entre 000 y 999.' });
    }
  
    const nuevoRegistro = {
      codigo,
      fecha: now.toISOString().split('T')[0],
      hora: now.toTimeString().split(' ')[0],
      premio: 'Premio pendiente'
    };
  
    try {
      // Leer los registros actuales
      const data = await fs.readFile(registrosFilePath, 'utf-8');
      const registros = JSON.parse(data);
  
      // Agregar el nuevo registro
      registros.push(nuevoRegistro);
  
      // Guardar en el archivo
      await fs.writeFile(registrosFilePath, JSON.stringify(registros, null, 2), 'utf-8');
      res.status(201).json({ success: true, nuevoRegistro });
    } catch (error) {
      console.error('Error al registrar el código:', error);
      res.status(500).json({ message: 'Error al registrar el código' });
    }
  };

module.exports = {
    login,
    changePassword,
    createAccount,
    createAdmin,
    getCodigos,
    registrarCodigo
};
