import React from "react";
import ramito from "../../assets/photo.jpeg"
import lluvia from "../../assets/lluvia.jpeg"
import day from "../../assets/day.jpeg"

const terms = () => {
  return (
    <div className="bg-[#FAF6F0] min-h-screen p-10 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-Title text-center text-[#bb8052] mb-6">
         Terminos y Condiciones
        </h1>
        <p className="text-gray-600 text-justify mb-4">
          Bienvenid@ a Arreglitosv. Al acceder y utilizar nuestro sitio web, usted acepta cumplir con los siguientes términos y condiciones. Le recomendamos que lea detenidamente esta sección antes de realizar cualquier compra o uso de nuestros servicios.
        </p>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-Title text-[#bb8052]">1. Aceptación de los Términos</h2>
            <p className="text-gray-600">Al utilizar nuestro sitio web, usted acepta estar sujeto a estos Términos y Condiciones.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-Title text-[#bb8052]">2. Pedidos y Pagos</h2>
            <ul className="list-disc ml-6 text-gray-600">
              <li>Todos los pedidos están sujetos a disponibilidad de productos.</li>
              <li>Los precios mostrados en el sitio web están sujetos a cambios sin previo aviso.</li>
              <li>Aceptamos pagos a través de Tarjetas de Crédito o Débito y pagos contra entrega.</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-Title text-[#bb8052]">3. Envíos y Entregas</h2>
            <ul className="list-disc ml-6 text-gray-600">
              <li>Realizamos envíos en Santa Ana con un costo de $2.00 en zonas céntricas.</li>
              <li>Las zonas aledañas pueden tener costos variables.</li>
              <li>Los plazos de entrega son estimados y pueden variar.</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-Title text-[#bb8052]">4. Devoluciones y Reembolsos</h2>
            <p className="text-gray-600">No aceptamos devoluciones.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-Title text-[#bb8052]">5. Privacidad y Protección de Datos</h2>
            <p className="text-gray-600">Respetamos su privacidad y protegemos sus datos personales según nuestra política de privacidad.</p>
          </section>
        </div>

        <div className="mt-8  p-6 rounded-lg flex items-center justify-center">
          <img
            src={lluvia}
            alt="Flores"
            className="w-32 h-32 object-cover rounded-lg mx-2"
          />
          <img
            src={day}
            alt="Motivación"
            className="w-32 h-32 object-cover rounded-lg mx-2"
          />
          <img
            src={ramito}
            alt="Rosas"
            className="w-32 h-32 object-cover rounded-lg mx-2"
          />
        </div>
      </div>
    </div>
  );
};

export default terms;
