import Swal from "sweetalert2";
import ModalCategories from "./ModalCategories";

export default function CategoryCard({ category, toastEvent }) {
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

  return (
    <div className="group relative block overflow-hidden border border-gray-200 rounded-lg shadow-md">
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{category.name_cat}</h3>

        <div className="flex space-x-4 mt-4">
          <ModalCategories category={category} toastEvent={toastEvent}/>
          <div className="p-4">
            <button
             onClick={() => toggleProductStatus(1, category.name_cat, true)}
             className="rounded-md bg-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-pink-400"
            >
               Deshabilitar
           </button>
          </div>
        </div>
      </div>
    </div>
  );
}