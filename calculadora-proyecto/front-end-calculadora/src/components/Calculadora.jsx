import { useState } from "react";
import '../styles/Calculadora.css';
import Resultado from "./Resultado";

function Calculadora() {
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [resultado, setResultado] = useState(null);

    function realizarOperacion(operacion) {
        const num1 = parseFloat(number1);
        const num2 = parseFloat(number2);

        if (isNaN(num1) || isNaN(num2)) {
            setResultado("Por favor ingresa números válidos");
            return;
        }

        let resultado;
        switch (operacion) {
            case 'sumar':
                resultado = num1 + num2;
                break;
            case 'restar':
                resultado = num1 - num2;
                break;
            case 'multiplicar':
                resultado = num1 * num2;
                break;
            case 'dividir':
                resultado = num2 !== 0 ? num1 / num2 : "Error: División por cero";
                break;
            default:
                resultado = "Operación no válida";
        }

        setResultado(resultado);
    }

    return (
        <div className="container">
            <h1 id="txtCalculadora">CALCULADORA</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <input 
                    type="number" 
                    className="number" 
                    value={number1} 
                    onChange={(e) => setNumber1(e.target.value)} 
                    placeholder="Número 1"
                /><br />
                <input 
                    type="number" 
                    className="number" 
                    value={number2} 
                    onChange={(e) => setNumber2(e.target.value)} 
                    placeholder="Número 2"
                /><br />
                <input type="button" className="btnEnviar" value="sumar" onClick={() => realizarOperacion('sumar')} />
                <input type="button" className="btnEnviar" value="restar" onClick={() => realizarOperacion('restar')} />
                <input type="button" className="btnEnviar" value="multiplicar" onClick={() => realizarOperacion('multiplicar')} />
                <input type="button" className="btnEnviar" value="dividir" onClick={() => realizarOperacion('dividir')} />
            </form>
            {resultado !== null && <Resultado resultado={"El resultado es " + resultado} />}
        </div>
    );
}

export default Calculadora;
