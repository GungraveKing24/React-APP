import axios from "axios";
import { useEffect, useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { formatDate } from "../../../components/CardUtil";
import { FaRegCalendarAlt } from 'react-icons/fa';
import { CgDetailsMore } from "react-icons/cg";
import { axiosInstance } from "../../../Axios/Axios";

function Order_History(){
  const [orders, setOrders] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const { id } = useParams();

  useEffect(() => {
    if(id){
      fetchOrdersByID()
    } else{
      fetchOrders()
    }
  }, [])
  
  async function fetchOrders(){
    try {
      const url = import.meta.env.VITE_API_URL + "orders/cart/";
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
        // Filtrar pedidos que NO sean del estado "carrito"
      const filteredOrders = res.data.filter(order => order.order_state !== "carrito")
      setOrders(filteredOrders);
    } catch (error) {}
  }

  async function fetchOrdersByID() {
  try {
    const res = await axiosInstance.get("/order/user_orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      params: {
        user_id: id
      }
    });

    const filteredOrders = res.data.filter(order => order.order_state !== "carrito");
    setOrders(filteredOrders);
  } catch (error) {}
};

  const filteredOrders = useMemo(() => {
    return orders
    .sort((a, b) => new Date(b.order_date) - new Date(a.order_date))
  }, [orders])

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

    return <>
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
                {currentOrders.length > 0 ? (
                  currentOrders.map((order) => (
                    <tr key={order.id ? order.id : order.order_id} className="hover:bg-rose-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-800">
                            #{order.id ? order.id : order.order_id}
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
                          ${order.order_total ? order.order_total.toFixed(2) : order.total_paid.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${getStatusColor(order.order_state)}`}>
                          {order.order_state}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link to={order.id ? `/order_Details/${order.id}` : `/OrderDetails/${order.order_id}`} className="flex space-x-3">
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
    </>
}

export default Order_History
