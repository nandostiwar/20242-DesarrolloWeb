import { Navigate, useNavigate } from "react-router-dom";
import './styles/AdminHome.css';
import { useState } from "react";

function AdminHome({ user }) {
    if (user !== 'admin' || !user) {
        return <Navigate to="/" />;
    }

    const home = useNavigate();
    const [textoEditar, setTextoEditar] = useState("");
    const [signoEditar, setSignoEditar] = useState("");
    const [tipoPersonaEditar, setTipoPersonaEditar] = useState("");

    function handleSelect(event) {
        const signo = event.target.value;
        if (signo !== "0") {
            setSignoEditar(signo);
        }
    }

    function handleSelectTipoPersona(event) {
        const tipoPersona = event.target.value;
        if (tipoPersona !== "0") {
            setTipoPersonaEditar(tipoPersona);
        }
    }

    function validarTexto(texto) {
        const palabrasVetadas = ["culo", "pipi"];
        for (let palabra of palabrasVetadas) {
            if (texto.includes(palabra)) {
                return false;
            }
        }
        return true;
    }

    function handleTextareaChange(event) {
        const nuevoTexto = event.target.value;
        if (validarTexto(nuevoTexto)) {
            setTextoEditar(nuevoTexto);
        } else {
            alert("Palabras no permitidas.");
        }
    }

    function goHome() {
        home("/");
    }

    async function handleClick(e) {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:4000/v1/signos/${signoEditar}`, {
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "textoEditar": textoEditar,
                    "tipoPersona": tipoPersonaEditar
                })
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const result = await response.json();
            alert(result.message || "Actualización exitosa");
        } catch (error) {
            console.error("Error:", error);
            alert('Error al intentar actualizar el signo');
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

            <select id="editTipoPersona" onChange={handleSelectTipoPersona}>
                <option value="0">Selecciona un tipo de persona</option>
                <option value="hombre">Hombre</option>
                <option value="mujer">Mujer</option>
                <option value="niño">Niño</option>
            </select>

            <textarea 
                id="textoEditar" 
                cols="50" 
                rows="10" 
                onChange={handleTextareaChange} 
                value={textoEditar}
            />

            <button id="btnEditar" onClick={handleClick}>Editar</button>
            <button id="btnHomeAdmin" onClick={goHome}>Home</button>
        </div>
    );
}

export default AdminHome;
