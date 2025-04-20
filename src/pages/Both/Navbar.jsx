import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CarContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount, updateCartCount } = useCart(); // Asegúrate de obtener updateCartCount del contexto
  const navigate = useNavigate();

  // Escuchar cambios en el localStorage para guest cart
  useEffect(() => {
    const handleStorageChange = () => {
      updateCartCount();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [updateCartCount]);

  const handleLogout = () => {
    logout();
    updateCartCount(); // Actualizar el carrito después de logout
    navigate("/");
  };
  
  useEffect(() => {
    const handleStorageChange = () => {
      if (!localStorage.getItem("token")) {
        // Solo actualizar si es guest
        updateCartCount();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-Title text-gray-800">
          Arreglitosv
        </Link>

        {/* Botón hamburguesa en móviles */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg 
            className="w-7 h-7" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} 
            />
          </svg>
        </button>

        {/* Menú principal */}
        <div 
          className={`flex-col md:flex md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8 ${
            isOpen ? "flex" : "hidden"
          } md:flex absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 z-10`}
        >
          {/* Links */}
          <ul className="flex flex-col font-Title md:flex-row space-y-3 md:space-y-0 md:space-x-6 text-center md:text-left">
            <li>
              <Link to="/" className="text-gray-700 hover:text-gray-900">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/catalog" className="text-gray-700 hover:text-gray-900">
                Catálogo
              </Link>
            </li>
            <li>
              <Link to="/aboutus" className="text-gray-700 hover:text-gray-900">
                Nosotros
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-700 hover:text-gray-900">
                Contáctanos
              </Link>
            </li>
          </ul>

          {/* Carrito de compras */}
          <div className="relative flex justify-center md:justify-start items-center">
            <Link 
              to="/ShoppingCart" 
              className="relative text-gray-700 hover:text-gray-600 flex items-center"
            >
              <svg 
                className="w-6 h-6" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <span className="absolute -top-2 -right-2 px-2 py-1 text-xs font-bold text-white bg-blue-500 rounded-full">
                {cartCount}
              </span>
            </Link>
          </div>

          {/* Botones de Login y Sign Up o User */}
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to={user.user_role === 'Administrador' ? "/AdminDashboard" : "/profile"} className="w-10 h-10">
                <img 
                  src={user.user_url_photo || "https://via.placeholder.com/40"} 
                  alt="Perfil" 
                  className="w-10 h-10 rounded-full border border-gray-300 object-cover" 
                />
              </Link>
              <button 
                onClick={handleLogout} 
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
              <Link to="/login">
                <button className="text-gray-700 hover:text-gray-900 w-full md:w-auto px-4 py-2 text-center">
                  Accede
                </button>
              </Link>
              <Link to="/signin">
                <button className="bg-blue-500 text-white w-auto md:w-auto px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 text-center">
                  Registrate
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}