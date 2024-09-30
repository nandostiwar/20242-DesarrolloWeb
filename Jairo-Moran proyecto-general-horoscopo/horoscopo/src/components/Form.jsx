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

        try {
            // Realizar la solicitud POST al backend
            const response = await fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                callback(data.role);

                // Redirigir según el rol
                if (data.role === 'user') {
                    goTo("/userHome");
                } else if (data.role === 'admin') {
                    goTo("/adminHome");
                }
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (error) {
            console.error('Error durante la autenticación:', error);
            setError('Error al intentar iniciar sesión. Por favor, inténtelo de nuevo.');
        }
    };

    // Función para redirigir al formulario de cambio de contraseña
    const goToChangePassword = () => {
        goTo('/change-password');
    };

    // Función para redirigir al formulario de creación de usuario
    const goToCreateAccount = () => {
        goTo('/create-account'); // Redirige a la página de creación de cuenta
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

            {/* Botón para cambiar la contraseña */}
            <button type="button" onClick={goToChangePassword} id="btnChangePassword">
                Cambiar Contraseña
            </button>
                        
            <input type="submit" value="Ingresar" id="btnEnviar" />

            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar error si lo hay */}


            {/* Botón nuevo */}
            <button type="button" onClick={goToCreateAccount} id="btnCrearCuenta">
                Crear Cuenta
            </button>
        </form>
    );
}

export default Form;
