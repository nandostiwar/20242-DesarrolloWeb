import { Navigate, useNavigate } from "react-router-dom";
import './styles/AdminHome.css';
import { useState, useEffect } from "react";

function AdminHome({ user }) {
    if (user !== 'admin' || !user) {
        return <Navigate to="/" />
    }

    const home = useNavigate();
    const [textoEditar, setTextoEditar] = useState("");
    const [signoEditar, setSignoEditar] = useState("");
    const [tipoPersona, setTipoPersona] = useState(""); // Estado para el tipo de persona

    // Volver a la página de inicio
    function goHome() {
        home("/");
    }

    // Manejar la solicitud de edición
    function handleClick(e) {
        e.preventDefault();
        if (!signoEditar || !tipoPersona) {
            alert("Por favor selecciona un signo zodiacal y un tipo de persona");
            return;
        }

        // Guardar en localStorage
        const storedSignos = JSON.parse(localStorage.getItem('signos')) || {};
        storedSignos[`${signoEditar}-${tipoPersona}`] = { texto: textoEditar }; // Guardar texto con signo y tipo
        localStorage.setItem('signos', JSON.stringify(storedSignos));

        alert("Horóscopo actualizado con éxito");
    }

    return (
        <div className="container">
            <h2 id="textoAdmin">Edita un Signo Zodiacal</h2>
            
            {/* Selector de signos zodiacales */}
            <select id="editSignos" onChange={(e) => setSignoEditar(e.target.value)}>
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
            <select id="selectTipoPersona" onChange={(e) => setTipoPersona(e.target.value)}>
                <option value="0">Selecciona el tipo de persona</option>
                <option value="niño">Niño</option>
                <option value="mujer">Mujer</option>
                <option value="hombre">Hombre</option>
            </select>

            {/* Textarea para el contenido a editar */}
            <textarea id="textoEditar" cols="50" rows="10" onChange={(e) => setTextoEditar(e.target.value)} />
            <button id="btnEditar" onClick={handleClick}>Guardar</button>
            <button id="btnHomeAdmin" onClick={goHome}>Home</button>
        </div>
    );
}

export default AdminHome;
