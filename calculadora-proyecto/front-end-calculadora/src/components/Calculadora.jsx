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

<<<<<<< HEAD
        // Verificamos si los campos están vacíos o si no son números
        if (number1 === '' || number2 === '' || isNaN(number1) || isNaN(number2)) {
            setResultado("Error:");
            return;
        }

        let result;

        // Convertimos los valores a números
        const num1 = parseFloat(number1);
        const num2 = parseFloat(number2);

        // Realizamos la operación correspondiente
        switch(operacion){
            case 'sumar':
                result = num1 + num2;
                break;
            case 'restar':
                result = num1 - num2;
                break;
            case 'multiplicar':
                result = num1 * num2;
                break;
            case 'division':
                if(num2 !== 0) {
                    result = num1 / num2;
                } else {
                    result = "Error: División por cero";
                }
                break;
            default:
                result = "Operación no válida";
        }

        // Actualizamos el estado con el resultado
        setResultado(result);
=======
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
>>>>>>> main
    }

    return (
        <div className="container">
            <h1 id="txtCalculadora">CALCULADORA</h1>
            <form>
<<<<<<< HEAD
                <input type="text" className="number" onChange={(e)=>{setNumber1(e.target.value)}} value={number1} /><br />
                <input type="text" className="number" onChange={(e)=>{setNumber2(e.target.value)}} value={number2} /><br />
                <input type="submit" className="btnEnviar" value="sumar" onClick={handleSubmit}/>
                <input type="submit" className="btnEnviar" value="restar" onClick={handleSubmit}/>
                <input type="submit" className="btnEnviar" value="multiplicar" onClick={handleSubmit}/>
                <input type="submit" className="btnEnviar" value="division" onClick={handleSubmit}/>
            </form>
            <Resultado resultado={"El resultado es: " + resultado}/>
=======
                <input type="text" className="number" onChange={(e) => { setNumber1(e.target.value) }} /><br />
                <input type="text" className="number" onChange={(e) => { setNumber2(e.target.value) }} /><br />
                <input type="submit" className="btnEnviar" value="sumar" onClick={handleSubmit} />
                <input type="submit" className="btnEnviar" value="restar" onClick={handleSubmit} />
                <input type="submit" className="btnEnviar" value="multiplicar" onClick={handleSubmit} />
                <input type="submit" className="btnEnviat" value="dividir" onclick={handleSubmit} />
            </form>
<<<<<<< HEAD
            <Resultado resultado={"El resultado es " + resultado}/>
=======
            <Resultado resultado={"El resultado es " + resultado} />
>>>>>>> 13efb85ca047811ca7b2e3fd036f0d80824f1cfe
>>>>>>> main
        </div>
    )
}

export default Calculadora;
