import React, { useState, useEffect } from 'react';
import SmartSpinner from '../../Both/SmartSpinner.jsx';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function User_Dashboard() {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener usuario desde el token
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            setUser(payload);
            
            if (payload.role === 'Administrador') {
                navigate("/AdminDashboard");
            }
        } catch (error) {
            localStorage.removeItem("token");
            navigate("/login");
        }
    }, [navigate]);

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    async function fetchOrders() {
        try {
            const res = await axios.get(`http://localhost:8000/orders/cart`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            // Filtrar pedidos que NO sean del estado "carrito"
            const filteredOrders = res.data.filter(order => order.order_state !== "carrito");
            setOrders(filteredOrders);
        } catch (error) {
            console.error("Error al obtener los pedidos:", error);
        }
    }

    if (!user) {
        return (
            <div className="text-center mt-10">
                <SmartSpinner />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto mt-16">
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

            {/* Tabla de pedidos */}
            <div className="bg-white shadow-xl rounded-lg p-6 mt-8">
                <h3 className="text-xl font-semibold mb-4">Historial de Pedidos</h3>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">ID</th>
                                <th className="border border-gray-300 px-4 py-2">Fecha</th>
                                <th className="border border-gray-300 px-4 py-2">Total</th>
                                <th className="border border-gray-300 px-4 py-2">Estado</th>
                                <th className="border border-gray-300 px-4 py-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order.id} className="text-center">
                                        <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                                        <td className="border border-gray-300 px-4 py-2">{order.order_date}</td>
                                        <td className="border border-gray-300 px-4 py-2">${order.order_total}</td>
                                        <td className="border border-gray-300 px-4 py-2">{order.order_state}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-[#B9A387]">
                                            <Link to={`/order_Details/${order.id}`}>Detalles</Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center p-4 text-gray-500">
                                        No hay pedidos aún.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default User_Dashboard;
