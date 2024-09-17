import { Navigate, useNavigate } from "react-router-dom";
import './styles/UserHome.css';
import TextSigno from "./TextSigno.jsx";
import { useState } from "react";

function UserHome({ user }) {
    if (user !== "user" || !user) {
        return <Navigate to="/" />
    }

    const home = useNavigate();
    const [textoSigno, setTextoSigno] = useState('');
    const [signoSeleccionado, setSignoSeleccionado] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

    function goHome() {
        home("/");
    }

    // Función para manejar la selección de signos
    function handleSelectSigno(event) {
        const signo = event.target.value;
        setSignoSeleccionado(signo);
        if (signo !== "0" && categoriaSeleccionada) {
            const textoGuardado = localStorage.getItem(`${signo}-${categoriaSeleccionada}`);
            setTextoSigno(textoGuardado || "No hay información disponible para este signo y categoría.");
        }
    }

    // Función para manejar la selección de categoría
    function handleSelectCategoria(event) {
        const categoria = event.target.value;
        setCategoriaSeleccionada(categoria);
        if (signoSeleccionado && categoria !== "0") {
            const textoGuardado = localStorage.getItem(`${signoSeleccionado}-${categoria}`);
            setTextoSigno(textoGuardado || "No hay información disponible para este signo y categoría.");
        }
    }

    return (
        <div className="container">
            <div id="txtSeleccionPage"><h3>Selecciona tu signo zodiacal y categoría</h3></div>

            {/* Selección de signos zodiacales */}
            <select id="selectSignos" onChange={handleSelectSigno}>
                <option value="0">Selecciona un signo zodiacal</option>
                <option value="Aries">Aries</option>
                <option value="Geminis">Géminis</option>
                <option value="Cancer">Cáncer</option>
                <option value="Leo">Leo</option>
                <option value="Virgo">Virgo</option>
                <option value="Libra">Libra</option>
                <option value="Escorpio">Escorpio</option>
                <option value="Sagitario">Sagitario</option>
                <option value="Capricornio">Capricornio</option>
                <option value="Acuario">Acuario</option>
                <option value="Piscis">Piscis</option>
            </select>

            {/* Selección de categoría */}
            <select id="selectCategoria" onChange={handleSelectCategoria}>
                <option value="0">Selecciona una categoría</option>
                <option value="niño">Niño</option>
                <option value="mujer">Mujer</option>
                <option value="hombre">Hombre</option>
            </select>

            {/* Mostrar el texto correspondiente */}
            <TextSigno texto={textoSigno} />
            <button id="btnHome" onClick={goHome}>Home</button>
        </div>
    );
}

export default UserHome;