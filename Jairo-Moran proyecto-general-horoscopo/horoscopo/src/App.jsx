import './App.css';
import Form from './components/Form';
import UserHome from './components/UserHome';
import AdminHome from './components/AdminHome';
import ChangePassword from './components/ChangePassword'; // Importa el nuevo componente
import CreateAccount from './components/CreateAccount'; // Importa el nuevo componente
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  return (  
    <BrowserRouter>
      <Routes>
        <Route index element={<Form callback={setUser}/>}></Route>
        <Route path='/userHome' element={<UserHome user={user}/>}></Route>
        <Route path='/adminHome' element={<AdminHome user={user}/>}></Route>
        <Route path='/change-password' element={<ChangePassword user={user} />}></Route> {/* Nueva ruta */}
        <Route path='/create-account' element={<CreateAccount />}></Route> {/* Nueva ruta */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
