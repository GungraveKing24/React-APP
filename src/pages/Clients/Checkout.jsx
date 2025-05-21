import { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { axiosInstance } from "../../Axios/Axios";
import { useCart } from "../../context/CarContext"
import { Link, useNavigate } from "react-router-dom";

export default function CheckoutForm() { 
  const token = localStorage.getItem("token");
  const { updateCartCount } = useCart();
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    direccion: "",
    telefono: "",
    notas: "",
    metodoPago: "Efectivo", // Valor por defecto
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    HandleVerify();
    HandleUserData();
  }, []);

  const HandleVerify = () => {
    if (!token) {
      HandleGetDetailsGuest();
    } else {
      HandleGetDetailsUser();
    }
  };

  const HandleUserData = () => {
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
      }
    }
  };

  const HandleGetDetailsUser = async () => {
    try {
      const response = await axiosInstance.get("orders/cart/details/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCart(response.data);
    } catch (error) {
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
      [name]: type === "radio" ? value : (type === "checkbox" ? checked : value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validaciones básicas
    if (!form.nombre || !form.email || !form.direccion || !form.telefono) {
      toast.error("Por favor, completa todos los campos requeridos.");
      setIsSubmitting(false);
      return;
    }

    if (cart.length <= 0) {
      toast.error("No hay productos en el carrito");
      setIsSubmitting(false);
      return;
    }

    try {
      const orderData = {
        guest_name: form.nombre,
        guest_email: form.email,
        guest_phone: form.telefono,
        guest_address: form.direccion,
        arrangements: cart.map(item => ({
          arrangements_id: item.id || item.arrangements_id,
          details_quantity: item.details_quantity,
          details_price: item.details_price
        })),
        pay_method: form.metodoPago,
        notes: form.notas
      };

      const token = localStorage.getItem("token");

      if (form.metodoPago === "Tarjeta") {
        // Pago con tarjeta - crear enlace Wompi
        const response = await axiosInstance.post(
          "orders/payments/create/", 
          orderData, 
          { headers: {
            Authorization: `Bearer ${token}`
          }}
        );

        if (response.data.payment_url) {
          // Guardar datos temporales en localStorage
          const pendingOrder = {
            reference: response.data.reference,
            amount: response.data.amount,
            cart: cart,
            formData: form
          };
          localStorage.setItem("pendingOrder", JSON.stringify(pendingOrder));
          
          // Redirigir a Wompi para completar el pago
          window.location.href = response.data.payment_url;
        } else {
          toast.error("No se pudo generar el enlace de pago");
        }
      } else {
        // Pago contra entrega
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const endpoint = token ? "orders/cart/complete/" : "orders/guest/checkout";
        await axiosInstance.post(endpoint, orderData, { headers });
        
        toast.success("Pedido procesado con éxito");
        localStorage.removeItem("guest_cart");
        setCart([]);
        updateCartCount();
        
        // Resetear formulario
        setForm({
          nombre: "",
          email: "",
          direccion: "",
          telefono: "",
          notas: "",
          metodoPago: "Efectivo",
        });

        setTimeout(() => {
          if(token){
            navigate("/profile")
          } else{
            navigate("/")
          }
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || "Error al procesar el pedido");
    } finally {
      setIsSubmitting(false);
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.details_price * item.details_quantity), 0);

  return (
    <div className="max-w-5xl mx-auto p-10 bg-white shadow-lg my-4 rounded-2xl border border-gray-200 flex gap-10">
      <Toaster />
      
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">Información</h2>
          <Link to="/ShoppingCart" className="flex items-center text-[#B9A387] hover:text-[#9c8568] transition-colors">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="ml-1 font-Title">Volver</span>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            className="input border border-gray-300 p-3 rounded-lg"
            onChange={handleChange}
            value={form.nombre}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className="input border border-gray-300 p-3 rounded-lg"
            onChange={handleChange}
            value={form.email}
            required
          />
          <input
            type="text"
            name="direccion"
            placeholder="Dirección completa"
            className="input border border-gray-300 p-3 rounded-lg"
            onChange={handleChange}
            value={form.direccion}
            required
          />
          <input
            type="text"
            name="telefono"
            placeholder="Número de teléfono"
            className="input border border-gray-300 p-3 rounded-lg"
            onChange={handleChange}
            value={form.telefono}
            required
          />
          <textarea
            name="notas"
            placeholder="Notas adicionales (opcional)"
            className="input border border-gray-300 p-3 rounded-lg h-24"
            onChange={handleChange}
            value={form.notas}
          ></textarea>
          
          <button
            type="submit"
            className="bg-[#EFB8C8] py-3 rounded-xl text-white font-semibold text-lg shadow-md hover:bg-pink-500 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Procesando..." : 
              form.metodoPago === "Tarjeta" ? "Pagar con Tarjeta" : "Finalizar Pedido"}
          </button>
        </form>
      </div>

      <div className="p-6 border rounded-2xl bg-gray-50 shadow-lg w-96">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Resumen del Pedido</h2>
        <div className="space-y-2">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="text-gray-600">
                  {item.arr_name} x{item.details_quantity}
                </span>
                <span className="font-semibold">
                  ${(item.details_price * item.details_quantity).toFixed(2)}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay productos en el carrito.</p>
          )}
        </div>
        
        <div className="border-t border-gray-200 mt-4 pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-700 mb-4">Métodos de Pago</h3>
          
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-100 cursor-pointer">
              <input
                type="radio"
                name="metodoPago"
                value="Efectivo"
                checked={form.metodoPago === "Efectivo"}
                onChange={handleChange}
                className="h-5 w-5 text-pink-600"
              />
              <div>
                <span className="font-medium">Contra Entrega</span>
                <p className="text-sm text-gray-500">Paga cuando recibas tu pedido</p>
              </div>
            </label>
            
            {token &&
              <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-100 cursor-pointer">
                <input
                  type="radio"
                  name="metodoPago"
                  value="Tarjeta"
                  checked={form.metodoPago === "Tarjeta"}
                  onChange={handleChange}
                  className="h-5 w-5 text-pink-600"
                />
                <div>
                  <span className="font-medium">Tarjeta de Crédito/Débito</span>
                  <p className="text-sm text-gray-500">Pago seguro con Wompi</p>
                </div>
              </label>
            }
          </div>

          {form.metodoPago === "Tarjeta" && (
            <div className="mt-4 p-4 bg-pink-50 rounded-lg">
              <p className="text-pink-700 text-sm">
                Serás redirigido a Wompi para completar el pago de forma segura.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
