import { useState } from "react";
import '../styles/Calculadora.css'
import Resultado from "./Resultado";

function Calculadora() {
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [resultado, setResultado] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        const operacion = e.target.value;

        if (operacion == "sumar"){setResultado(parseFloat(number1)+parseFloat(number2))}
        if (operacion == "restar"){setResultado("restar")}
        if (operacion == "multiplicar"){setResultado("multiplicar")}

        fetch(`http://localhost:3500/v1/calculadora/${operacion}`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ number1, number2 })
        })
            .then(res => res.json())
            .then(responseData => {
                setResultado(responseData.resultado)
                // setResultado(responseData)
                // console.log(resultado)
            })
            let ResultadosMatematicos;
            const num1 = parseFloat(number1);
            const num2 = parseFloat(number2);

            switch(operacion){
                case "sumar":
                    ResultadosMatematicos = num1 + num2;
                    break;
                case "restar":
                    ResultadosMatematicos = num1 - num2;
                    break;
                case "dividir":
                    ResultadosMatematicos = num1 / num2;
                    break;
                case "multiplicar":
                    ResultadosMatematicos = num1 * num2;
                    break;
            }
    setResultado(ResultadosMatematicos);
    }

    return (
        <div className="container">
            <h1 id="txtCalculadora">CALCULADORA</h1>
            <form>
                <input type="text" className="number" onChange={(e)=>{setNumber1(e.target.value)}}/><br />
                <input type="text" className="number" onChange={(e)=>{setNumber2(e.target.value)}}/><br />
                <input type="submit" className="btnEnviar" value="sumar" onClick={handleSubmit}/>
                <input type="submit" className="btnEnviar" value="restar" onClick={handleSubmit}/>
                <input type="submit" className="btnEnviar" value="multiplicar" onClick={handleSubmit}/>
                <input type="submit" className="btnEnviar" value="dividir" onClick={handleSubmit}/>
            </form>
            <Resultado resultado={"El resultado es " + resultado}/>
        </div>
    )
}

export default Calculadora