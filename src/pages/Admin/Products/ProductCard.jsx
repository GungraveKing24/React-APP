import { FaTrash, FaUndo } from "react-icons/fa";
import Swal from "sweetalert2";
import ModalProduct from "./ModalProduct";

export default function ProductCard({product, toastEvent}){

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
            //const endpoint = isCurrentlyActive ? "disable" : "enable";
            // POSTING LOGIC
    
            Swal.fire(
              isCurrentlyActive ? "Deshabilitado" : "Habilitado", 
              `${productName} ha sido ${action}do`, 
              "success"
            );
            
            //setProducts(products.map(p => 
              //p.id === id ? { ...p, arr_is_active: !isCurrentlyActive } : p
            //));
          } catch (error) {
            console.error("Error:", error);
            Swal.fire("Error", `No se pudo ${action} el producto`, "error");
          }
        }
      };

      const calculateFinalPrice = (price, discount) => {
        return discount ? price * (1 - discount / 100) : price;
      };

      return <>
        <div
                     key={product.id}
                     //className={`bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 ${
                       //!product.arr_is_active ? "opacity-70" : ""
                     //}`}
                     className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105"
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
                         <ModalProduct key={product.id} product={product} toastEvent={toastEvent}/>
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
      </>
}