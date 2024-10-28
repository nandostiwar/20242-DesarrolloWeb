import { useState } from 'react';

function CreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // 'user' o 'admin'

  const handleCreateAccount = (event) => {
    event.preventDefault();

    fetch('http://localhost:4000/api/create-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        role, // Enviamos el rol para determinar si es 'user' o 'admin'
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
    <form onSubmit={handleCreateAccount}>
      <h1>Crear Nueva Cuenta</h1>
      <div>
        <label>Nombre de Usuario</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Contraseña</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div>
        <label>Rol</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
      </div>
      <button type="submit">Crear Cuenta</button>
    </form>
  );
}

export default CreateAccount;
