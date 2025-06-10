import React, { useEffect, useState } from "react";
import { FaLeaf, FaGift, FaTruck, FaCreditCard } from "react-icons/fa";
import Insta1 from "../../assets/Insta1.jpeg"
import insta2 from "../../assets/insta2.jpeg"
import insta3 from "../../assets/insta3.jpeg"
import insta from "../../assets/insta.jpeg"
import lluvia from "../../assets/lluvia.jpeg"
import F1 from "../../assets/FAV1.jpeg"
import F2 from "../../assets/FAV.2.jpeg"
import F3 from "../../assets/FAV-3.jpeg"
import F4 from "../../assets/FAV4.jpeg"
import F5 from "../../assets/FAV5.jpeg"
import F6 from "../../assets/FAV6.jpeg"
import F7 from "../../assets/FAV7.jpeg"
import F8 from "../../assets/FAV8.jpeg"
import Ilumina from "../../assets/Ilumina.jpeg"
import Flor from "../../assets/Flor.jpeg"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../Axios/Axios";

const flowers = [F1, F2, F3, F4, F5, F6, F7, F8];
const reviewMockups = [{
  user_name: "Carlos Martínez",
  comment_text: "Pedí un arreglo floral para sorprender a mi esposa en nuestro aniversario y fue un éxito total. Ella quedó encantada con el diseño y la combinación de flores. El proceso de compra en línea fue rápido y sencillo. ¡Gracias por hacer ese día aún más especial!",
}, {
  user_name: "Rosa Pineda",
  comment_text: "Hice un pedido de último minuto para el cumpleaños de mi mamá y no solo llegó a tiempo, ¡sino que el arreglo estaba precioso! Las flores súper frescas, los colores vibrantes. Definitivamente volveré a comprar aquí.",
}, {
  user_name: "Ana Morales",
  comment_text: "¡Súper recomendada! Pedí un ramo para una amiga que estaba enferma y quedó encantada. El empaque, el aroma, la presentación... todo se nota que está hecho con cuidado.",
}]

const Homepage = () => {
  const [reviews, setReviews] = useState(reviewMockups)

  useEffect(() => {
    fetchReviews()
  }, [])

  async function fetchReviews() {
    try {
      const res = await axiosInstance.get(`/Comments/${Math.floor(Math.random() * 10) + 1}`);
      if (res.status === 200 && res.data.length >= 3) {
        setReviews(res.data);
      } else {
        setReviews(reviewMockups);
      }
    } catch (error) {
      setReviews(reviewMockups)
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="max-w-7xl mx-auto p-4">
        <section className="bg-[#FAF6F0] p-6 rounded-lg shadow-md text-center relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="relative">
              <img src={Ilumina} alt="Ramo de rosas" className="w-full h-96 object-cover rounded-lg" />
              <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent flex flex-col justify-center p-6">
                <h1 className="text-4xl font-bold text-gray-800">ILUMINA <br /> TUS DÍAS</h1>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <img src={lluvia} alt="Flores variadas" className="w-full h-48 object-cover rounded-lg shadow-lg" />
              <div className="relative">
                <img src={Flor} alt="Ramos de flores" className="w-full h-48 object-cover rounded-lg shadow-lg" />
                <p className="absolute bottom-2 left-2 bg-white px-4 py-1 rounded-lg shadow-md font-Title text-gray-800">ALEGRÍA EN FORMA DE FLORES</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto text-center">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-green-300">
                <FaLeaf className="text-green-300 text-6xl mx-auto mb-4 stroke-current" />
                <h3 className="text-xl font-title text-gray-700">Flores frescas y naturales</h3>
                <p className="text-gray-600 mt-2">Seleccionamos las mejores flores para asegurar calidad y frescura en cada arreglo.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-pink-300">
                <FaGift className="text-pink-300 text-6xl mx-auto mb-4 stroke-current" />
                <h3 className="text-xl font-title text-gray-700">Flores personalizadas</h3>
                <p className="text-gray-600 mt-2">Regala arreglos florales únicos para hacer tu regalo aún más especial.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-blue-300">
                <FaTruck className="text-blue-300 text-6xl mx-auto mb-4 stroke-current" />
                <h3 className="text-xl font-title text-gray-700">Envío rápido y seguro</h3>
                <p className="text-gray-600 mt-2">Garantizamos la entrega en tiempo y forma para que tus flores lleguen perfectas.
                  Envios a Santa Ana
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-purple-300">
                <FaCreditCard className="text-purple-300 text-6xl mx-auto mb-4 stroke-current" />
                <h3 className="text-xl font-title text-gray-700">Pago seguro y fácil</h3>
                <p className="text-gray-600 mt-2">Aceptamos múltiples métodos de pago para mayor comodidad y seguridad.
                  Desploquea los pagos con tarjeta al Registrarte en el Sitio. 
                </p>
              </div>
            </div>
          </div>
        </section>  


        <section className="mt-10 px-4">
          <div className="bg-gradient-to-r from-pink-200 to-pink-300 p-8 rounded-2xl shadow-xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Los Pedidos se toman con 24 horas de anticipación
            </h2>
            <p className="text-sm md:text-base text-gray-700 italic">
              Colocar día y hora en la sección de notas adicionales
            </p>
          </div>
        </section>
        

        {/* Productos más solicitados */}
          <section className="mt-10 px-4">
            <h2 className="text-2xl font-Title text-gray-800 text-center mb-8">Las más solicitadas</h2>
            <Slider
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={4}
              slidesToScroll={1}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]}
            >
              {flowers.map((flower, index) => (
                <div key={index} className="px-2">
                  <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                    <img 
                      src={flower} 
                      alt={`Arreglo floral ${index + 1}`} 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <p className="mt-3 text-lg font-semibold text-gray-800">Ramo Especiales {index + 1}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </section>
                  
       {/* Frase destacada */}
       <section className="relative mt-10 bg-gradient-to-r from-[#FAF6F0] to-[#FDECEF] p-12 rounded-2xl shadow-2xl flex items-center justify-between overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-pink-300 opacity-30 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#EFB8C8] opacity-20 blur-3xl"></div>

          <div className="max-w-3xl relative z-10">
            <p className="text-5xl font-Title text-gray-800 leading-snug">
              “Donde las palabras no llegan, las flores hablan”
            </p>
          </div>

          <div className="relative z-10">
            <Link to="/catalog">
              <button className="mt-5 bg-gradient-to-r from-[#EFB8C8] to-[#F48FB1] text-white text-xl font-semibold px-8 py-4 rounded-lg shadow-lg transform transition duration-500 ease-in-out hover:scale-110 hover:shadow-2xl">
                Ver Catálogo
              </button>
            </Link>
          </div>
        </section>

        {/* Testimonios */}
        <section className="mt-10 px-4">
            <h2 className="text-2xl font-Title text-center text-gray-800 capitalize lg:text-3xl">Mira lo que nuestros <span className="text-pink-400 ">Clientes</span> dicen</h2>
          <Slider
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={3}
            slidesToScroll={1}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]}>
              {reviews.map((review, index) => (
                <div className="px-4 mt-2" key={index}>
                  <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition duration-300 h-full flex flex-col justify-between min-h-[300px]">
                    <p className="leading-loose text-gray-600">{review.comment_text}</p>
                    <div className="mt-4">
                      <h1 className="font-semibold text-gray-800">{review.user_name}</h1>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>
        </section>

        {/* Instagram Gallery */}
        <section className="mt-10 text-center">
          <h2 className="text-2xl font-Title text-gray-800">Síguenos en Instagram</h2>
              <div className="mt-10 grid grid-cols-3 gap-2">
                <img
                  src={Insta1}
                  alt="insta1"
                  className="rounded-lg shadow-md mx-auto w-[350px] h-[350px] object-cover"
                />
                <img
                  src={insta}
                  alt="Azul"
                  className="rounded-lg shadow-md mx-auto w-[350px] h-[350px] object-cover"
                />
                <img
                  src={insta3}
                  alt="Ramo"
                  className="rounded-lg shadow-md mx-auto w-[350px] h-[350px] object-cover"
                />
              </div>
        </section>
      </main>
    </div>
  );
};

export default Homepage;
