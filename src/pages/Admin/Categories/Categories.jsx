import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Modal from 'react-modal'

function CategoryCard({ category }) {
  return (
    <div className="group relative block overflow-hidden border border-gray-200 rounded-lg shadow-md">
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{category.name_cat}</h3>

        <div className="flex space-x-4 mt-4">
          <Link to={`/edit/${category.id}`}>
            <button className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-600">
              Editar
            </button>
          </Link>
          <button
            className="rounded-md bg-pink-400 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-red-600"
            onClick={() => handleDisable(category.id)}
          >
            Deshabilitar
          </button>
        </div>
      </div>
    </div>
  );
}

function Categories() {
  const [categories, setCategories] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    try {
      const url = import.meta.env.VITE_API_URL + "categories";
      const response = await axios.get(url);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDisable(categoryId) {
    console.log(`Deshabilitar categoría con ID: ${categoryId}`);
    // Aquí puedes llamar a una API para deshabilitar la categoría
  }

  function openModal(){
    setIsOpen(true)
  }

  function closeModal(){
    setIsOpen(false)
  }

  return (
    <>
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl font-bold">Categorías</h2>
        <button
          onClick={openModal}
          className="rounded-full bg-green-500 px-4 py-2 text-white text-lg shadow-md hover:bg-green-600">
          +
        </button>

        <Modal  isOpen={modalIsOpen} onRequestClose={closeModal}>

        </Modal>
      </div>
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Cargando categorías...</p>
      )}
    </>
  );
}

export default Categories;
