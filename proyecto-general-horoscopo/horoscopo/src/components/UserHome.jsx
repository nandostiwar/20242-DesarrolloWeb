import { Navigate, useNavigate } from "react-router-dom";
import './styles/UserHome.css';
import TextSigno from "./TextSigno.jsx";
import { useState } from "react";

function UserHome({ user }) {
    if (user !== "user" || !user) {
        return <Navigate to="/" />;
    }

    const home = useNavigate();
    const [textoSigno, setTextoSigno] = useState('');
    const [viewType, setViewType] = useState('signo');

    function goHome() {
        home("/");
    }

    async function handleSelect(event) {
        const value = event.target.value;
        let url = '';

        if (viewType === 'signo' && value !== "0") {
            url = `http://localhost:4000/v1/signos/${value}`;
        } else if (viewType === 'tipoPersona' && value !== "0") {
            url = `http://localhost:4000/v1/tipoPersona/${value}`;
        }

        if (url) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                const responseData = await response.json();
                setTextoSigno(responseData);
            } catch (error) {
                console.error("Error:", error);
                setTextoSigno('Error al obtener datos');
            }
        } else {
            setTextoSigno(''); 
        }
    }

    return (
        <div className="container">
            {viewType === 'signo' ? (
                <>
                    <div id="txtSeleccionPage"><h3>Selecciona tu signo zodiacal</h3></div>
                    <select id="selectSignos" onChange={handleSelect}>
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
                    <button onClick={() => setViewType('tipoPersona')}>Tipo de Persona</button>
                </>
            ) : viewType === 'tipoPersona' ? (
                <>
                    <div id="txtSeleccionPage"><h3>Tipo de persona</h3></div>
                    <select id="selectgenero" onChange={handleSelect}>
                        <option value="0">Selecciona una opción</option>
                        <option value="hombre">Hombre</option>
                        <option value="mujer">Mujer</option>
                        <option value="niño">Niño</option>
                    </select>
                    <button onClick={() => setViewType('signo')}>Selecciona tu Signo</button>
                </>
            ) : null}
            <TextSigno texto={textoSigno} />
            <button id="btnHome" onClick={goHome}>Home</button>
        </div>
    );
}

export default UserHome;
