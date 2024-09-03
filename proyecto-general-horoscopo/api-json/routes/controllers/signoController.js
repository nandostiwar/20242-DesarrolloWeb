const fs = require('fs/promises');
const path = require('path');

const getAllSignos = async (req, res) => {
    const signo = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const signosJson = JSON.parse(signo)
    res.json(signosJson);
}

const getOneSigno = async (req, res) => {
    const oneSigno = req.params.signo;
    const perfil = req.query.perfil || 'general'; // Nuevo parámetro de consulta para el perfil
    const allSignos = await fs.readFile(path.join(__dirname, '../../db/signos.json'));
    const objSignos = JSON.parse(allSignos);
    const result = objSignos[oneSigno] && objSignos[oneSigno][perfil] 
        ? objSignos[oneSigno][perfil] 
        : "Información no disponible para este perfil";
    res.json(result)
}

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
    }
    
    await fs.writeFile(path.join(__dirname, '../../db/signos.json'), JSON.stringify(objUpdate, null, 2), {encoding: 'utf-8'})
    res.json({
        message: "Updated"
    })
}

module.exports = {
    getAllSignos,
    getOneSigno,
    updateSigno
}