export default function Footer() {
  return (
    <>
      {/* Footer Secundario */}
      <footer className="bg-[#EFB8C8] py-8 px-6 text-center text-white">
        <p className="text-lg font-semibold">Somos una floristería en línea</p>
        <p className="text-sm mt-2">Síguenos por medio de Instagram</p>
      </footer>

      {/* Footer Principal */}
      <footer className="bg-[#B9A387] text-white p-8">
        <div className="max-w-7xl mx-auto">
          {/* Sección superior */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">Arreglitosv</h2>
            <p className="text-white-400 mt-2">
              “Negue parte quisiguam est allí alobiern ipsum quid dolor sit amet, consectetur, adipiscing elit...”
            </p>
          </div>

          {/* Sección de enlaces */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Columna 1 */}
            <div>
              <h3 className="text-lg font-semibold">For every occasion</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-white-400 hover:text-white">Arreglitos</a></li>
                <li><a href="#" className="text-white-400 hover:text-white">Ayuda</a></li>
              </ul>
            </div>

            {/* Columna 2 */}
            <div>
              <h3 className="text-lg font-semibold">Contacto</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-white-400 hover:text-white">(503) XXX_XXX</a></li>
                <li><a href="#" className="text-white-400 hover:text-white">Mi cuenta</a></li>
                <li><a href="#" className="text-white-400 hover:text-white">Carrito de compras</a></li>
              </ul>
            </div>

            {/* Columna 3 */}
            <div>
              <h3 className="text-lg font-semibold">Información</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="/aboutus" className="text-white-400 hover:text-white">Sobre Nosotros</a></li>
                <li><a href="#" className="text-white-400 hover:text-white">Contáctanos</a></li>
                <li><a href="/contact" className="text-white-400 hover:text-white">Catálogo</a></li>
              </ul>
            </div>

            {/* Columna 4 */}
            <div>
              <h3 className="text-lg font-semibold">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="/terms" className="text-white-400 hover:text-white">Términos y Condiciones</a></li>
                <li><a href="/policies" className="text-white-400 hover:text-white">Políticas de Privacidad</a></li>
              </ul>
            </div>
          </div>

          {/* Derechos reservados */}
          <div className="text-center mt-8 border-t border-b-orange-100 pt-6">
            <p className="text-white-400">
              Arreglitosv SmortEnterprise® 2025. All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
