import { Navigate, useNavigate } from "react-router-dom";
import './styles/UserHome.css';
import TextSigno from "./TextSigno.jsx";
import { useState } from "react";

function UserHome({user}){
    if(user!=="user" || !user){
        return <Navigate to="/"/>
    }
    const home = useNavigate();
    const [textoSigno, setTextoSigno] = useState('');

    function goHome(){
        home("/");
    }

    async function handleSelect(event){
        const signo = event.target.value;
        if(signo!=="0"){
            fetch(`http://localhost:4000/v1/signos/${signo}`)
                .then(response => response.json())
                .then(responseData => setTextoSigno(responseData))
        } 
    }

    return (
        <div className="container">
            <div id="txtSeleccionPage"><h3>Selecciona tu signo zodiacal</h3></div>
            <div>
                <select id="selectSignos" onClick={handleSelect}>
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
               
                
                <select id="selectSignos" onClick={handleSelect}>
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

                <select id="selectSignos" onClick={handleSelect}>
                    <option value="0">Signo nino</option>
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
            

            <TextSigno texto={textoSigno}/>
            <button id="btnHome" onClick={goHome}>Home</button>
        </div>
    )
}


export default UserHome;