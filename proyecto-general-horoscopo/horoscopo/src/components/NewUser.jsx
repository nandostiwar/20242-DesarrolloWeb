import './styles/Form.css'; // Reutilizamos los mismos estilos del Form
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const navigate = useNavigate();

    const handleCreateUser = async (event) => {
        event.preventDefault();

        const newUser = { username, password, role };

        try {
            const response = await fetch('http://localhost:4000/v1/signos/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                alert('Usuario creado con éxito.');
                navigate('/'); // Redirige al inicio o a la página deseada
            } else {
                alert('Error al crear el usuario. Verifica los datos.');
            }
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            alert('Ocurrió un error, por favor intenta nuevamente.');
        }
    };

    const goToForm = () => {
        navigate('/'); // Redirige al inicio o a la página deseada
    };

    return (
        <form onSubmit={handleCreateUser}>
            <h1 id="txtBienvenida">Crear Nuevo Usuario</h1>
            <h4 className="txt">Nombre de Usuario</h4>  
            <input 
                type="text" 
                className="entry" 
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                required 
            /><br />
            <h4 className="txt">Contraseña</h4>  
            <input 
                type="password" 
                className="entry" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required 
            /><br />
            <h4 className="txt">Rol</h4>  
            <select 
                className="entry" 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
            </select><br />
            <input type="submit" value="Crear Usuario" id="btnEnviar" />
            <input 
                type="button" 
                value="Volver al Inicio" 
                id="btnEnviar" // Reutilizando el estilo existente del botón
                onClick={goToForm} 
            />
        </form>
    );
}

export default NewUser;

