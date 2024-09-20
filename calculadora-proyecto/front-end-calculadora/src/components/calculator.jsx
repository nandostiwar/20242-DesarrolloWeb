import { useState } from "react";
import '../styles/calculator.css';

function calculator() {
    const [numbers, setNumbers] = useState([
        { label: 'A', value: 12, checked: false },
        { label: 'B', value: 90, checked: false },
        { label: 'C', value: 7, checked: false },
        { label: 'D', value: 6, checked: false },
        { label: 'E', value: 9, checked: false },
        { label: 'F', value: 14, checked: false }
    ]);

    const [ascendenteResult, setAscendenteResult] = useState('');
    const [descendenteResult, setDescendenteResult] = useState('');
    const [equation, setEquation] = useState('');
    const [equationResult, setEquationResult] = useState('');

    const handleCheckboxChange = (index) => {
        const updatedNumbers = [...numbers];
        updatedNumbers[index].checked = !updatedNumbers[index].checked;
        setNumbers(updatedNumbers);
    };

    const handleValueChange = (index, newValue) => {
        const updatedNumbers = [...numbers];
        updatedNumbers[index].value = parseInt(newValue, 10) || 0;
        setNumbers(updatedNumbers);
    };

    const handleOrder = async (orderType) => {
        const selectedNumbers = numbers
            .filter(number => number.checked)
            .map(number => number.value);

        if (selectedNumbers.length === 0) {
            console.error("seleccione al menos un número.");
            return;
        }

        const operationEndpoint = orderType === 'ascendente' ? 'ascendente' : 'descendente';

        try {
            const response = await fetch(`http://localhost:3500/v1/calculadora/${operationEndpoint}`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ numbers: selectedNumbers })
            });

            const data = await response.json();
            if (orderType === 'ascendente') {
                setAscendenteResult(data.resultado.join(' '));
            } else {
                setDescendenteResult(data.resultado.join(' '));
            }
        } catch (error) {
            console.error("Error al hacer la petición:", error);
        }
    };

    const handleEquationSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3500/v1/calculadora/ecuacion', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    equation,
                    numbers: numbers
                })
            });

            const data = await response.json();
            setEquationResult(data.resultado);
        } catch (error) {
            console.error("Error al hacer la petición:", error);
        }
    };

    return (
        <div className="container">
            <h1 id="txtCalculadora">CALCULATOR 3100</h1>

            <div className="number-selection">
                {numbers.map((number, index) => (
                    <div key={index} className="number-item">
                        <label>
                            {number.label}
                            <input 
                                type="number" 
                                className="number-value" 
                                value={number.value} 
                                onChange={(e) => handleValueChange(index, e.target.value)} 
                            />
                            <input 
                                type="checkbox" 
                                checked={number.checked} 
                                onChange={() => handleCheckboxChange(index)} 
                            />
                        </label>
                    </div>
                ))}
            </div>

            <div className="ordering-buttons">
                <button onClick={() => handleOrder('ascendente')}>Ascendente</button>
                <input type="text" className="result-box" value={ascendenteResult} readOnly />

                <button onClick={() => handleOrder('descendente')}>Descendente</button>
                <input type="text" className="result-box" value={descendenteResult} readOnly />
            </div>

            <div className="equation-section">
                <h2>Ecuación</h2>
                <input 
                    type="text" 
                    className="equation-input" 
                    value={equation} 
                    onChange={(e) => setEquation(e.target.value)} 
                    placeholder="Ingresa una ecuación" 
                />
                <button onClick={handleEquationSubmit}>Calcular Ecuación</button>
                <input type="text" className="result-box" value={equationResult} readOnly />
            </div>
        </div>
    );
}

export default calculator;