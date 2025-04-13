{/* Possible Deprecations */}
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

function Order_Details(){
  const {orderDetails, setOrder} = useState()
  const [user, setUser] = useState(null);
  
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

  async function fetchOrderDetails() {
    try {
      const response = await fetch(`https://fastapi-app-production-f08f.up.railway.app/orders/cart/details`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await response.json();
      setOrder(data);
    }
    catch (error) {
      console.error("Error al obtener los detalles de la orden:", error);
    }
  }

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-6xl w-full">
        <h2 className="text-center text-3xl font-bold text-[#EFB8C8] mb-6">Orden #{cart[0].id}</h2>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Tabla de productos */}
          <div className="flex-1 overflow-x-auto">
            <table className="w-full border-collapse shadow-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-[#EFB8C8] text-white text-sm">
                  <th className="p-3 text-left">Producto</th>
                  <th className="p-3 text-center">Precio</th>
                  <th className="p-3 text-center">Cantidad</th>
                  <th className="p-3 text-center">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {/* Iterar sobre los productos y mostrarlos en la tabla */}
                { orderDetails.lenght > 0 ? (
                  orderDetails.map((item) => (
                    <tr key={item.id} className="border-b text-gray-700 bg-white hover:bg-gray-100">
                      <td className="p-3 flex items-center">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-md mr-3" />
                        {item.name}
                      </td>
                      <td className="p-3 text-center">${item.price.toFixed(2)}</td>
                      <td className="p-3 text-center font-medium">{item.quantity}</td>
                      <td className="p-3 text-center font-semibold">${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-3 text-center">
                      No hay productos en el carrito.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Resumen del pedido */}
          <div className="md:w-80 bg-white shadow-md p-6 rounded-lg border h-fit">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Resumen del Pedido</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío:</span>
                <span className="font-semibold">Gratis</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-gray-800 font-bold">
                <span>Total:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
            <Link to="/profile">
              <button className="w-full bg-[#EFB8C8] text-white px-4 py-3 rounded-lg hover:bg-pink-500 font-medium">
                Regresar
              </button>
            </Link>
          </div>
        </div>

        {/* Información de Envío */}
        <div className="mt-10 bg-white p-6 shadow-md rounded-lg border">
          <h2 className="text-2xl font-bold text-[#EFB8C8] text-center mb-4">Información de Envío</h2>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <p className="text-lg font-semibold">📌 Nombre:</p>
              <p className="text-gray-600">Cliente</p>
            </div>
            <div>
              <p className="text-lg font-semibold">📦 Estado:</p>
              <p className="text-gray-600">Enviado</p>
            </div>
            <div>
              <p className="text-lg font-semibold">💳 Método de Pago:</p>
              <p className="text-gray-600">Contra Entrega</p>
            </div>
            <div>
              <p className="text-lg font-semibold">📞 Teléfono:</p>
              <p className="text-gray-600">(+503) Telefono</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-lg font-semibold">📍 Dirección:</p>
              <p className="text-gray-600">Lorem Ipsum</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Order_Details