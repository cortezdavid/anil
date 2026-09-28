import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-100";

const desktopBase = `rounded-lg px-3 py-2 text-sm font-medium hover:bg-blue-900 ${focusRing}`;
const mobileBase = `rounded-lg px-4 py-3 text-sm font-medium hover:bg-blue-900 ${focusRing}`;

// NavLink marca la página actual con bg-blue-900 (y agrega aria-current solo)
const desktopLink = desktopBase;
const mobileLink = `block ${mobileBase}`;

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [misionesOpen, setMisionesOpen] = useState(false);
  const [misionesOpenMobile, setMisionesOpenMobile] = useState(false);

  // La Pokédex vive en /pokemon/:id, así que se marca en cualquier Pokémon
  const { pathname } = useLocation();
  const pokedexActive = pathname.startsWith("/pokemon");

  return (
    <nav aria-label="Principal" className="border-b border-blue-800 bg-blue-950 text-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo/Home Link */}
          <div className="flex-shrink-0">
            <Link to="/" className={`block rounded-lg ${focusRing}`}>
              <img
                src="/images/logo.png"
                alt="PokeAñil"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Navegación - Desktop */}
          <div className="hidden items-center gap-1 lg:flex">
            <Link
              to="/pokemon/bulbasaur"
              aria-current={pokedexActive ? "page" : undefined}
              className={desktopBase}
            >
              Pokédex
            </Link>
            <NavLink to="/mt" className={desktopLink}>
              MTs
            </NavLink>
            <NavLink to="/objetos" className={desktopLink}>
              Objetos
            </NavLink>
            <NavLink to="/movshabs" className={desktopLink}>
              Movs/Habs
            </NavLink>
            <NavLink to="/combates" className={desktopLink}>
              Combates
            </NavLink>

            {/* Misiones dropdown - Desktop */}
            <div
              className="relative"
              onMouseEnter={() => setMisionesOpen(true)}
              onMouseLeave={() => setMisionesOpen(false)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setMisionesOpen(false);
              }}
              onKeyDown={(e) => e.key === "Escape" && setMisionesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setMisionesOpen(true)}
                aria-expanded={misionesOpen}
                className={`${desktopBase} flex items-center gap-1`}
              >
                Misiones
                <svg aria-hidden="true" className={`w-4 h-4 transition-transform duration-200 ${misionesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {misionesOpen && (
                <div className="absolute top-full left-0 z-50 w-44 pt-1">
                  <div className="rounded-lg border border-blue-800 bg-blue-900 p-1 shadow-xl">
                    <Link
                      to="/fotos"
                      onClick={() => setMisionesOpen(false)}
                      className={`block rounded-md px-3 py-2 text-sm font-medium hover:bg-blue-800/50 ${focusRing}`}
                    >
                      Fotos
                    </Link>
                    <Link
                      to="/torrebatalla"
                      onClick={() => setMisionesOpen(false)}
                      className={`block rounded-md px-3 py-2 text-sm font-medium hover:bg-blue-800/50 ${focusRing}`}
                    >
                      Torre Batalla
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/nidos" className={desktopLink}>
              Nidos
            </NavLink>
            <NavLink to="/donprodigio" className={desktopLink}>
              Don Prodigio
            </NavLink>
            <NavLink to="/chat" className={desktopLink}>
              Foro
            </NavLink>
          </div>

          {/* Botón menú móvil */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileMenuOpen}
              aria-controls="menu-movil"
              className={`rounded-lg p-2 hover:bg-blue-900 ${focusRing}`}
            >
              <svg aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div id="menu-movil" className="lg:hidden pb-4 space-y-1">
            <Link
              to="/pokemon/bulbasaur"
              onClick={() => setMobileMenuOpen(false)}
              aria-current={pokedexActive ? "page" : undefined}
              className={`block ${mobileBase}`}
            >
              Pokédex
            </Link>
            <NavLink to="/mt" onClick={() => setMobileMenuOpen(false)} className={mobileLink}>
              MTs
            </NavLink>
            <NavLink to="/objetos" onClick={() => setMobileMenuOpen(false)} className={mobileLink}>
              Objetos
            </NavLink>
            <NavLink to="/movshabs" onClick={() => setMobileMenuOpen(false)} className={mobileLink}>
              Movs/Habs
            </NavLink>
            <NavLink to="/combates" onClick={() => setMobileMenuOpen(false)} className={mobileLink}>
              Combates
            </NavLink>

            {/* Misiones dropdown - Mobile */}
            <div>
              <button
                type="button"
                onClick={() => setMisionesOpenMobile(!misionesOpenMobile)}
                aria-expanded={misionesOpenMobile}
                className={`flex w-full items-center justify-between text-left ${mobileBase}`}
              >
                Misiones
                <svg aria-hidden="true" className={`w-4 h-4 transition-transform duration-200 ${misionesOpenMobile ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {misionesOpenMobile && (
                <div className="mt-1 ml-4 space-y-1">
                  <NavLink to="/fotos" onClick={() => setMobileMenuOpen(false)} className={mobileLink}>
                    Fotos
                  </NavLink>
                  <NavLink to="/torrebatalla" onClick={() => setMobileMenuOpen(false)} className={mobileLink}>
                    Torre Batalla
                  </NavLink>
                </div>
              )}
            </div>

            <NavLink to="/nidos" onClick={() => setMobileMenuOpen(false)} className={mobileLink}>
              Nidos
            </NavLink>
            <NavLink to="/donprodigio" onClick={() => setMobileMenuOpen(false)} className={mobileLink}>
              Don Prodigio
            </NavLink>
            <NavLink to="/chat" onClick={() => setMobileMenuOpen(false)} className={mobileLink}>
              Foro
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;