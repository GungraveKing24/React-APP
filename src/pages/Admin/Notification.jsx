import { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaTruck, FaInfoCircle, FaBell, FaRegBell } from "react-icons/fa";

const notificationsData = [
  { id: 1, orderId: "#738", date: "8 Sep, 2023", status: "Procesando", read: false, customer: "María González", amount: "$95.00" },
  { id: 2, orderId: "#703", date: "24 May, 2023", status: "En camino", read: false, customer: "Juan Pérez", amount: "$120.50" },
  { id: 3, orderId: "#510", date: "22 Oct, 2023", status: "Completado", read: true, customer: "Ana Rodríguez", amount: "$65.25" },
  { id: 4, orderId: "#489", date: "15 Oct, 2023", status: "Cancelado", read: true, customer: "Carlos Sánchez", amount: "$75.80" },
];

export default function OrderNotifications() {
  const [notifications, setNotifications] = useState(notificationsData);
  const [activeFilter, setActiveFilter] = useState("Todas");

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Procesando":
        return <FaInfoCircle className="text-yellow-500 text-xl" />;
      case "En camino":
        return <FaTruck className="text-blue-500 text-xl" />;
      case "Completado":
        return <FaCheckCircle className="text-green-500 text-xl" />;
      case "Cancelado":
        return <FaTimesCircle className="text-red-500 text-xl" />;
      default:
        return <FaInfoCircle className="text-gray-500 text-xl" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Procesando":
        return "bg-yellow-100 text-yellow-800";
      case "En camino":
        return "bg-blue-100 text-blue-800";
      case "Completado":
        return "bg-green-100 text-green-800";
      case "Cancelado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredNotifications = activeFilter === "Todas" 
    ? notifications 
    : notifications.filter(n => n.status === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white  p-6">
      <div className="max-w-5xl mx-auto">
      <Link to="/AdminDashboard" className="flex items-center text-[#B9A387] hover:text-[#9c8568] transition-colors">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="ml-1 font-Title">Volver</span>
            </Link>

        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-Title text-[#B9A387] flex items-center">
              <FaBell className="mr-3" />
              Notificaciones de Pedidos
            </h1>
            <p className=" text-[#B9A387]">Gestiona los pedidos de tu floristería</p>
          </div>
          <button 
            onClick={markAllAsRead}
            className="mt-4 md:mt-0 px-4 py-2 bg-white text-[#B9A387]  rounded-lg hover:bg-rose-200 transition-colors"
          >
            Marcar todas como leídas
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 font-Title">
          {["Todas", "Procesando", "En camino", "Completado", "Cancelado"].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full ${activeFilter === filter 
                ? 'bg-[#EFB8C8] text-white' 
                : 'bg-white text-rose-800 border border-rose-200 hover:bg-rose-50'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No hay notificaciones con este filtro
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {filteredNotifications.map((notif) => (
                <li 
                  key={notif.id} 
                  className={`p-5 hover:bg-rose-50 transition-colors ${notif.read ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`mt-1 p-2 rounded-lg ${getStatusColor(notif.status)}`}>
                        {getStatusIcon(notif.status)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className={`font-semibold ${notif.read ? 'text-gray-600' : 'text-gray-900'}`}>
                            Pedido {notif.orderId} - {notif.status}
                          </h3>
                          {!notif.read && (
                            <span className="inline-block h-2 w-2 rounded-full bg-[#EFB8C8]"></span>
                          )}
                        </div>
                        <p className="text-gray-600">{notif.customer}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          <span className="font-medium">{notif.date}</span> • Total: {notif.amount}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a 
                        href={`/OrderDetails`} 
                        className="px-4 py-2 bg-[#EFB8C8] text-rose-800 rounded-lg hover:bg-rose-200 transition-colors text-center"
                      >
                        Ver detalles
                      </a>
                      {!notif.read && (
                        <button 
                          onClick={() => markAsRead(notif.id)}
                          className="px-4 py-2 bg-white border border-[#EFB8C8] text-rose-800 rounded-lg hover:bg-rose-50 transition-colors"
                        >
                          Marcar como leído
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow border border-rose-100">
            <h3 className="text-gray-500 font-Title text-sm">Total Pedidos</h3>
            <p className="text-2xl font-Title text-rose-900">{notifications.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow border border-rose-100">
            <h3 className="text-gray-500 font-Title text-sm">Por Procesar</h3>
            <p className="text-2xl font-Title text-yellow-600">
              {notifications.filter(n => n.status === "Procesando").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow border border-rose-100">
            <h3 className="text-gray-500 font-Title text-sm">En Camino</h3>
            <p className="text-2xl font-Title text-blue-600">
              {notifications.filter(n => n.status === "En camino").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow border border-rose-100">
            <h3 className="text-gray-500 font-Title text-sm">No Leídos</h3>
            <p className="text-2xl font-Title text-rose-600">
              {notifications.filter(n => !n.read).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}