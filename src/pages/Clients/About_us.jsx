import Logo from "../../assets/ArreglitosSV.png";

export default function AboutUs() {
  console.log("AboutUs.jsx cargado"); // Verifica que el componente se ejecuta

  return (
    <div className="bg-white">
      {/* Encabezado */}
      <header className="bg-[#FAEED1] py-10 px-6 text-center">
        <img src={Logo} alt="ArreglitosSV" className="mx-auto w-40" />
        <h1 className="text-3xl font-bold text-gray-900 mt-3">
          UNA FLORISTERÍA EN LÍNEA
        </h1>
        <button className="mt-4 px-6 py-2 bg-red-300 text-white font-semibold rounded-md hover:bg-red-400">
          Comprar ahora
        </button>
      </header>

      {/* Sección: Historia */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900">Como Nace Nuestra Historia</h2>
        <div className="mt-6 flex flex-col md:flex-row gap-6">
          <p className="text-gray-700 leading-relaxed text-justify">
            ArreglitosSV nació con el propósito de brindar hermosos arreglos florales
            para cada ocasión especial. Nuestra historia comenzó con una pequeña
            pasión por las flores y un gran deseo de compartir momentos inolvidables
            con nuestros clientes. Gracias al esfuerzo y dedicación, hemos crecido y
            seguimos brindando amor a través de nuestras creaciones.
          </p>
          <img
            src="https://via.placeholder.com/300"
            alt="Historia"
            className="rounded-lg w-full md:w-1/3"
          />
        </div>
      </section>

      {/* Sección: Imágenes destacadas */}
      <section className="bg-gray-100 py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <img src="https://via.placeholder.com/150" alt="Flor" className="rounded-lg" />
          <img src="https://via.placeholder.com/150" alt="Regalo" className="rounded-lg" />
          <img src="https://via.placeholder.com/150" alt="Rosas" className="rounded-lg" />
        </div>
      </section>

      {/* Sección: Valores */}
      <section className="py-12 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900">Nuestros Valores</h2>
        <p className="text-gray-700 mt-4">
          Nos comprometemos a ofrecer productos de calidad y servicio excepcional.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <p className="text-gray-600">🌿 100% Orgánico</p>
          <p className="text-gray-600">🚚 Envío Rápido</p>
          <p className="text-gray-600">💖 Atención al Cliente</p>
          <p className="text-gray-600">🌎 Cuidado del Medio Ambiente</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#D4A5A5] py-8 px-6 text-center text-white">
        <p className="text-lg font-semibold">Somos una floristería en línea</p>
        <p className="text-sm mt-2">Siguenos por medio de Instagram</p>
      </footer>
    </div>
  );
}
