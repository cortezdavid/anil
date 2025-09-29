import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import data from '../../data/pokemones.json';

const Navbar = () => {
  const pokemones = data.pokemones;
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length > 0) {
      const filtered = pokemones.filter(
        p => p.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 15));
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
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo/Home Link */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              PokeAñil
            </Link>
          </div>
          {/* Buscador */}
          <div className="flex-1 max-w-lg mx-8 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar Pokémon..."
                value={search}
                onChange={handleChange}
                className="w-full px-4 py-2 pr-4 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            {/* Sugerencias */}
            {suggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                <ul className="py-2">
                  {suggestions.map(pokemon => (
                    <li
                      key={pokemon.id}
                      onClick={() => handleClick(pokemon)}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150 flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="text-gray-800 font-medium capitalize">
                        {pokemon.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Navegación */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                to="/objetos"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-50"
              >
                Objetos
              </Link>
              <Link
                to="/contacto"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-50"
              >
                Contacto
              </Link>
            </div>
          </div>

          {/* Menú móvil */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600 p-2">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;