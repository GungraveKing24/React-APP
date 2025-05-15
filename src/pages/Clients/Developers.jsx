import React from "react";
import Girasoles from "../../assets/GIRASOLES.jpeg";
import FLoresAzules from "../../assets/Flores Azules.jpeg";
import Ramos from "../../assets/Ramos.jpeg";
import Dev1 from "../../assets/Dev1.jpg";
import Dev2 from "../../assets/Dev2.jpeg";
import Dev3 from "../../assets/Dev3.jpg";
import Dev4 from "../../assets/Dev4.jpeg";
import Dev5 from "../../assets/Dev5.jpeg";

const developers = [
  {
    name: "Jorge Francisco",
    image: Dev1,
    email: "Jorge@example.com",
    phone: "+50375566175",
    whatsapp: "75566175",
  },
  {
    name: "Fernando Gómez",
    image: Dev2,
    email: "Fernando@example.com",
    phone: "+5036001205",
    whatsapp: "60013205",
  },
  {
    name: "Esmeralda García",
    image: Dev3,
    email: "noemiborja02@gmail.com",
    phone: "+50379740311",
    whatsapp: "79740311",
  },
  {
    name: "Tatiana Galicia",
    image: Dev4,
    email: "Tatiana@example.com",
    phone: "+50370460494",
    whatsapp: "70460494",
  },
  
];

export default function ContactDevelopers() {
  const phoneNumber = "+50375135986";
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <div className="bg-white p-10">
      <h2 className="text-3xl font-bold text-center mb-8 font-Title">
        SMARTENTERPRICE FT TATIANA GALICIA
      </h2>

      <div className="flex flex-wrap justify-center gap-6 mb-10">
        <div className="bg-white shadow-md p-6 rounded-lg w-80 text-center">
          <p className="text-gray-600 mb-2">
            <span className="font-Title">📍 Dirección: </span>
            Santa Ana, El Salvador
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-Title">✉️ Correo Electrónico: </span>
            <a
              href="mailto:smartenterpricesv@gmail.com"
              className="text-blue-500 hover:underline"
            >
              smartenterpricesv@gmail.com
            </a>
          </p>
          
        </div>

        <div className="bg-white shadow-md p-6 rounded-lg w-96 flex items-center">
          <div className="flex-1">
            <h3 className="text-xl font-Title">Puedes Cotizar tus sistemas</h3>
            <p className="text-gray-600 text-sm mt-2">
              Si tienes una empresa o deseas un sistema y quieres cotizarlo,
              envíanos un mensaje a nuestros distintos números o por nuestro correo.
            </p>
          </div>
          <div className="text-yellow-500 text-5xl">📅</div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-center mb-6 font-Title">
        Desarrolladores del Proyecto
      </h3>
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {developers.map((dev, index) => (
          <div
            key={index}
            className="bg-white shadow-md p-6 rounded-lg w-72 text-center"
          >
            <img
              src={dev.image}
              alt={dev.name}
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-gray-200"
            />
            <h3 className="text-xl font-semibold font-Title mb-2">
              {dev.name}
            </h3>
            <p className="text-gray-600 mb-1">
              ✉️{" "}
              <a
                href={`mailto:${dev.email}`}
                className="text-blue-500 hover:underline"
              >
                {dev.email}
              </a>
            </p>
            <p className="text-gray-600 mb-1">
              📞{" "}
              <a
                href={`tel:${dev.phone}`}
                className="text-blue-500 hover:underline"
              >
                {dev.phone}
              </a>
            </p>
            <p className="text-gray-600">
              💬{" "}
              <a
                href={`https://wa.me/503${dev.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:underline"
              >
                WhatsApp
              </a>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center gap-1">
        <img
          src={Girasoles}
          alt="Girasol"
          className="rounded-lg shadow-md w-[150px] h-[150px] object-cover"
        />
        <img
          src={FLoresAzules}
          alt="Azul"
          className="rounded-lg shadow-md w-[150px] h-[150px] object-cover"
        />
        <img
          src={Ramos}
          alt="Ramo"
          className="rounded-lg shadow-md w-[150px] h-[150px] object-cover"
        />
      </div>
    </div>
  );
}
