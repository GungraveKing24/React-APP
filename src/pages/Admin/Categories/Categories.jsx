import { useEffect, useState } from "react";
import { useFetch } from "../../../Axios/customHooks/useFetch";
import { toast, Toaster } from "react-hot-toast";
import SmartSpinner from "../../Both/SmartSpinner";
import ModalCategories from "./ModalCategories";
import CategoryCard from "./CategoryCard";
import { Link } from "react-router-dom";


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
      <Link to="/AdminDashboard" className="flex items-center text-[#B9A387] hover:text-[#9c8568] transition-colors">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="ml-1 font-Title">Volver</span>
            </Link>
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