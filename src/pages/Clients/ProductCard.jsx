import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductCard({ product, onCartUpdate }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const API_URL = process.env.NODE_ENV === "development" 
        ? "http://localhost:8000/orders/cart/add" 
        : "https://your-production-api.com/orders/cart/add";

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
                API_URL,
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
        <div className="group relative block overflow-hidden border border-gray-200 rounded-lg shadow-md">
            <img
                src={product.arr_img_url}
                alt={product.arr_name}
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
            />
            <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">{product.arr_name}</h3>
                <p className="text-gray-700 mt-2 line-clamp-2">{product.arr_description}</p>
                <div className="mt-2">
                    {product.arr_discount ? (
                        <div className="flex items-center">
                            <span className="font-bold text-red-600">
                                ${(product.arr_price * (1 - product.arr_discount / 100)).toFixed(2)}
                            </span>
                            <span className="text-gray-400 line-through ml-2 text-sm">
                                ${product.arr_price.toFixed(2)}
                            </span>
                            <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                                -{product.arr_discount}%
                            </span>
                        </div>
                    ) : (
                        <span className="font-bold">${product.arr_price.toFixed(2)}</span>
                    )}
                </div>
                <button
                    className={`mt-4 w-full py-2 rounded-md transition-all ${
                        loading 
                            ? "bg-gray-300 cursor-not-allowed" 
                            : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                    onClick={handleAddToCart}
                    disabled={loading}
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Procesando...
                        </span>
                    ) : (
                        "Agregar al carrito"
                    )}
                </button>
                {error && (
                    <p className="mt-2 text-red-500 text-sm text-center">{error}</p>
                )}
            </div>
        </div>
    );
}

export default ProductCard;