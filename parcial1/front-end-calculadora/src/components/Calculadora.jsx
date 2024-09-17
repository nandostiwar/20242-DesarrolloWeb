import { useState } from "react";
import '../styles/Calculadora.css';

function Calculadora() {
    const [selectedNumbers, setSelectedNumbers] = useState({
        a: { checked: false, value: '' },
        b: { checked: false, value: '' },
        c: { checked: false, value: '' },
        d: { checked: false, value: '' },
        e: { checked: false, value: '' },
        f: { checked: false, value: '' }
    });
    const [sortedNumbers, setSortedNumbers] = useState([]);
    const [equation, setEquation] = useState('2*a + 3*b'); // Ecuación por defecto
    const [result, setResult] = useState(null);

    function handleCheckboxChange(e) {
        const { name, checked } = e.target;
        setSelectedNumbers(prev => ({
            ...prev,
            [name]: { ...prev[name], checked }
        }));
    }

    function handleNumberInput(e, name) {
        const value = e.target.value;
        setSelectedNumbers(prev => ({
            ...prev,
            [name]: { ...prev[name], value }
        }));
    }

    function handleSort(order) {
        // Crear un array con los números seleccionados
        const numbers = Object.values(selectedNumbers)
            .filter(num => num.checked)
            .map(num => parseFloat(num.value))
            .filter(num => !isNaN(num));

        fetch(`http://localhost:3500/v1/calculadora/ordenar${order}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ numbers })
        })
        .then(response => response.json())
        .then(data => setSortedNumbers(data.sortedNumbers))
        .catch(error => setResult('Error al ordenar los números'));
    }

    function handleCalculate() {
        // Crear un objeto con los números seleccionados
        const numbers = Object.fromEntries(
            Object.entries(selectedNumbers)
                .filter(([key, num]) => num.checked)
                .map(([key, num]) => [key, parseFloat(num.value) || 0])
        );

        fetch('http://localhost:3500/v1/calculadora/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ equation, numbers })
        })
        .then(response => response.json())
        .then(data => setResult(data.resultado))
        .catch(error => setResult('Error en la ecuación'));
    }

    return (
        <div className="container">
            <h1 id="txtCalculadora">CALCULADORA</h1>

            <div className="button-grid">
                <div className="button-row">
                    <label>
                        <input
                            type="checkbox"
                            name="a"
                            checked={selectedNumbers.a.checked}
                            onChange={handleCheckboxChange}
                        />
                        A
                        <input
                            type="text"
                            value={selectedNumbers.a.value}
                            onChange={(e) => handleNumberInput(e, 'a')}
                            placeholder="Número"
                            className="number"
                        />
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="b"
                            checked={selectedNumbers.b.checked}
                            onChange={handleCheckboxChange}
                        />
                        B
                        <input
                            type="text"
                            value={selectedNumbers.b.value}
                            onChange={(e) => handleNumberInput(e, 'b')}
                            placeholder="Número"
                            className="number"
                        />
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="c"
                            checked={selectedNumbers.c.checked}
                            onChange={handleCheckboxChange}
                        />
                        C
                        <input
                            type="text"
                            value={selectedNumbers.c.value}
                            onChange={(e) => handleNumberInput(e, 'c')}
                            placeholder="Número"
                            className="number"
                        />
                    </label>
                </div>
                <div className="button-row">
                    <label>
                        <input
                            type="checkbox"
                            name="d"
                            checked={selectedNumbers.d.checked}
                            onChange={handleCheckboxChange}
                        />
                        D
                        <input
                            type="text"
                            value={selectedNumbers.d.value}
                            onChange={(e) => handleNumberInput(e, 'd')}
                            placeholder="Número"
                            className="number"
                        />
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="e"
                            checked={selectedNumbers.e.checked}
                            onChange={handleCheckboxChange}
                        />
                        E
                        <input
                            type="text"
                            value={selectedNumbers.e.value}
                            onChange={(e) => handleNumberInput(e, 'e')}
                            placeholder="Número"
                            className="number"
                        />
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="f"
                            checked={selectedNumbers.f.checked}
                            onChange={handleCheckboxChange}
                        />
                        F
                        <input
                            type="text"
                            value={selectedNumbers.f.value}
                            onChange={(e) => handleNumberInput(e, 'f')}
                            placeholder="Número"
                            className="number"
                        />
                    </label>
                </div>
            </div>

            <div>
                <button onClick={() => handleSort('Ascendente')}>Ordenar Ascendente</button>
                <button onClick={() => handleSort('Descendente')}>Ordenar Descendente</button>
            </div>

            <div>
                <h2>Ingrese Ecuación</h2>
                <input
                    type="text"
                    value={equation}
                    onChange={(e) => setEquation(e.target.value)}
                    placeholder="Ej. 2*a + 3*b"
                    className="number"
                />
                <button onClick={handleCalculate}>Calcular</button>
            </div>

            <div>
                <h2>Números Seleccionados</h2>
                <ul>
                    {sortedNumbers.map((num, index) => (
                        <li key={index}>{num}</li>
                    ))}
                </ul>
            </div>

            {result !== null && (
                <div>
                    <h2>Resultado</h2>
                    <p>{result}</p>
                </div>
            )}
        </div>
    );
}

export default Calculadora;
