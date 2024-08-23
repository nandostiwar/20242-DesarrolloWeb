import { Navigate, useNavigate } from "react-router-dom";
import './styles/AdminHome.css';
import { useState, useEffect } from "react";

function AdminHome({ user }) {
    if (user !== 'admin' || !user) {
        return <Navigate to="/" />;
    }

    const home = useNavigate();
    const [textoEditar, setTextoEditar] = useState("");
    const [signoEditar, setSignoEditar] = useState("");
    const [signos, setSignos] = useState({});

    useEffect(() => {
        // Cargar los signos del localStorage al iniciar
        const storedSignos = JSON.parse(localStorage.getItem('signos')) || {};
        setSignos(storedSignos);
    }, []);

    useEffect(() => {
        // Guardar los signos en localStorage cuando cambian
        localStorage.setItem('signos', JSON.stringify(signos));
    }, [signos]);

    function handleSelect(event) {
        const signo = event.target.value;
        if (signo !== "0") {
            setSignoEditar(signo);
            setTextoEditar(signos[signo] || ""); // Cargar el texto actual del signo seleccionado
        }
    }

    function goHome() {
        home("/");
    }

    function handleClick(e) {
        e.preventDefault();

        if (!signoEditar) {
            alert("Por favor, selecciona un signo zodiacal.");
            return;
        }

        if (textoEditar.trim() === "") {
            alert("El texto no puede estar vacío.");
            return;
        }

        // Actualizar el texto del signo seleccionado
        setSignos(prevSignos => ({
            ...prevSignos,
            [signoEditar]: textoEditar
        }));

        alert(`Texto para ${signoEditar} actualizado correctamente.`);
        setTextoEditar(""); // Limpiar el campo de texto después de guardar
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
                onChange={(e) => setTextoEditar(e.target.value)} 
                value={textoEditar}>
            </textarea>
            <button id="btnEditar" onClick={handleClick}>Editar</button>
            <button id="btnHomeAdmin" onClick={goHome}>Home</button>
        </div>
    );
}

export default AdminHome;