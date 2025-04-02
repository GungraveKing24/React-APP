import { useEffect, useState } from "react";
import SmartSpinner from "../Both/SmartSpinner";
import ProductCard from "./ProductCard";
import { FaLeaf } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleCartUpdate = () => {
    setCartCount((prevCount) => prevCount + 1); // Incrementar contador del carrito
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center"/>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-Title text-gray-900 sm:text-4xl">
            Nuestro Catálogo de Flores
          </h1>
          <p className="mt-3 max-w-2xl mx-auto font-Title text-gray-500 sm:mt-4">
            Descubre nuestros hermosos arreglos florales artesanales
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <SmartSpinner size="lg" />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onCartUpdate={handleCartUpdate} />
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