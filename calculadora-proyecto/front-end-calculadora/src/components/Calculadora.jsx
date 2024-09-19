import { useState } from "react";
import '../styles/Calculadora.css';
import Resultado from "./Resultado";

function Calculadora() {
    const [numbers, setNumbers] = useState({
        a: '',
        b: '',
        c: '',
        d: '',
        ecuacion: ''
    });
    const [resultado, setResultado] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        const operacion = e.target.value;

        fetch(`http://localhost:3500/v1/calculadora/${operacion}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                number1: numbers.a,
                number2: numbers.b,
                number3: numbers.c,
                number4: numbers.d
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Error en la solicitud: ${res.status} - ${res.statusText}`);
                }
                return res.json();
            })
            .then(responseData => {
                setResultado(responseData.resultado);
            })
            .catch(error => {
                console.error("Error:", error);
                setResultado("Ocurrió un error al procesar la solicitud.");
            });
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setNumbers(prevNumbers => ({
            ...prevNumbers,
            [name]: value
        }));
    }

    function handleCalcularEcuacion(e) {
        e.preventDefault();

        fetch('http://localhost:3500/v1/calculadora/ecuacion', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ecuacion: numbers.ecuacion,
                values: {
                    a: numbers.a || 0,
                    b: numbers.b || 0,
                    c: numbers.c || 0,
                    d: numbers.d || 0
                }
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Error en la solicitud: ${res.status} - ${res.statusText}`);
                }
                return res.json();
            })
            .then(responseData => {
                setResultado(responseData.resultado);
            })
            .catch(error => {
                console.error("Error:", error);
                setResultado("Ocurrió un error al procesar la solicitud.");
            });
    }
    return (
        <div className="container">
            <h1 id="txtCalculadora">Ordenar Números y Calcular Ecuaciones</h1>
            <form>
                <input
                    type="number"
                    className="number"
                    name="a"
                    placeholder="Valor de a"
                    onChange={handleChange}
                /><br />
                <input
                    type="number"
                    className="number"
                    name="b"
                    placeholder="Valor de b"
                    onChange={handleChange}
                /><br />
                <input
                    type="number"
                    className="number"
                    name="c"
                    placeholder="Valor de c"
                    onChange={handleChange}
                /><br />
                <input
                    type="number"
                    className="number"
                    name="d"
                    placeholder="Valor de d"
                    onChange={handleChange}
                /><br />
                <input
                    type="text"
                    className="number"
                    name="ecuacion"
                    placeholder="Ecuación (ej: 2*a + 3*b)"
                    onChange={handleChange}
                /><br />
                <button
                    type="submit"
                    className="btnEnviar"
                    value="ascendente"
                    onClick={handleSubmit}
                >
                    Ascendente
                </button>
                <button
                    type="submit"
                    className="btnEnviar"
                    value="descendente"
                    onClick={handleSubmit}
                >
                    Descendente
                </button>
                <button
                    type="submit"
                    className="btnEnviar"
                    onClick={handleCalcularEcuacion}
                >
                    Calcular Ecuación
                </button>
            </form>
            <Resultado resultado={"El resultado es: " + resultado} />
        </div>
    );
}

export default Calculadora;