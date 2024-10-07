const fs = require('fs/promises');
const path = require('path');

// Función para verificar las credenciales
const verifyCredentials = async (role, username, password) => {
    const filePath = path.join(__dirname, `../../db/${role}.json`);
    const data = await fs.readFile(filePath, { encoding: 'utf-8' });
    const users = JSON.parse(data);

    const user = users.find(user => user.username === username && user.password === password);
    return user ? true : false;
};

const ChangePassword = async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;
    const userFilePath = path.join(__dirname, '../../db/user.json');
    const adminFilePath = path.join(__dirname, '../../db/admin.json');

    try {
        const userData = await fs.readFile(userFilePath, 'utf-8');
        const adminData = await fs.readFile(adminFilePath, 'utf-8');

        const users = JSON.parse(userData).users;
        const admins = JSON.parse(adminData).admins;

        let userIndex = users.findIndex(user => user.username === username && user.password === oldPassword);
        let adminIndex = admins.findIndex(admin => admin.username === username && admin.password === oldPassword);

        if (userIndex === -1 && adminIndex === -1) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        if (userIndex !== -1) {
            users[userIndex].password = newPassword;
            await fs.writeFile(userFilePath, JSON.stringify({ users }, null, 2), { encoding: 'utf-8' });
            return res.json({ message: 'Contraseña de usuario cambiada con éxito.' });
        }

        if (adminIndex !== -1) {
            admins[adminIndex].password = newPassword;
            await fs.writeFile(adminFilePath, JSON.stringify({ admins }, null, 2), { encoding: 'utf-8' });
            return res.json({ message: 'Contraseña de administrador cambiada con éxito.' });
        }

    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        res.status(500).json({ error: 'Error al cambiar la contraseña.' });
    }
};

const login = async (req, res) => {
    const userFilePath = path.join(__dirname, '../../db/user.json');
    const adminFilePath = path.join(__dirname, '../../db/admin.json');
    const { username, password } = req.body;

    try {
        const userData = await fs.readFile(userFilePath, 'utf-8');
        const adminData = await fs.readFile(adminFilePath, 'utf-8');

        const users = JSON.parse(userData).users;
        const admins = JSON.parse(adminData).admins;

        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            return res.json({ role: 'user' });
        }

        const admin = admins.find(a => a.username === username && a.password === password);
        if (admin) {
            return res.json({ role: 'admin' });
        }

        return res.status(401).json({ error: 'Credenciales inválidas' });
    } catch (error) {
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};

const getAllSignos = async (req, res) => {
    const signo = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const signosJson = JSON.parse(signo);
    res.json(signosJson);
};

const getOneSigno = async (req, res) => {
    const oneSigno = req.params.signo;
    const allSignos = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);
    const result = objSignos[oneSigno];
    res.json(result);
};

const updateSigno = async (req, res) => {
    const signoEditar = req.params.signoEditar;
    const { textoEditar } = req.body;
    const allSignos = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);

    const objUpdate = {
        ...objSignos,
        [signoEditar]: textoEditar,
    };

    await fs.writeFile(path.join(__dirname, '../../db/signos.json'), JSON.stringify(objUpdate, null, 2), { encoding: 'utf-8' });

    res.json({
        message: 'Updated',
    });
};

const getHoroscopoByPersona = async (req, res) => {
    const { signo, tipoPersona } = req.params;
    const validTipos = ['niño', 'mujer', 'hombre'];

    if (!validTipos.includes(tipoPersona)) {
        return res.status(400).json({ message: 'Tipo de persona no válido' });
    }

    try {
        const allSignos = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
        const objSignos = JSON.parse(allSignos);

        if (!objSignos[signo]) {
            return res.status(404).json({ message: 'Signo no encontrado' });
        }

        const horoscopo = objSignos[signo][tipoPersona];

        if (!horoscopo) {
            return res.status(404).json({ message: 'Horóscopo no disponible para este tipo de persona' });
        }

        res.json({ signo, tipoPersona, horoscopo });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

const addUser = async (req, res) => {
    const { username, password, role } = req.body;

    if (!['admin', 'user'].includes(role)) {
        return res.status(400).json({ error: 'Rol no válido' });
    }

    const filePath = path.join(__dirname, `../../db/${role}.json`);

    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const usersData = JSON.parse(data);

        const userExists = usersData[`${role}s`].some(user => user.username === username);
        if (userExists) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        const newUser = { username, password };

        usersData[`${role}s`].push(newUser);

        await fs.writeFile(filePath, JSON.stringify(usersData, null, 2), { encoding: 'utf-8' });

        return res.status(201).json({ message: `Nuevo ${role} agregado con éxito.` });
    } catch (error) {
        console.error('Error al agregar el nuevo usuario:', error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno,
    login,
    ChangePassword,
    getHoroscopoByPersona,
    addUser
};
