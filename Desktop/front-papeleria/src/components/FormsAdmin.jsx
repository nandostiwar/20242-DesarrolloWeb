import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/FormsAdmin.css';

const FormsAdmin = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login de administrador exitoso");
  };

  return (
    <div className="login-container">
      <h2 className="title">🧑‍💼 BIENVENIDOS ADMINISTRADORES 🧑‍💼</h2>
      <form className="login-form transparent-bg" onSubmit={handleLogin}>
        <label>
          Usuario:
          <input type="text" name="username" placeholder="🧑‍💼Ingresa tu usuario" required />
        </label>
        <label>
          Contraseña:
          <input type="password" name="password" placeholder="🔏Ingresa tu contraseña" required />
        </label>
        <button type="submit" className="login-button">Ingresar</button>
<div className="register-links">
    <button type="button" onClick={() => navigate('/registrotrabajador')} className="link">
        Registrar Trabajador
    </button>
    <button type="button" onClick={() => navigate('/newadmin')} className="link">
        Registrar Administrador
    </button>
</div>
      </form>
    </div>
  );
};

export default FormsAdmin;
