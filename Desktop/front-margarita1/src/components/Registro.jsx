import React from 'react';
import './styles/registro.css'; 
function Registro() {
  const handleRegresar = () => {
    window.location.href = '/'; 
  };

  return (
    <div className="registro-container"> {/* Asegúrate de usar la clase correcta */}
      <h2>😉 REGISTRATE Y GANA 😉</h2>

      <form>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" name="nombre" placeholder="Nombre" required />
        </div>

        <div className="form-group">
          <label htmlFor="fecha">Fecha Nac:</label>
          <input type="date" id="fecha" name="fecha" required />
        </div>

        <div className="form-group">
          <label htmlFor="cedula">Cédula:</label>
          <input type="text" id="cedula" name="cedula" placeholder="Cédula" required />
        </div>

        <div className="form-group">
          <label htmlFor="correo">Correo:</label>
          <input type="email" id="correo" name="correo" placeholder="Correo" required />
        </div>

        <div className="form-group">
          <label htmlFor="celular">Celular:</label>
          <input type="tel" id="celular" name="celular" placeholder="Celular" required />
        </div>

        <div className="form-group">
          <label htmlFor="ciudad">Ciudad:</label>
          <input type="text" id="ciudad" name="ciudad" placeholder="Ciudad" required />
        </div>

        <div className="form-group">
          <label htmlFor="contraseña">Contraseña:</label>
          <input type="password" id="contraseña" name="contraseña" placeholder="Contraseña" required />
        </div>

        <button type="submit">Registrarse</button>
        <button type="button" className="regresar-button" onClick={handleRegresar}>
          Regresar al Inicio
        </button>
      </form>
    </div>
  );
}

export default Registro;
