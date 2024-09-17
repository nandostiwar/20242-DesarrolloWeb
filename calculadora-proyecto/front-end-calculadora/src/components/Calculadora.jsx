import React, { useState } from 'react';
import '../styles/Calculadora.css';
import Resultado from "./Resultado";

const Calculadora = () => {
    const [numbers, setNumbers] = useState([
        { letter: 'a', value: 0 },
        { letter: 'b', value: 0 },
        { letter: 'c', value: 0 },
        { letter: 'd', value: 0 },
        { letter: 'e', value: 0 },
        { letter: 'f', value: 0 }
    ]);
    const [selected, setSelected] = useState([]);
    const [sortedAsc, setSortedAsc] = useState([]);
    const [sortedDesc, setSortedDesc] = useState([]);
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('');

    const updateValue = (index, newValue) => {
        const updatedNumbers = numbers.map((num, i) =>
            i === index ? { ...num, value: parseInt(newValue, 10) || 0 } : num
        );
        setNumbers(updatedNumbers);
    };

    const toggleSelection = (value) => {
        setSelected((prev) => 
            prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
    };

    const sortNumbers = (order) => {
        fetch(`http://localhost:3500/v1/calculadora/sort${order}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ numbers: selected })
        })
        .then(res => res.json())
        .then(data => {
            order === 'Asc' ? setSortedAsc(data.sorted) : setSortedDesc(data.sorted);
        });
    };

    const evaluateExpression = () => {
        const values = numbers.reduce((acc, item) => {
            acc[item.letter] = Number(item.value);
            return acc;
        }, {});
        fetch('http://localhost:3500/v1/calculadora/equation', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ expression, values })
        })
        .then(res => res.json())
        .then(data => setResult(data.result));
    };

    return (
        <div className="container">
            <h1>Calculadora Avanzada</h1>
            <div className="number-inputs">
                {numbers.map((num, i) => (
                    <div key={i} className="number-item">
                        <div className="number-label">{num.letter}:</div>
                        <input
                            type="number"
                            className="number-input"
                            value={num.value}
                            onChange={(e) => updateValue(i, e.target.value)}
                        />
                        <input
                            type="checkbox"
                            className="number-checkbox"
                            checked={selected.includes(num.value)}
                            onChange={() => toggleSelection(num.value)}
                        />
                    </div>
                ))}
            </div>
            <div className="sort-buttons">
                <div className="sort-group">
                    <button onClick={() => sortNumbers('Asc')}>Ordenar Ascendente</button>
                    <input type="text" value={sortedAsc.join(', ')} readOnly className="sort-result"/>
                </div>
                <div className="sort-group">
                    <button onClick={() => sortNumbers('Desc')}>Ordenar Descendente</button>
                    <input type="text" value={sortedDesc.join(', ')} readOnly className="sort-result"/>
                </div>
            </div>
            <div className="expression-input">
                <div className="expression-group">
                    <label>Expresión:</label>
                    <input
                        type="text"
                        className="expression-field"
                        value={expression}
                        onChange={(e) => setExpression(e.target.value)}
                        placeholder="Ejemplo: 2a + 3b"
                    />
                    <button onClick={evaluateExpression}>Calcular</button>
                </div>
                <div className="result-group">
                    <label>Resultado:</label>
                    <input type="text" value={result} readOnly className="result-field"/>
                </div>
            </div>
            <Resultado
                sortedAsc={sortedAsc}
                sortedDesc={sortedDesc}
                result={result}
            />
        </div>
    );
};

export default Calculadora;