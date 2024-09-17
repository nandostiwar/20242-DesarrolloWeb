import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importar la función de verificación de credenciales
import { verificarCredenciales } from '../routes/controllers/verificarCredenciales';

function Form({ callback }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const goTo = useNavigate();

    const validateUser = (e) => {
        e.preventDefault();
        const isValid = verificarCredenciales(username, password);
        if (isValid) {
            if (username === 'admin') {
                goTo('/admin-home');
            } else {
                goTo('/user-home');
            }
        } else {
            alert('Usuario o contraseña incorrectos.');
        }
    };

    const handleChangePassword = () => {
        goTo('/change-password');
    };

    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">Bienvenido a nuestro portal del Zodiaco</h1>
            <h4 className="txt">Nombre de Usuario</h4>
            <input 
                type="text" 
                className="entry" 
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            /><br />
            <h4 className="txt">Contraseña</h4>
            <input 
                type="password" 
                className="entry" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            /><br />
            <input type="submit" value="Ingresar" id="btnEnviar" />
            <button type="button" onClick={handleChangePassword} id="btnChangePassword">
                Cambiar Contraseña
            </button>
        </form>
    );
}

export default Form;
