function sortAsc(numbers) {
    return numbers.sort((a, b) => a - b);
}

function sortDesc(numbers) {
    return numbers.sort((a, b) => b - a);
}

function evaluateEquation(equation, values) {
    try {
        let formattedEquation = equation;
        for (const key in values) {
            if (values.hasOwnProperty(key)) {
                const value = values[key];
                formattedEquation = formattedEquation.replace(new RegExp(`\\b${key}\\b`, 'g'), value);
            }
        }
        const result = new Function('return ' + formattedEquation)();
        return result;
    } catch (error) {
        return 'Error en la ecuación';
    }
}
module.exports = {
    sortAsc,
    sortDesc,
    evaluateEquation
};
