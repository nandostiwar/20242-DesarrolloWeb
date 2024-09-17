
/**
 * 
 * @param {Array<Number>} numeros
 * @returns {Array<Number>}
 */

function ordenarAscendente(numeros) {
 return numeros.sort((a, b) => a - b);
}
/**
 *
 * @param {Array<Number>} numeros
 * @returns {Array<Number>}
 */

function ordenarDescendente(numeros) {
 return numeros.sort((a, b) => b - a);
}
function evaluarEcuacion(ecuacion, valores) {
    const ecuacionReemplazada = ecuacion.replace(/([2-9]?)([A-F])/g, (match, coef, letra) => {
      const numero = valores[letra];
      return coef ? `${coef}*${numero}` : numero;
    });
    
    try {
      const resultado = eval(ecuacionReemplazada);
      return resultado;
    } catch (error) {
      throw new Error('Error al calcular la ecuación');
    }
  }
  

module.exports = {
    ordenarAscendente,
    ordenarDescendente,
    evaluarEcuacion
}