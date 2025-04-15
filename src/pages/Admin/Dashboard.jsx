import React, { useEffect, useState } from "react";
import { FaDatabase, FaShoppingCart, FaBell, FaUser, FaChartBar, FaDollarSign, FaHome, FaBox, FaChartLine, FaSignOutAlt, FaBars } from "react-icons/fa";
import { FaSquareCaretRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const menuItems = [
    { icon: <FaDatabase size={24} className="text-[#6C5CE7]" />, label: "Productos y Stock", bg: "bg-[#F2EFFD]", link: "/Catalog2" },
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
        className={`fixed left-6 top-28 w-64 bg-gradient-to-b from-[#EFB8C8] to-[#d7b788] p-6 shadow-2xl rounded-lg transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
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
              to="/Catalog2"
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

      <div className="flex-1 flex flex-col items-center p-10 mt-16">
        <h1 className="text-4xl font-Title text-[#2D3436] mb-8">ADMINISTRACIÓN</h1>
        <div className="grid grid-cols-3 gap-8 p-8 bg-white rounded-3xl shadow-2xl border border-gray-200">
          {menuItems.map((item, index) => (
            <Link to={item.link} key={index}>
              <div
                className={`flex flex-col items-center justify-center w-60 h-60 ${item.bg} rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer p-6 border border-gray-200 hover:scale-105`}
              >
                <div className="mb-4">{item.icon}</div>
                <span className="text-[#2D3436] font-semibold text-lg text-center">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}