// src/components/Form.jsx
import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({ callback }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const validateUser = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/v1/signos/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data && data.success) {
                alert(data.message); // Mensaje de éxito
                callback(data.role);
                navigate(data.role === 'user' ? "/userHome" : "/adminHome");
            } else {
                alert(data.message || 'Error desconocido'); // Mensaje de error
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error en la solicitud: ' + error.message);
        }
    };

    return (
        <form onSubmit={validateUser}>
            <h1 id="txtBienvenida">Bienvenido a nuestro portal del Zodiaco</h1>
            <h4 className="txt">Nombre de Usuario</h4>
            <input type="text" className="entry" onChange={(e) => setUsername(e.target.value)} /><br />
            <h4 className="txt">Contraseña</h4>
            <input type="password" className="entry" onChange={(e) => setPassword(e.target.value)} /><br />
            <input type="submit" value="Ingresar" id="btnEnviar" />
            {/* Botón para cambiar contraseña */}
            <button
                type="button"
                id="btnChangePassword"
                onClick={() => navigate('/changePassword')}
            >
                Cambiar Contraseña
            </button>
        </form>
    );
}

export default Form;
