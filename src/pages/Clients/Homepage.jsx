import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo y enlaces */}
        <div className="flex items-center space-x-8">
          <a href="/" className="text-xl font-bold text-gray-800">Arreglitosv</a>
          <ul className="flex space-x-6">
            <li><a href="/Home" className="text-gray-700 hover:text-gray-900">Inicio</a></li>
            <li><a href="/Catalogo" className="text-gray-700 hover:text-gray-900">Catalogo</a></li>
            <li><a href="/...." className="text-gray-700 hover:text-gray-900">Nosotros</a></li>
            <li><a href="/....." className="text-gray-700 hover:text-gray-900">Contactanos</a></li>
          </ul>
        </div>

        {/* Botones de acción */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-gray-900">Login</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-8 mt-10">
      <div className="max-w-7xl mx-auto">
        {/* Sección superior */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold">Somos una floristería en línea</h2>
          <p className="text-gray-400 mt-2">
            “Negue parte quisiguam est allí alobiern ipsum quid dolor sit amet, consectetur, adipiscing elit...”
          </p>
        </div>

        {/* Sección de enlaces */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna 1 */}
          <div>
            <h3 className="text-lg font-semibold">For every occasion</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Arreglitos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Ayuda</a></li>
            </ul>
          </div>

          {/* Columna 2 */}
          <div>
            <h3 className="text-lg font-semibold">Contacto</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">(503) XXX_XXX</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Mi cuenta</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contactanos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Sobre nosotros</a></li>
            </ul>
          </div>

          {/* Columna 3 */}
          <div>
            <h3 className="text-lg font-semibold">Información</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Historia</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Términos y Condiciones</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Catálogo</a></li>
            </ul>
          </div>

          {/* Columna 4 */}
          <div>
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Carito</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Políticas de Privacidad</a></li>
            </ul>
          </div>
        </div>

        {/* Derechos reservados */}
        <div className="text-center mt-8 border-t border-gray-800 pt-6">
          <p className="text-gray-400">
            Arreglitosv SmortEnterprise® 2025. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

const Homepage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="max-w-7xl mx-auto p-4">
        {/*  */}
        <section className="bg-white p-6 rounded-lg shadow-md text-center relative overflow-hidden">
          <img src="/images/hero.jpg" alt="Hero" className="w-full h-96 object-cover rounded-lg" />
          <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent flex flex-col justify-center items-start p-6">
            <h1 className="text-4xl font-bold text-gray-800">Ilumina tus días con flores</h1>
            <p className="text-gray-600 mt-2">Las mejores flores para cualquier ocasión</p>
            <button className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition duration-300">Explorar</button>
          </div>
        </section>
        
        {/* Productos más solicitados */}
        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">Las más solicitadas</h2>
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
        <section className="mt-10 text-center bg-pink-100 p-6 rounded-lg shadow-md">
          <p className="text-lg font-semibold text-gray-800">“Las Flores nos enseñan que siempre hay belleza en los nuevos comienzos”</p>
        </section>

        {/* Categorías */}
        <section className="mt-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Compra por Categorías</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {["Arreglos", "Ramos", "Plantas", "Regalos"].map((category) => (
              <div key={category} className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition duration-300">
                <img src={`/images/${category.toLowerCase()}.jpg`} alt={category} className="w-full h-48 object-cover rounded" />
                <p className="font-semibold text-gray-700 mt-2">{category}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonios */}
        <section className="mt-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Testimonios de Clientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {["Beatriz M.", "Juan R.", "Andrea T."].map((name, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300">
                <img src={`/images/testimonial${index + 1}.jpg`} alt={`Testimonio ${name}`} className="w-full h-48 object-cover rounded" />
                <p className="text-gray-600 italic mt-2">“Excelente calidad y servicio.”</p>
                <p className="text-gray-700 font-semibold mt-2">- {name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Instagram Gallery */}
        <section className="mt-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Síguenos en Instagram</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {[1, 2, 3, 4].map((item) => (
              <img key={item} src={`/images/insta${item}.jpg`} alt={`Instagram ${item}`} className="w-full h-48 object-cover rounded hover:scale-105 transition duration-300" />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;