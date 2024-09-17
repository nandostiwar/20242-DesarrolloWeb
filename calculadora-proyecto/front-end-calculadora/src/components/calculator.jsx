// Elimina la importación innecesaria de React si usas React 17+
import { useState } from 'react'; // Solo mantén el hook que usas
import axios from 'axios';
import '../styles/calculator.css';  // Asegúrate de que el archivo CSS esté en la ruta correcta

function Calculator() {
  const [selectedValues, setSelectedValues] = useState([]);
  const [result, setResult] = useState(null);
  const [equationResult, setEquationResult] = useState(null);

  const values = { A: 12, B: 90, C: 8, D: 6, E: 9, F: 14 };

  const handleSelect = (value) => {
    setSelectedValues((prevValues) => [...prevValues, value]);
  };

  const handleSortAsc = () => {
    const sortedValues = [...selectedValues].sort((a, b) => a - b);
    setSelectedValues(sortedValues);
    sendRequest(sortedValues, 'asc');
  };

  const handleSortDesc = () => {
    const sortedValues = [...selectedValues].sort((a, b) => b - a);
    setSelectedValues(sortedValues);
    sendRequest(sortedValues, 'desc');
  };

  const handleEquation = () => {
    if (selectedValues.length < 2) {
      alert("Select at least two values for the equation.");
      return;
    }
    const [A, B] = selectedValues;
    const equationResult = A + B;
    setEquationResult(equationResult);
    sendRequest([A, B], 'equation', equationResult);
  };

  const sendRequest = async (data, type, equationResult = null) => {
    try {
      const response = await axios.post('http://localhost:4000/calculate', {
        values: data,
        type: type,
        equationResult: equationResult
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <div>
      <h1>Calculator</h1>
      <div>
        {Object.keys(values).map((key) => (
          <button key={key} onClick={() => handleSelect(values[key])}>
            {key} = {values[key]}
          </button>
        ))}
      </div>

      <div>
        <h3>Selected Values: {selectedValues.join(', ')}</h3>
      </div>

      <button onClick={handleSortAsc}>Sort Ascending</button>
      <button onClick={handleSortDesc}>Sort Descending</button>
      <button onClick={handleEquation}>Calculate Equation (A + B)</button>

      {equationResult && <h3>Equation Result: {equationResult}</h3>}
      
      {result && (
        <div>
          <h3>Response from Server</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Calculator;
