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
import AddCate from './pages/Admin/Categories/addcate.jsx'
import Statistics from './pages/Admin/Statistics.jsx'
import Notifications from './pages/Admin/Notification.jsx'
import OrderDetails from './pages/Admin/DetailsOrder.jsx'
import UserManagement from './pages/Admin/Users.jsx'




function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Global */}
          <Route path="/" element={<Homepage />} />
          <Route path="*" element={<Bug/>} />
          <Route path="/login" element={<Login />} />
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
          <Route path="/profile" element={<User_Dashboard />} />
          <Route path='/order_Details' element={<Order_Details />} />
          <Route path='/order_History' element={<Order_History />} />
          <Route path='/settings' element={<Settings />} />

          {/* Admin */}
          <Route path="/AdminDashboard" element={<Dashboard/>} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/CreateProduct' element={<CreateProduct />} />
          <Route path='/EditProduct' element={<EditProduct />} />
          <Route path='/Catalog2' element={<Catalog2 />} />
          <Route path='/AddCate' element={<AddCate />} />
          <Route path='/Statistics' element={<Statistics />} />
          <Route path='/Notifications' element={<Notifications />} />
          <Route path='/OrderDetails' element={<OrderDetails />} />
          <Route path='/UserManagement' element={<UserManagement />} />



          



        </Routes>
        <Footer />
      </Layout>
    </Router>
  );
}

export default App
