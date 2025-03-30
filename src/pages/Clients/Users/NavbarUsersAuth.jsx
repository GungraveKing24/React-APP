import { useState } from "react";
import { FaHome, FaBox, FaSignOutAlt, FaBars } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function NavBarUsersAuth(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return <>
        <button
            onClick={toggleMenu}
            className="fixed left-6 top-20 z-50 p-3 bg-[#EFB8C8] text-white rounded-lg shadow-lg hover:bg-[#EFB8C8] transition-all duration-300"
        >
            <FaBars size={24} />
        </button>
    
        <div
            className={`fixed left-6 top-28 w-64 bg-gradient-to-b from-[#EFB8C8] to-[#d7b788] p-6 shadow-2xl rounded-lg transform transition-transform duration-300 ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            <ul className="space-y-4">
              <li>
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 p-3 rounded-lg text-white hover:bg-white hover:text-[#6C5CE7] transition-all duration-300"
                >
                  <FaHome size={24} className="text-white" />
                  <span className="font-semibold">General</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/order_History"
                  className="flex items-center space-x-3 p-3 rounded-lg text-white hover:bg-white hover:text-[#e75cad] transition-all duration-300"
                >
                  <FaBox size={24} className="text-white" />
                  <span className="font-semibold">Órdenes</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="flex items-center space-x-3 p-3 rounded-lg text-white hover:bg-white hover:text-[#6C5CE7] transition-all duration-300"
                >
                  <IoSettingsSharp size={24} className="text-white" />
                  <span className="font-semibold">Ajustes</span>
                </Link>
              </li>
              <li>
              <button 
                onClick={handleLogout} 
                className="flex items-center space-x-3 p-3 rounded-lg text-white hover:bg-white hover:text-[#6C5CE7] transition-all duration-300">
                    <FaSignOutAlt size={24} className="text-white" />
                    <span className="font-semibold">Cerrar Sesion</span>
                </button>
              </li>
            </ul>
          </div>
    </>
}

export default NavBarUsersAuth