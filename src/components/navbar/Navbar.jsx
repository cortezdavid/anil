import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import data from '../../data/pokemones.json';

const Navbar = () => {
  const pokemones = data.pokemones;
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length > 0) {
      const filtered = pokemones.filter(
        p => p.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleClick = (pokemon) => {
    navigate(`/pokemon/${pokemon.id.toLowerCase()}`);
    setSearch("");
    setSuggestions([]);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-600 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo/Home Link */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-2xl font-black text-white hover:text-blue-100 transition-colors duration-200 drop-shadow-md"
            >
              PokeAñil
            </Link>
          </div>

          {/* Buscador - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar Pokémon..."
                value={search}
                onChange={handleChange}
                className="w-full px-4 py-2 pr-4 text-gray-900 bg-white border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all duration-200 font-medium"
              />
            </div>

            {/* Sugerencias */}
            {suggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-2 top-full bg-white border-2 border-blue-300 rounded-lg shadow-2xl max-h-80 overflow-y-auto">
                <ul className="py-2">
                  {suggestions.map(pokemon => (
                    <li
                      key={pokemon.id}
                      onClick={() => handleClick(pokemon)}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150 flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="text-gray-900 font-semibold capitalize">
                        {pokemon.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Navegación - Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/mt"
                className="text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200"
              >
                Mt's
              </Link>
              <Link
                to="/contacto"
                className="text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200"
              >
                Vacio
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
            {/* Buscador móvil */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar Pokémon..."
                value={search}
                onChange={handleChange}
                className="w-full px-4 py-2 text-gray-900 bg-white border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white font-medium"
              />
              {suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white border-2 border-blue-300 rounded-lg shadow-2xl max-h-60 overflow-y-auto">
                  <ul className="py-2">
                    {suggestions.map(pokemon => (
                      <li
                        key={pokemon.id}
                        onClick={() => {
                          handleClick(pokemon);
                          setMobileMenuOpen(false);
                        }}
                        className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150"
                      >
                        <span className="text-gray-900 font-semibold capitalize">
                          {pokemon.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Links móvil */}
            <Link
              to="/mt"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200"
            >
              Mt's
            </Link>
            <Link
              to="/contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white hover:text-blue-100 hover:bg-blue-700 px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200"
            >
              Vacio
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;