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
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <Routes>
            <Route path='/' element={<AdminDasboard />} />
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>} /> 
            <Route path='/assign-serial' element={<AddSerial/>}/>  
            <Route path='/agent' element={<AgentDashboard/>}/>      
            <Route path='/add-user' element={<AddUser/>} />    
        </Routes>
      </Router>

      
    </div>
  );
}

export default App;
