import './App.css';
import AdminDasboard from './components/AdminDasboard';
import { Register } from './components/Register';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AddSerial from './components/AddSerial';
import AgentDashboard from './components/AgentDashboard';
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
        </Routes>
      </Router>

      
    </div>
  );
}

export default App;
