const fs = require('fs/promises');
const path = require('path');

const getAllSignos = async (req, res) => {
    const signo = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const signosJson = JSON.parse(signo)
    res.json(signosJson);
}

const getOneSigno = async (req, res) => {
    const oneSigno = req.params.signo;
    const allSignos = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);
    const result = objSignos[oneSigno];
    res.json(result)
}

const updateSigno = async (req, res) => {
    const signoEditar = req.params.signoEditar;
    const { textoEditar } = req.body;
    const allSignos = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);

    const objUpdate = {
        ...objSignos,
        [signoEditar]: textoEditar
    }

    // console.log(objUpdate);
    await fs.writeFile(path.join(__dirname, '../../db/signos.json'), JSON.stringify(objUpdate, null, 2), { encoding: 'utf-8' })

    res.json({
        message: "Updated"
    })
}

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Intenta primero buscar en credentials.json (usuarios normales)
        let credentialsPath = path.join(__dirname, '../../db/credentials.json');
        let credentialsData = await fs.readFile(credentialsPath, 'utf-8');
        let credentials = JSON.parse(credentialsData);

        let user = credentials[username];

        // Si no encuentra en credentials.json, busca en credentialsadmin.json (administradores)
        if (!user) {
            credentialsPath = path.join(__dirname, '../../db/credentialsadmin.json');
            credentialsData = await fs.readFile(credentialsPath, 'utf-8');
            credentials = JSON.parse(credentialsData);
            user = credentials[username];
        }

        if (user && user.password === password) {
            const response = { success: true, role: user.role, message: 'Datos ingresados correctamente' };
            res.json(response);
        } else {
            const response = { success: false, message: 'Datos incorrectos' };
            res.json(response);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
};
const changePassword = async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;

    try {
        let credentialsPath = path.join(__dirname, '../../db/credentials.json');
        let credentialsData = await fs.readFile(credentialsPath, 'utf-8');
        let credentials = JSON.parse(credentialsData);

        // Busca primero en credentials.json
        let user = credentials[username];

        // Si no encuentra en credentials.json, busca en credentialsadmin.json
        if (!user) {
            credentialsPath = path.join(__dirname, '../../db/credentialsadmin.json');
            credentialsData = await fs.readFile(credentialsPath, 'utf-8');
            credentials = JSON.parse(credentialsData);
            user = credentials[username];
        }

        // Verifica si el usuario existe y si la contraseña antigua es correcta
        if (user && user.password === oldPassword) {
            // Actualiza la contraseña
            user.password = newPassword;
            await fs.writeFile(credentialsPath, JSON.stringify(credentials, null, 2), 'utf-8');
            res.json({ success: true, message: 'Contraseña cambiada exitosamente' });
        } else {
            res.status(400).json({ success: false, message: 'Nombre de usuario o contraseña antigua incorrectos' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
};

const createUser = async (req, res) => {
    const { username, password } = req.body;
    const role = 'user'; // Asignamos el rol de 'user' por defecto

    console.log('Received data:', { username, password, role });

    try {
        const credentialsPath = path.join(__dirname, '../../db/credentials.json');

        const credentialsData = await fs.readFile(credentialsPath, 'utf-8');
        const credentials = JSON.parse(credentialsData);

        // Verifica si el usuario ya existe
        if (credentials[username]) {
            return res.status(400).json({ success: false, message: 'Usuario ya existe' });
        }

        // Guarda el nuevo usuario con el rol de 'user'
        credentials[username] = { password, role }; // Aquí se guarda el rol
        await fs.writeFile(credentialsPath, JSON.stringify(credentials, null, 2), 'utf-8');
        res.json({ success: true, message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
};
const createAdmin = async (req, res) => {
    const { username, password } = req.body;
    const role = 'admin'; // Asignamos el rol de 'admin'

    try {
        const credentialsPath = path.join(__dirname, '../../db/credentialsadmin.json');

        const credentialsData = await fs.readFile(credentialsPath, 'utf-8');
        const credentials = JSON.parse(credentialsData);

        // Verifica si el administrador ya existe
        if (credentials[username]) {
            return res.status(400).json({ success: false, message: 'Administrador ya existe' });
        }

        // Guarda el nuevo administrador
        credentials[username] = { password, role };
        await fs.writeFile(credentialsPath, JSON.stringify(credentials, null, 2), 'utf-8');
        res.json({ success: true, message: 'Administrador creado exitosamente' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
};


module.exports = {
    getAllSignos,
    login,
    getOneSigno,
    changePassword,
    updateSigno,
    createUser,
    createAdmin
}