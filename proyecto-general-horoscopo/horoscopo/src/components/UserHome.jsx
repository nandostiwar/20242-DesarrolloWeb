import { Navigate, useNavigate } from "react-router-dom";
import './styles/UserHome.css';
import TextSigno from "./TextSigno.jsx";
import { useState, useEffect } from "react";

function UserHome({ user }) {
    if (user !== "user" || !user) {
        return <Navigate to="/" />;
    }

    const home = useNavigate();
    const [textoSigno, setTextoSigno] = useState('');
    const [tipoPersona, setTipoPersona] = useState('');
    const [signoSeleccionado, setSignoSeleccionado] = useState('');

    // Volver a la página de inicio
    function goHome() {
        home("/");
    }

    // Manejar la selección del signo zodiacal
    function handleSelectSigno(event) {
        const signo = event.target.value;
        setSignoSeleccionado(signo); // Guardar el signo seleccionado
        if (signo !== "0" && tipoPersona !== "") {
            const storedSignos = JSON.parse(localStorage.getItem('signos')) || {};
            const signoData = storedSignos[`${signo}-${tipoPersona}`]; // Usar signo y tipo para obtener el texto
            setTextoSigno(signoData ? signoData.texto : "No hay texto disponible");
        }
    }

    // Manejar la selección del tipo de persona
    function handleSelectTipoPersona(event) {
        const tipo = event.target.value;
        setTipoPersona(tipo);
        if (signoSeleccionado !== "0") { // Si hay un signo seleccionado, buscar el texto correspondiente
            const storedSignos = JSON.parse(localStorage.getItem('signos')) || {};
            const signoData = storedSignos[`${signoSeleccionado}-${tipo}`]; // Usar signo y tipo
            setTextoSigno(signoData ? signoData.texto : "No hay texto disponible");
        }
    }

    return (
        <div className="container">
            <div id="txtSeleccionPage"><h3>Selecciona tu signo zodiacal</h3></div>
            
            {/* Selector del signo zodiacal */}
            <select id="selectSignos" onChange={handleSelectSigno}>
                <option value="0">Selecciona un signo zodiacal</option>
                <option value="Aries">Aries</option>
                <option value="Géminis">Géminis</option>
                <option value="Cáncer">Cáncer</option>
                <option value="Leo">Leo</option>
                <option value="Virgo">Virgo</option>
                <option value="Libra">Libra</option>
                <option value="Escorpio">Escorpio</option>
                <option value="Sagitario">Sagitario</option>
                <option value="Capricornio">Capricornio</option>
                <option value="Acuario">Acuario</option>
                <option value="Piscis">Piscis</option>
            </select>

            {/* Selector del tipo de persona */}
            <select id="selectTipoPersona" onChange={handleSelectTipoPersona}>
                <option value="">Selecciona el tipo de persona</option>
                <option value="niño">Niño</option>
                <option value="mujer">Mujer</option>
                <option value="hombre">Hombre</option>
            </select>

            {/* Componente para mostrar el texto del signo */}
            <TextSigno texto={textoSigno} />

            {/* Botón para volver a la página de inicio */}
            <button id="btnHome" onClick={goHome}>Home</button>
        </div>
    );
}

export default UserHome;
