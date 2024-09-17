import { useState } from "react";
import '../styles/Calculadora.css';
import Resultado from "./Resultado";

function Calculadora() {
    const [resultado, setResultado] = useState('');

    // Estado para los 6 checkboxes
    const [checkboxes, setCheckboxes] = useState({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
        checkbox5: false,
        checkbox6: false,
    });

    // Manejar el cambio de los checkboxes
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setCheckboxes({
            ...checkboxes,
            [name]: checked
        });
    };

    // Función para obtener los valores seleccionados de los checkboxes
    const getSelectedCheckboxValues = () => {
        const selectedValues = [];
        Object.keys(checkboxes).forEach((key) => {
            if (checkboxes[key]) {
                switch (key) {
                    case 'checkbox1':
                        selectedValues.push(12);
                        break;
                    case 'checkbox2':
                        selectedValues.push(90);
                        break;
                    case 'checkbox3':
                        selectedValues.push(8);
                        break;
                    case 'checkbox4':
                        selectedValues.push(6);
                        break;
                    case 'checkbox5':
                        selectedValues.push(9);
                        break;
                    case 'checkbox6':
                        selectedValues.push(14);
                        break;
                    default:
                        break;
                }
            }
        });
        return selectedValues;
    };

    // Función para ordenar los números seleccionados en las checkboxes
    const handleOrdenar = (e) => {
        e.preventDefault();

        // Obtener los valores de los checkboxes seleccionados
        const selectedCheckboxValues = getSelectedCheckboxValues();

        // Enviar los valores seleccionados al backend para que se ordenen
        fetch(`http://localhost:3500/v1/calculadora/ordenar`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                checkboxes: selectedCheckboxValues // Enviar los valores seleccionados de los checkboxes
            })
        })
            .then(res => res.json())
            .then(responseData => {
                setResultado(responseData.resultado.join(', ')); // Mostrar los números ordenados como una cadena
            });
    };

    return (
        <div className="container">
            <h1 id="txtCalculadora">CALCULADORA</h1>
            <form>
                {/* Checkboxes con valores numéricos */}
                <label>
                    <input
                        type="checkbox"
                        name="checkbox1"
                        value="12"
                        checked={checkboxes.checkbox1}
                        onChange={handleCheckboxChange}
                    />
                    A (Valor: 12)
                </label><br />

                <label>
                    <input
                        type="checkbox"
                        name="checkbox2"
                        value="90"
                        checked={checkboxes.checkbox2}
                        onChange={handleCheckboxChange}
                    />
                    B (Valor: 90)
                </label><br />

                <label>
                    <input
                        type="checkbox"
                        name="checkbox3"
                        value="8"
                        checked={checkboxes.checkbox3}
                        onChange={handleCheckboxChange}
                    />
                    C (Valor: 8)
                </label><br />

                <label>
                    <input
                        type="checkbox"
                        name="checkbox4"
                        value="6"
                        checked={checkboxes.checkbox4}
                        onChange={handleCheckboxChange}
                    />
                    D (Valor: 6)
                </label><br />

                <label>
                    <input
                        type="checkbox"
                        name="checkbox5"
                        value="9"
                        checked={checkboxes.checkbox5}
                        onChange={handleCheckboxChange}
                    />
                    E (Valor: 9)
                </label><br />

                <label>
                    <input
                        type="checkbox"
                        name="checkbox6"
                        value="14"
                        checked={checkboxes.checkbox6}
                        onChange={handleCheckboxChange}
                    />
                    F (Valor: 14)
                </label><br />

                {/* Botón para ordenar los números seleccionados */}
                <button onClick={handleOrdenar}>Ordenar Checkboxes</button>
            </form>

            {/* Mostrar los resultados */}
            <Resultado resultado={"Los números ordenados son: " + resultado} />
        </div>
    );
}

export default Calculadora;