import './styles/Form.css';
import { useState } from 'react';

function ChangePassword() {
    const [username, setUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleChangePassword = async (event) => {
        event.preventDefault();

        try {
            // Enviar la solicitud POST para cambiar la contraseña
            const response = await fetch('http://localhost:4000/api/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    currentPassword,
                    newPassword,
                }),
            });

            const data = await response.json();

            // Mostrar el mensaje de éxito o error
            if (response.ok) {
                setMessage('Contraseña cambiada exitosamente');
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            setMessage('Error al cambiar la contraseña. Intenta de nuevo.');
        }
    };

    return (
        <form onSubmit={handleChangePassword}>
            <h1>Cambiar Contraseña</h1>
            <h4 className="txt">Usuario</h4>  
            <input
                type="text"
                className="entry"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            /><br />

            <h4 className="txt">Contraseña Actual</h4>  
            <input
                type="password"
                className="entry"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
            /><br />

            <h4 className="txt">Nueva Contraseña</h4>  
            <input
                type="password"
                className="entry"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            /><br />

            <input type="submit" value="Cambiar Contraseña" id="btnEnviar" />
            
            {message && <p>{message}</p>}
        </form>
    );
}

export default ChangePassword;
