import { useState } from "react";
import '../styles/Calculadora.css';
import Resultado from "./Resultado";
import NumberSelection from "./NumberSelection"; // Importa el componente de selección

function Calculadora() {
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [resultado, setResultado] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        const operacion = e.target.value;

        fetch(`http://localhost:3500/v1/calculadora/${operacion}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ number1, number2 })
        })
        .then(res => res.json())
        .then(responseData => {
            setResultado(responseData.resultado);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return (
        <div className="container">
            <h1 id="txtCalculadora">CALCULADORA</h1>
            <form>
                <input 
                    type="text" 
                    className="number" 
                    onChange={(e) => setNumber1(e.target.value)} 
                    placeholder="Número 1" 
                /><br />
                
                <input 
                    type="text" 
                    className="number" 
                    onChange={(e) => setNumber2(e.target.value)} 
                    placeholder="Número 2" 
                /><br />
                
                {/* Botones de operación */}
                <input type="submit" className="btnEnviar" value="sumar" onClick={handleSubmit} />
                <input type="submit" className="btnEnviar" value="restar" onClick={handleSubmit} />
                <input type="submit" className="btnEnviar" value="multiplicar" onClick={handleSubmit} />
                <input type="submit" className="btnEnviar" value="mayor" onClick={handleSubmit} />
                <input type="submit" className="btnEnviar" value="menos" onClick={handleSubmit} />
                <input type="submit" className="btnEnviar" value="promedio" onClick={handleSubmit} />
            </form>

            {/* Componente para mostrar el resultado */}
            <Resultado resultado={`El resultado es: ${resultado}`} />

            {/* Añadir el componente de selección de letras y números */}
            <NumberSelection />
        </div>
    );
}

export default Calculadora;



