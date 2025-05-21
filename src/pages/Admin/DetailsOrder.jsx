import { useEffect, useState } from "react";
import { FaCheckCircle, FaTruck, FaInfoCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";
import { axiosInstance } from "../../Axios/Axios";
import { formatDate } from "../../components/CardUtil";
import Swal from "sweetalert2";

export default function OrderDetails() {
  const { id } = useParams();
  const location = useLocation()
  const isDisabled = location.pathname.includes("/order_Details"); // Desactiva en "/order_Details"
  const [order, setOrder] = useState({})
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const statusOptions = ["procesado", "pendiente", "completado", "cancelado"];

  useEffect(() => {
    async function fetchOrder(){
      try {
        const res = await axiosInstance.get(`/order/details/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        setOrder(res.data)
      } catch (error) {
      }
    }

    fetchOrder()
  }, [])

  const getStatusIcon = (status) => {
    switch (status) {
      case "procesado":
        return <FaInfoCircle className="text-yellow-500" />;
      case "pendiente":
        return <FaTruck className="text-blue-500" />;
      case "completado":
        return <FaCheckCircle className="text-green-500" />;
      case "cancelado":
        return <FaInfoCircle className="text-red-500 " />;
      default:
        return null;
    }
  };

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

  const handleStatusChange = async (newStatus) => {
    const res = await axiosInstance.post(`/orders/change/order_state/${id}?new_state=${newStatus}`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })

    if(res.status === 200 || res.status === 201){
      setOrder({ ...order, order_state: newStatus });
      setShowStatusDropdown(false);
    } else{
      Swal.fire(`Error`, `Hubo un error al actualizar el estado`, "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-amber-50 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-3xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-Title text-[#B9A387] mb-1">Detalles de la Orden</h2>
            <p className="text-[#B9A387] font-Title">Resumen completo del pedido</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Orden ID</p>
            <p className="font-Title text-gray-800">{order.order_id}</p>
          </div>
        </div>

        <div className="relative mb-8">
          <div 
            className={`flex items-center justify-between p-4 rounded-lg ${getStatusColor(order.order_state)} 
            ${isDisabled ? 'cursor-default' : 'cursor-pointer'}`}
            onClick={isDisabled ? undefined : () => setShowStatusDropdown(!showStatusDropdown)}
          >
            <div className="flex items-center">
              {getStatusIcon(order.order_state)}
              <span className="ml-2 font-semibold">{order.order_state}</span>
            </div>
            {!isDisabled && (
              <button className="text-gray-700 hover:text-gray-900">
                {showStatusDropdown ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            )}
          </div>
          
          {!isDisabled && showStatusDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
              {statusOptions.map((status) => (
                <div
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`p-3 hover:bg-gray-50 cursor-pointer flex items-center ${order.order_state === status ? 'bg-gray-100' : ''}`}
                >
                  {getStatusIcon(status)}
                  <span className="ml-2">{status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-rose-50 p-4 rounded-xl">
            <h3 className="font-Title text-rose-800 mb-2">Fecha del Pedido</h3>
            <p className="text-gray-700">{formatDate(order.order_date)}</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-xl">
            <h3 className="font-Title text-amber-800 mb-2">Método de Pago</h3>
            <p className="text-gray-700">{order.payment_method}</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl">
            <h3 className="font-Title text-emerald-800 mb-2">Dirección de Envío</h3>
            <p className="text-gray-700">{order.delivery_address}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-Title text-[#B9A387] mb-4">Productos</h3>
          <div className="space-y-4">
            {order.arrangements?.map((product) => (
              <div key={product.arrangement_name} className="flex items-center border-b border-gray-100 pb-4">
                <img 
                  src={product.arrangement_img_url} 
                  className="w-16 h-16 object-cover rounded-lg mr-4"
                />
                <div className="flex-grow">
                  <p className="font-Title text-gray-800">{product.arrangement_name}</p>
                  <p className="text-sm font-Title text-gray-500">Cantidad: {product.quantity}</p>
                </div>
                <p className=" text-rose-900">${(product.price * product.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl mb-8">
          <h3 className="text-xl font-Title text-[#B9A387] mb-4">Resumen del Pago</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <p className="font-Title text-gray-800">Total</p>
              <p className="font-Title text-rose-900 text-lg">${order.total_paid?.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        {order.order_comments?.trim() && (
          <div className="bg-gray-50 p-6 rounded-xl mb-8">
            <h3 className="text-xl font-Title text-[#B9A387] mb-4">Notas</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <p className="font-Title text-rose-900 text-lg">{order.order_comments}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Link
            to={isDisabled ? "/profile" : "/Orders"}
            className="px-6 py-3 bg-rose-100 text-rose-800 rounded-lg hover:bg-rose-200 transition-colors text-center font-Title"
          >
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
}
