import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaInstagram } from "react-icons/fa";


export default function Footer() {
  const { user } = useAuth();

  if(user?.user_role === "Administrador"){
    return <>
      {/* Footer Secundario */}
      <footer className="bg-[#EFB8C8] py-8 px-6 text-center text-white">
        <p className="text-lg font-Title">Somos una floristería en línea</p>
        <div className="mt-4 flex justify-center items-center gap-3">
          <span className="text-sm">Síguenos en</span>
          <a
            href="https://www.instagram.com/arreglitosv/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-200 transition-transform transform hover:scale-110"
          >
            <FaInstagram size={36} />
          </a>
        </div>
      </footer>

      <footer className="bg-[#B9A387] text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-Title">Arreglitosv</h2>
            <p className="text-white-400 mt-2">
              “Para toda Ocasión”
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-Title">For every occasion</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/catalog" className="text-white-400 hover:text-white">Catálogo</Link></li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8 border-t border-b-orange-100 pt-6">
            <p className="text-white-400">
              Arreglitosv SmartEnterprise® 2025. All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </>
  }

  return (
    <>
      {/* Footer Secundario */}
       <footer className="bg-[#EFB8C8] py-8 px-6 text-center text-white">
        <p className="text-lg font-Title">Somos una floristería en línea</p>
        <div className="mt-4 flex justify-center items-center gap-3">
          <span className="text-sm">Síguenos en instragram <br/>arreglitosv</span>
          <a
            href="https://www.instagram.com/arreglitosv/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-200 transition-transform transform hover:scale-110"
          >
            <FaInstagram size={36} />
          </a>
        </div>
      </footer>


      {/* Footer Principal */}
      <footer className="bg-[#B9A387] text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-Title">Arreglitosv</h2>
            <p className="text-white-400 mt-2">
              “Para toda Ocasión”
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-Title">For every occasion</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/" className="text-white-400 hover:text-white">Arreglitos</Link></li>
                <li><Link to="/contact" className="text-white-400 hover:text-white">Ayuda</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-Title">Contacto</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/contact" className="text-white-400 hover:text-white">(+503) 7513 5986</Link></li>
                <li><Link to="/profile" className="text-white-400 hover:text-white">Mi cuenta</Link></li>
                <li><Link to="/ShoppingCart" className="text-white-400 hover:text-white">Carrito de compras</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-Title">Información</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/aboutus" className="text-white-400 hover:text-white">Sobre Nosotros</Link></li>
                <li><Link to="/contact" className="text-white-400 hover:text-white">Contáctanos</Link></li>
                <li><Link to="/catalog" className="text-white-400 hover:text-white">Catálogo</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-Title">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/terms" className="text-white-400 hover:text-white">Términos y Condiciones</Link></li>
                <li><Link to="/policies" className="text-white-400 hover:text-white">Políticas de Privacidad</Link></li>
                <li><Link to="/ContactDevelopers" className="text-white-400 hover:text-white">Desarrolladores</Link></li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8 border-t border-b-orange-100 pt-6">
            <p className="text-white-400">
              Arreglitosv SmartEnterprise® 2025. All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
