import Logo from "../../assets/ArreglitosSV.png";
import gisse from "../../assets/gisse.jpeg";
import todo from "../../assets/todo.jpeg";
import corte from "../../assets/corte.jpeg";
import insta4 from "../../assets/insta4.jpeg";

export default function AboutUs() {
  console.log("AboutUs.jsx cargado"); // Verifica que el componente se ejecuta

  return (
    <div className="bg-[#F8F9FB] font-sans">
      {/* Encabezado */}
      <header className="bg-gradient-to-r from-[#FAF6F0] to-[#FDECEF] py-16 px-8 text-center rounded-b-3xl shadow-xl">
        <img src={Logo} alt="ArreglitosSV" className="mx-auto w-48 mb-6" />
        <h1 className="text-5xl font-Title text-[#2D3436] mt-3 tracking-wide">"Arreglitosv"</h1>
        <p className="text-xl text-[#4B4B4B] mt-2 mb-4">Detalles con amor y pasión</p>
        <button className="mt-6 px-10 py-4 bg-[#EFB8C8] text-white font-semibold rounded-full shadow-lg transform hover:scale-105 hover:bg-[#F28D7E] transition-all duration-300">
          Comprar ahora
        </button>
      </header>

      {/* Sección: Historia */}
      <section className="py-20 px-8 max-w-6xl mx-auto text-center md:text-left">
        <h2 className="text-4xl font-Title text-[#2D3436] mb-6">Cómo Nace Nuestra Historia</h2>
        <div className="mt-8 flex flex-col md:flex-row gap-12 items-center">
          <p className="text-gray-700 leading-relaxed text-justify md:w-1/2 text-lg">
            Arreglitosv inicia en marzo de 2022 y nace de la necesidad de dar detalles fuera de lo común, 
            con esencia personal, mucho amor y detalles personalizados. <br /><br />

            Soy Gissela Cruz, emprendedora, arquitecta y creadora de Arreglitosv en Santa Ana, El Salvador. <br /><br />

            Arreglitosv es un espacio para generar ideas creativas con flores, 
            para ser parte de los momentos más significativos y crear memorias a través de nuestros regalos. <br /><br />
            
            Mi propósito es servir y lo hago escuchando y leyendo las necesidades de mis clientes. <br /><br />
            No estuviera aquí sin todo el aprendizaje adquirido a lo largo del camino. Mi trayecto se ha basado en hacer creaciones únicas, y actualmente seguimos cumpliendo ese objetivo.
          </p>

          <img
            src={gisse}
            alt="Historia"
            className="rounded-xl shadow-2xl w-full md:w-1/3 max-w-md mx-auto md:mx-0"
          />
        </div>
      </section>

      {/* Sección: Imágenes destacadas */}
      <section className="bg-[#F9F9F9] py-16 px-8">
        <h2 className="text-4xl font-Title text-[#2D3436] text-center mb-8">Nuestros Productos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <img src={todo} alt="Flor" className="w-full h-64 object-cover rounded-xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300" />
          <img src={corte} alt="Regalo" className="w-full h-64 object-cover rounded-xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300" />
          <img src={insta4} alt="Rosas" className="w-full h-64 object-cover rounded-xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300" />
        </div>
      </section>

      {/* Sección: Valores */}
      <section className="py-20 px-8 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-Title text-[#2D3436] mb-8">Nuestros Valores</h2>
        <p className="text-xl text-gray-700 mb-12">
          Nos comprometemos a ofrecer productos de calidad y un servicio excepcional.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
          <div className="flex items-center text-lg text-[#2D3436]">
            <span role="img" aria-label="quality" className="mr-6 text-3xl">🌿</span>
            <div className="text-left">
              <p className="font-Title text-xl">100% Calidad</p>
              <p className="text-gray-600">Solo utilizamos los mejores productos para ti.</p>
            </div>
          </div>
          <div className="flex items-center text-lg text-[#2D3436]">
            <span role="img" aria-label="delivery" className="mr-6 text-3xl">🚚</span>
            <div className="text-left">
              <p className="font-Title text-xl">Envío Rápido</p>
              <p className="text-gray-600">Nos aseguramos de que tus pedidos lleguen a tiempo.</p>
            </div>
          </div>
          <div className="flex items-center text-lg text-[#2D3436]">
            <span role="img" aria-label="customer service" className="mr-6 text-3xl">💖</span>
            <div className="text-left">
              <p className="font-Title text-xl">Atención al Cliente</p>
              <p className="text-gray-600">Siempre disponibles para ayudarte con lo que necesites.</p>
            </div>
          </div>
          <div className="flex items-center text-lg text-[#2D3436]">
            <span role="img" aria-label="world" className="mr-6 text-3xl">🌎</span>
            <div className="text-left">
              <p className="font-Title text-xl">Hacemos Realidad tus Ramos</p>
              <p className="text-gray-600">Creamos ramos y arreglos personalizados únicos.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
