import React, { useState, useEffect } from 'react';
import SmartSpinner from '../../Both/SmartSpinner.jsx';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { formatDate } from '../../../components/CardUtil.jsx';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { CgDetailsMore } from "react-icons/cg";

function User_Dashboard() {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
    
        // Verificamos expiración mínima
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            if (payload.exp && payload.exp < Date.now() / 1000) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }
        } catch (e) {
            return;
        }
    
        fetchUser(); // NUEVO
    }, [navigate]);

    useEffect(() => {
        if (user) {
            fetchOrders();
        }
    }, [user]);

    async function fetchOrders() {
        try {
            const url = import.meta.env.VITE_API_URL + "orders/cart/";
            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            // Filtrar pedidos que NO sean del estado "carrito" y obtener las 5 mas recientes
            const filteredOrders = res.data
            .filter(order => order.order_state !== "carrito")
            .sort((a, b) => new Date(b.order_date) - new Date(a.order_date))
            .slice(0,5);
            setOrders(filteredOrders);
        } catch (error) {
        }
    }

    async function fetchUser() {
        try {
            const res = await axios.get(import.meta.env.VITE_API_URL + "users/me", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            const userData = res.data;
            if (userData.role === 'Administrador') {
                navigate("/AdminDashboard");
                return;
            }
            setUser(userData);
        } catch (error) {
            localStorage.removeItem("token");
        }
    }    

    if (!user) {
        return (
            <div className="text-center mt-10">
                <SmartSpinner />
            </div>
        );
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "procesado":
                return "bg-yellow-100 text-yellow-800";
            case "pendiente":
                return "bg-blue-100 text-blue-800";
            case "completado":
                return "bg-green-100 text-green-800";
            case "cancelado":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

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
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-5">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-rose-50">
                                    <tr>
                                    <th className="px-6 py-3 text-left text-xs font-Title text-rose-800 uppercase tracking-wider">Orden</th>
                                    <th className="px-6 py-3 text-left text-xs font-Title text-rose-800 uppercase tracking-wider">Fecha</th>
                                    <th className="px-6 py-3 text-left text-xs font-Title text-rose-800 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-Title text-rose-800 uppercase tracking-wider">Estado</th>
                                    <th className="px-6 py-3 text-left text-xs font-Title text-rose-800 uppercase tracking-wider">Detalles</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {orders.length > 0 ? (
                                    orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-rose-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-800">
                                                    #{order.id}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="text-sm text-gray-500 flex items-center">
                                                <FaRegCalendarAlt className="mr-1" />
                                                {formatDate(order.order_date)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                            ${order.order_total.toFixed(2)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${getStatusColor(order.order_state)}`}>
                                                {order.order_state}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <Link to={`/order_Details/${order.id}`} className="flex space-x-3">
                                                <CgDetailsMore size={24}/>
                                            </Link>
                                        </td>
                                        </tr>
                                    ))
                                    ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                        No se encontraron ordenes
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
