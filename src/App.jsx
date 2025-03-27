import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Error from "./pages/Error";
import Bug from "./pages/Both/Bug.jsx";
import Login from "./pages/Both/Login.jsx"
import SignIn from "./pages/Both/Sign_in.jsx"
import AboutUs from "./pages/Clients/About_us"
import Homepage from "./pages/Clients/Homepage.jsx"
import Navbar from './pages/Both/Navbar.jsx';
import Footer from './pages/Both/Footer.jsx';
import Contact from "./pages/Clients/Contact";
import Policiaes from "./pages/Clients/Policies_conditions.jsx"
import Terms from "./pages/Clients/terms.jsx"
import Catalog from "./pages/Clients/Catalog.jsx"
import User_Dashboard from "./pages/Clients/User_Dashboard.jsx"
import Dashboard from "./pages/Admin/Dashboard.jsx"
import Cars from "./pages/Clients/Cars.jsx"
import Checkout from "./pages/Clients/Checkout.jsx"

import Product_Detail from "./pages/Clients/Product_Detail.jsx"

import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Both */}
        <Route path="/" element={<Homepage />} />
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Bug/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policies" element={<Policiaes />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/catalog" element={<Catalog />} />
        
        {/* Client */}
        
        <Route element={<ProtectedRoute allowedRoles={["Administrador"]} />}>
        </Route>
          <Route path="/profile" element={<User_Dashboard />} />

        <Route path="/CheckoutForm" element={<Checkout/>} /> 
        <Route path="/ShoppingCart" element={<Cars/>} /> 
        <Route path="/details" element={<Product_Detail/>} />
        
        {/* Admin */}
        <Route element={<ProtectedRoute allowedRoles={["Administrador"]} />}>
          <Route path="/AdminDashboard" element={<Dashboard/>} />
        </Route>
      </Routes>

      <Footer />
    </Router>
  );
}

export default App
