import { Navigate, useNavigate } from "react-router-dom";
import './styles/AdminHome.css'
import { useState } from "react";

function AdminHome({user}){
    if(user!=='admin' || !user){
        return <Navigate to="/"/>
    }
    const home = useNavigate();
    const [textoEditar, setTextoEditar] = useState("");
    const [signoEditar, setSignoEditar] = useState("");
    const [perfilEditar, setPerfilEditar] = useState("");

    function handleSelectSigno(event){
        const signo = event.target.value;
        if(signo!=="0"){
            setSignoEditar(signo);
        }
    }

    function handleSelectPerfil(event){
        const perfil = event.target.value;
        if(perfil!=="0"){
            setPerfilEditar(perfil);
        }
    }

    function goHome(){
        home("/");
    }

    function handleClick(e){
        e.preventDefault();
        fetch(`http://localhost:4000/api/${signoEditar}`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "textoEditar": textoEditar,
                "perfil": perfilEditar
            })
        })
    }

    return (
        <div className="container">
            <h2 id="textoAdmin">Edita un Signo Zodiacal y Perfil</h2>
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
            <select id="editPerfil" onChange={handleSelectPerfil}>
                <option value="0">Selecciona un perfil</option>
                <option value="hombre">Hombre</option>
                <option value="mujer">Mujer</option>
                <option value="nino">Niño</option>
            </select>
            <textarea 
                id="textoEditar" 
                cols="50" 
                rows="10" 
                onChange={(e)=> setTextoEditar(e.target.value)}
                value={textoEditar}
            ></textarea>
            <button id="btnEditar" onClick={handleClick}>Editar</button>
            <button id="btnHomeAdmin" onClick={goHome}>Home</button>
        </div>
    )
}

export default AdminHome;