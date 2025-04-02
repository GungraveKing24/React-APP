import { useEffect, useState } from "react";
import SmartSpinner from "../Both/SmartSpinner";
import ProductCard from "./ProductCard";
import { FaLeaf, FaShoppingCart } from "react-icons/fa";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { 
    guestCart, 
    addToGuestCart,
    isAuthenticated,
    cartCount 
  } = useCart();

  useEffect(() => {
    setLoading(true);
    const url = import.meta.env.VITE_API_URL + "arrangements/"; 
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Error en la respuesta");
        return response.json();
      })
      .then((data) => {
        // Ordenar productos con descuento primero
        const sortedProducts = [...data].sort((a, b) => 
          (b.arr_discount || 0) - (a.arr_discount || 0)
        );
        setProducts(sortedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    if (isAuthenticated) {
      // Para usuarios autenticados, se manejará en ProductCard
      return;
    }
    
    // Para invitados
    addToGuestCart({
      id: product.id,
      name: product.arr_name,
      price: product.arr_discount 
        ? product.arr_price * (1 - product.arr_discount / 100)
        : product.arr_price,
      originalPrice: product.arr_price,
      discount: product.arr_discount,
      image: product.arr_img_url,
      quantity: 1
    });
    setCartCount(prev => prev + 1);
  };

  const totalGuestItems = guestCart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-Title text-gray-900 sm:text-4xl">
            Nuestro Catálogo de Flores
          </h1>
          <p className="mt-3 max-w-2xl mx-auto font-Title text-gray-500 sm:mt-4">
            Descubre nuestros hermosos arreglos florales artesanales
          </p>
        </div>

        {/* Icono del carrito flotante */}
        {(totalGuestItems > 0 || isAuthenticated) && (
          <Link to="/cart" className="fixed top-4 right-4 bg-pink-500 text-white rounded-full p-3 shadow-lg z-50 hover:bg-pink-600 transition">
            <FaShoppingCart className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full h-6 w-6 flex items-center justify-center">
              {isAuthenticated ? cartCount : totalGuestItems}
            </span>
          </Link>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <SmartSpinner size="lg" />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                onAddToCart={() => handleAddToCart(product)}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 mb-4">
              <FaLeaf className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No hay productos disponibles
            </h3>
            <p className="text-gray-500">
              Pronto tendremos nuevos arreglos florales
            </p>
          </div>
        )}
      </div>
    </div>
  );
}