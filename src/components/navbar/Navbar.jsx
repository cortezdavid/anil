import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-600 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo/Home Link */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="block hover:opacity-90 transition-opacity duration-200"
            >
              <img
                src="/images/logo.png"
                alt="PokeAñil"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Navegación - Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/pokemon/bulbasaur"
                className="text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200"
              >
                Pokédex
              </Link>
              <Link
                to="/mt"
                className="text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200"
              >
                Mt's
              </Link>
              <Link
                to="/objetos"
                className="text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200"
              >
                Objetos
              </Link>
              <Link
                to="/movshabs"
                className="text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200"
              >
                Movs/Habs
              </Link>
              <Link
                to="/combates"
                className="text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200"
              >
                Combates
              </Link>
              {/* <Link
                to="/donprodigio"
                className="text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200"
              >
                Don Prodigio
              </Link> */}
              <Link
                to="/fotos"
                className="text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200"
              >
                Fotos
              </Link>
              <Link
                to="/torrebatalla"
                className="text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200"
              >
                Torre Batalla
              </Link>
              <Link
                to="/chat"
                className="text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200"
              >
                Foro
              </Link>
            </div>
          </div>

          {/* Botón menú móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-blue-100 p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">


            {/* Links móvil */}
            <Link
              to="/pokemon/bulbasaur"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200"
            >
              Pokédex
            </Link>
            <Link
              to="/mt"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200"
            >
              Mt's
            </Link>
            <Link
              to="/objetos"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200"
            >
              Objetos
            </Link>
            <Link
              to="/movshabs"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200"
            >
              Movs/Habs
            </Link>
            <Link
              to="/combates"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200"
            >
              Combates
            </Link>
            {/* <Link
              to="/donprodigio"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200"
            >
              Don Prodigio
            </Link> */}
            <Link
              to="/fotos"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200"
            >
              Fotos
            </Link>
            <Link
              to="/torreBatalla"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200"
            >
              Torre Batalla
            </Link>
            <Link
              to="/chat"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200"
            >
              Foro
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;