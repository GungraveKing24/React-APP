import { useState, useEffect } from "react";
import { MdOutlineLogoDev } from "react-icons/md";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export default function CheckoutForm() {
  const url = import.meta.env.VITE_API_URL;
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    departamento: "",
    direccion: "",
    telefono: "",
    notas: "",
    metodoPago: "Contra Entrega",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar el envío

  useEffect(() => {
    HandleVerify();
    HandleUserData();
  }, []);

  const HandleVerify = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      HandleGetDetailsGuest();
    } else {
      HandleGetDetailsUser();
    }
  };

  const HandleUserData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setForm((prev) => ({
          ...prev,
          nombre: payload.user_name || "",
          email: payload.email || "",
          telefono: payload.user_number || "",
          direccion: payload.user_direction || "",
        }));
      } catch (error) {
        console.error("Error al leer el token:", error);
      }
    }
  };

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Evitar el envío múltiple de pedidos
    if (isSubmitting) return;

    setIsSubmitting(true); // Deshabilitar el envío hasta que se procese el pedido

    // Datos del usuario
    const orderData = {
      guest_name: form.nombre,
      guest_email: form.email,
      guest_phone: form.telefono,
      guest_address: form.direccion,
      arrangements: cart.map(item => ({
        arrangements_id: item.id,
        details_quantity: item.details_quantity,
      })),
      pay_method: form.metodoPago,
    };

    try {
      const token = localStorage.getItem("token");
      if (token) {
        // Si el usuario está logueado, enviar el pedido al backend
        const response = await axios.post(url + "orders/cart/complete/", {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Pedido procesado con éxito");
        console.log(response.data);
      } else {
        // Si es un invitado, envía los detalles del pedido al endpoint de invitado
        const response = await axios.post(url + "orders/guest/checkout", orderData);
        toast.success("Pedido procesado con éxito como invitado");
        console.log(response.data);
      }

      // Limpiar datos del localStorage
      localStorage.removeItem("guest_cart");
      localStorage.removeItem("token");  // Eliminar el token si es un invitado o un usuario logueado

      // Resetear el carrito y el formulario
      setCart([]);
      setForm({
        nombre: "",
        email: "",
        departamento: "",
        direccion: "",
        telefono: "",
        notas: "",
        metodoPago: "Contra Entrega",
      });

    } catch (error) {
      console.error("Error al enviar el pedido:", error);
      toast.error("Hubo un problema al procesar tu pedido");
    } finally {
      setIsSubmitting(false); // Volver a habilitar el botón
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.details_price * item.details_quantity, 0);

  return (
    <div className="max-w-5xl mx-auto p-10 bg-white shadow-lg rounded-2xl border border-gray-200 flex gap-10">
      <Toaster /> {/* Asegúrate de que Toaster esté presente aquí */}
      
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Información</h2>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            className="input border border-gray-300 p-3 rounded-lg"
            onChange={handleChange}
            value={form.nombre}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input border border-gray-300 p-3 rounded-lg"
            onChange={handleChange}
            value={form.email}
            required
          />
          <select
            name="departamento"
            className="input border border-gray-300 p-3 rounded-lg"
            onChange={handleChange}
            value={form.departamento}
            required
          >
            <option value="">Seleccione Departamento</option>
            <option value="San Salvador">San Salvador</option>
            <option value="La Libertad">La Libertad</option>
          </select>
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            className="input border border-gray-300 p-3 rounded-lg"
            onChange={handleChange}
            value={form.direccion}
            required
          />
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            className="input border border-gray-300 p-3 rounded-lg"
            onChange={handleChange}
            value={form.telefono}
            required
          />
          <textarea
            name="notas"
            placeholder="Notas (Opcional)"
            className="input border border-gray-300 p-3 rounded-lg h-24"
            onChange={handleChange}
            value={form.notas}
          ></textarea>
          <button
            type="submit"
            className="bg-[#EFB8C8] py-3 rounded-xl text-white font-semibold text-lg shadow-md hover:bg-pink-500 transition"
            disabled={isSubmitting} // Deshabilitar el botón mientras se procesa el pedido
          >
            {isSubmitting ? "Procesando..." : "Ordenar"}
          </button>
        </form>
      </div>

      <div className="p-6 border rounded-2xl bg-gray-50 shadow-lg w-96">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Pedido</h2>
        <div className="space-y-2">
          {cart.length > 0 ? (
            cart.map((item) => (
              <p key={item.id} className="text-gray-600">
                {item.arr_name} x{item.details_quantity} -{" "}
                <span className="font-semibold">${(item.details_price * item.details_quantity).toFixed(2)}</span>
              </p>
            ))
          ) : (
            <p className="text-gray-500">No hay productos en el carrito.</p>
          )}
        </div>
        <p className="text-lg font-bold mt-4">Total: ${subtotal.toFixed(2)}</p>
        <h2 className="mt-6 text-lg font-bold text-gray-700">Métodos de Pago</h2>
        <label className="flex items-center space-x-2 mt-2">
          <input
            type="radio"
            name="metodoPago"
            value="Contra Entrega"
            checked={form.metodoPago === "Contra Entrega"}
            onChange={handleChange}
          />
          <span className="text-gray-700">Contra Entrega</span>
        </label>
        <label className="flex items-center space-x-2 mt-2">
          <input type="radio" name="metodoPago" value="Tarjeta" onChange={handleChange} />
          <span className="text-gray-700">Tarjeta</span>
        </label>
      </div>
    </div>
  );
}
