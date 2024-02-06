import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'
import './App.css';
import AdminDasboard from './components/AdminDasboard';
import { Register } from './components/Register';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AddSerial from './components/AddSerial';
import AgentDashboard from './components/AgentDashboard';
import AddUser from './components/AddUser';
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
  },[userRole, isAuthenticated]);
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <Routes>
          {isAuthenticated ? (
            <>
              {userRole === 'admin' && <Route path='/' element={<AdminDasboard />} />}
              {userRole === 'agent' && <Route path='/' element={<AgentDashboard />} />}
              <Route path='/assign-serial' element={<AddSerial />} />
              <Route path='/add-user' element={<AddUser />} />
            </>
          ) : (
            <>
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
            </>
          )}

        </Routes>
      </Router>


    </div>
  );
}

export default App;
