import { useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

export default function ShoppingCart() {
  const [cart, setCart] = useState([
    { id: 1, name: "Flor Amarilla", price: 14.0, quantity: 1, image: "https://via.placeholder.com/80" },
    { id: 2, name: "Flor Rosada", price: 18.0, quantity: 2, image: "https://via.placeholder.com/80" },
  ]);

  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <section className="flex justify-center items-center min-h-screen bg-white p-6">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-6xl w-full">
        <h2 className="text-center text-2xl font-semibold text-[#EFB8C8] mb-4">Mi Carrito de Compras</h2>
        <div className="flex flex-col md:flex-row gap-6">
          
          <div className="flex-1 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-gray-500 text-sm border-b">
                  <th className="p-2 text-left">Producto</th>
                  <th className="p-2">Precio</th>
                  <th className="p-2">Cantidad</th>
                  <th className="p-2">Subtotal</th>
                  <th className="p-2">Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b text-gray-700">
                    <td className="p-2 flex items-center">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-md mr-3" />
                      {item.name}
                    </td>
                    <td className="p-2 text-center">${item.price.toFixed(2)}</td>
                    <td className="p-2 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="p-1 bg-gray-200 rounded-md hover:bg-gray-300"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <FaMinus />
                        </button>
                        <span className="font-medium">{item.quantity}</span>
                        <button
                          className="p-1 bg-gray-200 rounded-md hover:bg-gray-300"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </td>
                    <td className="p-2 text-center font-semibold">${(item.price * item.quantity).toFixed(2)}</td>
                    <td className="p-2 text-center">
                      <button className="text-red-400 hover:text-red-600" onClick={() => removeItem(item.id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="mt-4 px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
              Regresar
            </button>
          </div>

          <div className="md:w-80 bg-white shadow-md p-4 rounded-lg border h-fit">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Resumen del Pedido</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Envío:</span>
                <span className="font-semibold">Gratis</span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span className="text-gray-800 font-bold">Total:</span>
                <span className="text-gray-800 font-bold">${subtotal.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-[#EFB8C8] text-white px-4 py-3 rounded-lg hover:bg-pink-500 font-medium">
              Procesar Compra
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}



