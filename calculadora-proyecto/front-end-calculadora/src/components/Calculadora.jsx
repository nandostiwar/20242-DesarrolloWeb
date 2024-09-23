import React, { useState, useEffect } from 'react';
import '../styles/Calculadora.css';
import Resultado from "./Resultado";

function Calculadora() {
    const [numbers, setNumbers] = useState([
        { letter: 'a', value: '' },
        { letter: 'b', value: '' },
        { letter: 'c', value: '' },
        { letter: 'd', value: '' },
        { letter: 'e', value: '' },
        { letter: 'f', value: '' }
    ]);
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [ascNumbers, setAscNumbers] = useState([]);
    const [descNumbers, setDescNumbers] = useState([]);
    const [equation, setEquation] = useState('');
    const [equationResult, setEquationResult] = useState('');

    const handleNumberChange = (index, newValue) => {
        const updatedNumbers = [...numbers];
        updatedNumbers[index].value = newValue === '' ? '' : parseInt(newValue) || 0; // Si está vacío, lo mantiene vacío.
        setNumbers(updatedNumbers);
    };

    const handleNumberSelect = (number) => {
        const alreadySelected = selectedNumbers.includes(number);
        setSelectedNumbers(alreadySelected ? selectedNumbers.filter(n => n !== number) : [...selectedNumbers, number]);
    };

    const handleSortAsc = () => {
        fetch('http://localhost:3500/v1/calculadora/sortAsc', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ numbers: selectedNumbers })
        })
        .then(res => res.json())
        .then(data => setAscNumbers(data.sorted));
    };

    const handleSortDesc = () => {
        fetch('http://localhost:3500/v1/calculadora/sortDesc', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ numbers: selectedNumbers })
        })
        .then(res => res.json())
        .then(data => setDescNumbers(data.sorted));
    };

    const handleEquation = () => {
        const values = Object.fromEntries(numbers.map(item => [item.letter, Number(item.value)]));
        fetch('http://localhost:3500/v1/calculadora/equation', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ equation, values })
        })
        .then(res => res.json())
        .then(data => setEquationResult(data.result));
    };

    return (
        <div className="container">
            <h1 id="txtCalculadora">CALCULADORA PLUS</h1>
            <div className="number-selection">
                {numbers.map((item, index) => (
                    <div key={index}>
                        <label>{item.letter})</label>
                        <input
                            type="number"
                            value={item.value}
                            onChange={(e) => handleNumberChange(index, e.target.value)}
                            placeholder="Ingresa un número"
                        />
                        <input
                            type="checkbox"
                            onChange={() => handleNumberSelect(item.value)}
                            checked={selectedNumbers.includes(item.value)}
                        />
                    </div>
                ))}
            </div>
            <div className="sorting">
                <button onClick={handleSortAsc}>Ascendente</button>
                <input type="text" value={ascNumbers.join(', ')} readOnly />
            </div>
            {/* Sección de "Descendente" */}
            <div className="sorting-desc">
                <button onClick={handleSortDesc}>Descendente</button>
                <input type="text" value={descNumbers.join(', ')} readOnly />
            </div>
            {/* Modificación: Mover el botón de calcular debajo de la ecuación */}
            <div className="equation">
                <label>Ecuación:</label>
                <input
                    type="text"
                    value={equation}
                    onChange={(e) => setEquation(e.target.value)}
                    placeholder="Ingresa una ecuación"
                />
                {/* Mover el botón "Calcular" aquí */}
                <button onClick={handleEquation}>Calcular Resultado
                </button>
                <input type="text" value={equationResult} readOnly />
            </div>
            <Resultado
                ascNumbers={ascNumbers}
                descNumbers={descNumbers}
                equationResult={equationResult}
            />
        </div>
    );
}

export default Calculadora;
