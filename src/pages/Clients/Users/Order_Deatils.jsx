import { useState } from "react"
import { Link, useParams } from "react-router-dom"

function Order_Details(){
    const { id } = useParams()
    const {order, setOrder} = useState()

    const [cart, setCart] = useState([
        { id: 1, name: "Flor Amarilla", price: 14.0, quantity: 1, image: "https://via.placeholder.com/80" },
        { id: 2, name: "Flor Rosada", price: 18.0, quantity: 2, image: "https://via.placeholder.com/80" },
      ]);
    
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
                    {cart.map((item) => (
                      <tr key={item.id} className="border-b text-gray-700 bg-white hover:bg-gray-100">
                        <td className="p-3 flex items-center">
                          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-md mr-3" />
                          {item.name}
                        </td>
                        <td className="p-3 text-center">${item.price.toFixed(2)}</td>
                        <td className="p-3 text-center font-medium">{item.quantity}</td>
                        <td className="p-3 text-center font-semibold">${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
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