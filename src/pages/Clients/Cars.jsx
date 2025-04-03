import axios from "axios";
import { useState, useEffect } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ShoppingCart() {
  const url = import.meta.env.VITE_API_URL
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    HandleVerify();
  }, []);

  const HandleVerify = () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      HandleGetDetailsGuest();
    } else if (token) {
      HandleGetDetailsUser();
    } else {
      <div className="">  </div>
    }
  }

  const HandleGetDetailsUser = async () => {
    try {
      const response = await axios.get(url + "orders/cart/details/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCart(response.data);
    } catch (error) {
      console.error("Error al obtener detalles del carrito", error);
    }
  };

  const HandleGetDetailsGuest = () => {
    const data = JSON.parse(localStorage.getItem("guest_cart")) || [];
    setCart(data);
  };

  const updateQuantity = async (id, amount) => {
    setLoading((prev) => ({ ...prev, [id]: true }));
  
    const token = localStorage.getItem("token");
  
    if (!token) {
      const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
      const itemIndex = guestCart.findIndex((item) => item.id === id);
      
      if (itemIndex !== -1) {
        guestCart[itemIndex].details_quantity += amount;
  
        // Evitar cantidades negativas
        if (guestCart[itemIndex].details_quantity <= 0) {
          guestCart.splice(itemIndex, 1);
        }
  
        localStorage.setItem("guest_cart", JSON.stringify(guestCart));
  
        // ACTUALIZAR EL ESTADO DEL CARRITO
        setCart([...guestCart]);
      }
  
      setLoading((prev) => ({ ...prev, [id]: false }));
      return;
    }
  
    try {
      if (amount === 1) {
        await addItem(id);
      } else {
        await decreaseItem(id);
      }
  
      // RECARGAR EL CARRITO DESDE EL BACKEND
      await HandleGetDetailsUser();
    } catch (error) {
      console.error("Error al actualizar cantidad", error);
    } finally {
      setLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  async function addItem(id) {
    try {
      await axios.post(`${url}orders/cart/plus/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id
            ? { ...item, details_quantity: item.details_quantity + 1 }
            : item
        )
      );
    } catch (error) {
      console.error("Error agregando al carrito", error);
    }
  }

  async function decreaseItem(id) {
    try {
      await axios.post(`${url}orders/cart/minus/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id
            ? { ...item, details_quantity: item.details_quantity - 1 }
            : item
        )
      );
    } catch (error) {
      console.error("Error quitando del carrito", error);
    }
  }

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.final_price * item.details_quantity), 0);

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
                      <img src={item.arr_img_url} alt={item.arr_name} className="w-12 h-12 rounded-md mr-3" />
                      {item.arr_name}
                    </td>
                    <td className="p-2 text-center">${(item.details_price * item.details_quantity).toFixed(2)}</td>
                    <td className="p-2 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          id="remove-button"
                          className="p-1 bg-gray-200 rounded-md hover:bg-gray-300"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <FaMinus />
                        </button>
                        <span className="font-medium">{item.details_quantity}</span>
                        <button
                          id="add-button"
                          className="p-1 bg-gray-200 rounded-md hover:bg-gray-300"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </td>
                    <td className="p-2 text-center font-semibold">
                      ${(item.final_price * item.details_quantity).toFixed(2)}
                    </td>
                    <td className="p-2 text-center">
                      <button className="text-red-400 hover:text-red-600" onClick={() => removeItem(item.id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="mt-4 px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300" onClick={() => navigate("/catalog")}>
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
            <Link to="/CheckoutForm">
              <button className="w-full bg-[#EFB8C8] text-white px-4 py-3 rounded-lg hover:bg-pink-500 font-medium">
                Procesar Compra
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}