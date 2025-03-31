import { useEffect, useState } from "react";
import SmartSpinner from "../Both/SmartSpinner";
import { FaShoppingCart, FaLeaf } from "react-icons/fa";

function ProductCard({ product }) {
  const finalPrice = product.arr_discount
    ? (product.arr_price * (1 - product.arr_discount / 100)).toFixed(2)
    : product.arr_price.toFixed(2);

  const savings = (product.arr_price - finalPrice).toFixed(2);

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
          <span className="text-xs text-gray-400">
            Disponible
          </span>
          <button 
            className="text-white bg-gradient-to-r from-red-400 to-red-300 hover:from-red-200 hover:to-[#EFB8C8] p-2 rounded-full shadow-sm transition-all duration-300 transform hover:scale-110"
            aria-label="Añadir al carrito"
          >
            <FaShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://fastapi-app-production-f08f.up.railway.app/arrangements/")
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

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <SmartSpinner size="lg" />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
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