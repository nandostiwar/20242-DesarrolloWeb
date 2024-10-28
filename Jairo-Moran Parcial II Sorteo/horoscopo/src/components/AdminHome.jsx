import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import './styles/AdminHome.css';

function AdminHome({ user }) {
    const [adminUsername, setAdminUsername] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(user === 'admin');
    const navigate = useNavigate(); // Inicializa useNavigate

    const handleLogin = (e) => {
        e.preventDefault();
        fetch('http://localhost:4000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: adminUsername, password: adminPassword })
        })
        .then(response => response.json())
        .then(data => {
            if (data.role === 'admin') {
                setIsLoggedIn(true);
                alert("¡Inicio de sesión exitoso!");
            } else {
                alert("Usuario o contraseña incorrectos");
            }
        })
        .catch(error => console.error('Error:', error));
    };

    const handleCreateAdmin = () => {
        navigate('/create-admin'); // Redirige al nuevo formulario
    };

    if (!isLoggedIn) {
        return (
            <div className="admin-login-container">
                <h2>Inicio de Sesión Admin</h2>
                <form onSubmit={handleLogin}>
                    <label>Usuario:</label>
                    <input type="text" value={adminUsername} onChange={(e) => setAdminUsername(e.target.value)} required style={{ color: 'black' }} /> {/* Cambia el color del texto */}
                    
                    <label>Contraseña:</label>
                    <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} required style={{ color: 'black' }} /> {/* Cambia el color del texto */}
                    
                    <button type="submit" className="btn">Entrar</button>
                    <button type="button" onClick={handleCreateAdmin}>Crear Administrador</button>
                </form>
            </div>
        );
    }

    return (
        <div>
            <h2>Bienvenido, Admin</h2>
            {/* Agrega más funcionalidades aquí */}
        </div>
    );
}

export default AdminHome;
