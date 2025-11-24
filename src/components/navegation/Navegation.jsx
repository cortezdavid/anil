import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Navegation = ({ pokemones }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentIndex = pokemones.findIndex(p => p.id.toLowerCase() === id.toLowerCase());
  const prevPokemon = currentIndex > 0 ? pokemones[currentIndex - 1] : null;
  const nextPokemon = currentIndex < pokemones.length - 1 ? pokemones[currentIndex + 1] : null;

  const handleNavigation = (pokemonId) => {
    navigate(`/pokemon/${pokemonId.toLowerCase()}`);
  };

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setSelectedIndex(-1);

    if (value.length > 0) {
      const filtered = pokemones
        .filter(p => p.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 10);
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      handleClick(suggestions[0]);
    }
  };

  return (
    <div className="mb-8">
      {/* Buscador arriba en móvil */}
      <div className="lg:hidden mb-4">
        <div className="relative w-full">
          <input
            id="pokemon-search"
            name="pokemon-search"
            type="search"
            inputMode="search"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            data-form-type="other"
            placeholder="Buscar Pokémon..."
            value={search}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-3 pr-12 text-slate-100 bg-slate-800 rounded-lg shadow-lg font-medium 
           border-none outline-none focus:outline-none focus:border-none focus:ring-0 placeholder:text-slate-500"/>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Sugerencias */}
          {suggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-2 bg-slate-800 rounded-lg shadow-2xl max-h-80 overflow-y-auto border border-slate-700">
              <ul className="py-2">
                {suggestions.map(pokemon => (
                  <li
                    key={pokemon.id}
                    onClick={() => handleClick(pokemon)}
                    className="px-4 hover:bg-slate-700 cursor-pointer transition-colors duration-150 flex items-center justify-between"
                  >
                    <span className="text-slate-200 font-semibold capitalize">
                      {pokemon.name}
                    </span>
                    <div className="w-16 h-16 overflow-hidden flex-shrink-0">
                      <img
                        src={`/images/icons/${pokemon.id}.png`}
                        alt={pokemon.name}
                        loading="lazy"
                        className="w-32 h-16 object-cover object-left"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Layout de botones y buscador */}
      <div className="flex flex-row lg:flex-row justify-between items-center gap-4">
        {/* Botón anterior */}
        <button
          onClick={() => handleNavigation(prevPokemon.id)}
          disabled={!prevPokemon}
          className={`flex-1 lg:w-40 lg:flex-none flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-bold ${prevPokemon
            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
            : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {prevPokemon && (
            <span className="truncate">
              {prevPokemon.name}
            </span>
          )}
        </button>

        {/* Buscador en el centro (solo desktop) */}
        <div className="hidden lg:block w-96">
          <div className="relative">
            <input
              id="pokemon-search-desktop"
              name="pokemon-search"
              type="text"
              placeholder="Buscar Pokémon..."
              value={search}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 pr-12 text-slate-100 bg-slate-800 rounded-lg shadow-lg font-medium 
             border-none outline-none focus:outline-none focus:border-none focus:ring-0 placeholder:text-slate-500"/>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Sugerencias */}
            {suggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-2 bg-slate-800 rounded-lg shadow-2xl max-h-80 overflow-y-auto border border-slate-700">
                <ul className="py-2">
                  {suggestions.map(pokemon => (
                    <li
                      key={pokemon.id}
                      onClick={() => handleClick(pokemon)}
                      className="px-4 hover:bg-slate-700 cursor-pointer transition-colors duration-150 flex items-center justify-between"
                    >
                      <span className="text-slate-200 font-semibold capitalize">
                        {pokemon.name}
                      </span>
                      <div className="w-16 h-16 overflow-hidden flex-shrink-0">
                        <img
                          src={`/images/icons/${pokemon.id}.png`}
                          alt={pokemon.name}
                          loading="lazy"
                          className="w-32 h-16 object-cover object-left"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Botón siguiente */}
        <button
          onClick={() => handleNavigation(nextPokemon.id)}
          disabled={!nextPokemon}
          className={`flex-1 lg:w-40 lg:flex-none flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-bold ${nextPokemon
            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
            : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}
        >
          {nextPokemon && (
            <span className="truncate">
              {nextPokemon.name}
            </span>
          )}
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Navegation