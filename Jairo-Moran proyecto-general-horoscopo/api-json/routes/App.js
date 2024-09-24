import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './Form';
import ChangePassword from './ChangePassword';
import UserHome from './UserHome';
import AdminHome from './AdminHome';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Form />} />
                <Route path="/userHome" element={<UserHome />} />
                <Route path="/adminHome" element={<AdminHome />} />
                <Route path="/change-password" element={<ChangePassword />} />
            </Routes>
        </Router>
    );
}

export default App;
