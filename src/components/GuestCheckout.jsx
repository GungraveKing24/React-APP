import { useState } from "react";
import { useCart } from "./CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function GuestCheckout() {
  const { guestCart, clearGuestCart } = useCart();
  const [formData, setFormData] = useState({
    guest_name: "",
    guest_email: "",
    guest_phone: "",
    guest_address: "",
    pay_method: "credit_card"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL + "orders/guest/checkout";
      const orderData = {
        ...formData,
        arrangements: guestCart.map(item => ({
          arrangements_id: item.id,
          details_quantity: item.quantity
        }))
      };

      const response = await axios.post(API_URL, orderData);
      clearGuestCart();
      navigate(`/order-confirmation/${response.data.id}`);
    } catch (error) {
      console.error("Error al procesar orden:", error);
      setError("Error al procesar tu orden. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Finalizar Compra</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Campos del formulario */}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600"
        >
          {loading ? "Procesando..." : "Confirmar Orden"}
        </button>
      </form>
    </div>
  );
}