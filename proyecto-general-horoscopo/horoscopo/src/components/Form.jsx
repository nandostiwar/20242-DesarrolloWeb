import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({ callback }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const goTo = useNavigate();

    const validateUser = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/v1/signos/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                callback(data.role);
                if (data.role === 'user') {
                    goTo("/userHome");
                } else if (data.role === 'admin') {
                    goTo("/adminHome");
                }
            } else {
                alert("Credenciales inválidas");
            }
        } catch (error) {
            console.error('Error al intentar autenticar:', error);
            alert("Ocurrió un error, por favor intenta nuevamente.");
        }
    }

    const goToChangePassword = () => {
        goTo('/changePassword');
    }

    // Nueva función para redirigir a la creación de usuario
    const goToNewUser = () => {
        goTo('/newUser');
    }

    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">Bienvenido a nuestro portal del Zodiaco</h1>
            <h4 className="txt">Nombre de Usuario</h4>  
            <input type="text" className="entry" onChange={(e) => setUsername(e.target.value)} /><br />
            <h4 className="txt">Contraseña</h4>  
            <input type="password" className="entry" onChange={(e) => setPassword(e.target.value)} /><br />
            <input type="submit" value="Ingresar" id="btnEnviar" /><br />

            <input 
                type="button" 
                value="Cambiar Contraseña" 
                id="btnEnviar"  // Reutilizamos el mismo id para aplicar el estilo existente
                onClick={goToChangePassword}
            /><br />

            {/* Nuevo botón para crear usuarios */}
            <input 
                type="button" 
                value="Crear Usuario" 
                id="btnEnviar"  // Reutilizamos el mismo id para aplicar el estilo existente
                onClick={goToNewUser}
            />
        </form>
    );
}

export default Form;
