import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import './styles/AdminHome.css';

function AdminHome({ user }) {
    const [adminUsername, setAdminUsername] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(user === 'admin'); // Verificar si es administrador

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Validar el inicio de sesión de administrador
        if (adminUsername === 'admin' && adminPassword === 'adminPassword') {
            setIsLoggedIn(true);
            alert("¡Inicio de sesión exitoso!");
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    };

    const handleCreateAdmin = () => {
        fetch('http://localhost:4000/api/createAdmin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: adminUsername, password: adminPassword })
        }).then(response => response.json())
          .then(data => alert(data.message))
          .catch(error => console.error('Error:', error));
    };

    if (!isLoggedIn) {
        return (
            <div className="admin-login-container">
                <h2>Inicio de Sesión Admin</h2>
                <form onSubmit={handleLogin}>
                    <label>Usuario:</label>
                    <input type="text" value={adminUsername} onChange={(e) => setAdminUsername(e.target.value)} required />
                    
                    <label>Contraseña:</label>
                    <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} required />
                    
                    <button type="submit" className="btn">Entrar</button>
                    <button type="button" className="btn" onClick={handleCreateAdmin}>Crear Administrador</button>
                </form>
            </div>
        );
    }
}

export default AdminHome;
