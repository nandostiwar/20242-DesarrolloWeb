import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import './styles/CreateAdmin.css';

function CreateAdmin() {
    const [adminUsername, setAdminUsername] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const navigate = useNavigate(); // Inicializa useNavigate

    const handleCreateAdmin = (e) => {
        e.preventDefault();
        fetch('http://localhost:4000/api/createAdmin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: adminUsername, password: adminPassword })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            navigate('/admin'); // Redirige de vuelta a AdminHome
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <div className="create-admin-container">
            <h2>Crear Administrador</h2>
            <form onSubmit={handleCreateAdmin}>
                <label>Usuario:</label>
                <input type="text" value={adminUsername} onChange={(e) => setAdminUsername(e.target.value)} required />
                
                <label>Contraseña:</label>
                <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} required />
                
                <button type="submit" className="btn">Crear Administrador</button>
            </form>
        </div>
    );
}

export default CreateAdmin;
