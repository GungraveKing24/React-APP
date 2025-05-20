import { useEffect, useState } from "react";
import SmartSpinner from "../Both/SmartSpinner";
import ProductCard from "./ProductCard";
import { FaLeaf } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import { useFetch } from "../../Axios/customHooks/useFetch";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Para la busqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const {data} = useFetch('/categories');
  useEffect(() => {
    if (data) setCategories(data);
  }, [data]);

  useEffect(() => {
    setLoading(true);
    const url = import.meta.env.VITE_API_URL + "arrangements/";
  
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Error en la respuesta");
        return response.json();
      })
      .then((data) => {
        // Filtrar por nombre y categoría
        let filteredProducts = data.filter((product) => {
          const matchesName = product.arr_name.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesCategory = selectedCategory
          ? product.categories.some(cat => cat.id === parseInt(selectedCategory))
          : true;
          return matchesName && matchesCategory;
        });
  
        // Ordenar: primero los que tienen descuento
        filteredProducts.sort((a, b) => {
          const aHasDiscount = a.arr_discount > 0;
          const bHasDiscount = b.arr_discount > 0;
  
          if (aHasDiscount && !bHasDiscount) return -1;
          if (!aHasDiscount && bHasDiscount) return 1;
          return 0; // mantener el orden original si ambos tienen/no tienen descuento
        });
  
        setProducts(filteredProducts);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [searchTerm, selectedCategory]);

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

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <input
            type="text"
            placeholder="Buscar por nombre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-red-300"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-red-300"
          >
            <option value="">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name_cat}
              </option>
            ))}
          </select>
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