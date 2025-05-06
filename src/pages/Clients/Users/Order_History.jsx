import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Order_History(){
  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function fetchOrders(){
      try {
        const url = import.meta.env.VITE_API_URL + "orders/cart/";
        const res = await axios.get(url, {
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

    fetchOrders()
  }, [])

    return <>
        <div className="bg-white shadow-xl rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Historial de Pedidos</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-red-100">
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
                  <td className="border border-gray-300 px-4 py-2">{order.order_date}</td>
                  <td className="border border-gray-300 px-4 py-2">${order.order_total}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.order_state}</td>
                  <td className="border border-gray-300 px-4 py-2 text-[#B9A387]"><Link to={`/order_Details/${order.id}`}>Detalles</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
}

export default Order_History
