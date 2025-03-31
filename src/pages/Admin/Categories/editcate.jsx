import React, { useState } from 'react';

const EditCate = ({ onCategoriaAgregada }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!nombre.trim()) {
      setError('El nombre de la categoría es obligatorio');
      return;
    }
    
    // Limpiar mensajes anteriores
    setError('');
    setExito('');
    
    // Aquí normalmente harías una llamada API o manejarías el estado global
    // Por ahora simulamos una operación exitosa
    const nuevaCategoria = {
      id: Date.now(), // ID temporal
      nombre,
      descripcion
    };
    
    if (onCategoriaAgregada) {
      onCategoriaAgregada(nuevaCategoria);
    }
    
    // Mostrar mensaje de éxito y limpiar el formulario
    setExito('Categoría agregada correctamente');
    setNombre('');
    setDescripcion('');
    
    // Ocultar mensaje de éxito después de 3 segundos
    setTimeout(() => setExito(''), 3000);
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Agregar Nueva Categoría</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {exito && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {exito}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
            Nombre de la categoría *
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-300"
            placeholder="Ej. Electrónica"
          />
        </div>
        
        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
            Descripción (opcional)
          </label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-300"
            placeholder="Descripción de la categoría..."
          />
        </div>
        
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#EFB8C8] hover:bg-[#EFB8C8] focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-300"
          >
            Editar Categoría
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarCategoria;