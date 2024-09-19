/**
 * Ordenar un array de números de forma ascendente
 * @param {Number[]} numeros 
 * @returns Number[]
 */
function ascendente(numeros) {
    return numeros.sort((a, b) => a - b);
}

/**
 * Ordenar un array de números de forma descendente
 * @param {Number[]} numeros 
 * @returns Number[]
 */
function descendente(numeros) {
    return numeros.sort((a, b) => b - a);
}

/**
 * Evaluar una ecuación con los valores dados para a, b, c, d
 * @param {String} ecuacion - La ecuación en formato string (ejemplo: '2*a + 3*b')
 * @param {Object} valores - Un objeto que contiene los valores de a, b, c, d
 * @returns Number | String - El resultado de la ecuación o un error si es inválido
 */
function evaluarEcuacion(ecuacion, valores) {
    const { a, b, c, d } = {
        a: parseFloat(valores.a) || 0,
        b: parseFloat(valores.b) || 0,
        c: parseFloat(valores.c) || 0,
        d: parseFloat(valores.d) || 0
    };

    try {
        // Reemplazar las letras por sus valores numéricos (con multiplicación si es necesario)
        let ecuacionEvaluada = ecuacion
            .replace(/(\d+)\*?a/g, (_, coef) => `${coef} * ${a}`)
            .replace(/(\d+)\*?b/g, (_, coef) => `${coef} * ${b}`)
            .replace(/(\d+)\*?c/g, (_, coef) => `${coef} * ${c}`)
            .replace(/(\d+)\*?d/g, (_, coef) => `${coef} * ${d}`)
            .replace(/\ba\b/g, a)
            .replace(/\bb\b/g, b)
            .replace(/\bc\b/g, c)
            .replace(/\bd\b/g, d);

        // Evaluamos la ecuación de manera segura
        const resultado = Function('"use strict";return (' + ecuacionEvaluada + ')')();

        // Verificamos si el resultado es un número
        if (typeof resultado === 'number') {
            return Math.round(resultado * 100) / 100; // Redondear a 2 decimales
        } else {
            throw new Error('El resultado no es un número');
        }
    } catch (error) {
        console.error('Error al evaluar la ecuación:', error);
        return "Error en la ecuación"; // Retornamos un mensaje de error si la ecuación es inválida
    }
}
module.exports = {
    ascendente,
    descendente,
    evaluarEcuacion
};