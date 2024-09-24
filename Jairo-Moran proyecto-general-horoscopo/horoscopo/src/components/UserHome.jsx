import { Navigate, useNavigate } from "react-router-dom";
import './styles/UserHome.css';
import TextSigno from "./TextSigno.jsx";
import { useState, useEffect } from "react";

function UserHome({user}){
    if(user!=="user" || !user){
        return <Navigate to="/"/>
    }
    const home = useNavigate();
    const [textoSigno, setTextoSigno] = useState('');
    const [signoSeleccionado, setSignoSeleccionado] = useState('0');
    const [perfilSeleccionado, setPerfilSeleccionado] = useState('0');

    function goHome(){
        home("/");
    }

    useEffect(() => {
        if (signoSeleccionado !== "0" && perfilSeleccionado !== "0") {
            fetchSignoInfo();
        }
    }, [signoSeleccionado, perfilSeleccionado]);

    async function fetchSignoInfo() {
        try {
            const response = await fetch(`http://localhost:4000/api/${signoSeleccionado}?perfil=${perfilSeleccionado}`);
            const responseData = await response.json();
            setTextoSigno(responseData);
        } catch (error) {
            console.error("Error fetching signo info:", error);
            setTextoSigno("Error al obtener la información del signo.");
        }
    }

    function handleSelectSigno(event){
        setSignoSeleccionado(event.target.value);
    }

    function handleSelectPerfil(event){
        setPerfilSeleccionado(event.target.value);
    }

    return (
        <div className="container">
            <div id="txtSeleccionPage"><h3>Selecciona tu signo zodiacal y perfil</h3></div>
            <select id="selectSignos" onChange={handleSelectSigno} value={signoSeleccionado}>
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
            <select id="selectPerfil" onChange={handleSelectPerfil} value={perfilSeleccionado}>
                <option value="0">Selecciona un perfil</option>
                <option value="hombre">Hombre</option>
                <option value="mujer">Mujer</option>
                <option value="nino">Niño</option>
            </select>
            <TextSigno texto={textoSigno}/>
            <button id="btnHome" onClick={goHome}>Home</button>
        </div>
    )
}

export default UserHome;