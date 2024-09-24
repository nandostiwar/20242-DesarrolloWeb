import './App.css';
import Form from './components/Form';
import UserHome from './components/UserHome';
import AdminHome from './components/AdminHome';
import ChangePassword from './components/ChangePassword';
import NewUser from './components/NewUser'; // Asegúrate de importar el componente NewUser
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  
  return (  
    <BrowserRouter>
      {/* <Navigation/> */}
      <Routes>
        <Route index element={<Form callback={setUser}/>}></Route>
        <Route path='/userHome' element={<UserHome user={user}/>}></Route>
        <Route path='/adminHome' element={<AdminHome user={user}/>}></Route>
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/newUser" element={<NewUser />} /> {/* Agregada la ruta para NewUser */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;