import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/CreateAdmin.css'; // Asegúrate de que este sea el nombre correcto

function CreateAdmin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
        <form onSubmit={handleCreateAdmin}>
            <h1>Crear Administrador</h1>
            <label>Nombre de Usuario</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <br />
            <label>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <br />
            <button type="submit">Crear Administrador</button>
            <button type="button" onClick={() => navigate('/')}>Volver a Inicio</button>
        </form>
    );
}

export default CreateAdmin;