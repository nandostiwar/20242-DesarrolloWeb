import { Navigate, useNavigate } from "react-router-dom";
import './styles/AdminHome.css'
import { useState } from "react";

function AdminHome({ user }) {
    if (user !== 'admin' || !user) {
        return <Navigate to="/" />
    }
    const home = useNavigate();
    const [textoEditar, setTextoEditar] = useState("");
    const [signoEditar, setSignoEditar] = useState("");

<<<<<<< HEAD
=======
    const palabrasProhibidas = ["popo", "puta", "puto"];
>>>>>>> 1a5393011b53c3c977de2c5dec6f0d5ab037c7f2

    function handleSelect(event) {
        const signo = event.target.value;
        if (signo !== "0") {
            setSignoEditar(signo);
        }
    }

    function goHome() {
        home("/");
    }

<<<<<<< HEAD
    const palabrasProhibidas = ["matar", "asesinar", "violar"];

    function handleClick(e) {
        e.preventDefault();

        for (let palabra of palabrasProhibidas) {
            if (textoEditar.includes(palabra)) {
                alert("Paralabra prohibida encontrada: " + palabra);
                return;
            }
        }

        fetch(`http://localhost:4000/v1/signos/${signoEditar}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "textoEditar": textoEditar })
        });
=======
    function handleClick(e) {
        e.preventDefault();
        
        // Verificar si el texto contiene alguna palabra prohibida
        const contienePalabraProhibida = palabrasProhibidas.some(palabra => textoEditar.includes(palabra));

        if (contienePalabraProhibida) {
            alert("No se permite el uso de lenguaje inapropiado.");
        } else {
            // Si no contiene palabras prohibidas, proceder con la edición
            fetch(`http://localhost:4000/v1/signos/${signoEditar}`, {
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "textoEditar": textoEditar })
            });
        }
>>>>>>> 1a5393011b53c3c977de2c5dec6f0d5ab037c7f2
    }

    return (
        <div className="container">
            <h2 id="textoAdmin">Edita un Signo Zodiacal</h2>
            <select id="editSignos" onClick={handleSelect}>
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
<<<<<<< HEAD
=======
            <div id="txtSeleccionPage"><h3>Selecciona tu perfil</h3></div>
            <select id="selectSignos">
                <option value="0">Selecciona un perfil</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
                <option value="Niño">Niño</option>
            </select>
>>>>>>> 1a5393011b53c3c977de2c5dec6f0d5ab037c7f2
            <textarea id="textoEditar" cols="50" rows="10" onChange={(e) => setTextoEditar(e.target.value)}>
            </textarea>
            <button id="btnEditar" onClick={handleClick}>Editar</button>
            <button id="btnHomeAdmin" onClick={goHome}>Home</button>
        </div>
    );
}

export default AdminHome;
