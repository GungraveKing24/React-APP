import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './Layout.jsx';

{/* Global */}
import Bug from "./pages/Both/Bug.jsx";
import Homepage from "./pages/Clients/Homepage.jsx"
import Login from "./pages/Both/Login.jsx"
import SignIn from "./pages/Both/Sign_in.jsx"
import AboutUs from "./pages/Clients/About_us"
import Contact from "./pages/Clients/Contact";
import Policiaes from "./pages/Clients/Policies_conditions.jsx"
import Terms from "./pages/Clients/terms.jsx"
import Catalog from "./pages/Clients/Catalog.jsx"
import Product_Detail from "./pages/Clients/Product_Detail.jsx"
import Cars from "./pages/Clients/Cars.jsx"
import Checkout from "./pages/Clients/Checkout.jsx"
import Footer from './pages/Both/Footer.jsx';

{/* Auth Users */}
import User_Dashboard from './pages/Clients/Users/User_Dashboard.jsx';
import Order_History from './pages/Clients/Users/Order_History.jsx';
import Order_Details from './pages/Clients/Users/Order_Deatils.jsx';
import Settings from './pages/Clients/Users/Setting.jsx';

{/* Admin */}
import Dashboard from "./pages/Admin/Dashboard.jsx"
import Categories from './pages/Admin/Categories/Categories.jsx';
import CreateProduct from './pages/Admin/Products/addproduct.jsx'
import EditProduct from './pages/Admin/Products/editproduct.jsx'
import Catalog2 from './pages/Admin/Products/Products.jsx'
import Statistics from './pages/Admin/Statistics.jsx'
import Notifications from './pages/Admin/Notification.jsx'
import OrderDetails from './pages/Admin/DetailsOrder.jsx'
import UserManagement from './pages/Admin/Users.jsx'
import SalesHistory from './pages/Admin/Sales_history.jsx';

{/* Protection y otros */}
import ProtectedRoute from './components/ProtectedRoutes.jsx';
import GoogleCallback from './components/GoogleCallback.jsx';

{/* Provedor de Contexto */}
import { CartProvider } from './context/CarContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              {/* Global */}
              <Route path="/" element={<Homepage />} />
              <Route path="*" element={<Bug/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/google/callback" element={<GoogleCallback />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/policies" element={<Policiaes />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/CheckoutForm" element={<Checkout/>} /> 
              <Route path="/ShoppingCart" element={<Cars/>} /> 
              <Route path="/details" element={<Product_Detail/>} />

              {/* Auth Users */}
              <Route element={<ProtectedRoute allowedRoles={['Cliente']} />}>
                <Route path="/profile" element={<User_Dashboard />} />
                <Route path='/order_Details' element={<OrderDetails />} />
                <Route path='/order_History' element={<Order_History />} />
                <Route path='/settings' element={<Settings />} />
              </Route>

              {/* Admin */}
              <Route element={<ProtectedRoute allowedRoles={['Administrador']} />}>
                <Route path="/AdminDashboard" element={<Dashboard/>} />
                <Route path='/categories' element={<Categories />} />
                <Route path='/CreateProduct' element={<CreateProduct />} />
                <Route path='/admin/products' element={<Catalog2 />} />
                <Route path='/admin/products/edit/:id' element={<EditProduct />} />
                <Route path='/Statistics' element={<Statistics />} />
                <Route path='/Notifications' element={<Notifications />} />
                <Route path='/OrderDetails' element={<OrderDetails />} />
                <Route path='/orders' element={<SalesHistory />} />
                <Route path='/SalesHistory' element={<SalesHistory />} />
                <Route path='/UserManagement' element={<UserManagement />} />
              </Route>
            </Routes>
            <Footer />
          </Layout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App