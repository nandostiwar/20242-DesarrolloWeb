// operaciones.js

// Función para realizar la operación matemática
const realizarOperacion = (expresion, valores) => {
    let expresionEvaluada = expresion;
    
    // Reemplazar las letras por los valores correspondientes
    for (const letra in valores) {
        const regex = new RegExp(`\\b${letra}\\b`, 'g');
        expresionEvaluada = expresionEvaluada.replace(regex, valores[letra]);
    }

    // Evaluar la expresión con los valores
    return eval(expresionEvaluada);
};

// Función para ordenar los valores seleccionados
const ordenarValores = (valores, tipo) => {
    const valoresNumericos = valores.map(v => parseFloat(v)).filter(v => !isNaN(v));

    if (tipo === 'ascendente') {
        return valoresNumericos.sort((a, b) => a - b);
    } else {
        return valoresNumericos.sort((a, b) => b - a);
    }
};

module.exports = {
    realizarOperacion,
    ordenarValores
};
