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
    const [categoriaEditar, setCategoriaEditar] = useState("");

<<<<<<< HEAD
    // Lista de palabras no permitidas
    const palabrasProhibidas = ["Limon", "Manzana", "Pera"];

    function handleSelectSigno(event) {
        const signo = event.target.value;
        if (signo !== "0") {
            setSignoEditar(signo);
            const textoGuardado = localStorage.getItem(`${signo}-${categoriaEditar}`);
            setTextoEditar(textoGuardado || ""); // Recupera el texto guardado si existe
        }
    }

    function handleSelectCategoria(event) {
        const categoria = event.target.value;
        if (categoria !== "0") {
            setCategoriaEditar(categoria);
            const textoGuardado = localStorage.getItem(`${signoEditar}-${categoria}`);
            setTextoEditar(textoGuardado || ""); // Recupera el texto guardado si existe
=======
    // Define las palabras inapropiadas
    const invalidWords = ["popo", "asco", "pipi"];

    // Función para validar el contenido
    function validateContent(content) {
        for (let word of invalidWords) {
            if (content.includes(word)) {
                return false; // Contiene palabras inapropiadas
            }
        }
        return true; // No contiene palabras inapropiadas
    }

    function handleSelect(event) {
        const signo = event.target.value;
        if (signo !== "0") {
            setSignoEditar(signo);
>>>>>>> 987317913f382822c878a7b9d108b1e1df86e9ae
        }
    }

    function goHome() {
        home("/");
    }

<<<<<<< HEAD
    function contienePalabrasProhibidas(texto) {
        return palabrasProhibidas.some(palabra => texto.includes(palabra));
    }

    function handleClick(e) {
        e.preventDefault();
        if (signoEditar && categoriaEditar) {
            if (contienePalabrasProhibidas(textoEditar)) {
                alert("El texto contiene palabras no permitidas.");
            } else {
                localStorage.setItem(`${signoEditar}-${categoriaEditar}`, textoEditar);
                alert(`Texto para ${signoEditar} (${categoriaEditar}) guardado correctamente.`);
            }
        } else {
            alert("Por favor, selecciona un signo zodiacal y una categoría.");
        }
=======
    function handleClick(e) {
        e.preventDefault();

        // Validar el contenido antes de enviarlo
        if (!validateContent(textoEditar)) {
            alert("El contenido contiene palabras inapropiadas.");
            return; // Detener la ejecución si hay palabras inapropiadas
        }

        // Si el contenido es válido, proceder con la solicitud fetch
        fetch(`http://localhost:4000/v1/signos/${signoEditar}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "textoEditar": textoEditar })
        });
>>>>>>> 987317913f382822c878a7b9d108b1e1df86e9ae
    }

    return (
        <div className="container">
            <h2 id="textoAdmin">Edita un Signo Zodiacal</h2>

            {/* Selección de signo zodiacal */}
            <select id="editSignos" onChange={handleSelectSigno}>
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
            <textarea id="textoEditar" cols="50" rows="10" onChange={(e) => setTextoEditar(e.target.value)}>
>>>>>>> 987317913f382822c878a7b9d108b1e1df86e9ae

            {/* Selección de categoría */}
            <select id="editCategoria" onChange={handleSelectCategoria}>
                <option value="0">Selecciona una categoría</option>
                <option value="niño">Niño</option>
                <option value="mujer">Mujer</option>
                <option value="hombre">Hombre</option>
            </select>

            {/* Área de texto */}
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
