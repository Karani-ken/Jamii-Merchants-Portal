import './App.css';
import AdminDasboard from './components/AdminDasboard';
import { Register } from './components/Register';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <Routes>
            <Route path='/' element={<AdminDasboard />} />
            <Route path='/register' element={<Register/>}/>
        </Routes>
      </Router>

      
    </div>
  );
}

export default App;
