import './styles/CreateUser.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleCreateUser = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await fetch('http://localhost:4000/v1/signos/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }), // Solo enviamos el username y password
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data && data.success) {
                setSuccessMessage('Usuario creado exitosamente');
            } else {
                setErrorMessage(data.message || 'Error en la creación de usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error en la solicitud: ' + error.message);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleCreateUser}>
                <h1 id="tituloCrearUsuario">Crear Usuario</h1>
                <input
                    type="text"
                    id="inputUsername"
                    placeholder="Nombre de Usuario"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <div className="password-container">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="inputPassword"
                        placeholder="Contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={(e) => setShowPassword(e.target.checked)}
                        />
                        Mostrar contraseña
                    </label>
                </div>

                <button type="submit" id="btnCrear">Crear Usuario</button>
                <button type="button" id="btnHome" onClick={() => navigate('/')}>Volver a Inicio</button>
            </form>

            {/* Mostrar mensajes de éxito o error */}
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
}

export default CreateUser;
