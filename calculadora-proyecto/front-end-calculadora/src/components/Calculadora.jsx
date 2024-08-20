import { useState } from "react";
import '../styles/Calculadora.css'
import Resultado from "./Resultado";

function Calculadora(){
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [resultado, setResultado] = useState('');

    function handleSubmit(e){
         e.preventDefault();
        const operacion = e.target.value;

        // Agregar lógica de operaciones
        let resultadoOperacion;
        const num1 = parseFloat(number1);
        const num2 = parseFloat(number2);

        if (operacion === "sumar") {
            resultadoOperacion = num1 + num2;
        } else if (operacion === "restar") {
            resultadoOperacion = num1 - num2;
        } else if (operacion === "dividir") {
            resultadoOperacion = num1 / num2;
        } else if (operacion === "Multiplicar") {
            resultadoOperacion = num1 * num2;
        }

        setResultado(resultadoOperacion);
    }

    return (
        <div className="container">
            <h1 id="txtCalculadora">CALCULADORA</h1>
            <form>
                <input type="text" className="number" onChange={(e)=>{setNumber1(e.target.value)}}/><br />
                <input type="text" className="number" onChange={(e)=>{setNumber2(e.target.value)}}/><br />
                <input type="submit" className="btnEnviar" value="sumar" onClick={handleSubmit}/>
                <input type="submit" className="btnEnviar" value="restar" onClick={handleSubmit}/>
                <input type="submit" className="btnEnviar" value="dividir" onClick={handleSubmit}/>
                <input type="submit" className="btnEnviar" value="Multiplicar" onClick={handleSubmit}/>
 
            </form>
            <Resultado resultado={"El resultado es "+ resultado}/>
        </div>
    )
}

export default Calculadora