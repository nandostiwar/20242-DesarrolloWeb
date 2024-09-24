const fs = require('fs/promises');
const path = require('path');

const getAllSignos = async (req, res)=>{
    const signo = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const signosJson = JSON.parse(signo)
    res.json(signosJson);
}

const getOneSigno = async (req, res)=>{
    const oneSigno = req.params.signo;
    const allSignos = await fs.readFile(path.join(__dirname,'../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);
    const result = objSignos[oneSigno];
    res.json(result)
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

    // console.log(objUpdate);
    await fs.writeFile(path.join(__dirname,'../../db/signos.json'), JSON.stringify(objUpdate, null, 2), {encoding: 'utf-8'})

    res.json({
        message: "Updated"
    })
}

const compareLogin = async (req, res) => {
    const { body } = req;
    const { username, password } = body;

    console.log("Recibí user: " + username);
    console.log("Recibí pass: " + password);

    try {
        
        const adminData = await fs.readFile(path.join(__dirname, '../../db/admin.json'), 'utf-8');
        const adminCredentials = JSON.parse(adminData);

        if (username === adminCredentials.adminId && password === adminCredentials.adminPass) {
            return res.json({ resultado: "admin" });
        }

        const usersData = await fs.readFile(path.join(__dirname, '../../db/users.json'), 'utf-8');
        const usersCredentials = JSON.parse(usersData);

        const user = usersCredentials.users.find(u => u.username === username && u.password === password);
        if (user) {
            return res.json({ resultado: "user" });
        }
        return res.json({ resultado: "Credenciales inválidas" });
    } catch (error) {
        console.error("Error leyendo los archivos de credenciales:", error);
        return res.status(500).json({ resultado: "Error interno del servidor" });
    }
};


const updatepassword = async (req, res) => {
    const { username, password, update } = req.body;

    console.log("Recibí user: " + username);
    console.log("Recibí pass: " + password);
    console.log("Nuevo pass: " + update);

    try {
        
        const usersData = await fs.readFile(path.join(__dirname, '../../db/users.json'), 'utf-8');
        const users = JSON.parse(usersData).users;

        
        const userIndex = users.findIndex(user => user.username === username && user.password === password);

        if (userIndex !== -1) {
           
            users[userIndex].password = update;

            await fs.writeFile(path.join(__dirname, '../../db/users.json'), JSON.stringify({ users }, null, 2), 'utf-8');

            return res.json({ resultado: "Contraseña de usuario actualizada correctamente" });
        }

        
        const adminData = await fs.readFile(path.join(__dirname, '../../db/admin.json'), 'utf-8');
        const admins = JSON.parse(adminData).admins;

        
        const adminIndex = admins.findIndex(admin => admin.adminId === username && admin.adminPass === password);

        if (adminIndex !== -1) {
            
            admins[adminIndex].adminPass = update;

            
            await fs.writeFile(path.join(__dirname, '../../db/admin.json'), JSON.stringify({ admins }, null, 2), 'utf-8');

            return res.json({ resultado: "Contraseña de administrador actualizada correctamente" });
        }

        
        return res.json({ resultado: "Credenciales inválidas" });

    } catch (error) {
        console.error("Error leyendo o escribiendo los archivos:", error);
        return res.status(500).json({ resultado: "Error interno del servidor" });
    }
};




const crearuser = async (req, res) => {
    const { username, password, role } = req.body;

    console.log("Recibí user: " + username);
    console.log("Recibí pass: " + password);
    console.log("Rol: " + role);

    try {
        if (role === "admin") {
            
            const data = await fs.readFile(path.join(__dirname, '../../db/admin.json'), 'utf-8');
            const adminData = JSON.parse(data);

           
            const adminExists = adminData.admins.some(admin => admin.adminId === username);
            if (adminExists) {
                return res.json({ resultado: "El admin ya existe" });
            }

            
            adminData.admins.push({ adminId: username, adminPass: password });

            
            await fs.writeFile(path.join(__dirname, '../../db/admin.json'), JSON.stringify(adminData, null, 2), 'utf-8');
            return res.json({ resultado: "Admin creado correctamente" });
        } else if (role === "user") {
           
            const data = await fs.readFile(path.join(__dirname, '../../db/users.json'), 'utf-8');
            const usersData = JSON.parse(data);

           
            const userExists = usersData.users.some(user => user.username === username);
            if (userExists) {
                return res.json({ resultado: "El usuario ya existe" });
            }

            
            usersData.users.push({ username, password });

           
            await fs.writeFile(path.join(__dirname, '../../db/users.json'), JSON.stringify(usersData, null, 2), 'utf-8');
            return res.json({ resultado: "Usuario creado correctamente" });
        } else {
            return res.json({ resultado: "Rol inválido" });
        }

    } catch (error) {
        console.error("Error leyendo o escribiendo el archivo de credenciales:", error);
        return res.status(500).json({ resultado: "Error interno del servidor" });
    }
};



module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno,
    compareLogin,
    updatepassword,
    crearuser
    
}