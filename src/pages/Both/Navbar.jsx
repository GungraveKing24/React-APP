import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-xl font-bold text-gray-800">
          Arreglitosv
        </a>

        {/* Botón hamburguesa en móviles */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>

        {/* Menú principal */}
        <div className={`flex-col md:flex md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8 ${isOpen ? "flex" : "hidden"} md:flex absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0 z-10`}>
          
          {/* Links */}
          <ul className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6 text-center md:text-left">
            <li><a href="/" className="text-gray-700 hover:text-gray-900">Inicio</a></li>
            <li><a href="/catalog" className="text-gray-700 hover:text-gray-900">Catálogo</a></li>
            <li><a href="/aboutus" className="text-gray-700 hover:text-gray-900">Nosotros</a></li>
            <li><a href="/contact" className="text-gray-700 hover:text-gray-900">Contáctanos</a></li>
          </ul>

          {/* Barra de búsqueda */}
          <div className="relative w-full max-w-md mx-auto">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </span>
            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
              placeholder="Buscar..."
            />
          </div>

          {/* Carrito de compras */}
          <div className="relative flex justify-center md:justify-start">
            <a className="relative text-gray-700 hover:text-gray-600 flex items-center" href="#">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              <span className="absolute -top-2 -right-2 px-2 py-1 text-xs font-bold text-white bg-blue-500 rounded-full">
                 
              </span>
            </a>
          </div>

          {/* Botones de Login y Sign Up */}
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

        </div>
      </div>
    </nav>
  );
}

