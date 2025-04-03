import React from "react";
import { FaLeaf, FaGift, FaTruck, FaCreditCard } from "react-icons/fa";
import Insta1 from "../../assets/Insta1.jpeg"
import insta2 from "../../assets/insta2.jpeg"
import insta3 from "../../assets/insta3.jpeg"
import insta from "../../assets/insta.jpeg"
import lluvia from "../../assets/lluvia.jpeg"
import { Link } from "react-router-dom";



const Homepage = () => {

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="max-w-7xl mx-auto p-4">
        <section className="bg-[#FAF6F0] p-6 rounded-lg shadow-md text-center relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="relative">
              <img src={Insta1} alt="Ramo de rosas" className="w-full h-96 object-cover rounded-lg" />
              <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent flex flex-col justify-center p-6">
                <h1 className="text-4xl font-bold text-gray-800">ILUMINA <br /> TUS DÍAS</h1>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <img src={lluvia} alt="Flores variadas" className="w-full h-48 object-cover rounded-lg shadow-lg" />
              <div className="relative">
                <img src={insta2} alt="Ramos de flores" className="w-full h-48 object-cover rounded-lg shadow-lg" />
                <p className="absolute bottom-2 left-2 bg-white px-4 py-1 rounded-lg shadow-md font-Title text-gray-800">UNA FLOR</p>
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
                <p className="text-gray-600 mt-2">Garantizamos la entrega en tiempo y forma para que tus flores lleguen perfectas.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-purple-300">
                <FaCreditCard className="text-purple-300 text-6xl mx-auto mb-4 stroke-current" />
                <h3 className="text-xl font-title text-gray-700">Pago seguro y fácil</h3>
                <p className="text-gray-600 mt-2">Aceptamos múltiples métodos de pago para mayor comodidad y seguridad.</p>
              </div>
            </div>
          </div>
        </section>  
        
        {/* Productos más solicitados */}
        <section className="mt-10 mt-3">
          <h2 className="text-2xl font-Title text-gray-800 text-center">Las más solicitadas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300">
                <img src={`/images/flower${item}.jpg`} alt="Flor" className="w-full h-48 object-cover rounded" />
                <p className="mt-2 text-gray-700 font-semibold">Ramo Especial {item}</p>
                <p className="text-gray-600">$25.00</p>
              </div>
            ))}
          </div>
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

        {/* Categorías */}
        <section className="mt-10 text-center">
          <h2 className="text-2xl font-Title text-gray-800">Compra por Categorías</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {["Arreglos", "Ramos", "Plantas", "Regalos"].map((category) => (
              <div key={category} className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition duration-300">
                <img src={`/images/${category.toLowerCase()}.jpg`} alt={category} className="w-full h-48 object-cover rounded" />
                <p className="font-semibold text-gray-700 mt-2">{category}</p>
              </div>
            ))}
          </div>
        </section>

       

        {/* Testimonios: Propuesta -> FERNANDO */}
        <section className="bg-white">
          <div className="container px-6 py-10 mx-auto">
              <h1 className="text-2xl font-Title text-center text-gray-800 capitalize lg:text-3xl">
                  Mira lo que nuestros <span className="text-pink-400 ">Clientes</span> dicen
              </h1>

              <p className="max-w-2xl mx-auto mt-6 text-center text-gray-500">
                  Esto es una propuesta para la sección de los testimonios de los clientes
              </p>

              <section className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 lg:grid-cols-2 xl:grid-cols-3">
                {["Beatriz M.", "Juan R.", "Andrea T."].map((name, index) => (
                  <div className="p-8 rounded-lg shadow hover:shadow-lg transition duration-300" key={index}>
                      <p className="leading-loose text-gray-500">
                          “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad
                          tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda rerum, culpa
                          aperiam dolorum, obcaecati corrupti aspernatur a.”.
                      </p>

                      <div className="flex items-center mt-8 -mx-2">
                          <img className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-blue-300" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt={name}/>

                          <div className="mx-2">
                              <h1 className="font-semibold text-gray-800">{name}</h1>
                              <span className="text-sm text-gray-500">Cliente Frecuente</span>
                          </div>
                      </div>
                  </div>
                ))}
              </section>
          </div>
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