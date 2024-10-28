import './App.css';
import Form from './components/Form';
import UserHome from './components/UserHome';
import AdminHome from './components/AdminHome';
import ChangePassword from './components/ChangePassword'; // Importa el nuevo componente
import CreateAccount from './components/CreateAccount'; // Importa el nuevo componente
import CreateAdmin from './components/CreateAdmin'; // Importa el nuevo componente CreateAdmin
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  return (  
    <BrowserRouter>
      <Routes>
        <Route index element={<Form callback={setUser}/>}></Route>
        <Route path='/registro' element={<CreateAccount />}></Route>
        <Route path='/user' element={<UserHome user={user}/>}></Route>
        <Route path='/admin' element={<AdminHome user={user}/>}></Route>
        <Route path='/change-password' element={<ChangePassword user={user} />}></Route>
        <Route path='/crear-admin' element={<CreateAdmin />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
