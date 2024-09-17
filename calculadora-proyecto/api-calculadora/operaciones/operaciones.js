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
    // Convertir los valores a números, manejando posibles entradas vacías
    const { a, b, c, d } = {
        a: parseFloat(valores.a) || 0,
        b: parseFloat(valores.b) || 0,
        c: parseFloat(valores.c) || 0,
        d: parseFloat(valores.d) || 0
    };

    try {
        // Reemplazamos las letras por sus valores numéricos
        let ecuacionEvaluada = ecuacion
            .replace(/a/g, a)
            .replace(/b/g, b)
            .replace(/c/g, c)
            .replace(/d/g, d);

        // Reemplazamos los coeficientes y letras por la forma correcta de multiplicar
        ecuacionEvaluada = ecuacionEvaluada.replace(/(\d+)\*([a-d])/g, (_, coef, variable) => {
            return `${coef} * ${valores[variable]}`;
        });

        // Reemplazamos todos los caracteres que no sean números, operadores o paréntesis
        ecuacionEvaluada = ecuacionEvaluada.replace(/[^\d+\-*/(). ]/g, '');

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
