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
    const [perfil, setPerfil] = useState('');

    function goHome() {
        home("/");
    }

    async function handleSelectSigno(event) {
        const signo = event.target.value;
        if (signo !== "0") {
            const storedSignos = JSON.parse(localStorage.getItem('signos')) || {};
            setTextoSigno(storedSignos[signo] || "Texto no disponible para este signo.");
        }
    }

    function handleSelectPerfil(event) {
        setPerfil(event.target.value);
    }

    return (
        <div className="container">
            <div id="txtSeleccionPage"><h3>Selecciona tu signo zodiacal y perfil</h3></div>
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
            <select id="selectPerfil" onChange={handleSelectPerfil}>
                <option value="">Selecciona un perfil</option>
                <option value="hombre">Hombre</option>
                <option value="mujer">Mujer</option>
                <option value="nino">Niño</option>
            </select>
            <TextSigno texto={textoSigno} />
            <button id="btnHome" onClick={goHome}>Home</button>
        </div>
    );
}

export default UserHome;