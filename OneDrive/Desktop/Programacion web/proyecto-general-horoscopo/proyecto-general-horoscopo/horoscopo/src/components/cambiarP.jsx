import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
    const [username, setUsername] = useState("");  // Inicializado como string vacía
    const [password, setPassword] = useState("");  // Inicializado como string vacía
    const [update, setUpdate] = useState("");      // Inicializado como string vacía

    const goTo = useNavigate();

    const updatepassword = (event) => {
        event.preventDefault();
        if (!username || !password || !update) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        fetch(`http://localhost:4000/v1/signos/actualizar`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, update })  
        })
            .then(res => res.json())
            .then(responseData => {
                if (responseData.resultado === 'Contraseña actualizada correctamente') {
                    alert("Contraseña actualizada correctamente");
                    goTo("/Form");  // Redirigir a la página de inicio de sesión
                } else if (responseData.resultado === 'Credenciales inválidas') {
                    alert("Credenciales inválidas");
                }
            })
            .catch(error => {
                console.error("Error en la actualización de contraseña:", error);
                alert("Hubo un error en la solicitud. Inténtalo de nuevo.");
            });
    }

    return (
        <form onSubmit={updatepassword}>
            <h1 id="txtBienvenida">Cambiar Contraseña</h1>
            <h4 className="txt">Nombre de Usuario</h4>  
            <input type="text" className="entry" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
            <h4 className="txt">Contraseña actual</h4>  
            <input type="password" className="entry" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
            <h4 className="txt">Contraseña nueva</h4>  
            <input type="password" className="entry" value={update} onChange={(e) => setUpdate(e.target.value)} /><br />
            <input type="submit" value="Actualizar" id="btnEnviar" />
        </form> 
    );
}

export default ChangePassword;
