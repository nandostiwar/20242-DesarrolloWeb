import './styles/ChangePassword.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ChangePassword({ user }) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const goTo = useNavigate();

    const handleChangePassword = async (event) => {
        event.preventDefault();
        if (!oldPassword || !newPassword) {
            alert("Por favor completa todos los campos.");
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/v1/signos/changePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: user, oldPassword, newPassword })
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                goTo("/login");  // Redirige a la pantalla de inicio después de cambiar la contraseña
            } else {
                alert(data.message || "Error al cambiar la contraseña");
            }
        } catch (error) {
            console.error("Error during password change:", error);
            alert("No se pudo conectar al servidor. Intenta de nuevo más tarde.");
        }
    };

    if (!user) {
        return <p>No se ha identificado ningún usuario. Por favor, inicia sesión primero.</p>;
    }

    return (
        <form onSubmit={handleChangePassword}>
            <h1 id="txtCambioContraseña">Cambiar Contraseña</h1>
            <h4 className="txt">Contraseña Vieja</h4>
            <input type="password" className="entry" onChange={(e) => setOldPassword(e.target.value)} /><br />
            <h4 className="txt">Nueva Contraseña</h4>
            <input type="password" className="entry" onChange={(e) => setNewPassword(e.target.value)} /><br />
            <input type="submit" value="Cambiar Contraseña" id="btnEnviar" />
        </form>
    );
}

export default ChangePassword;