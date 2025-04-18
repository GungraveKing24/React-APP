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
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, arr_img_url: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.arr_name || !formData.arr_description || formData.arr_price <= 0) {
      Swal.fire("Error", "Por favor complete todos los campos requeridos", "error");
      setIsSubmitting(false);
      return;
    }

    try {
      const method = id ? "PUT" : "POST";
      const url = id 
        ? `https://fastapi-app-production-f08f.up.railway.app/arrangements/${id}`
        : "https://fastapi-app-production-f08f.up.railway.app/arrangements/";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
          <p className="text-pink-100 mt-1">
            {id ? "Modifica los detalles del producto" : "Agrega un nuevo producto al catálogo"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
       
          <div className="flex justify-center">
            <label className="relative group cursor-pointer">
              <div className="w-40 h-40 rounded-lg bg-pink-50 border-2 border-dashed border-[#EFB8C8] flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <FaImage className="mx-auto text-[#EFB8C8] text-3xl" />
                    <span className="text-xs text-pink-300 block mt-2">Subir imagen del producto</span>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                className="hidden" 
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 rounded-lg flex items-center justify-center transition">
                <FaUpload className="text-white text-xl" />
              </div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del producto *
              </label>
              <input
                type="text"
                name="arr_name"
                value={formData.arr_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
                required
              />
            </div>

         
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Precio *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                <input
                  type="number"
                  name="arr_price"
                  value={formData.arr_price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
                  required
                />
              </div>
            </div>

        
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descuento (%)
              </label>
              <input
                type="number"
                name="arr_discount"
                value={formData.arr_discount}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
              />
            </div>

       
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock inicial
              </label>
              <input
                type="number"
                name="arr_stock"
                value={formData.arr_stock}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
              />
            </div>

      
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <select
                name="arr_category"
                value={formData.arr_category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
              >
                <option value="">Seleccione una categoría</option>
                <option value="flores">Flores</option>
                <option value="ramos">Ramos</option>
                <option value="arreglos">Arreglos</option>
                <option value="plantas">Plantas</option>
                <option value="ocasiones">Ocasiones especiales</option>
              </select>
            </div>

        
            <div className="flex items-center">
              <input
                type="checkbox"
                name="arr_is_active"
                checked={formData.arr_is_active}
                onChange={handleChange}
                className="h-4 w-4 text-[#EFB8C8] focus:ring-pink-200 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Producto activo
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción *
            </label>
            <textarea
              name="arr_description"
              value={formData.arr_description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
              required
            />
          </div>

     
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