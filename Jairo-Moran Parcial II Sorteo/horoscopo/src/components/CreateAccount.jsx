import { useState } from 'react';
import './styles/CreateAccount.css';

function CreateAccount() {
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [cedula, setCedula] = useState('');
  const [correo, setCorreo] = useState('');
  const [celular, setCelular] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = (event) => {
    event.preventDefault();

    fetch('http://localhost:4000/api/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre,
        fechaNacimiento,
        cedula,
        correo,
        celular,
        ciudad,
        password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Cuenta creada con éxito');
        } else {
          alert('Error al crear la cuenta');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <form onSubmit={handleCreateAccount} className="create-account-form">
      <h2>Registro para Sorteos</h2>
      
      <label>Nombre</label>
      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

      <label>Fecha de Nacimiento</label>
      <input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required />

      <label>Cédula</label>
      <input type="text" value={cedula} onChange={(e) => setCedula(e.target.value)} required />

      <label>Correo</label>
      <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />

      <label>Celular</label>
      <input type="tel" value={celular} onChange={(e) => setCelular(e.target.value)} required />

      <label>Ciudad</label>
      <input type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)} required />

      <label>Contraseña</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

      <button type="submit">Guardar</button>
    </form>
  );
}

export default CreateAccount;
