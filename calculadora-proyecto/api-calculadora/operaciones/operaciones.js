/**
 * Ordenar números de menor a mayor
 * @param {Array} numbers
 * @returns Array
 */
function sortAscending(numbers) {
    return numbers.sort((a, b) => a - b);
}

/**
 * Ordenar números de mayor a menor
 * @param {Array} numbers
 * @returns Array
 */
function sortDescending(numbers) {
    return numbers.sort((a, b) => b - a);
}

/**
 * Resolver ecuaciones aritméticas
 * @param {String} equation
 * @param {Object} values
 * @returns Number | String
 */
function solveEquation(equation, values) {
    try {
        const parsedEquation = equation.replace(/([1-9]?)([a-f])/g, (match, coef, letter) => {
            if (values[letter] === undefined) {
                throw new Error(`Valor no definido para la variable ${letter}`);
            }
            const numero = Number(values[letter]);
            return coef ? `${coef}*${numero}` : numero;
        });
        const result = eval(parsedEquation);
        return Math.round(result * 100) / 100; // Redondear a 2 decimales
    } catch (error) {
        return 'Error en la ecuación: ' + error.message;
    }
}

module.exports = {
    sortAscending,
    sortDescending,
    solveEquation
};
