import { Navigate, useNavigate } from "react-router-dom";
import './styles/AdminHome.css';
import { useState, useEffect } from "react";

// Declarar la palabra prohibida
const PALABRA_PROHIBIDA = "prohibido";

function AdminHome({ user }) {
    const navigate = useNavigate();
    const [signos, setSignos] = useState(() => JSON.parse(localStorage.getItem('signos')) || {});
    const [signoEditar, setSignoEditar] = useState("");
    const [textoEditar, setTextoEditar] = useState("");

    if (user !== 'admin') return <Navigate to="/" />;

    useEffect(() => {
        localStorage.setItem('signos', JSON.stringify(signos));
    }, [signos]);

    const handleSelect = (event) => {
        const signo = event.target.value;
        setSignoEditar(signo);
        setTextoEditar(signos[signo] || "");
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (!signoEditar || !textoEditar.trim()) {
            alert("Por favor, completa los campos.");
            return;
        }

           // Verificar si el texto contiene la palabra prohibida
        if (textoEditar.includes(PALABRA_PROHIBIDA)) {
            alert(`La palabra "${PALABRA_PROHIBIDA}" no está permitida.`);
            return;
        }


        setSignos(prevSignos => ({ ...prevSignos, [signoEditar]: textoEditar }));
        alert(`Texto para ${signoEditar} actualizado correctamente.`);
        setTextoEditar("");
    };

    return (
        <div className="container">
            <h2 id="textoAdmin">Edita un Signo Zodiacal</h2>
            <select id="editSignos" onChange={handleSelect} defaultValue="0">
                <option value="0" disabled>Selecciona un signo zodiacal</option>
                {["Aries", "Geminis", "Cancer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"].map(signo => (
                    <option key={signo} value={signo}>{signo}</option>
                ))}
            </select>
            <textarea 
                id="textoEditar" 
                cols="50" 
                rows="10" 
                onChange={(e) => setTextoEditar(e.target.value)} 
                value={textoEditar}>
            </textarea>
            <button id="btnEditar" onClick={handleClick}>Editar</button>
            <button id="btnHomeAdmin" onClick={() => navigate("/")}>Home</button>
        </div>
    );
}

export default AdminHome;