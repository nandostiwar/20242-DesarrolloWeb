import { useState } from "react";
import '../styles/Calculadora.css';
import Resultado from "./Resultado";

function Calculadora() {
    const [selectedNumbers, setSelectedNumbers] = useState([]);
    const [mayorMenor, setMayorMenor] = useState([]);
    const [menorMayor, setMenorMayor] = useState([]);
    const [operacion, setOperacion] = useState(''); // Para almacenar la operación seleccionada
    const [resultadoOperacion, setResultadoOperacion] = useState(null); // Resultado de la operación

    const numbers = [12, 90, 8, 6, 9, 14]; // Los números para los botones

    function handleCheckboxChange(e) {
        const value = parseInt(e.target.value);
        if (e.target.checked) {
            setSelectedNumbers([...selectedNumbers, value]);
        } else {
            setSelectedNumbers(selectedNumbers.filter(num => num !== value));
        }
    }

    function handleOrdenarSubmit() {
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
    }

    function handleOperacionSubmit() {
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
            setResultadoOperacion(data.resultado); // Mostrar el resultado de la operación
        });
    }

    return (
        <div className="container">
            <h1>Selecciona Números</h1>
            
            {/* Generar botones con números y checkboxes*/}
            <div className="botones">
                {numbers.map(number => (
                    <div key={number}>
                        <button>{number}</button>
                        <input 
                            type="checkbox" 
                            value={number} 
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