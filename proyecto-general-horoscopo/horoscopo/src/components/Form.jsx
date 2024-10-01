import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({ callback }) {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const goTo = useNavigate();

    const validateUser = async (event) => {
        event.preventDefault();
        const role = username === 'admin' ? 'admin' : 'user';

        try {
            const response = await fetch('http://localhost:4000/v1/signos/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role, username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                callback(role);
                if (role === 'admin') {
                    goTo('/adminHome');
                } else if (role === 'user') {
                    goTo('/userHome');
                }
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
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">Bienvenido a nuestro portal del Zodiaco</h1>
            <h4 className="txt">Nombre de Usuario</h4>
            <input type="text" className="entry" onChange={(e) => setUsername(e.target.value)} /><br />
            <h4 className="txt">Contraseña</h4>
            <input type="password" className="entry" onChange={(e) => setPassword(e.target.value)} /><br />
            <input type="submit" value="Ingresar" id="btnEnviar" />
            <button type="button" id="btnChangePassword" onClick={handleChangePasswordClick}>Cambio de Contraseña</button>
            <button type="button" id="btnAddUser" onClick={handleAddUserClick}>Crear Nuevo Usuario</button>
        </form>
    );
}

export default Form;
