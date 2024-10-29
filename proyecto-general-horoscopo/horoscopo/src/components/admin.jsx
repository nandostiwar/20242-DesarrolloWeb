import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Admin({ callback }) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const goTo = useNavigate();

    const validateAdmin = async (event) => {
        event.preventDefault();
        const role = 'admin'; // Asignar el rol de admin directamente

        try {
            const response = await fetch('http://localhost:4000/v1/signos/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role, username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                callback(role); // Llama al callback con el rol
                goTo('/adminHome'); // Redirige a la página de adminHome
            } else {
                alert(data.message || 'Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error al intentar iniciar sesión:', error);
            alert('Hubo un problema con el servidor. Intenta de nuevo más tarde.');
        }
    };

    const handleChangePasswordClick = () => {
        goTo('/changePassword');
    };

    const handleAddUserClick = () => {
        goTo('/addUser');
    };

    return (
        <form onSubmit={validateAdmin}>
            <h1 id="txtBienvenida">Bienvenido Administrador</h1>
            <h4 className="txt">Nombre de Usuario</h4>
            <input 
                type="text" 
                className="entry" 
                onChange={(e) => setUsername(e.target.value)} 
            /><br />
            <h4 className="txt">Contraseña</h4>
            <input 
                type="password" 
                className="entry" 
                onChange={(e) => setPassword(e.target.value)} 
            /><br />
            <input type="submit" value="Ingresar" id="btnEnviar" />
            <button type="button" id="btnAddUser" onClick={handleAddUserClick}>
                Crear Nuevo Usuario
            </button>
        </form>
    );
}

export default Admin;
