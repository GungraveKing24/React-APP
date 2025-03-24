import Logo from "../../assets/ArreglitosSV.png";
import gisse from "../../assets/gisse.jpeg"
import todo from "../../assets/todo.jpeg"
import corte from "../../assets/corte.jpeg"
import insta4 from "../../assets/insta4.jpeg"



export default function AboutUs() {
  console.log("AboutUs.jsx cargado"); // Verifica que el componente se ejecuta

  return (
    <div className="bg-white">
      {/* Encabezado */}
      <header className="bg-[#FAF6F0] py-10 px-6 text-center">
        <img src={Logo} alt="ArreglitosSV" className="mx-auto w-40" />
        <h1 className="text-3xl font-bold text-gray-900 mt-3">
          "Arreglitosv"
        </h1>
        <button className="mt-4 px-6 py-2 bg-[#EFB8C8] text-white font-semibold rounded-md hover:bg-red-400">
          Comprar ahora
        </button>
      </header>

      {/* Sección: Historia */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900">Como Nace Nuestra Historia</h2>
        <div className="mt-6 flex flex-col md:flex-row gap-6">
          <p className="text-gray-700 leading-relaxed text-justify">
          Arreglitosv inicia un Marzo de 2022 y nace de la necesidad de dar detalles afuera de lo común, 
          con esencia personal, mucho amor y detalles personalizados. <br /><br />

          Soy Gissela Cruz, emprendedora, arquitecta y creadora de Arreglitosv en Santa ana, El Salvador. <br /><br />

          Arreglitosv es un espacio para generar ideas creativas con flores, 
          para ser parte de los momentos más significativos y crear memorias en regalos. <br /><br />
          
          Mi propósito es servir y lo hago escuchando y leyendo las necesidades y deseos de mis clientes o personas que buscan alegrar el día de otra persona.

          <br /><br />
          No estuviera aquí si no fuera por todo el aprendizaje adquirido 
          y por todos esos desafíos que me hicieron crecer como emprendimiento y como persona, 
          mi trayecto se ha basado en hacer creaciones únicas y actualmente seguimos cumpliendo ese objetivo.
          </p>

          <img
            src={gisse}
            alt="Historia"
            className="rounded-lg w-full md:w-1/3"
          />
        </div>
      </section>

      {/* Sección: Imágenes destacadas */}
      <section className="bg-gray-100 py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <img src={todo} alt="Flor" className="w-full h-64 object-cover rounded-lg" />
          <img src={corte} alt="Regalo" className="w-full h-64 object-cover rounded-lg" />
          <img src={insta4} alt="Rosas" className="w-full h-64 object-cover rounded-lg" />
        </div>
      </section>

      {/* Sección: Valores */}
      <section className="py-12 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900">Nuestros Valores</h2>
        <p className="text-gray-700 mt-4">
          Nos comprometemos a ofrecer productos de calidad y servicio excepcional.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <p className="text-gray-600">🌿 100% Calidad</p>
          <p className="text-gray-600">🚚 Envío Rápido</p>
          <p className="text-gray-600">💖 Atención al Cliente</p>
          <p className="text-gray-600">🌎 Hacemos realidad sus ramos  </p>
        </div>
      </section>

   
    </div>
  );
}
