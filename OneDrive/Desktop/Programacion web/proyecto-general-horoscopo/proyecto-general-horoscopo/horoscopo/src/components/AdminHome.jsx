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

    function handleSelect(event){
        const signo = event.target.value;
        if(signo!=="0"){
            setSignoEditar(signo);
        } 
    }

    function goHome(){
        home("/");
    }

    function handleClick(e){
        // console.log(signoEditar);
        // console.log(textoEditar);
        e.preventDefault();
        fetch(`http://localhost:4000/v1/signos/${signoEditar}`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"textoEditar": textoEditar})
        })
    }

    return (
        <div class="container">
            <h2 id="textoAdmin">Edita un Signo Zodiacal</h2>
            <div class="selectores">

                <select id="editSignos" onClick={handleSelect}>
                    <option value="0">Signo hombre</option>
                    <option value="Arieshombre">Aries</option>
                    <option value="Geminishombre">Géminis</option>
                    <option value="Cancerhombre">Cáncer</option>
                    <option value="Leohombre">Leo</option>
                    <option value="Virgohombre">Virgo</option>
                    <option value="Librahombre">Libra</option>
                    <option value="Escorpiohombre">Escorpio</option>
                    <option value="Sagitariohombre">Sagitario</option>
                    <option value="Capricorniohombre">Capricornio</option>
                    <option value="Acuariohombre">Acuario</option>
                    <option value="Piscishombre">Piscis</option>
                </select>

                <select id="editSignos" onClick={handleSelect}>
                    <option value="0">Signo mujer</option>
                    <option value="Ariesmujer">Aries</option>
                    <option value="Geminismujer">Géminis</option>
                    <option value="Cancermujer">Cáncer</option>
                    <option value="Leomujer">Leo</option>
                    <option value="Virgomujer">Virgo</option>
                    <option value="Libramujer">Libra</option>
                    <option value="Escorpiomujer">Escorpio</option>
                    <option value="Sagitariomujer">Sagitario</option>
                    <option value="Capricorniomujer">Capricornio</option>
                    <option value="Acuariomujer">Acuario</option>
                    <option value="Piscismujer">Piscis</option>
                </select>

                <select id="editSignos" onClick={handleSelect}>
                    <option value="0">Signo niño</option>
                    <option value="Ariesnino">Aries</option>
                    <option value="Geminisnino">Géminis</option>
                    <option value="Cancernino">Cáncer</option>
                    <option value="Leonino">Leo</option>
                    <option value="Virgonino">Virgo</option>
                    <option value="Libranino">Libra</option>
                    <option value="Escorpionino">Escorpio</option>
                    <option value="Sagitarionino">Sagitario</option>
                    <option value="Capricornionino">Capricornio</option>
                    <option value="Acuarionino">Acuario</option>
                    <option value="Piscisnino">Piscis</option>
                </select>


            </div>
            

            <textarea id="textoEditar" cols="50" rows="10" onChange={(e)=> setTextoEditar(e.target.value)}>

            </textarea>
            <button id="btnEditar" onClick={handleClick}>Editar</button>
            <button id="btnHomeAdmin" onClick={goHome}>Home</button>
        </div>
    )
}


export default AdminHome;