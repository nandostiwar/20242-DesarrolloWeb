const fs = require('fs/promises');
const path = require('path');

// Obtener todos los signos
const getAllSignos = async (req, res) => {
    const signo = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const signosJson = JSON.parse(signo);
    res.json(signosJson);
}

// Obtener un signo específico
const getOneSigno = async (req, res) => {
    const oneSigno = req.params.signo;
    const allSignos = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);
    const result = objSignos[oneSigno];
    res.json(result);
}

// Actualizar un signo
const updateSigno = async (req, res) => {
    const signoEditar = req.params.signoEditar;
    const { textoEditar } = req.body;
    const allSignos = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);

    const objUpdate = {
        ...objSignos,
        [signoEditar]: textoEditar
    }

    await fs.writeFile(path.join(__dirname, '../../db/signos.json'), JSON.stringify(objUpdate, null, 2), { encoding: 'utf-8' });

    res.json({
        message: "Updated"
    });
}

const login = async (req, res) => {
    const usersFilePath = path.join(__dirname, '../../db/user.json');
    const adminsFilePath = path.join(__dirname, '../../db/admin.json');
    const { username, password } = req.body;

    try {
        // Leer archivos de usuarios y admins
        const usersData = await fs.readFile(usersFilePath, 'utf-8');
        const adminsData = await fs.readFile(adminsFilePath, 'utf-8');

        const users = JSON.parse(usersData).users;
        const admins = JSON.parse(adminsData).admins;

        // Buscar en el archivo de usuarios
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            return res.json({ role: 'user' }); // Usuario regular
        }

        // Buscar en el archivo de admins
        const admin = admins.find(a => a.username === username && a.password === password);
        if (admin) {
            return res.json({ role: 'admin' }); // Administrador
        }

        // Si no se encontró en ninguno de los archivos, credenciales inválidas
        return res.status(401).json({ error: 'Credenciales inválidas' });

    } catch (error) {
        return res.status(500).json({ error: 'Error al leer los archivos de credenciales' });
    }
};


// Cambiar contraseña de usuario
const changePassword = async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;
    const userFilePath = path.join(__dirname, '../../db/user.json');
    const adminFilePath = path.join(__dirname, '../../db/admin.json');

    try {
        // Leer los archivos de usuarios y administradores
        const userData = await fs.readFile(userFilePath, 'utf-8');
        const adminData = await fs.readFile(adminFilePath, 'utf-8');

        const users = JSON.parse(userData).users;
        const admins = JSON.parse(adminData).admins;

        let userIndex = users.findIndex(user => user.username === username && user.password === oldPassword);
        let adminIndex = admins.findIndex(admin => admin.username === username && admin.password === oldPassword);

        // Si el usuario no se encuentra en usuarios ni en administradores
        if (userIndex === -1 && adminIndex === -1) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        // Actualizar la contraseña si es un usuario
        if (userIndex !== -1) {
            users[userIndex].password = newPassword;

            // Guardar el archivo de usuarios actualizado
            await fs.writeFile(userFilePath, JSON.stringify({ users }, null, 2), { encoding: 'utf-8' });

            return res.json({ message: 'Contraseña de usuario cambiada con éxito.' });
        }

        // Actualizar la contraseña si es un administrador
        if (adminIndex !== -1) {
            admins[adminIndex].password = newPassword;

            // Guardar el archivo de administradores actualizado
            await fs.writeFile(adminFilePath, JSON.stringify({ admins }, null, 2), { encoding: 'utf-8' });

            return res.json({ message: 'Contraseña de administrador cambiada con éxito.' });
        }

    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        res.status(500).json({ error: 'Error al cambiar la contraseña.' });
    }
};

// Crear nuevo usuario
const createUser = async (req, res) => {
    const { username, password, role } = req.body; // Desestructuramos el cuerpo de la solicitud

    // Determinamos el archivo donde se guardará el nuevo usuario
    const userFilePath = path.join(__dirname, '../../db/user.json');
    const adminFilePath = path.join(__dirname, '../../db/admin.json');

    try {
        // Leemos el archivo correspondiente según el rol
        let users, admins;
        if (role === 'user') {
            const userData = await fs.readFile(userFilePath, 'utf-8');
            users = JSON.parse(userData).users;
            
            // Verificamos si el usuario ya existe
            const existingUser = users.find(u => u.username === username);
            if (existingUser) {
                return res.status(400).json({ error: 'El nombre de usuario ya existe.' });
            }

            // Agregamos el nuevo usuario
            users.push({ username, password });
            await fs.writeFile(userFilePath, JSON.stringify({ users }, null, 2), { encoding: 'utf-8' });
            return res.json({ message: 'Usuario creado con éxito.' });

        } else if (role === 'admin') {
            const adminData = await fs.readFile(adminFilePath, 'utf-8');
            admins = JSON.parse(adminData).admins;

            // Verificamos si el administrador ya existe
            const existingAdmin = admins.find(a => a.username === username);
            if (existingAdmin) {
                return res.status(400).json({ error: 'El nombre de usuario ya existe.' });
            }

            // Agregamos el nuevo administrador
            admins.push({ username, password });
            await fs.writeFile(adminFilePath, JSON.stringify({ admins }, null, 2), { encoding: 'utf-8' });
            return res.json({ message: 'Administrador creado con éxito.' });
        } else {
            return res.status(400).json({ error: 'Rol inválido. Debe ser "user" o "admin".' });
        }

    } catch (error) {
        console.error('Error al crear el usuario:', error);
        return res.status(500).json({ error: 'Error en el servidor.' });
    }
};



module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno,
    login,
    changePassword,
    createUser
}
