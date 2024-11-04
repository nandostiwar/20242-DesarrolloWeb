import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Forms.css';

const Forms = ({ callback }) => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/v1/papeleria/logintrabajador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contraseña }), // Envía el correo y la contraseña al backend
      });

      const data = await response.json();

      if (response.ok) {
        // Si el login es exitoso, llama al callback con el nombre del trabajador
        callback(correo); // Aquí usas el correo como nombre (puedes ajustar según tus necesidades)
        console.log("Login exitoso:", data);
        setMensaje('Inicio de sesión exitoso!');
        // Redirigir a ventas
        navigate('/ventas');
      } else {
        // Maneja errores de inicio de sesión
        setMensaje(data.message || 'Error al iniciar sesión.');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud de login:', error);
      setMensaje('Hubo un error al intentar iniciar sesión.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="title">
        BIENVENIDOS        
        <br /> {/* Salto de línea para espaciar */}
        📘💻🖋️ LA CABINA TELECOMUNICACIONES 🖋️💻📘 
      </h2>
      <form className="login-form transparent-bg" onSubmit={handleLogin}>
        <label>
          Correo:
          <input
            type="email"
            name="correo"
            placeholder="🧑‍💼Ingresa tu correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="contraseña"
            placeholder="🔏Ingresa tu contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="login-button">Ingresar</button>
        {mensaje && <p className="mensaje">{mensaje}</p>} {/* Mensaje de feedback */}
      </form>
    </div>
  );
};

export default Forms;
