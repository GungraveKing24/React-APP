import React, { useState } from "react";
import { FaDatabase, FaShoppingCart, FaBell, FaUser, FaChartBar, FaDollarSign, FaHome, FaBox, FaChartLine, FaSignOutAlt, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const menuItems = [
    { icon: <FaDatabase size={24} className="text-[#6C5CE7]" />, label: "Productos y Stock", bg: "bg-[#F2EFFD]", link: "/admin/products" },
    { icon: <FaDollarSign size={24} className="text-[#00B894]" />, label: "Órdenes", bg: "bg-[#E8F8F5]", link: "/orders" },
    { icon: <FaBell size={24} className="text-[#FDCB6E]" />, label: "Notificaciones", bg: "bg-[#FFF3E6]", link: "/Notifications" },
    { icon: <FaShoppingCart size={24} className="text-[#E84393]" />, label: "Historial de Venta", bg: "bg-[#FCE4EC]", link: "/SalesHistory" },
    { icon: <FaUser size={24} className="text-[#0984E3]" />, label: "Usuarios", bg: "bg-[#E3F2FD]", link: "/UserManagement" },
    { icon: <FaChartBar size={24} className="text-[#D63031]" />, label: "Estadísticas", bg: "bg-[#FFE6E6]", link: "/Statistics" },
    { icon: <FaBox size={24} className="text-[#6C5CE7]" />, label: "Categorías", bg: "bg-[#F2EFFD]", link: "/Categories" },
];

export default function AdminDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-white">
    
      <button
        onClick={toggleMenu}
        className="fixed left-6 top-20 z-50 p-3 bg-[#EFB8C8] text-white rounded-lg shadow-lg hover:bg-[#EFB8C8] transition-all duration-300"
      >
        <FaBars size={24} />
      </button>

      <div
        className={`fixed left-0 top-28 w-64 bg-gradient-to-b from-[#EFB8C8] to-[#d7b788] p-6 shadow-2xl rounded-lg transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-2 translate-y-5" : "-translate-x-full"
        }`}
      >
        <ul className="space-y-4">
          <li>
            <Link
              to="/AdminDashboard"
              className="flex items-center space-x-3 p-3 rounded-lg text-white hover:bg-white hover:text-[#6C5CE7] transition-all duration-300"
            >
              <FaHome size={24} className="text-white" />
              <span className="font-Title">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/orders"
              className="flex items-center space-x-3 p-3 rounded-lg text-white hover:bg-white hover:text-[#e75cad] transition-all duration-300"
            >
              <FaBox size={24} className="text-white" />
              <span className="font-Title">Órdenes</span>
            </Link>
          </li>
          <li>
            <Link
              to="/Notifications"
              className="flex items-center space-x-3 p-3 rounded-lg text-white hover:bg-white hover:text-[#e75cad] transition-all duration-300"
            >
              <FaBell size={24} className="text-white" />
              <span className="font-Title">Notificaciones</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              className="flex items-center space-x-3 p-3 rounded-lg text-white hover:bg-white hover:text-[#e75cad] transition-all duration-300"
            >
              <FaBox size={24} className="text-white" />
              <span className="font-Title">Inventario</span>
            </Link>
          </li>
          <li>
            <Link
              to="/Statistics"
              className="flex items-center space-x-3 p-3 rounded-lg text-white hover:bg-white hover:text-[#6C5CE7] transition-all duration-300"
            >
              <FaChartLine size={24} className="text-white" />
              <span className="font-Title">Reportes</span>
            </Link>
          </li>
          <li>
            <button 
                onClick={handleLogout} 
                className="flex items-center space-x-3 p-3 rounded-lg text-white hover:bg-white hover:text-[#6C5CE7] transition-all duration-300">
                  <FaSignOutAlt size={24} className="text-white" />
                  <span className="font-Title">Cerrar Sesion</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col items-center p-4 md:p-10 mt-16 md:mt-0">
        <h1 className="text-2xl md:text-4xl font-Title text-[#2D3436] mb-6 md:mb-8">ADMINISTRACIÓN</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 w-full max-w-6xl p-4 md:p-8 bg-white rounded-xl md:rounded-3xl shadow-lg md:shadow-2xl border border-gray-200">
          {menuItems.map((item, index) => (
            <Link to={item.link} key={index} className="w-full">
              <div
                className={`flex flex-col items-center justify-center w-full h-40 md:h-60 ${item.bg} rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer p-4 md:p-6 border border-gray-200 hover:scale-[1.02]`}
              >
                <div className="mb-2 md:mb-4">{item.icon}</div>
                <span className="text-[#2D3436] font-semibold text-base md:text-lg text-center">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
