import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSave, FaTimes, FaUpload } from "react-icons/fa";
import Swal from "sweetalert2";
import SmartSpinner from "../../Both/SmartSpinner";
import { axiosInstance } from "../../../Axios/Axios";

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
    arr_id_cat: 0,
    arr_is_active: true,
    image: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesRes = await axiosInstance.get("/categories");
        setCategories(categoriesRes.data);

        // Fetch product data if editing
        if (id) {
          const productRes = await axiosInstance.get(`/arrangements/${id}`);
          const productData = productRes.data;
          
          setFormData({
            arr_name: productData.arr_name,
            arr_description: productData.arr_description,
            arr_price: productData.arr_price,
            arr_discount: productData.arr_discount || 0,
            arr_img_url: productData.arr_img_url,
            arr_stock: productData.arr_stock,
            arr_id_cat: productData.arr_id_cat,
            arr_is_active: productData.arr_availability,
            image: null // Initialize as null - will only change if new image uploaded
          });
        }
      } catch (error) {
        console.error("Error loading data:", error);
        Swal.fire("Error", "No se pudieron cargar los datos", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? parseFloat(value) : value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    setFormData(prev => ({
      ...prev,
      image: file,
      arr_img_url: URL.createObjectURL(file) // preview
    }));
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      arr_img_url: ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation (same as CreateProduct)
    if (
      !formData.arr_name ||
      !formData.arr_description ||
      formData.arr_price <= 0 ||
      formData.arr_stock <= 0 ||
      !formData.arr_id_cat
    ) {
      Swal.fire("Error", "Por favor complete todos los campos requeridos", "error");
      setIsSubmitting(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "No estás autenticado", "error");
      setIsSubmitting(false);
      return;
    }

    const form = new FormData();
    form.append("arr_name", formData.arr_name);
    form.append("arr_description", formData.arr_description);
    form.append("arr_price", formData.arr_price.toString());
    form.append("arr_discount", formData.arr_discount.toString());
    form.append("arr_stock", formData.arr_stock.toString());
    form.append("arr_id_cat", formData.arr_id_cat.toString());
    form.append("arr_is_active", formData.arr_is_active.toString());
    
    // Only append image if a new one was selected
    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      const response = await axiosInstance.patch(`/arrangements/edit/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      Swal.fire("Éxito", response.data.message || "Producto actualizado correctamente", "success");
      navigate("/admin/products");
    } catch (error) {
      Swal.fire("Error", error.response?.data?.detail || "Error al actualizar", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <SmartSpinner />;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Editar Producto</h1>
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
              Categoría *
            </label>
            <select
              name="arr_id_cat"
              value={formData.arr_id_cat}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-300 focus:border-red-300"
              required
            >
              <option value="">Seleccione una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name_cat}
                </option>
              ))}
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
          
          {formData.arr_img_url ? (
            <div className="flex flex-col items-start">
              <img 
                src={formData.arr_img_url} 
                alt="Vista previa" 
                className="h-40 object-cover rounded-md border mb-2"
              />
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => document.getElementById('image-upload').click()}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Cambiar imagen
                </button>
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Eliminar imagen
                </button>
              </div>
              <input 
                id="image-upload"
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload}
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
                  onChange={handleImageUpload}
                  disabled={isSubmitting}
                />
              </label>
            </div>
          )}
          <p className="mt-1 text-xs text-gray-500">
            {formData.image ? "Nueva imagen seleccionada" : "Imagen actual se mantendrá si no se selecciona una nueva"}
          </p>
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
                Guardando...
              </>
            ) : (
              <>
                <FaSave className="mr-2" /> Guardar Cambios
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}