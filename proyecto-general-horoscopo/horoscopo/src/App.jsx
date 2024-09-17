import './App.css';
import Form from './components/Form';
import UserHome from './components/UserHome';
import AdminHome from './components/AdminHome';
import ChangePassword from './components/ChangePassword';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Form callback={setUser} />} />
        <Route path='/userHome' element={<UserHome user={user} />} />
        <Route path='/adminHome' element={<AdminHome user={user} />} />
        <Route path="/changePassword" element={<ChangePassword user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;