import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/RegistroTrabajador.css';

const RegistroTrabajador = () => {
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [cedula, setCedula] = useState('');
  const [correo, setCorreo] = useState('');
  const [celular, setCelular] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (celular.length !== 10) {
      setMensaje('El número de celular debe tener 10 dígitos.');
      return;
    }

    if (contrasena.length < 5) {
      setMensaje('La contraseña debe tener al menos 5 caracteres.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/v1/papeleria/registertrabajador', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          fecha: fechaNacimiento,
          cedula,
          correo,
          celular,
          ciudad,
          contraseña: contrasena,
        }),
      });

      const data = await response.json();

      setMensaje(data.message);

      if (data.status === "Éxito") {
        // Resetear el formulario si el registro fue exitoso
        setNombre('');
        setFechaNacimiento('');
        setCedula('');
        setCorreo('');
        setCelular('');
        setCiudad('');
        setContrasena('');
      }

    } catch (error) {
      setMensaje('Error al registrar el usuario. Intenta nuevamente.');
      console.error(error);
    }
  };

  const handleRegresar = () => {
    navigate(-1);
  };

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setter(value);
    }
  };

  return (
    <div className="registro-container">
      <h2 className="title">Registro de Trabajador</h2>

      <form onSubmit={handleSubmit} className="registro-form">
        <label>
          Nombre Completo:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            pattern="[A-Za-z\s]+"
            placeholder="Ingresa tu nombre completo"
            required
          />
        </label>
        <label>
          Fecha de Nacimiento:
          <input
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />
        </label>
        <label>
          Cédula:
          <input
            type="tel"
            value={cedula}
            onChange={handleInputChange(setCedula)}
            placeholder="Ingresa tu cédula"
            maxLength="10"
            required
          />
        </label>
        <label>
          Correo Electrónico:
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Ingresa tu correo electrónico"
            required
          />
        </label>
        <label>
          Celular:
          <input
            type="tel"
            value={celular}
            onChange={handleInputChange(setCelular)}
            placeholder="Ingresa tu número de celular (10 dígitos)"
            maxLength="10"
            required
          />
        </label>
        <label>
          Ciudad Actual:
          <input
            type="text"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            placeholder="Ingresa tu ciudad actual"
            required
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            minLength="5"
            placeholder="Ingresa una contraseña"
            required
          />
        </label>
        <button type="submit" className="registro-button">Registrar</button>
        {mensaje && <p className="mensaje">{mensaje}</p>}
        <button type="button" onClick={handleRegresar} className="regresar-button">Regresar</button>
      </form>
    </div>
  );
};

export default RegistroTrabajador;
