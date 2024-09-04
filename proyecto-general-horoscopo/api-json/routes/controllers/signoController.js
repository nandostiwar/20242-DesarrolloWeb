const fs = require('fs/promises');
const path = require('path');

const getAllSignos = async (req, res)=>{
    const signo = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const signosJson = JSON.parse(signo);
    res.json(signosJson);
}

const getOneSigno = async (req, res)=>{
    const oneSigno = req.params.signo;
    const allSignos = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);
    const result = objSignos[oneSigno];
    res.json(result);
}

const updateSigno = async (req, res)=>{
    const signoEditar = req.params.signoEditar;
    const {textoEditar} = req.body;
    const allSignos = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);

    const objUpdate = {
        ...objSignos,
        [signoEditar]: textoEditar
    }

    await fs.writeFile(path.join(__dirname,'../../db/signos.json'), JSON.stringify(objUpdate, null, 2), {encoding: 'utf-8'});

    res.json({
        message: "Updated"
    });
}

// Controlador para manejar la autenticación
const login = async (req, res) => {
    const fs = require('fs');
    const path = require('path');

    const credencialesFilePath = path.join(__dirname, '../../db/credenciales.json');

    const getCredencialesFromFile = () => {
        const data = fs.readFileSync(credencialesFilePath, 'utf-8');
        return JSON.parse(data).users;
    }

    const { username, password } = req.body;

    const users = getCredencialesFromFile();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        return res.json({ role: username });
    } else {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }
};

module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno,
    login
}
