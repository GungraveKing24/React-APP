import React, { useState } from 'react';
import Modal from 'react-modal';
import { usePost } from '../../../Axios/customHooks/usePost';

// Necesario para accesibilidad (sólo una vez, en tu app principal o layout)
Modal.setAppElement('#root');

function ModalCategories({category, toastEvent}) {
  const { postData, error } = usePost();
  const info = {
    name_cat: category ? category.name_cat : ''
  }
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState(info);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if(category){
        EditCategory()
      } else{
        AddCategory()
      }
    } catch (error) {
      toastEvent("Ocurrio un error", "error")
    }
  };

  async function AddCategory() {
    try {
      const { status } = await postData("/categories", formData);
      console.log(status)
      closeModal();
      if (status === 200 || status === 201){
        toastEvent("Creacion exitosa", "success")
        console.log("Creacion exitosa")
      }
    } catch (error) {
      toastEvent("Ocurrio un error", "error")
      console.log("ERROR")
    }
  }

  async function EditCategory() {
    closeModal();
    toastEvent("Edicion exitosa", "success")
    console.log("Editado", formData)
  }

  return (
    <div className="p-4">
      <button
        onClick={openModal}
        className={category ? "rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-600" 
            : "rounded-full bg-pink-500 px-4 py-2 text-white text-lg shadow-md hover:bg-pink-400"}
      >
        {category ? "Editar" : "+"}
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Formulario Modal"
        className="max-w-lg mx-auto mt-20 bg-white rounded-lg shadow-xl p-6 focus:outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">{category ? `Editar Categoria: ${category.name_cat}`: "Nueva Categoria"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600">Nombre:</label>
            <input
              type="text"
              name="name_cat"
              value={category ? category.name_cat : formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Enviar
            </button>
          </div>
          {error ? <span>Hubo un error, vuelve a intentar</span> : ""}
        </form>
      </Modal>
    </div>
  );
}

export default ModalCategories;
