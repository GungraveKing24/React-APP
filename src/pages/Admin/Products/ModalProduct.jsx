import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { axiosInstance } from '../../../Axios/Axios';
import { FaPlus, FaEdit } from "react-icons/fa";

// Para accesibilidad (una vez en tu app)
Modal.setAppElement('#root');

function ModalProduct({product, toastEvent}) {
  const info = {
    id: product ? product.id : '',
    arr_name: product ? product.arr_name : '',
    arr_description: product ? product.arr_description : '',
    arr_price: product ? product.arr_price : '',
    arr_id_cat: product ? product.arr_id_cat : '',
    arr_stock: product ? product.arr_stock : '',
    arr_discount: product ? product.arr_discount : '',
    arr_image_url: '',
  }
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState(info);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async () => {
        const res = await axiosInstance.get("/categories")
        setCategories(res.data)
    }
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if(product){
        EditProduct()
      } else{
        AddProduct()
      }
    } catch (error) {
      toastEvent("Ocurrio un error", "error")
    }
  };

  async function AddProduct() {
    // Aquí podrías hacer un POST con FormData si incluyes la imagen
    //const dataToSend = new FormData();
    //for (let key in formData) {
      //if (formData[key]) dataToSend.append(key, formData[key]);
    //}

    // fetch('/api/products', {
    //   method: 'POST',
    //   body: dataToSend
    // })

    closeModal();
    toastEvent("Creacion exitosa", "success")
    console.log("Creacion", formData)
  }
  async function EditProduct() {
      closeModal();
      toastEvent("Edicion exitosa", "success")
    console.log("Editado", formData)
  }

  return (
    <div>
      <button
        onClick={openModal}
        className={product ? 
            "text-yellow-600 hover:text-yellow-800 p-2 rounded-full hover:bg-yellow-50 flex-1 flex items-center justify-center" 
            : "bg-[#EFB8C8] hover:bg-red-300 text-white px-6 py-2 rounded-lg transition-colors flex items-center"}
      >
        {product ? <FaEdit className="mr-1" /> : <FaPlus className="mr-2" />} {product ? "Editar" : "Nuevo Producto"}
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Formulario de Producto"
        className="max-w-xl mx-auto mt-20 bg-white rounded-lg shadow-xl p-6 focus:outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">{product ? `Editando: ${product.arr_name}` : "Nuevo Producto"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              name="arr_name"
              value={formData.arr_name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Descripción</label>
            <textarea
              name="arr_description"
              value={formData.arr_description}
              onChange={handleChange}
              rows="3"
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium">Precio</label>
              <input
                type="number"
                name="arr_price"
                value={formData.arr_price}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                step="0.01"
                required
              />
              
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium">Stock</label>
              <input
                type="number"
                name="arr_stock"
                value={formData.arr_stock}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Categoría</label>
            <select
              name="arr_id_cat"
              value={formData.arr_id_cat}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name_cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Descuento (opcional)</label>
            <input
              type="number"
              name="arr_discount"
              value={formData.arr_discount}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Imagen</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
              
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Guardar
            </button>
          </div>

        </form>
      </Modal>
    </div>
  );
}

export default ModalProduct;
