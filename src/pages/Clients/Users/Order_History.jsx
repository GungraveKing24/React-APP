import { Link } from "react-router-dom"

function Order_History(){
    const orders = [{"id": 1, "date": "15-02-2025", "total": "50", "status": "enviado"}, 
        {"id": 2, "date": "15-02-2025", "total": "50", "status": "entregado"}, 
        {"id": 3, "date": "15-02-2025", "total": "100", "status": "ordenado"}, 
        {"id": 4, "date": "15-02-2025", "total": "150", "status": "enviado"}, 
        {"id": 5, "date": "15-02-2025", "total": "200", "status": "entregado"}]

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
    </>
}

export default Order_History