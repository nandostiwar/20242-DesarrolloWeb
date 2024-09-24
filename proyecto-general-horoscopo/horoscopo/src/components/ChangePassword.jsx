import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/ChangePassword.css';

function ChangePassword() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const handleChangePassword = async (event) => {
        event.preventDefault();

        // Validación de campos vacíos
        if (!username || !oldPassword || !newPassword) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/v1/signos/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, oldPassword, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message || 'Contraseña cambiada exitosamente');
                navigate('/');
            } else {
                if (data.errorType === 'username') {
                    alert('Usuario correcto, pero la contraseña es incorrecta.');
                } else if (data.errorType === 'password') {
                    alert('Contraseña correcta, pero el usuario es incorrecto.');
                } else {
                    alert(data.message || 'Error al cambiar la contraseña');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error en la solicitud: ' + error.message);
        }
    };
    return (
        <div className="container">
            <h2 id="tituloCambioPassword">Cambiar Contraseña</h2>
            <input
                type="text"
                placeholder="Nombre de usuario"
                id="inputUsername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <div className="password-field">
                <input
                    type={showOldPassword ? 'text' : 'password'}
                    placeholder="Contraseña antigua"
                    id="inputOldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowOldPassword(prev => !prev)}
                >
                    {showOldPassword ? 'Ocultar' : 'Mostrar'}
                </button>
            </div>
            <div className="password-field">
                <input
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Nueva contraseña"
                    id="inputNewPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowNewPassword(prev => !prev)}
                >
                    {showNewPassword ? 'Ocultar' : 'Mostrar'}
                </button>
            </div>
            <button id="btnEditar" onClick={handleChangePassword}>Editar</button>
            <button id="btnHome" onClick={() => navigate('/')}>Home</button>
        </div>
    );
}

export default ChangePassword;
