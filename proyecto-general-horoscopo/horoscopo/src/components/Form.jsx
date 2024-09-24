import './styles/Form.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const goTo = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.role === 'user') {
                    goTo(data.redirectTo);
                } else if (data.role === 'admin') {
                    goTo(data.redirectTo);
                }
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1 id="txtBienvenida">Bienvenido a nuestro portal del Zodiaco</h1>
            <h4 className="txt">Nombre de Usuario</h4>  
            <input type="text" className="entry" onChange={(e)=> setUsername(e.target.value)} /><br></br>
            <h4 className="txt">Contraseña</h4>  
            <input type="password" className="entry" onChange={(e)=> setPassword(e.target.value)} /><br></br>
            <input type="submit" value="Ingresar" id="btnEnviar" />
        </form>
    );
}

export default Form;
