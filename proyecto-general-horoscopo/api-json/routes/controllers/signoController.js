const fs = require('fs/promises');
const path = require('path');

const getAllSignos = async (req, res) => {
    try {
        const signo = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
        const signosJson = JSON.parse(signo);
        res.json(signosJson);
    } catch (error) {
        res.status(500).json({ message: 'Error al leer el archivo de signos' });
    }
}

const getOneSigno = async (req, res) => {
    try {
        const oneSigno = req.params.signo;
        const allSignos = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
        const objSignos = JSON.parse(allSignos);
        const result = objSignos[oneSigno];
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ message: 'Signo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al leer el archivo de signos' });
    }
}

const updateSigno = async (req, res) => {
    try {
        const signoEditar = req.params.signoEditar;
        const { textoEditar } = req.body;
        const allSignos = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
        const objSignos = JSON.parse(allSignos);

        const objUpdate = {
            ...objSignos,
            [signoEditar]: textoEditar
        }

        await fs.writeFile(path.join(__dirname, '../../db/signos.json'), JSON.stringify(objUpdate, null, 2), { encoding: 'utf-8' });

        res.json({ message: 'Signo actualizado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el signo' });
    }
}

// Función para leer el archivo credenciales.json
const getCredentials = async () => {
    const filePath = path.join(__dirname, '../db/credenciales.json');
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
};

const authenticateUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Faltan credenciales' });
    }

    try {
        const credentials = await getCredentials();
        const user = credentials.find(
            (cred) => cred.username === username && cred.password === password
        );

        if (user) {
            return res.status(200).json({ role: user.role });
        } else {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error al autenticar al usuario' });
    }

};

module.exports = {
    getAllSignos,
    getOneSigno,
    authenticateUser,
    updateSigno
}
