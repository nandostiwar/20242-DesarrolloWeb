import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChangePasswords() {
    const [username, setUsername] = useState("");  // Inicializado como string vacía
    const [password, setPassword] = useState("");  // Inicializado como string vacía
    const [role, setRole] = useState("user");      // Nuevo estado para seleccionar entre "admin" o "user"
    const goTo = useNavigate();

    const crearuser = (event) => {
        event.preventDefault();

        // Asegurarse de que los campos no estén vacíos
        if (!username || !password) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        fetch(`http://localhost:4000/v1/signos/crear`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, role })  // Enviar también el rol (admin o user)
        })
            .then(res => res.json())
            .then(responseData => {
                if (responseData.resultado === 'Usuario creado correctamente') {
                    alert("Usuario creado correctamente");
                    goTo("/Form");  // Redirigir a la página de inicio de sesión
                } else if (responseData.resultado === 'Error al crear usuario') {
                    alert("Error al crear usuario");
                }
            })
            .catch(error => {
                console.error("Error en la creación de usuario:", error);
                alert("Hubo un error en la solicitud. Inténtalo de nuevo.");
            });
    }
    return (
        <form onSubmit={crearuser}>
            <h1 id="txtBienvenida">Crear usuarios</h1>
            <h4 className="txt">Nombre de Usuario</h4>  
            <input type="text" className="entry" value={username} onChange={(e) => setUsername(e.target.value)} /><br />

            <h4 className="txt">Crear contraseña</h4>  
            <input type="password" className="entry" value={password} onChange={(e) => setPassword(e.target.value)} /><br />

            <h4 className="txt">Tipo de usuario</h4>
            <select className="entry" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select><br />
            <button onClick={() => goTo("/")} id="btnEnviar">Home</button>
            
        </form> 
    );
}

export default ChangePasswords;

