import { useState } from "react";
import { FaCheckCircle, FaTruck, FaInfoCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function OrderDetails() {
  const [orderDetails, setOrderDetails] = useState({
    orderId: "#738",
    date: "8 Sep, 2023",
    status: "Procesando",
    products: [
      { id: 1, name: "Ramo de Tulipanes", price: 25.00, quantity: 2, image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" },
      { id: 2, name: "Caja de Rosas", price: 40.00, quantity: 1, image: "https://images.unsplash.com/photo-1559563362-c667ba5f5480?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80" },
    ],
    subtotal: 90.00,
    envio: 5.00,
    total: 95.00,
  });

  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const statusOptions = ["Procesando", "En camino", "Completado", "Cancelado"];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Procesando":
        return <FaInfoCircle className="text-yellow-500" />;
      case "En camino":
        return <FaTruck className="text-blue-500" />;
      case "Completado":
        return <FaCheckCircle className="text-green-500" />;
      case "Cancelado":
        return <FaInfoCircle className="text-red-500 " />;
      default:
        return null;
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

  const handleStatusChange = (newStatus) => {
    setOrderDetails({ ...orderDetails, status: newStatus });
    setShowStatusDropdown(false);
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
            <p className="font-Title text-gray-800">{orderDetails.orderId}</p>
          </div>
        </div>

        <div className="relative mb-8">
          <div className={`flex items-center justify-between p-4 rounded-lg ${getStatusColor(orderDetails.status)}`}>
            <div className="flex items-center">
              {getStatusIcon(orderDetails.status)}
              <span className="ml-2 font-semibold">{orderDetails.status}</span>
            </div>
            <button 
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className="text-gray-600 hover:text-gray-800"
            >
              {showStatusDropdown ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
          
          {showStatusDropdown && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
              {statusOptions.map((status) => (
                <div
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`p-3 hover:bg-gray-50 cursor-pointer flex items-center ${orderDetails.status === status ? 'bg-gray-100' : ''}`}
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
            <p className="text-gray-700">{orderDetails.date}</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-xl">
            <h3 className="font-Title text-amber-800 mb-2">Método de Pago</h3>
            <p className="text-gray-700">Tarjeta de Crédito</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-xl">
            <h3 className="font-Title text-emerald-800 mb-2">Dirección de Envío</h3>
            <p className="text-gray-700">Calle Flores #123, Jardín</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-Title text-[#B9A387] mb-4">Productos</h3>
          <div className="space-y-4">
            {orderDetails.products.map((product) => (
              <div key={product.id} className="flex items-center border-b border-gray-100 pb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-16 h-16 object-cover rounded-lg mr-4"
                />
                <div className="flex-grow">
                  <p className="font-Title text-gray-800">{product.name}</p>
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
            <div className="flex font-Title justify-between">
              <p className="text-gray-600">Subtotal</p>
              <p className="text-gray-800">${orderDetails.subtotal.toFixed(2)}</p>
            </div>
            <div className="flex font-Title justify-between">
              <p className="text-gray-600">Envío</p>
              <p className="text-gray-800">${orderDetails.envio.toFixed(2)}</p>
            </div>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="flex justify-between">
              <p className="font-Title text-gray-800">Total</p>
              <p className="font-Title text-rose-900 text-lg">${orderDetails.total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <a 
            href="/Notifications" 
            className="px-6 py-3 bg-rose-100 text-rose-800 rounded-lg hover:bg-rose-200 transition-colors text-center font-Title"
          >
            Volver a Notificaciones
          </a>
          <button className="px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors font-Title">
            Contactar al Cliente
          </button>
        </div>
      </div>
    </div>
  );
}