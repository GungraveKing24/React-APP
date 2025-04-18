import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import SmartSpinner from "../../Both/SmartSpinner";
import ModalCategories from "./ModalCategories";
import CategoryCard from "./CategoryCard";
import { useFetch } from "../../../Axios/customHooks/useFetch";

function Categories() {
  const [categories, setCategories] = useState([])
  const {data, loading} = useFetch('/categories');

  useEffect(() => {
    if(data){
      setCategories(data)
    }
  }, [data])

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
    <>
      <Toaster position="top-center"/>
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl font-bold">Categorías</h2>
        <ModalCategories category={false} toastEvent={toastEvent}/>
      </div>
      {loading ? (
        <SmartSpinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} toastEvent={toastEvent} />
          ))}
        </div>
      )}
    </>
  );
}

export default Categories;