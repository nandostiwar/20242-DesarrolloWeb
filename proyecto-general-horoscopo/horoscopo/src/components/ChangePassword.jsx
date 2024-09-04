import './styles/ChangePassword.css';
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
            const response = await fetch('http://localhost:4000/v1/signos/changePassword', {
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
    }

    return (
        <form onSubmit={handleChangePassword}>
            <h1>Cambiar Contraseña</h1>
            <h4>Nombre de Usuario</h4>
            <input type="text" onChange={(e) => setUsername(e.target.value)} /><br />
            <h4>Contraseña Actual</h4>
            <input type="password" onChange={(e) => setOldPassword(e.target.value)} /><br />
            <h4>Nueva Contraseña</h4>
            <input type="password" onChange={(e) => setNewPassword(e.target.value)} /><br />
            <input type="submit" value="Cambiar Contraseña" />
        </form>
    )
}

export default ChangePassword;
