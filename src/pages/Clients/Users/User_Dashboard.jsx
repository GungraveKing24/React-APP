import React, { useState, useEffect } from 'react'
import SmartSpinner from '../../Both/SmartSpinner.jsx'
import { Link } from 'react-router-dom';

function User_Dashboard(){
    const [user, setUser] = useState({})
    const orders = [{"id": 1, "date": "15-02-2025", "total": "50", "status": "enviado"}, 
      {"id": 2, "date": "15-02-2025", "total": "50", "status": "entregado"}, 
      {"id": 3, "date": "15-02-2025", "total": "100", "status": "ordenado"}, 
      {"id": 4, "date": "15-02-2025", "total": "150", "status": "enviado"}, 
      {"id": 5, "date": "15-02-2025", "total": "200", "status": "entregado"}]

    useEffect(() => {
        // Extraer el token de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get("token");

        if (tokenFromUrl) {
            // Guardar el token en localStorage
            localStorage.setItem("token", tokenFromUrl);

            // Limpiar la URL para evitar problemas en futuras renderizaciones
            window.history.replaceState({}, document.title, "/profile");
        }

        // Obtener el token de localStorage
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/login";
            return;
        }

        try {
            const payload = JSON.parse(atob(token.split(".")[1])); // Decodificar el token
            setUser(payload);
        } catch (error) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
    }, []);

    if (!user) {
        return (
            <div className="text-center mt-10">
                <SmartSpinner />
            </div>
        );
    }

    return (
        <>
        {/* original className: max-w-5xl mx-auto mt-16 grid grid-cols-2 gap-8 */}
        <div className="max-w-5xl mx-auto mt-16">
      {/* User Card */}
      <div className="bg-white shadow-xl rounded-lg text-gray-900 p-6 flex items-center space-x-6">
        <div className="w-36 h-36 border-4 border-white rounded-full overflow-hidden">
          <img className="object-cover object-center w-full h-full" src={user.user_url_photo} alt="User" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-semibold">{user.user_name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <ul className="py-4 mt-2 text-gray-700">
            <li>📞(+503) {user.user_number}</li>
            <li className="mt-3">📍 {user.user_direction}</li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <Link to="/settings">
              <button className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-600">
                Editar Perfil
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-xl rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Historial de Pedidos</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Fecha</th>
                <th className="border border-gray-300 px-4 py-2">Total</th>
                <th className="border border-gray-300 px-4 py-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.date}</td>
                  <td className="border border-gray-300 px-4 py-2">${order.total}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                  <td className="border border-gray-300 px-4 py-2 text-[#B9A387]"><Link to="/order_Details">Detalles</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
        </>
  );
}

export default User_Dashboard

