import React, { useState } from 'react';

const Calculadora = () => {
  const [values, setValues] = useState({ A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 });
  const [checked, setChecked] = useState({ A: false, B: false, C: false, D: false, E: false, F: false });
  const [order, setOrder] = useState('ascendente'); // Estado para gestionar el orden
  const [ecuacion, setEcuacion] = useState('2*A + 3*B'); // Estado para la ecuación
  const [sortedValues, setSortedValues] = useState([]); // Estado para los valores ordenados
  const [resultado, setResultado] = useState(null); // Estado para el resultado de la ecuación

  // Manejar el cambio en los valores
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: parseInt(e.target.value) });
  };

  // Manejar el cambio en los checkbox
  const handleCheck = (e) => {
    setChecked({ ...checked, [e.target.name]: e.target.checked });
  };

  // Llamar al backend para ordenar los valores
  const ordenarValores = async () => {
    // Filtrar los valores que están seleccionados
    const valoresFiltrados = Object.keys(values).reduce((acc, key) => {
      if (checked[key]) {
        acc[key] = values[key];
      }
      return acc;
    }, {});

    try {
      const response = await fetch('http://localhost:3500/api/calculadora/ordenar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: Object.values(valoresFiltrados),
          order,
        }),
      });
      const data = await response.json();
      setSortedValues(data.sortedValues);
    } catch (error) {
      console.error('Error al ordenar los valores:', error);
    }
  };

  // Llamar al backend para evaluar la ecuación
  const calcularEcuacion = async () => {
    try {
      const response = await fetch('http://localhost:3500/api/calculadora/calcular', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values,
          ecuacion,
        }),
      });
      const data = await response.json();
      setResultado(data.result);
    } catch (error) {
      console.error('Error al calcular la ecuación:', error);
    }
  };

  return (
    <div>
      <h2>Formulario</h2>
      {['A', 'B', 'C', 'D', 'E', 'F'].map((key) => (
        <div key={key}>
          <label>{key}:</label>
          <input
            type="number"
            name={key}
            value={values[key]}
            onChange={handleChange}
            disabled={!checked[key]}
          />
          <input
            type="checkbox"
            name={key}
            checked={checked[key]}
            onChange={handleCheck}
          />
        </div>
      ))}

      <div>
        <button onClick={() => setOrder('ascendente')}>Ordenar Ascendente</button>
        <button onClick={() => setOrder('descendente')}>Ordenar Descendente</button>
        <button onClick={ordenarValores}>Ordenar</button>
      </div>

      <div>
        <h3>Ordenado ({order})</h3>
        <p>{sortedValues.join(', ')}</p>
      </div>

      <div>
        <h3>Ecuación</h3>
        <input
          type="text"
          value={ecuacion}
          onChange={(e) => setEcuacion(e.target.value)}
        />
        <button onClick={calcularEcuacion}>Calcular</button>
        <p>Resultado: {resultado}</p>
      </div>
    </div>
  );
};

export default Calculadora;