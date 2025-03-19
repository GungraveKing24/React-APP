export default function Footer(){
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