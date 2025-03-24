import React from "react";

const policies = () => {
  return (
    <div className="bg-[#FAF6F0] min-h-screen p-10 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-Title text-center text-[#bb8052] mb-6">
        Políticas de Privacidad
        </h1>
        <p className="text-gray-600 text-justify mb-4">
        En Arreglitosv, valoramos tu privacidad. Esta política explica cómo recopilamos, usamos y protegemos tu información.        </p>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-Title text-[#bb8052]">1. Información que Recopilamos</h2>
            <p className="text-gray-600">Datos personales: Nombre, correo, teléfono, dirección y detalles de pago.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-Title text-[#bb8052]">2. Uso de la Información</h2>
            <ul className="list-disc ml-6 text-gray-600">
              <li>Procesar pedidos y mejorar nuestros servicios.</li>
              <li>Cumplir con obligaciones legales.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-Title text-[#bb8052]">3. Protección de Datos</h2>
            <p>Usamos medidas de seguridad avanzadas para proteger tu información.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-Title text-[#bb8052]">4. Compartir Información</h2>
            <p className="text-gray-600">No vendemos tus datos. Solo los compartimos con proveedores necesarios (logística, pagos) o por requerimientos legales.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-Title text-[#bb8052]">5. Tus Derechos</h2>
            <p className="text-gray-600">Acceder, corregir o eliminar tus datos.</p>
          </section>
          <section>
            <h2 className="text-xl font-Title text-[#bb8052]">6. Cambios en la Política</h2>
            <p className="text-gray-600">Acceder, corregir o eliminar tus datos.</p>
          </section>
        </div>

        {/* Separador */}
        <div className="w-full h-10 bg-yellow-100 mt-8"></div>
  
       
      </div>
    </div>
  );
};

export default policies;


