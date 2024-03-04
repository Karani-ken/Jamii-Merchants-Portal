import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AdminDasboard from './components/AdminDasboard';
import { Register } from './components/Register';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AddSerial from './components/AddSerial';
import AgentDashboard from './components/AgentDashboard';
import AddUser from './components/AddUser';
import Reports from './components/Reports';
import HomePage from './components/HomePage';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
  const [userRole, setUserRole] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decodeToken = jwtDecode(token)
        setUserRole(decodeToken.role);
        console.log(userRole)
        setIsAuthenticated(true)
      } catch (error) {
        console.log('Error decoding token', error);
      }
    }
  }, [userRole, isAuthenticated])
  return (
    <div className="App">
      <ToastContainer/>
      <Router>
        <Sidebar />
        <Routes>
          <Route path='/' exact element={<HomePage />} />
          <Route path='/admin' element={<AdminDasboard />} />
          <Route path='/agent' element={<AgentDashboard />} />
          <Route path='/add-user' element={<AddUser />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          <Route path='/reset-password' element={<ResetPassword/>} />
        </Routes>
      </Router>


    </div>
  );
}

export default App;
