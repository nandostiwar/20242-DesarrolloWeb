import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import './styles/RegistroAdmin.css';

const RegistroAdmin = () => {
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mensaje, setMensaje] = useState('');
    
    const navigate = useNavigate(); // Inicializamos navigate para la navegación

    const handleRegistro = () => {
        if (contrasena.length < 5) {
            setMensaje('La contraseña debe tener al menos 5 caracteres.');
        } else {
            // Lógica para registrar al nuevo usuario
            setMensaje('Usuario registrado con éxito!');
        }
    };

    const handleRegresar = () => {
        navigate(-1); // Navega a la página anterior
    };

    return (
        <div className="registro-container"> {/* Contenedor principal */}
            <div className="transparent-bg"> {/* Fondo semitransparente */}
                <h2 className="title">REGISTRAR NUEVO ADMINISTRADOR</h2>
                <input
                    type="text"
                    placeholder="Nombre Completo"
                    value={nombreCompleto}
                    onChange={(e) => setNombreCompleto(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña (mínimo 5 caracteres)"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                />
                <div className="button-container">
                    <button className="registro-button" onClick={handleRegistro}>Registrar</button>
                    <button className="regresar-button" onClick={handleRegresar}>Regresar</button>
                </div>
                {mensaje && <p className="mensaje">{mensaje}</p>}
            </div>
        </div>
    );
};

export default RegistroAdmin;
