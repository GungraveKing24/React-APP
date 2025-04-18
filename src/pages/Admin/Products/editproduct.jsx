import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSave, FaTimes, FaUpload, FaImage } from "react-icons/fa";
import Swal from "sweetalert2";
import SmartSpinner from "../../Both/SmartSpinner";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    arr_name: "",
    arr_description: "",
    arr_price: 0,
    arr_discount: 0,
    arr_img_url: "",
    arr_stock: 0,
    arr_category: "",
    arr_is_active: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // Cargar datos del producto si estamos editando
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`https://fastapi-app-production-f08f.up.railway.app/arrangements/${id}`);
          if (!response.ok) throw new Error("Error al cargar el producto");
          
          const data = await response.json();
          setFormData(data);
          if (data.arr_img_url) setImagePreview(data.arr_img_url);
        } catch (error) {
          console.error("Error:", error);
          Swal.fire("Error", "No se pudo cargar el producto", "error");
          navigate("/admin/products");
        }
      };
      
      fetchProduct();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? parseFloat(value) : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.arr_name || !formData.arr_description || formData.arr_price <= 0) {
      Swal.fire("Error", "Complete los campos requeridos", "error");
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("arr_name", formData.arr_name);
      formDataToSend.append("arr_description", formData.arr_description);
      formDataToSend.append("arr_price", formData.arr_price.toString());
      formDataToSend.append("arr_discount", formData.arr_discount.toString());
      formDataToSend.append("arr_stock", formData.arr_stock.toString());
      formDataToSend.append("arr_category", formData.arr_category);
      formDataToSend.append("arr_is_active", formData.arr_is_active.toString());

      if (imageFile) {
        formDataToSend.append("image", imageFile);
      } else if (formData.arr_img_url) {
        formDataToSend.append("arr_img_url", formData.arr_img_url);
      }

      const method = id ? "PUT" : "POST";
      const url = id 
        ? `https://fastapi-app-production-f08f.up.railway.app/arrangements/${id}`
        : "https://fastapi-app-production-f08f.up.railway.app/arrangements/";

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (!response.ok) throw new Error(id ? "Error al actualizar" : "Error al crear");

      const successMessage = id 
        ? "Producto actualizado correctamente" 
        : "Producto creado correctamente";

      await Swal.fire("¡Éxito!", successMessage, "success");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", id ? "No se pudo actualizar" : "No se pudo crear", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden border border-pink-100">
        <div className="bg-[#EFB8C8] p-6 text-center">
          <h1 className="text-2xl font-bold text-white">
            {id ? "Editar Producto" : "Crear Nuevo Producto"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Campo de imagen */}
          <div className="flex justify-center">
            <label className="relative group cursor-pointer">
              <div className="w-40 h-40 rounded-lg bg-pink-50 border-2 border-dashed border-[#EFB8C8] flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <FaImage className="mx-auto text-[#EFB8C8] text-3xl" />
                    <span className="text-xs text-pink-300 block mt-2">Subir imagen</span>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                className="hidden" 
              />
            </label>
          </div>

          {/* Resto del formulario... */}
          {/* ... (mantén el resto del formulario como está) ... */}

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
            >
              <FaTimes className="mr-2" />
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#EFB8C8] text-white rounded-lg hover:bg-pink-600 transition-colors disabled:bg-pink-400 flex items-center"
            >
              {isSubmitting ? (
                <SmartSpinner className="mr-2" />
              ) : (
                <FaSave className="mr-2" />
              )}
              {id ? "Guardar Cambios" : "Crear Producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}