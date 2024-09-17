import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

<<<<<<< HEAD
// Importar la función de verificación de credenciales
import { verificarCredenciales } from '../routes/controllers/verificarCredenciales';

=======
>>>>>>> 1a5393011b53c3c977de2c5dec6f0d5ab037c7f2
function Form({ callback }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const goTo = useNavigate();

<<<<<<< HEAD
    const validateUser = (e) => {
        e.preventDefault();
        const isValid = verificarCredenciales(username, password);
        if (isValid) {
            if (username === 'admin') {
                goTo('/admin-home');
            } else {
                goTo('/user-home');
            }
        } else {
            alert('Usuario o contraseña incorrectos.');
=======
    const validateUser = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/v1/signos/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (response.ok) {
                callback(username);  // Guardamos el nombre de usuario
                if (data.role === 'user') {
                    goTo("/userHome");
                } else if (data.role === 'admin') {
                    goTo("/adminHome");
                }
            } else {
                alert(data.message || "Error en el inicio de sesión");
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            alert("No se pudo conectar al servidor. Intenta de nuevo más tarde.");
>>>>>>> 1a5393011b53c3c977de2c5dec6f0d5ab037c7f2
        }
    };

    const handleChangePassword = () => {
<<<<<<< HEAD
        goTo('/change-password');
=======
        goTo("/changePassword");
>>>>>>> 1a5393011b53c3c977de2c5dec6f0d5ab037c7f2
    };

    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">Bienvenido a nuestro portal del Zodiaco</h1>
            <h4 className="txt">Nombre de Usuario</h4>
<<<<<<< HEAD
            <input 
                type="text" 
                className="entry" 
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            /><br />
            <h4 className="txt">Contraseña</h4>
            <input 
                type="password" 
                className="entry" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            /><br />
            <input type="submit" value="Ingresar" id="btnEnviar" />
            <button type="button" onClick={handleChangePassword} id="btnChangePassword">
                Cambiar Contraseña
            </button>
=======
            <input type="text" className="entry" onChange={(e) => setUsername(e.target.value)} /><br />
            <h4 className="txt">Contraseña</h4>
            <input type="password" className="entry" onChange={(e) => setPassword(e.target.value)} /><br />
            <input type="submit" value="Ingresar" id="btnEnviar" />
            <button type="button" id="btnCambiar" onClick={handleChangePassword}>Cambiar Contraseña</button>
>>>>>>> 1a5393011b53c3c977de2c5dec6f0d5ab037c7f2
        </form>
    );
}

export default Form;
