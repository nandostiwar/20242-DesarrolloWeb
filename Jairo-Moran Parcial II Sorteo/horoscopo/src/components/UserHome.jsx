import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

function UserHome({ user }) {
    if (user !== "user" || !user) {
        return <Navigate to="/" />
    }

    const home = useNavigate();
    const [codigo, setCodigo] = useState('');
    const [mensaje, setMensaje] = useState('');

    const registrarCodigo = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/codigos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ codigo }),
            });

            if (response.ok) {
                const data = await response.json();
                setMensaje(`Código registrado con éxito. Premio: ${data.premio}`);
            } else {
                const errorData = await response.json();
                setMensaje(errorData.message);
            }
        } catch (error) {
            console.error("Error al registrar el código:", error);
            setMensaje("Error en el registro del código.");
        }
    };

    return (
        <div className="container">
            <h3>Bienvenido, inserta tu código para ganar premios:</h3>
            <input
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="Ingresa tu código"
            />
            <button onClick={registrarCodigo}>Registrar Código</button>
            {mensaje && <p>{mensaje}</p>}
            <button onClick={() => home("/")}>Salir</button>
        </div>
    );
}

export default UserHome;
