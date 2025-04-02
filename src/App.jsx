import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import Profile from './pages/profile.jsx';
import Auth from './pages/auth.jsx';
import Navbar from './pages/Navbar.jsx';
import Catalogo from './pages/catalogo.jsx';
import Cart from './pages/cart.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>        
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/catalog" element={<Catalogo />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
