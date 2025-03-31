import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSave, FaTimes, FaUpload } from "react-icons/fa";
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

    // Validación básica
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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          {id ? "Editar Producto" : "Editar Producto"}
        </h1>
        <button
          onClick={() => navigate("/Catalog2")}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <FaTimes className="mr-1" /> Volver
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del producto *
            </label>
            <input
              type="text"
              name="arr_name"
              value={formData.arr_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-300 focus:border-red-300"
              required
            />
          </div>

          {/* Precio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio *
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
              <input
                type="number"
                name="arr_price"
                value={formData.arr_price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full pl-8 px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-300 focus:border-red-300"
                required
              />
            </div>
          </div>

          {/* Descuento */}
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
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-300 focus:border-red-300"
            />
          </div>

          {/* Stock */}
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
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-300 focus:border-red-300"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoría
            </label>
            <select
              name="arr_category"
              value={formData.arr_category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-300 focus:border-red-300"
            >
              <option value="">Seleccione una categoría</option>
              <option value="flores">Flores</option>
              <option value="ramos">Ramos</option>
              <option value="arreglos">Arreglos</option>
              <option value="plantas">Plantas</option>
              <option value="ocasiones">Ocasiones especiales</option>
            </select>
          </div>

          {/* Estado */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="arr_is_active"
              checked={formData.arr_is_active}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">
              Producto activo
            </label>
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción *
          </label>
          <textarea
            name="arr_description"
            value={formData.arr_description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-300 focus:border-red-300"
            required
          />
        </div>

        {/* Imagen */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Imagen del producto
          </label>
          
          {imagePreview || formData.arr_img_url ? (
            <div className="flex flex-col items-start">
              <img 
                src={imagePreview || formData.arr_img_url} 
                alt="Vista previa" 
                className="h-40 object-cover rounded-md border mb-2"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm text-gray-500"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaUpload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click para subir</span> o arrastra una imagen
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG o JPEG (MAX. 5MB)</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          )}
        </div>

        {/* Botón de guardar */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center items-center px-4 py-3 rounded-md text-white font-medium ${
              isSubmitting ? "bg-[#EFB8C8]" : "bg-[#EFB8C8] hover:bg-red-300"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {id ? "Actualizando..." : "Creando..."}
              </>
            ) : (
              <>
                <FaSave className="mr-2" /> {id ? "Guardar Cambios" : "Crear Producto"}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}