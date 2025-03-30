import { useLocation } from "react-router-dom";
import NavBarUsersAuth from "./pages/Clients/Users/NavbarUsersAuth";
import Navbar from "./pages/Both/Navbar";

const Layout = ({ children }) => {
  const location = useLocation();

  // Rutas donde se debe mostrar el NavBar exclusivo de usuarios autenticados
  const showUserNavBar = ["/profile", "/order_Details", "/order_History", "/settings", "/editProfile"].includes(location.pathname);

  return (
    <>
      <Navbar />
      {showUserNavBar && <NavBarUsersAuth />}
      <main className="container mx-auto p-4">{children}</main>
    </>
  );
};

export default Layout;
