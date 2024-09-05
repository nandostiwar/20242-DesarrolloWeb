const fs = require('fs/promises');
const path = require('path');

const getAllSignos = async (req, res) => {
    try {
        const signo = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
        const signosJson = JSON.parse(signo);
        res.json(signosJson);
    } catch (error) {
        res.status(500).json({ message: "Error reading signos file" });
    }
};

const getOneSigno = async (req, res) => {
    try {
        const oneSigno = req.params.signo;
        const allSignos = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
        const objSignos = JSON.parse(allSignos);
        const result = objSignos[oneSigno];
        res.json(result || { message: "Signo not found" });
    } catch (error) {
        res.status(500).json({ message: "Error reading signos file" });
    }
};

const updateSigno = async (req, res) => {
    try {
        const signoEditar = req.params.signo;
        const { textoEditar } = req.body;
        const allSignos = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
        const objSignos = JSON.parse(allSignos);

        objSignos[signoEditar] = textoEditar;

        await fs.writeFile(path.join(__dirname, '../../db/signos.json'), JSON.stringify(objSignos, null, 2), { encoding: 'utf-8' });

        res.json({ message: "Updated" });
    } catch (error) {
        res.status(500).json({ message: "Error updating signos file" });
    }
};

const setCredenciales = async (req, res) => {
    try {
        const { username, password } = req.body;
        const credenciales = await fs.readFile(path.join(__dirname, '../../db/credenciales.json'));
        const users = JSON.parse(credenciales).users;

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            res.json({ role: user.role });
        } else {
            res.status(401).json({ message: "Credenciales incorrectas" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error processing login" });
    }
};
const changePassword = async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;
    const credenciales = await fs.readFile(path.join(__dirname, '../../db/credenciales.json'));
    const users = JSON.parse(credenciales).users;

    const userIndex = users.findIndex(user => user.username === username && user.password === oldPassword);

    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        await fs.writeFile(path.join(__dirname, '../../db/credenciales.json'), JSON.stringify({ users }, null, 2), { encoding: 'utf-8' });
        res.json({ message: 'Contraseña cambiada con éxito.' });
    } else {
        res.status(400).json({ message: 'Usuario o contraseña incorrectos.' });
    }
};

module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno,
    setCredenciales,
    changePassword
};