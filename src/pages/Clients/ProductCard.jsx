import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaLeaf } from "react-icons/fa";

export default function ProductCard({ product, onCartUpdate }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const finalPrice = product.arr_discount
      ? (product.arr_price * (1 - product.arr_discount / 100)).toFixed(2)
      : product.arr_price.toFixed(2);
  
    const savings = (product.arr_price - finalPrice).toFixed(2);
  
    const handleAddToCart = async () => {
      setLoading(true);
      setError("");
  
      const token = localStorage.getItem("token");
      if (!token) {
          setError("Debes iniciar sesión para agregar productos.");
          setLoading(false);
          navigate("/login");
          return;
      }
  
      try {
          // Verificar y normalizar token
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (typeof payload.sub !== 'string') {
              throw new Error("Formato de token inválido");
          }
  
          // Calcular precio con descuento
          const finalPrice = product.arr_discount 
              ? product.arr_price * (1 - product.arr_discount / 100)
              : product.arr_price;
  
          await axios.post(
              "https://your-production-api.com/orders/cart/add",
              {
                  arrangements_id: product.id,
                  details_quantity: 1,
                  details_price: finalPrice,
              },
              {
                  headers: { 
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                  },
              }
          );
  
          // Notificar éxito
          if (onCartUpdate) onCartUpdate();
          
      } catch (error) {
          console.error("Error al agregar al carrito:", error);
          
          if (error.response) {
              switch (error.response.status) {
                  case 401:
                      setError("Sesión expirada. Por favor, inicia sesión nuevamente.");
                      localStorage.removeItem("token");
                      navigate("/login");
                      break;
                  case 404:
                      setError("Producto no encontrado.");
                      break;
                  default:
                      setError("Error al agregar al carrito. Por favor, inténtalo de nuevo.");
              }
          } else {
              setError("Error de conexión. Verifica tu conexión a internet.");
          }
      } finally {
          setLoading(false);
      }
    };
  
    return (
      <div className="group relative bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100">
        {product.arr_discount > 0 && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full z-10 shadow-md">
            {product.arr_discount}% OFF
          </div>
        )}
  
        <div className="relative h-56 w-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          {product.arr_img_url ? (
            <img
              src={product.arr_img_url}
              alt={product.arr_name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
              <FaLeaf className="text-5xl mb-2 opacity-40" />
              <span className="text-sm">Imagen no disponible</span>
            </div>
          )}
        </div>
  
        <div className="p-5">
      
          <h3 className="text-xl font-Title text-gray-800 mt-1 mb-2 line-clamp-1">
            {product.arr_name}
          </h3>     
          <p className="text-gray-500 font-Title text-sm mb-4 line-clamp-2 min-h-[40px]">
            {product.arr_description || "Hermoso arreglo floral artesanal"}
          </p>
  
          <div className="mt-4 space-y-1">
            {product.arr_discount > 0 ? (
              <>
                <div className="flex items-end">
                  <span className="text-xl font-Title text-red-600">
                    ${finalPrice}
                  </span>
                  <span className="ml-2 text-sm text-gray-400 line-through mb-0.5">
                    ${product.arr_price.toFixed(2)}
                  </span>
                </div>
                <span className="inline-block text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  Ahorras ${savings}
                </span>
              </>
            ) : (
              <span className="text-xl font-Title text-gray-900">
                ${finalPrice}
              </span>
            )}
          </div>
  
          <div className="mt-5 flex justify-between items-center">
            <span className="text-xs text-gray-400">Disponible</span>
            <button
              className={`p-2 rounded-full shadow-sm transition-all duration-300 transform hover:scale-110 ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "text-white bg-gradient-to-r from-red-400 to-red-300 hover:from-red-200 hover:to-[#EFB8C8]"
              }`}
              aria-label="Añadir al carrito"
              onClick={handleAddToCart}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center animate-spin text-sm">
                  🌸
                </span>
              ) : (
                <FaShoppingCart className="w-4 h-4" />
              )}
            </button>
          </div>
            {error && (
              <p className="mt-2 text-red-500 text-sm text-center">{error}</p>
            )}
        </div>
      </div>
    );
}