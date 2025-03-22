import React from "react";

export default function Contact() {
  const phoneNumber = "+50375135986"; // Número de teléfono
  const whatsappLink = `https://wa.me/${phoneNumber}`; // Enlace de WhatsApp

  return (
    <div className="bg-white p-10">
      <h2 className="text-3xl font-bold text-center mb-8">Contáctanos</h2>

      {/* Sección principal */}
      <div className="flex flex-wrap justify-center gap-6">
        {/* Tarjeta de contacto */}
        <div className="bg-white shadow-md p-6 rounded-lg w-80 text-center">
          <p className="text-gray-600 mb-2">
            <span className="font-bold">📍 Dirección: </span>
            Santa Ana, El Salvador
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-bold">✉️ Correo Electrónico: </span>
            <a
              href="mailto:cruzgissela5@gmail.com"
              className="text-blue-500 hover:underline"
            >
              cruzgissela5@gmail.com
            </a>
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-bold">📞 Teléfono: </span>
            <a
              href={`tel:${phoneNumber}`}
              className="text-blue-500 hover:underline"
            >
              (+503) 7513 5986
            </a>
          </p>
          <p className="text-gray-600">
            <span className="font-bold">💬 WhatsApp: </span>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:underline"
            >
              7513 5986
            </a>
          </p>
        </div>

        {/* Tarjeta de cotización */}
        <div className="bg-white shadow-md p-6 rounded-lg w-96 flex items-center">
          <div className="flex-1">
            <h3 className="text-xl font-bold">Puedes Cotizar tus Diseños</h3>
            <p className="text-gray-600 text-sm mt-2">
              Si tienes un evento y quieres cotizar o hacer un arreglo personalizado,
              envíanos un mensaje a nuestros distintos números o por nuestro correo.
            </p>
          </div>
          <div className="text-yellow-500 text-5xl">📅</div>
        </div>
      </div>

      {/* Sección de imágenes */}
      <div className="mt-10 grid grid-cols-3 gap-4">
        <img
          src="/assetsGIRASOLES.jpeg"
          alt="Febrero"
          className="rounded-lg shadow-md"
        />
        <img
          src="/images/agenda.png"
          alt="Agenda"
          className="rounded-lg shadow-md"
        />
        <img
          src="/images/flores.png"
          alt="Flores"
          className="rounded-lg shadow-md"
        />
      </div>
    </div>
  );
}