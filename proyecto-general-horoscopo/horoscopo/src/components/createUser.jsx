import { useState } from 'react';

function CreateUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar cualquier error previo
    setLoading(true); // Establecer estado de carga

    try {
      const response = await fetch('http://localhost:4000/v1/calculadora/createUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", response); // Verificar la respuesta completa
      console.log("Datos devueltos por el servidor:", data); // Verificar los datos devueltos

      if (response.ok) {
        alert(data.message); // Usuario creado con éxito
      } else {
        console.error(`Error ${response.status}: ${data.error}`); // Verificar el código de estado y el error
        setError(`Error ${response.status}: ${data.error}`);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message); // Mostrar el error en la consola
      setError('Error en el servidor. Inténtalo de nuevo.'); // Mostrar mensaje amigable para el usuario
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };

  return (
    <div>
      <h2>Crear Usuario</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Usuario'} {/* Mostrar estado de carga */}
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
