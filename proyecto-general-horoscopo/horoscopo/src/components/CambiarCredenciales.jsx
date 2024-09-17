import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importar la función de verificación de credenciales y para actualizar la contraseña
import { verificarCredenciales, actualizarContraseña } from '../routes/controllers/verificarCredenciales';

function CambiarCredenciales() {
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const goTo = useNavigate();

    const handleChangePassword = (e) => {
        e.preventDefault();
        const isValid = verificarCredenciales(username, oldPassword);
        if (isValid) {
            actualizarContraseña(username, newPassword);
            alert('Contraseña actualizada con éxito.');
            goTo('/');
        } else {
            alert('Usuario o contraseña antigua incorrectos.');
        }
    };

    return (
        <form onSubmit={handleChangePassword}>
            <h1 id="txtBienvenida">Cambiar Contraseña</h1>
            <h4 className="txt">Nombre de Usuario</h4>
            <input 
                type="text" 
                className="entry" 
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            /><br />
            <h4 className="txt">Contraseña Antigua</h4>
            <input 
                type="password" 
                className="entry" 
                onChange={(e) => setOldPassword(e.target.value)}
                value={oldPassword}
            /><br />
            <h4 className="txt">Contraseña Nueva</h4>
            <input 
                type="password" 
                className="entry" 
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
            /><br />
            <input type="submit" value="Actualizar Contraseña" id="btnActualizar" />
        </form>
    );
}

export default CambiarCredenciales;
