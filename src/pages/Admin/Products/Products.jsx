import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SmartSpinner from "../../Both/SmartSpinner";
import { FaTrash, FaPlus, FaEdit, FaUndo } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


export default function Catalog2() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(url + "arrangements/");
      if (!response.ok) throw new Error("Error al obtener productos");
      const data = await response.json();
      setProducts(data.map(p => ({ ...p, arr_is_active: p.arr_availability })));
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "No se pudieron cargar los productos", "error");
    } finally { 
      setLoading(false);
    }
  };

  const toggleProductStatus = async (id, productName, isCurrentlyActive) => {
    const action = isCurrentlyActive ? "deshabilitar" : "habilitar";
    
    const result = await Swal.fire({
      title: `¿${isCurrentlyActive ? 'Deshabilitar' : 'Habilitar'} ${productName}?`,
      text: `El producto ${isCurrentlyActive ? 'no estará' : 'volverá a estar'} disponible para la venta`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Sí, ${action}`,
      cancelButtonText: "Cancelar"
    });

    if (result.isConfirmed) {
      try {
        const endpoint = isCurrentlyActive ? "disable" : "enable";
        const payload = localStorage.getItem("token");

        const response = await fetch(
          url + `arrangements/${endpoint}/${id}`, 
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${payload}`
            }
          }
        );

        if (!response.ok) throw new Error(`Error al ${action}`);

        Swal.fire(
          isCurrentlyActive ? "Deshabilitado" : "Habilitado", 
          `${productName} ha sido ${action}do`, 
          "success"
        );
        
        setProducts(products.map(p => 
          p.id === id ? { ...p, arr_is_active: !isCurrentlyActive } : p
        ));
      } catch (error) {
        console.error("Error:", error);
        Swal.fire("Error", `No se pudo ${action} el producto`, "error");
      }
    }
  };

  const calculateFinalPrice = (price, discount) => {
    return discount ? price * (1 - discount / 100) : price;
  };

  if (loading) return <SmartSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
      <Link to="/AdminDashboard" className="flex items-center text-[#B9A387] hover:text-[#9c8568] transition-colors">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="ml-1 font-Title">Volver</span>
            </Link>
        <h1 className="text-3xl font-bold text-gray-800">Catálogo de Productos</h1>
        <button
          onClick={() => navigate("/CreateProduct")}
          className="bg-[#EFB8C8] hover:bg-red-300 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
        >
          <FaPlus className="mr-2" /> Nuevo Producto
        </button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No hay productos disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 ${
                !product.arr_is_active ? "opacity-70" : ""
              }`}
            >
              <div className="relative">
                <img
                  src={product.arr_img_url || "/placeholder-product.jpg"}
                  alt={product.arr_name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder-product.jpg";
                  }}
                />
                {product.arr_discount > 0 && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{product.arr_discount}%
                  </span>
                )}
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {product.arr_name}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    product.arr_is_active 
                      ? "bg-green-200 text-green-800" 
                      : "bg-gray-200 text-gray-600"
                  }`}>
                    {product.arr_is_active ? "Activo" : "Inactivo"}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.arr_description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="font-bold text-gray-900">
                      ${calculateFinalPrice(product.arr_price, product.arr_discount).toFixed(2)}
                    </span>
                    {product.arr_discount > 0 && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${product.arr_price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    Stock: {product.arr_stock}
                  </span>
                </div>

                <div className="flex justify-between space-x-2">
                  <button

                  // {/* NO DUNCIONA AUNNNN */}
                    onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                    className="text-yellow-600 hover:text-yellow-800 p-2 rounded-full hover:bg-yellow-50 flex-1 flex items-center justify-center"
                  >
                    <FaEdit className="mr-1" /> Editar
                  </button>
                  <button
                    onClick={() => toggleProductStatus(product.id, product.arr_name, product.arr_is_active)}
                    className={`p-2 rounded-full flex-1 flex items-center justify-center ${
                      product.arr_is_active 
                        ? "text-red-600 hover:text-red-800 hover:bg-red-50" 
                        : "text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    }`}
                  >
                    {product.arr_is_active ? (
                      <FaTrash className="mr-1" />
                    ) : (
                      <FaUndo className="mr-1" />
                    )}
                    {product.arr_is_active ? "Deshab." : "Habilitar"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}