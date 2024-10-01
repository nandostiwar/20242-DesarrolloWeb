import './styles/Form.css'; // Reutilizamos los mismos estilos del Form
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const goTo = useNavigate();

    const handleChangePassword = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/v1/signos/ChangePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, oldPassword, newPassword }),
            });

            if (response.ok) {
                alert('Contraseña cambiada con éxito.');
                goTo('/');
            } else {
                alert('Error al cambiar la contraseña. Verifica tus datos.');
            }
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            alert('Ocurrió un error, por favor intenta nuevamente.');
        }
    };

    const goToForm = () => {
        goTo('/');
    };

    return (
        <form onSubmit={handleChangePassword}>
            <h1 id="txtBienvenida">Cambiar Contraseña</h1>
            <h4 className="txt">Nombre de Usuario</h4>
            <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                className="entry"
            /><br />
            <h4 className="txt">Contraseña Actual</h4>
            <input 
                type="password" 
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)} 
                className="entry"
            /><br />
            <h4 className="txt">Nueva Contraseña</h4>
            <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)} 
                className="entry"
            /><br />
            <input type="submit" value="Cambiar Contraseña" id="btnEnviar" />
            <input 
                type="button" 
                value="Volver al Inicio" 
                id="btnEnviar"  // Reutilizando el estilo existente del botón
                onClick={goToForm} 
            />
        </form>
    );
}

export default ChangePassword;