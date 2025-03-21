import React from "react";


export default function terms() {
    return (
      <div className="bg-white p-10  min-h-screen">
        {/* Título */}
        <h2 className="text-3xl font-bold text-center mb-6 text-yellow-700">
          Terminos y Condiciones
        </h2>
  
        {/* Primera sección de texto */}
        <p className="text-gray-700 text-justify max-w-3xl mx-auto leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum metus vel augue egestas, 
          sed bibendum magna vestibulum. Donec nec augue at risus molestie convallis. Cras venenatis dui 
          nec sapien aliquet tincidunt.
        </p>
  
        {/* Separador */}
        <div className="w-full h-10 bg-yellow-100 mt-8"></div>
  
        {/* Segunda sección de texto */}
        <p className="text-gray-700 text-justify max-w-3xl mx-auto mt-8 leading-relaxed">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
          totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>

    </div>
    );
  }
  