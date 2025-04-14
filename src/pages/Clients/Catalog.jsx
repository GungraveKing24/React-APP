import { useEffect, useState } from "react";
import SmartSpinner from "../Both/SmartSpinner";
import ProductCard from "./ProductCard";
import { FaLeaf } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import { useFetch } from "../../Axios/customHooks/useFetch";

export default function Catalog() {
  const {data, loading} = useFetch('/arrangements/')
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data) {
      const sortedProducts = [...data].sort((a, b) => 
        (b.arr_discount || 0) - (a.arr_discount || 0)
      );
      setProducts(sortedProducts);
    }
  }, [data]);

  function toastEvent(message, type) {
    const types = {
      success: toast.success,
      error: toast.error,
      info: toast.info,
      warning: toast.warning,
    };
  
    return types[type]?.(message);
  }

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
              <ProductCard key={product.id} product={product} toastEvent={toastEvent} />
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