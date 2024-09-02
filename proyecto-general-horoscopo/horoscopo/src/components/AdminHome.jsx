import { Navigate, useNavigate } from "react-router-dom";
import './styles/AdminHome.css';
import { useState } from "react";

function AdminHome({ user }) {
    if (user !== 'admin' || !user) {
        return <Navigate to="/" />
    }

    const home = useNavigate();
    const [textoEditar, setTextoEditar] = useState("");
    const [signoEditar, setSignoEditar] = useState("");

    function handleSelect(event) {
        const signo = event.target.value;
        if (signo !== "0") {
            setSignoEditar(signo);
            const textoGuardado = localStorage.getItem(signo);
            setTextoEditar(textoGuardado || ""); // Recupera el texto guardado si existe
        }
    }

    function goHome() {
        home("/");
    }

    function handleClick(e) {
        e.preventDefault();
        if (signoEditar) {
            localStorage.setItem(signoEditar, textoEditar);
            alert(`Texto para ${signoEditar} guardado correctamente.`);
        } else {
            alert("Por favor, selecciona un signo zodiacal.");
        }
    }

    return (
        <div className="container">
            <h2 id="textoAdmin">Edita un Signo Zodiacal</h2>
            <select id="editSignos" onChange={handleSelect}>
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
            <textarea
                id="textoEditar"
                cols="50"
                rows="10"
                value={textoEditar}
                onChange={(e) => setTextoEditar(e.target.value)}
            />
            <button id="btnEditar" onClick={handleClick}>Guardar</button>
            <button id="btnHomeAdmin" onClick={goHome}>Home</button>
        </div>
    );
}


export default AdminHome;