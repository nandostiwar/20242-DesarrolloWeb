import { useState } from "react";
import '../styles/Calculadora.css';
import Resultado from "./Resultado";

function Calculadora() {
    // Estado para las casillas de números A-F
    const [casillas, setCasillas] = useState({ A: '', B: '', C: '', D: '', E: '', F: '' });
    // Estado para las casillas seleccionadas
    const [seleccionadas, setSeleccionadas] = useState({ A: false, B: false, C: false, D: false, E: false, F: false });
    const [operacion, setOperacion] = useState('');
    const [resultado, setResultado] = useState('');

    // Manejar cambios en las casillas
    const handleChange = (e, letra) => {
        setCasillas({ ...casillas, [letra]: e.target.value });
    };

    // Manejar selección de casillas
    const handleSelect = (e, letra) => {
        setSeleccionadas({ ...seleccionadas, [letra]: e.target.checked });
    };

    // Ordenar valores
    const handleOrdenar = (tipo) => {
        const valoresSeleccionados = Object.keys(casillas)
            .filter(letra => seleccionadas[letra])
            .map(letra => parseFloat(casillas[letra]))
            .filter(val => !isNaN(val));

        const valoresOrdenados = tipo === 'ascendente'
            ? valoresSeleccionados.sort((a, b) => a - b)
            : valoresSeleccionados.sort((a, b) => b - a);

        setResultado(valoresOrdenados.join(', '));
    };

    // Manejar operaciones
    const handleOperacion = () => {
        // Usamos eval solo como ejemplo, en producción evitarlo por razones de seguridad
        try {
            const res = eval(operacion);
            setResultado(res);
        } catch {
            setResultado('Error en la operación');
        }
    };

    return (
        <div className="container">
            <h1>Calculadora con Ordenación y Operaciones</h1>
            <div className="casillas">
                {['A', 'B', 'C', 'D', 'E', 'F'].map(letra => (
                    <div key={letra}>
                        <label>{letra}: </label>
                        <input
                            type="text"
                            value={casillas[letra]}
                            onChange={(e) => handleChange(e, letra)}
                        />
                        <input
                            type="checkbox"
                            checked={seleccionadas[letra]}
                            onChange={(e) => handleSelect(e, letra)}
                        />
                    </div>
                ))}
            </div>

            <div className="botones">
                <button onClick={() => handleOrdenar('ascendente')}>Ascendente</button>
                <button onClick={() => handleOrdenar('descendente')}>Descendente</button>
            </div>

            <div className="operacion">
                <h3>Realizar Operación</h3>
                <input
                    type="text"
                    placeholder="Escribe la operación (ej: 2*A + 3*B)"
                    value={operacion}
                    onChange={(e) => setOperacion(e.target.value)}
                />
                <button onClick={handleOperacion}>Calcular</button>
            </div>

            <Resultado resultado={"El resultado es " + resultado} />
        </div>
    );
}

export default Calculadora;
