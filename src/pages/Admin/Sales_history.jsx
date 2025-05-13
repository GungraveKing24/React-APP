import { useEffect, useMemo, useState } from 'react';
import { FaRegEnvelope, FaPhone, FaRegCalendarAlt } from 'react-icons/fa';
import { CgDetailsMore } from "react-icons/cg";
import { Link, useLocation } from 'react-router-dom';
import { axiosInstance } from '../../Axios/Axios';

export default function SalesHistory(){
    const [orders, setOrders] = useState([]);
    const location = useLocation()
    const [statusFilter, setStatusFilter] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;

    useEffect(() => {
        if (location.pathname === "/orders") {
            setStatusFilter(["pendiente", "procesado", "aprobado"]);
        }
        fetchOrders();
    }, [location.pathname]);

    async function fetchOrders() {
        const response = await axiosInstance.get("/orders/admin/cart/", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        setOrders(response.data)
    }

    const filteredOrders = useMemo(() => {
        return orders.filter(order =>
        statusFilter.length === 0 || statusFilter.includes(order.status)
    );
}, [orders, statusFilter]);

    // Paginación
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

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

    const handleStatusChange = (status) => {
        setStatusFilter((prev) =>
            prev.includes(status)
                ? prev.filter((s) => s !== status) // Si ya estaba, lo quitamos
                : [...prev, status] // Si no estaba, lo agregamos
        );
    };

    return<>
    <div className="min-h-screen bg-white p-6 font-title">
        <div className="max-w-6xl mx-auto">
            <Link to="/AdminDashboard" className="flex items-center text-[#B9A387] hover:text-[#9c8568] transition-colors">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="ml-1 font-Title">Volver</span>
            </Link>

            <div className="flex flex-wrap gap-2 mb-5 mt-3 font-Title">
                    {["procesado", "pendiente", "completado", "cancelado", "aprobado"].map(filter => (
                        <button
                        key={filter}
                        onClick={() => handleStatusChange(filter)}
                        className={`px-4 py-2 rounded-full ${statusFilter.includes(filter) 
                            ? 'bg-[#EFB8C8] text-white' 
                            : 'bg-white text-rose-800 border border-rose-200 hover:bg-rose-50'}`}
                        >
                        {filter}
                        </button>
                    ))}
                    </div>

                    <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-5">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-rose-50">
                                    <tr>
                                    <th className="px-6 py-3 text-left text-xs font-Title text-rose-800 uppercase tracking-wider">Orden</th>
                                    <th className="px-6 py-3 text-left text-xs font-Title text-rose-800 uppercase tracking-wider">Contacto</th>
                                    <th className="px-6 py-3 text-left text-xs font-Title text-rose-800 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-Title text-rose-800 uppercase tracking-wider">Estado</th>
                                    <th className="px-6 py-3 text-left text-xs font-Title text-rose-800 uppercase tracking-wider">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-100">
                                    {currentOrders.length > 0 ? (
                                    currentOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-rose-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-800">
                                                #{order.id}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-Title text-gray-900">{order.name}</div>
                                                <div className="text-sm text-gray-500 flex items-center">
                                                <FaRegCalendarAlt className="mr-1" />
                                                {order.Date}
                                                </div>
                                            </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 flex items-center">
                                            <FaRegEnvelope className="mr-2 text-rose-500" />
                                            {order.email}
                                            </div>
                                            <div className="text-sm text-gray-500 flex items-center mt-1">
                                            <FaPhone className="mr-2 text-rose-500" />
                                            {order.phone}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                            ${order.totalSpent}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <Link to={`/OrderDetails/${order.id}`} className="flex space-x-3">
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
                        {filteredOrders.length > ordersPerPage && (
                            <div className="bg-rose-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Mostrando <span className="font-medium">{indexOfFirstOrder + 1}</span> a{' '}
                                            <span className="font-medium">
                                            {Math.min(indexOfLastOrder, filteredOrders.length)}
                                            </span>{' '}
                                            de <span className="font-medium">{filteredOrders.length}</span> ordenes
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                                >
                                                &larr; Anterior
                                            </button>
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium 
                                                    ${currentPage === page 
                                                        ? 'bg-rose-600 text-white border-rose-600' 
                                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                            <button
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                            >
                                            Siguiente &rarr;
                                            </button>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
            
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-xl shadow border border-rose-100">
                            <h3 className="text-gray-500 font-Title text-sm">Total Pedidos</h3>
                            <p className="text-2xl font-Title text-rose-900">{orders.length}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow border border-rose-100">
                          <h3 className="text-gray-500 font-Title text-sm">Procesado</h3>
                          <p className="text-2xl font-Title text-yellow-600">
                            {orders.filter(o => o.status === "procesado").length}
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow border border-rose-100">
                          <h3 className="text-gray-500 font-Title text-sm">Pendiente</h3>
                          <p className="text-2xl font-Title text-blue-600">
                            {orders.filter(o => o.status === "pendiente").length}
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow border border-rose-100">
                          <h3 className="text-gray-500 font-Title text-sm">Aprobado</h3>
                          <p className="text-2xl font-Title text-gray-600">
                            {orders.filter(o => o.status === "aprobado").length}
                          </p>
                        </div>
                    </div>
        </div>
    </div>
    </>
}
