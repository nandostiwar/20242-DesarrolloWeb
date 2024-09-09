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
    const [generoEditar, setGeneroEditar] = useState(""); // Nuevo estado para el género seleccionado

    // Lista de palabras prohibidas
    const palabrasProhibidas = ["hpta", "malparido", "perra"];

    function handleSelectSigno(event) {
        const signo = event.target.value;
        if (signo !== "0") {
            setSignoEditar(signo);
        }
    }

    function handleSelectGenero(event) {
        const genero = event.target.value;
        if (genero !== "0") {
            setGeneroEditar(genero);
        }
    }

    function goHome() {
        home("/");
    }

    function handleClick(e) {
        e.preventDefault();

        // Verificar si el texto contiene alguna palabra prohibida
        const textoProhibido = palabrasProhibidas.some(palabra => textoEditar.toLowerCase().includes(palabra));
        if (textoProhibido) {
            alert("El texto contiene palabras no permitidas. Por favor, modifícalo.");
            return; // Evitar que se envíe la solicitud si hay palabras prohibidas
        }

        if (signoEditar && generoEditar) {
            fetch(`http://localhost:4000/v1/signos/${signoEditar}?genero=${generoEditar}`, {
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "textoEditar": textoEditar })
            });
        }
    }

    return (
        <div class="container">
            <h2 id="textoAdmin">Edita un Signo Zodiacal</h2>
            <select id="editSignos" onChange={handleSelectSigno}>
                <option value="0">Seleciona un signo zodiacal</option>
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
            <select id="selectgenero" onChange={handleSelectGenero}>
                <option value="0">Seleciona un genero</option>
                <option value="hombre">hombre</option>
                <option value="mujer">mujer</option>
                <option value="niño">niño</option>
            </select>

            <textarea id="textoEditar" cols="50" rows="10" onChange={(e) => setTextoEditar(e.target.value)}>
            </textarea>
            <button id="btnEditar" onClick={handleClick}>Editar</button>
            <button id="btnHomeAdmin" onClick={goHome}>Home</button>
        </div>
    )
}

export default AdminHome;
