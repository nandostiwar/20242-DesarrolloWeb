import { useState } from "react";
import '../styles/Calculadora.css';
import Resultado from "./Resultado"; // Importa el componente `Resultado`

function Calculadora() {
    // Combinando las versiones: Inicializo ambos estados según tus necesidades
    const [numbers, setNumbers] = useState([
        { label: 'A', checked: false },
        { label: 'B',  checked: false },
        { label: 'C',  checked: false },
        { label: 'D',  checked: false },
        { label: 'E',  checked: false },
        { label: 'F', checked: false }
    ]);

    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [mayorMenor, setMayorMenor] = useState([]);
    const [menorMayor, setMenorMayor] = useState([]);
    const [ascendenteResult, setAscendenteResult] = useState('');
    const [descendenteResult, setDescendenteResult] = useState('');
    const [equation, setEquation] = useState('');
    const [equationResult, setEquationResult] = useState('');
    const [operacion, setOperacion] = useState(''); // Para almacenar la operación seleccionada
    const [resultadoOperacion, setResultadoOperacion] = useState(null); // Resultado de la operación

    // Manejadores de eventos
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
            console.error("Debe seleccionar al menos un número.");
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

    // Manejadores para las operaciones del segundo bloque
    const handleOrdenarSubmit = () => {
        fetch('http://localhost:3500/v1/ordenarNumeros', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ numeros: selectedNumbers })
        })
        .then(res => res.json())
        .then(data => {
            setMayorMenor(data.mayorMenor);
            setMenorMayor(data.menorMayor);
        });
    };

    const handleOperacionSubmit = () => {
        if (!operacion) {
            alert('Selecciona una operación.');
            return;
        }

        fetch('http://localhost:3500/v1/operarNumeros', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ numeros: selectedNumbers, operacion })
        })
        .then(res => res.json())
        .then(data => {
            setResultadoOperacion(data.resultado);
        });
    };

    return (
        <div className="container">
            <h1 id="txtCalculadora">PARCIAL 1</h1>

            {/* Primer bloque de números con inputs y checkboxes */}
            <div className="number-selection">
                {numbers.map((number, index) => (
                    <div key={index} className="number-item">
                        <label>
                            {number.label}
                            <input 
                                type="number" 
                                className="number-value" 
                                value={number.value || ''} 
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

            {/* Botones de ordenar */}
            <div className="ordering-buttons">
                <button onClick={() => handleOrder('ascendente')}>Ascendente</button>
                <input type="text" className="result-box" value={ascendenteResult} readOnly />

                <button onClick={() => handleOrder('descendente')}>Descendente</button>
                <input type="text" className="result-box" value={descendenteResult} readOnly />
            </div>

            {/* Sección de ecuación */}
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

            {/* Segundo bloque de selección y operaciones */}
            <div className="botones">
                {numbers.map(number => (
                    <div key={number.label}>
                        <button>{number.value || number.label}</button>
                        <input 
                            type="checkbox" 
                            value={number.value} 
                            onChange={handleCheckboxChange}
                        /> Seleccionar
                    </div>
                ))}
            </div>

            <button onClick={handleOrdenarSubmit}>Ordenar Números</button>

            {/* Paneles para mostrar los resultados */}
            <div className="resultados">
                <h2>Mayor a Menor</h2>
                <div>{mayorMenor.join(', ')}</div>

                <h2>Menor a Mayor</h2>
                <div>{menorMayor.join(', ')}</div>
            </div>

            {/* Panel de operaciones matemáticas */}
            <div className="operaciones">
                <h2>Operaciones</h2>
                <select onChange={(e) => setOperacion(e.target.value)} value={operacion}>
                    <option value="">Selecciona una operación</option>
                    <option value="sumar">Sumar</option>
                    <option value="restar">Restar</option>
                    <option value="multiplicar">Multiplicar</option>
                    <option value="dividir">Dividir</option>
                </select>

                <button onClick={handleOperacionSubmit}>Calcular</button>

                {resultadoOperacion !== null && (
                    <div className="resultadoOperacion">
                        <h3>Resultado de la operación: {resultadoOperacion}</h3>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Calculadora;
