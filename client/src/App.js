import './App.css';
import AdminDasboard from './components/AdminDasboard';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <Sidebar/>
        <AdminDasboard/>
    </div>
  );
}

export default App;
