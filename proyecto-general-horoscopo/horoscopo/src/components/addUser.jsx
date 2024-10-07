import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/AddUser.css'; // Asegúrate de que aquí tengas estilos para los botones

function AddUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Por defecto, el rol será 'user'
    const goTo = useNavigate();

    const handleAddUser = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/v1/signos/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, role }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Usuario agregado con éxito.');
                goTo('/'); // Redirigir a la página de inicio u otra ruta
            } else {
                alert(data.error || 'Error al agregar el usuario.');
            }
        } catch (error) {
            console.error('Error al agregar el usuario:', error);
            alert('Hubo un problema con el servidor. Intenta de nuevo más tarde.');
        }
    };

    // Función para regresar a la página anterior
    const handleBack = () => {
        goTo(-1); // Redirige a la página anterior en el historial
    };

    return (
        <form onSubmit={handleAddUser}>
            <h1>Agregar Nuevo Usuario</h1>

            <label htmlFor="username">Nombre de Usuario</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            /><br />

            <label htmlFor="password">Contraseña</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            /><br />

            <label htmlFor="role">Rol</label>
            <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
            </select><br />

            {/* Botón "Agregar Usuario" */}
            <input type="submit" value="Agregar Usuario" className="btn" />

            {/* Botón "Regresar" con el mismo diseño */}
            <button type="button" onClick={handleBack} className="btn">Regresar</button>
        </form>
    );
}

export default AddUser;
