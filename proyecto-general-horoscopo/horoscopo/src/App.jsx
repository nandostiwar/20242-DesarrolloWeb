import './App.css';
import Form from './components/Form';
import UserHome from './components/UserHome';
import AdminHome from './components/AdminHome';
import ChangePassword from './components/ChangePassword'; // Ajusta la ruta según tu estructura de carpetas
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal que muestra el formulario de login */}
        <Route index element={<Form callback={setUser} />} />
        
        {/* Rutas para el usuario y el admin */}
        <Route path='/userHome' element={<UserHome user={user} />} />
        <Route path='/adminHome' element={<AdminHome user={user} />} />
        
        {/* Ruta para cambiar la contraseña, pasando el usuario como prop */}
        <Route path="/changePassword" element={<ChangePassword user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

