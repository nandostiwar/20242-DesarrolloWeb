const express = require('express');
const fs = require('fs');
const path = require('path');

// Ruta al archivo de logs
const logFilePath = path.join(__dirname, 'logs.json');

// Función para registrar logs
const registrarOperacion = (operacion, data) => {
    const log = {
        operacion,
        data,
        timestamp: new Date().toISOString()
    };

    // Leer el archivo de logs para agregar la nueva entrada
    fs.readFile(logFilePath, 'utf8', (err, fileData) => {
        let logs = [];
        if (!err && fileData) {
            logs = JSON.parse(fileData); // Si el archivo ya tiene datos, los parseamos
        }
        
        logs.push(log); // Agregamos el nuevo log

        // Guardamos el nuevo log en el archivo
        fs.writeFile(logFilePath, JSON.stringify(logs, null, 2), (err) => {
            if (err) {
                console.error('Error al escribir en el archivo de logs:', err);
            }
        });
    });
};

// Función para ordenar en ascendente
const ordenarAscendente = (req, res) => {
    const { numbers } = req.body;
    if (!Array.isArray(numbers)) {
        return res.status(400).json({ error: 'El cuerpo de la solicitud debe contener un array de números.' });
    }
    const resultado = numbers.sort((a, b) => a - b);
    
    // Registrar la operación
    registrarOperacion('ordenarAscendente', { input: numbers, resultado });

    res.json({ resultado });
};

// Función para ordenar en descendente
const ordenarDescendente = (req, res) => {
    const { numbers } = req.body;
    if (!Array.isArray(numbers)) {
        return res.status(400).json({ error: 'El cuerpo de la solicitud debe contener un array de números.' });
    }
    const resultado = numbers.sort((a, b) => b - a);

    // Registrar la operación
    registrarOperacion('ordenarDescendente', { input: numbers, resultado });

    res.json({ resultado });
};

// Función para resolver ecuación
const resolverEcuacion = (req, res) => {
    const { equation, numbers } = req.body; 
    const variables = {};

    numbers.forEach((number) => {
        variables[number.label] = number.value;
    });

    let ecuacionResuelta = equation;
    for (let variable in variables) {
        const regex = new RegExp(`(\\d+)\\s*${variable}`, 'g');
        ecuacionResuelta = ecuacionResuelta.replace(regex, (match, p1) => `${p1} * ${variables[variable]}`);
        const regexNoCoef = new RegExp(`(?<!\\d)${variable}(?!\\d)`, 'g');
        ecuacionResuelta = ecuacionResuelta.replace(regexNoCoef, variables[variable]);
    }

    try {
        const resultado = eval(ecuacionResuelta);

        // Registrar la operación
        registrarOperacion('resolverEcuacion', { equation, variables, ecuacionResuelta, resultado });

        res.json({ resultado });
    } catch (error) {
        res.status(400).json({ error: 'Ecuación inválida' });
    }
};

module.exports = {
    ordenarAscendente,
    ordenarDescendente,
    resolverEcuacion
};


