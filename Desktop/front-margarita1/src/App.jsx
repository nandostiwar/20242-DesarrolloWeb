import './App.css';
import Registro from './components/Registro'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { useState } from 'react';

const App = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false); 

  const handleLogin = () => {
    console.log("Usuario:", user);
    console.log("Contraseña:", password);
    // Lógica para manejar el login
  };

  const handleRegister = () => {
    setShowRegister(true); 
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        {!showRegister ? (
          <div className="login-container">
            <h2>😉 BIENVENIDOS 😉</h2>
            <div className="input-group">
              <label>Usuario</label>
              <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Ingresa tu usuario"
              />
            </div>
            <div className="input-group">
              <label>Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
              />
            </div>
            <div className="buttons">
              <button className="login-btn" onClick={handleLogin}>Entrar</button>
              <button className="register-btn" onClick={handleRegister}>Registrarse</button>
            </div>
          </div>
        ) : (
          <Registro /> // Muestra el componente de registro
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
