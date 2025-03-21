import { Link } from "react-router-dom";

export default function Navbar(){
    return (
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo y enlaces */}
          <div className="flex items-center space-x-8">
            <a href="/" className="text-xl font-bold text-gray-800">Arreglitosv</a>
            <ul className="flex space-x-6">
              <li><a href="/" className="text-gray-700 hover:text-gray-900">Inicio</a></li>
              <li><a href="/catalog" className="text-gray-700 hover:text-gray-900">Cátalogo</a></li>
              <li><a href="/aboutus" className="text-gray-700 hover:text-gray-900">Nosotros</a></li>
              <li><a href="/contact" className="text-gray-700 hover:text-gray-900">Contáctanos</a></li>
            </ul>
          </div>

          {/* Search bar */}
          <div className="relative mt-4 md:mt-0">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </span>

                <input type="text" className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Search"/>
          </div>

          {/* Cart logo */}
          <div className="flex justify-center md:block">
                <a className="relative text-gray-700 transition-colors duration-300 transform hover:text-gray-600" href="#">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                    <span className="absolute top-0 left-0 p-1 text-xs text-white bg-blue-500 rounded-full"></span>
                </a>
            </div>
  
          {/* Botones de acción */}
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <button className="text-gray-700 hover:text-gray-900">Login</button>
            </Link>
            <Link to="/signin">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </nav>
    );
  };