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

                if (data.role === 'user') {
                    goTo("/user");
                } else if (data.role === 'admin') {
                    goTo("/admin");
                }
            } else {
                const errorData = await response.json();
                setError(errorData.message);
            }
        } catch (error) {
            console.error('Error en la autenticación:', error);
            setError('Error al intentar iniciar sesión.');
        }
    };

    const goToCreateAccount = () => {
        goTo('/registro');
    };

    return (
        <form onSubmit={validateUser}>
            <h1>Bienvenido a la App de Premios</h1>
            <h4>Usuario</h4>  
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            /><br />
            <h4>Contraseña</h4>  
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            /><br />
            <input type="submit" value="Ingresar" />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="button" onClick={goToCreateAccount}>
                Registrarse
            </button>
        </form>
    );
}

export default Form;
