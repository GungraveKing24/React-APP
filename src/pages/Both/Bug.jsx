import React from "react";
import { Link, useLocation } from "react-router-dom"; 

export default function Bug() {
  const location = useLocation();
  const errorMessage = location.state?.error || "La página no existe o no ha sido encontrada.";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
      {/* Número 404 grande y estilizado */}
      <h1 className="text-9xl font-extrabold text-[#EFB8C8] drop-shadow-lg">404</h1>
      
      {/* Mensaje de error */}
      <h2 className="text-4xl font-bold text-gray-800 mt-4">
        Oops! Página no encontrada
      </h2>

      {/* Descripción del error */}
      <p className="text-lg text-gray-500 mt-2">{ errorMessage  }</p>

      {/* Botón para volver al inicio */}
      <Link
        to="/"
        className="mt-6 px-8 py-3 bg-[#EFB8C8] text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-pink-600 transition">
        Volver al inicio
      </Link>
    </div>
  );
}
