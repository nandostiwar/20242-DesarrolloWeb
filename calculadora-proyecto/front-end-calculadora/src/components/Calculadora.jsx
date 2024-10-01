import { useState } from "react";
import '../styles/Calculadora.css';
import Resultado from "./Resultado";

function Calculadora() {
    const [values, setValues] = useState({ A: '', B: '', C: '', D: '', E: '', F: '' });
    const [checked, setChecked] = useState({ A: false, B: false, C: false, D: false, E: false, F: false });
    const [sortedValues, setSortedValues] = useState([]);
    const [resultado, setResultado] = useState('');
    const [equation, setEquation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setChecked(prevChecked => ({ ...prevChecked, [name]: checked }));
    };

    const handleSort = (order) => {
        const selectedValues = Object.keys(values)
            .filter(key => checked[key])
            .map(key => parseFloat(values[key]))
            .filter(value => !isNaN(value));

        if (selectedValues.length === 0) {
            setErrorMessage("Selecciona al menos un valor válido para ordenar.");
            return;
        }

        setErrorMessage('');

        fetch(`http://localhost:3500/v1/calculadora/ordenar${order}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ values: selectedValues }),
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Error al ordenar los valores');
                }
                return res.json();
            })
            .then(data => setSortedValues(data.resultado))
            .catch(err => {
                console.error(err);
                setSortedValues([]); // Limpiar valores ordenados en caso de error
                setErrorMessage('Ocurrió un error al ordenar los valores.');
            });
    };

    const handleEquation = () => {
        if (!equation) {
            setErrorMessage("Ingresa una ecuación válida.");
            return;
        }
    
        setErrorMessage('');
    
        fetch('http://localhost:3500/v1/calculadora/evaluarEcuacion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                ecuacion: equation,
                values: values // Agregar los valores aquí
            }),
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Error al evaluar la ecuación');
                }
                return res.json();
            })
            .then(data => setResultado(data.resultado))
            .catch(err => {
                console.error(err);
                setResultado('');
                setErrorMessage('Ocurrió un error al evaluar la ecuación.');
            });
    };
    

    return (
        <div className="container">
            <h1 id="txtCalculadora">CALCULADORA</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Mostrar mensaje de error */}
            <div className="inputs">
                {['A', 'B', 'C', 'D', 'E', 'F'].map((key) => (
                    <div key={key}>
                        <input
                            type="text"
                            name={key}
                            placeholder={key}
                            value={values[key]}
                            onChange={handleInputChange}
                        />
                        <input
                            type="checkbox"
                            name={key}
                            checked={checked[key]}
                            onChange={handleCheckboxChange}
                        />
                    </div>
                ))}
            </div>
            <div className="operations">
                <button onClick={() => handleSort('Ascendente')}>Ascendente</button>
                <button onClick={() => handleSort('Descendente')}>Descendente</button>
                <div>
                    <input
                        type="text"
                        placeholder="Ingresa la ecuación"
                        value={equation}
                        onChange={(e) => setEquation(e.target.value)}
                    />
                    <button onClick={handleEquation}>Calcular Ecuación</button>
                </div>
            </div>
            <div className="results">
                <Resultado resultado={`Valores ordenados: ${sortedValues.join(', ')}`} />
                <Resultado resultado={`Resultado de la ecuación: ${resultado}`} />
            </div>
        </div>
    );
}

export default Calculadora;
