import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Forms from './components/Forms';
import FormsAdmin from './components/FormsAdmin';
import RegistroTrabajador from './components/RegistroTrabajador';
import RegistroAdmin from './components/RegistroAdmin';
import Ventas from './components/Ventas';

function App() {
  const [workerName, setWorkerName] = useState('');

  const handleWorkerLogin = (name) => {
    setWorkerName(name); // Guarda el nombre del trabajador
    // Aquí puedes agregar lógica adicional si es necesario, como redirigir a /ventas
  };

  return (
    <BrowserRouter>
      <div className="overlay"></div>
      <Routes>
        <Route index element={<Forms callback={handleWorkerLogin} />} />
        <Route path="/admin" element={<FormsAdmin />} />
        <Route path="/registrotrabajador" element={<RegistroTrabajador />} />
        <Route path="/newadmin" element={<RegistroAdmin />} />
        <Route path="/ventas" element={<Ventas workerName={workerName} />} /> {/* Pasa el nombre del trabajador como prop */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
