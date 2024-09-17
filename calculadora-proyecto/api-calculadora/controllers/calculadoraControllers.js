const { sortAsc, sortDesc, evaluateEquation } = require('../operaciones/operaciones.js');

function ordenarAscendente(req, res) {
    const { values } = req.body;
    const result = sortAsc(values);
    res.json({ resultado: result });
}

function ordenarDescendente(req, res) {
    const { values } = req.body;
    const result = sortDesc(values);
    res.json({ resultado: result });
}

function evaluarEcuacion(req, res) {
    const { ecuacion } = req.body;
    const { A, B, C, D, E, F } = req.body.values || {};
    const result = evaluateEquation(ecuacion, { A, B, C, D, E, F });
    res.json({ resultado: result });
}


module.exports = {
    ordenarAscendente,
    ordenarDescendente,
    evaluarEcuacion
};
