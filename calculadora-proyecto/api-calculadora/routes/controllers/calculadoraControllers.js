const express = require('express');
const fs = require('fs');
const path = require('path');

const ordenarAscendente = (req, res) => {
    const { numbers } = req.body;
    if (!Array.isArray(numbers)) {
        return res.status(400).json({ error: 'Este debe contener un array de números.' });
    }
    const resultado = numbers.sort((a, b) => a - b);
    res.json({ resultado }); // Enviar el resultado al frontend
};

const ordenarDescendente = (req, res) => {
    const { numbers } = req.body;
    if (!Array.isArray(numbers)) {
        return res.status(400).json({ error: 'Este debe contener un array de números.' });
    }
    const resultado = numbers.sort((a, b) => b - a);
    res.json({ resultado }); // Enviar el resultado al frontend
};

const resolverEcuacion = (req, res) => {
    const { equation, numbers } = req.body; 
    const variables = {};

    numbers.forEach((number) => {
        variables[number.label] = number.value;
    });

    let ecuacionResuelta = equation;

    // Reemplazar las variables en la ecuación por sus valores
    for (let variable in variables) {
        const regex = new RegExp(`(\\d+)\\s*${variable}`, 'g');
        ecuacionResuelta = ecuacionResuelta.replace(regex, (match, p1) => `${p1} * ${variables[variable]}`);
        
        const regexNoCoef = new RegExp(`(?<!\\d)${variable}(?!\\d)`, 'g');
        ecuacionResuelta = ecuacionResuelta.replace(regexNoCoef, variables[variable]);
    }

    try {
        // Evaluar la ecuación resuelta
        const resultado = eval(ecuacionResuelta);  
        res.json({ resultado }); // Enviar el resultado al frontend
    } catch (error) {
        res.status(400).json({ error: 'Error al resolver la ecuación.' });
    }
};

module.exports = {
    ordenarAscendente,
    ordenarDescendente,
    resolverEcuacion
};
