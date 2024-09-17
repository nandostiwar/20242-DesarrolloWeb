// Función para evaluar la ecuación
const evaluarEcuacion = (values, ecuacion) => {
  const { A, B, C, D, E, F } = values;
  const func = new Function('A', 'B', 'C', 'D', 'E', 'F', `return ${ecuacion}`);
  return func(A, B, C, D, E, F);
};
const ordenarAscendente = (values) => {
  return values.slice().sort((a, b) => a - b);
};
const ordenarDescendente = (values) => {
  return values.slice().sort((a, b) => b - a);
};


module.exports = {
  evaluarEcuacion,
  ordenarAscendente,
  ordenarDescendente
};
