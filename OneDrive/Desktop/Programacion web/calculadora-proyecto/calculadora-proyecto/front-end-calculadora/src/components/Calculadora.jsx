import { useState } from "react";
import '../styles/Calculadora.css'
import Resultado from "./Resultado";

function Calculadora() {
    const [seleccionados, setSeleccionados] = useState([]);
    const [resultadoAscendente, setResultadoAscendente] = useState('');
    const [resultadoDescendente, setResultadoDescendente] = useState('');
    const [resultadoEcuacion, setResultadoEcuacion] = useState('');
    const [ecuacion, setEcuacion] = useState('');
    const [valoresEditables, setValoresEditables] = useState({ A: 12, B: 90, C: 8, D: 6, E: 9, F: 14 });

    const handleCheckboxChange = (letra) => {
        setSeleccionados(prev =>
            prev.includes(letra) ? prev.filter(item => item !== letra) : [...prev, letra]
        );
    };

    const manejarCambioValor = (letra, valor) => {
        setValoresEditables(prev => ({
            ...prev,
            [letra]: Number(valor)
        }));
    };

    const enviarOrden = (orden) => {
        fetch(`http://localhost:3500/v1/calculadora/${orden}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ numeros: seleccionados.map(letra => valoresEditables[letra]) })
        })
            .then(res => res.json())
            .then(data => {
                if (orden === 'ascendente') {
                    setResultadoAscendente(data.numerosOrdenados.join(', '));
                } else {
                    setResultadoDescendente(data.numerosOrdenados.join(', '));
                }
            })
            .catch(err => console.error(err));
    };

    const enviarEcuacion = () => {
        fetch('http://localhost:3500/v1/calculadora/ecuacion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ecuacion, valores: valoresEditables })
        })
            .then(res => res.json())
            .then(data => setResultadoEcuacion(data.resultado))
            .catch(err => console.error(err));
    };

    return (
        <div className="container">
            <h1>Calculadora</h1>

            <div className="valores-editables">
                {Object.keys(valoresEditables).map(letra => (
                    <div key={letra} className="valor-editable">
                        <label htmlFor={letra}>{letra}:</label>
                        <input
                            type="number"
                            id={letra}
                            value={valoresEditables[letra]}
                            onChange={(e) => manejarCambioValor(letra, e.target.value)}
                        />
                    </div>
                ))}
            </div>

            <div className="checkbox-container">
                {Object.keys(valoresEditables).map(letra => (
                    <div key={letra}>
                        <input
                            type="checkbox"
                            id={letra}
                            onChange={() => handleCheckboxChange(letra)}
                        />
                        <label htmlFor={letra}>{letra} ({valoresEditables[letra]})</label>
                    </div>
                ))}
            </div>

            <button onClick={() => enviarOrden('ascendente')}>Ordenar Ascendente</button>
            <button onClick={() => enviarOrden('descendente')}>Ordenar Descendente</button>

            <div>
                <h2>Ecuación</h2>
                <input
                    type="text"
                    value={ecuacion}
                    onChange={(e) => setEcuacion(e.target.value)}
                    placeholder="Ingresa una ecuación (ej: 2A+3B)"
                />
                <button onClick={enviarEcuacion}>Calcular Ecuación</button>
            </div>

            <div className="resultado-container">
                <div className="resultado-box">
                    <h3>Resultado Ascendente:</h3>
                    <p>{resultadoAscendente}</p>
                </div>
                <div className="resultado-box">
                    <h3>Resultado Descendente:</h3>
                    <p>{resultadoDescendente}</p>
                </div>
                <div className="resultado-box">
                    <h3>Resultado Ecuación:</h3>
                    <p>{resultadoEcuacion}</p>
                </div>
            </div>
        </div>
    );
}

export default Calculadora;