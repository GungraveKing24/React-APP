import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaLeaf } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function ProductCard({ product }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const url = import.meta.env.VITE_API_URL + "orders/cart/add";
    const { updateCartCount } = useCart();
    const { user } = useAuth();

    // Calcular el precio final con descuento
    const finalPrice = product.arr_discount
        ? (product.arr_price * (1 - product.arr_discount / 100)).toFixed(2)
        : product.arr_price.toFixed(2);

    // Ahorro calculado
    const savings = (product.arr_price - finalPrice).toFixed(2);

    const handleAddToCart = () => {
        if (user) {
            handleAddToCartUser();
        } else {
            handleAddToCartGuest();
        }
    };

    const handleAddToCartGuest = () => {
        setLoading(true);
        
        const guestCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
    
        const existingItemIndex = guestCart.findIndex(item => item.id === product.id);
        
        if (existingItemIndex !== -1) {
            guestCart[existingItemIndex].details_quantity += 1;
        } else {
            guestCart.push({
                id: product.id,
                arrangements_id: product.id,
                details_quantity: 1, 
                details_price: parseFloat(finalPrice),
                final_price: parseFloat(finalPrice),
                arr_name: product.arr_name, 
                arr_img_url: product.arr_img_url
            });
        }
    
        localStorage.setItem("guest_cart", JSON.stringify(guestCart));
        updateCartCount();
        toast.success("Producto agregado al carrito");
        setLoading(false);
    };

    const handleAddToCartUser = async () => {
        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("No hay token de autenticación");

            const response = await axios.post(
                url,
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

            if ([200, 201].includes(response.status)) {
                toast.success("Producto agregado correctamente");
                updateCartCount();
            }
        } catch (error) {
            console.error("Error al agregar al carrito:", error);
            setError(handleCartError(error));
            
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCartError = (error) => {
        if (!error.response) return "Error de conexión";
        
        switch (error.response.status) {
            case 401: return "Sesión expirada";
            case 404: return "Producto no encontrado";
            default: return "Error al agregar al carrito";
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
