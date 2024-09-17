// Función para ordenar valores en orden ascendente
const sortAsc = (values) => {
    if (!Array.isArray(values)) {
      throw new Error('The input must be an array');
    }
    return values.sort((a, b) => a - b);
  };
  
  // Función para ordenar valores en orden descendente
  const sortDesc = (values) => {
    if (!Array.isArray(values)) {
      throw new Error('The input must be an array');
    }
    return values.sort((a, b) => b - a);
  };
  
  // Función para calcular la ecuación 2(valor1) + 3(valor2)
const calculateEquation = (values) => {
    if (!Array.isArray(values) || values.length < 2) {
      throw new Error('You must provide at least two values');
    }
    // Multiplicar el primer valor por 2 y el segundo valor por 3
    return 2 * values[0] + 3 * values[1];
  };
  
  module.exports = {
    sortAsc,
    sortDesc,
    calculateEquation
  };
  
  