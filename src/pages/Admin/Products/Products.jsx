import { useEffect, useState } from "react";
import SmartSpinner from "../../Both/SmartSpinner";
import Swal from "sweetalert2";
import { useFetch } from "../../../Axios/customHooks/useFetch";
import ProductCard from "./ProductCard";
import { toast, Toaster } from "react-hot-toast";
import ModalProduct from "./ModalProduct";

export default function Catalog2() {
  const {data, loading} = useFetch('/arrangements/')
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if(data){
      try {
        setProducts(data)
        //setProducts(data.map(p => ({ ...p, arr_is_active: p.arr_is_active !== false })));
      } catch (error) {
        console.error("Error:", error);
        Swal.fire("Error", "No se pudieron cargar los productos", "error");
      }
    }
  }, [data]);

  if (loading) return <SmartSpinner />;

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
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-center"/>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Catálogo de Productos</h1>
        <ModalProduct product={false} toastEvent={toastEvent}/>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No hay productos disponibles</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} toastEvent={toastEvent} />
          ))}
        </div>
      )}
    </div>
  );
}