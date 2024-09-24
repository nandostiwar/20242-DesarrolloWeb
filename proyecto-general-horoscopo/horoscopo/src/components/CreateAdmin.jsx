import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/CreateAdmin.css';

function CreateAdmin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleCreateAdmin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/v1/signos/createAdmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (data.success) {
                alert(data.message);
                navigate('/');
            } else {
                alert(data.message || 'Error desconocido');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error en la solicitud: ' + error.message);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleCreateAdmin}>
                <h1>Crear Administrador</h1>

                <label htmlFor="username">Nombre de Administrador</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label htmlFor="password">Contraseña</label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <div className="show-password">
                    <input
                        type="checkbox"
                        id="showPassword"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    <label htmlFor="showPassword">Mostrar contraseña</label>
                </div>

                <button id="btnCrear" type="submit">Crear Usuario</button>
                <button id="btnHome" type="button" onClick={() => navigate('/')}>
                    Volver a Inicio
                </button>
            </form>
        </div>
    );
}

export default CreateAdmin;

