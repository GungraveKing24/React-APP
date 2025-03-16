import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login.jsx';
import Users from './users.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        
          {/* Ruta para la página de Login */}
          <Route path="/" element={<Login />} />
                    
          {/* Ruta para la lista de usuarios */}
          <Route path="/users" element={<Users />} />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
