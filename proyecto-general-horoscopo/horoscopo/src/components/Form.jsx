import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({ callback }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const goTo = useNavigate();

    const validateUser = async (event) => {
        event.preventDefault();
        setError(''); // Limpiar errores anteriores

        try {
            const response = await fetch('http://localhost:4001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Credenciales inválidas');
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            callback(data.role);

            if (data.role === 'user') {
                goTo("/userHome");
            } else if (data.role === 'admin') {
                goTo("/adminHome");
            } else {
                throw new Error('Rol de usuario desconocido');
            }
        } catch (error) {
            console.error('Error durante la autenticación:', error);
            setError(error.message || 'Error al intentar iniciar sesión. Por favor, inténtelo de nuevo.');
        }
    };

    const goToChangePassword = () => {
        goTo('/change-password');
    };

    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">Bienvenido a nuestro portal del Zodiaco</h1>
            <h4 className="txt">Nombre de Usuario</h4>  
            <input
                type="text"
                className="entry"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            /><br />
            <h4 className="txt">Contraseña</h4>  
            <input
                type="password"
                className="entry"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            /><br />
            <input type="submit" value="Ingresar" id="btnEnviar" />

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button type="button" onClick={goToChangePassword} id="btnChangePassword">
                Cambiar Contraseña
            </button>
        </form>
    );
}

export default Form;