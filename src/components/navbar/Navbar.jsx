import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [misionesOpen, setMisionesOpen] = useState(false);
  const [misionesOpenMobile, setMisionesOpenMobile] = useState(false);

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
          <div className="hidden lg:block">
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
              <Link
                to="/donprodigio"
                className="text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200"
              >
                Don Prodigio
              </Link>

              {/* dropdown - Desktop */}
              <div className="relative">
                <button
                  onClick={() => setMisionesOpen(!misionesOpen)}
                  onBlur={() => setTimeout(() => setMisionesOpen(false), 150)}
                  className="text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-1"
                >
                  Misiones
                  <svg className={`w-4 h-4 transition-transform duration-200 ${misionesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {misionesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-44 bg-blue-600 rounded-lg shadow-xl z-50 overflow-hidden">
                    <Link
                      to="/fotos"
                      onClick={() => setMisionesOpen(false)}
                      className="block text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-2 text-sm font-bold transition-all duration-200"
                    >
                      Fotos
                    </Link>
                    <Link
                      to="/torrebatalla"
                      onClick={() => setMisionesOpen(false)}
                      className="block text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-2 text-sm font-bold transition-all duration-200"
                    >
                      Torre Batalla
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/chat"
                className="text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200"
              >
                Foro
              </Link>
            </div>
          </div>

          {/* Botón menú móvil */}
          <div className="lg:hidden">
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
          <div className="lg:hidden pb-4 space-y-3">
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
            <Link
              to="/donprodigio"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200"
            >
              Don Prodigio
            </Link>
            <div>
              <button
                onClick={() => setMisionesOpenMobile(!misionesOpenMobile)}
                className="w-full text-left text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200 flex items-center justify-between"
              >
                Misiones
                <svg className={`w-4 h-4 transition-transform duration-200 ${misionesOpenMobile ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {misionesOpenMobile && (
                <div className="mt-1 ml-4 space-y-1">
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
                </div>
              )}
            </div>

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