import { useState } from 'react';
import axios from 'axios';
import '../styles/calculator.css';

function Calculator() {
  const [userValues, setUserValues] = useState({ A: '', B: '', C: '', D: '', E: '', F: '' });
  const [selectedValues, setSelectedValues] = useState([]);
  const [equationResult, setEquationResult] = useState(null);

  // Maneja el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  // Maneja la selección de valores por parte del usuario
  const handleSelect = (value) => {
    setSelectedValues((prevValues) => [...prevValues, value]);
  };

  // Llamada a la API para ordenar en orden ascendente
  const handleSortAsc = async () => {
    try {
      const response = await axios.post('http://localhost:3001/sort/asc', {
        values: selectedValues
      });
      setSelectedValues(response.data.sortedValues);
    } catch (error) {
      console.error("Error sorting asc:", error);
    }
  };

  // Llamada a la API para ordenar en orden descendente
  const handleSortDesc = async () => {
    try {
      const response = await axios.post('http://localhost:3001/sort/desc', {
        values: selectedValues
      });
      setSelectedValues(response.data.sortedValues);
    } catch (error) {
      console.error("Error sorting desc:", error);
    }
  };

  // Llamada a la API para calcular la ecuación 2(valor1) + 3(valor2)
  const handleEquation = async () => {
    if (selectedValues.length < 2) {
      alert("Select at least two values for the equation.");
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/calculate', {
        values: selectedValues
      });
      setEquationResult(response.data.equationResult);
    } catch (error) {
      console.error("Error calculating equation:", error);
    }
  };

  return (
    <div>
      <h1>Calculator</h1>
      <form>
        {Object.keys(userValues).map((key) => (
          <div key={key}>
            <label>
              {key}:
              <input
                type="number"
                name={key}
                value={userValues[key]}
                onChange={handleChange}
              />
            </label>
          </div>
        ))}
      </form>
      
      <div>
        {Object.keys(userValues).map((key) => (
          <button key={key} onClick={() => handleSelect(Number(userValues[key]))}>
            {key} = {userValues[key]}
          </button>
        ))}
      </div>

      <div>
        <h3>Selected Values: {selectedValues.join(', ')}</h3>
      </div>

      <button onClick={handleSortAsc}>Sort Ascending</button>
      <button onClick={handleSortDesc}>Sort Descending</button>
      <button onClick={handleEquation}>Calculate Equation (2A + 3B)</button>

      {equationResult && <h3>Equation Result: {equationResult}</h3>}
    </div>
  );
}

export default Calculator;
