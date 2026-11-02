import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-100";

// Los tres botones de la fila (anterior, hoja de cambios y siguiente) comparten el mismo estilo.
// py-[11px] + el borde de 1px lo dejan a la misma altura que el buscador (48px).
const navButtonBase = `flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-[11px] font-semibold transition-colors ${focusRing}`;
const navButtonEnabled = "cursor-pointer border-blue-800 text-blue-100 hover:bg-blue-900";

// Un solo campo de búsqueda, reutilizado para el layout móvil y el de escritorio
// (solo cambia el ancho).
const SearchBox = ({ id, widthClass, search, suggestions, onChange, onKeyDown, onSelect, onClear, onClose }) => (
  <div
    className={`relative ${widthClass}`}
    // Las sugerencias se cierran cuando el foco sale de todo el buscador
    onBlur={(e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) onClose();
    }}
  >
    <input
      id={id}
      name={id}
      type="search"
      inputMode="search"
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      data-form-type="other"
      aria-label="Buscar Pokémon"
      placeholder="Buscar Pokémon..."
      value={search}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className="w-full rounded-lg bg-blue-900 px-4 py-3 pr-12 font-medium text-blue-100
        placeholder:text-blue-300/60 outline-none
        [&::-webkit-search-cancel-button]:appearance-none"
    />
    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
      {search ? (
        <button
          type="button"
          onClick={onClear}
          aria-label="Borrar búsqueda"
          className={`rounded-full p-1 text-blue-300 hover:text-blue-100 ${focusRing}`}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      ) : (
        <svg className="pointer-events-none h-5 w-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )}
    </div>

    {suggestions.length > 0 && (
      <div
        className="absolute z-50 mt-2 max-h-80 w-full overflow-y-auto rounded-lg bg-blue-900 shadow-xl"
        onMouseDown={(e) => e.preventDefault()}
      >
        <ul className="py-2">
          {suggestions.map((pokemon) => (
            <li key={pokemon.id}>
              <button
                type="button"
                onClick={() => onSelect(pokemon)}
                className="flex w-full items-center justify-between gap-3 px-4 py-1.5 text-left hover:bg-blue-800/50 cursor-pointer"
              >
                <span className="font-semibold capitalize">{pokemon.name}</span>
                <span className="h-12 w-12 shrink-0 overflow-hidden">
                  <img
                    src={`/images/icons/${pokemon.id}.png`}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover object-left"
                  />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

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

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);

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

  const handleClear = () => {
    setSearch("");
    setSuggestions([]);
  };

  // Cierra las sugerencias sin borrar lo escrito
  const handleCloseSuggestions = () => setSuggestions([]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      handleClick(suggestions[0]);
    }
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <div className="mb-8">
      {/* Buscador arriba en móvil */}
      <div className="mb-4 lg:hidden">
        <SearchBox
          id="pokemon-search"
          widthClass="w-full"
          search={search}
          suggestions={suggestions}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onSelect={handleClick}
          onClear={handleClear}
          onClose={handleCloseSuggestions}
        />
      </div>

      {/* Layout de botones y buscador */}
      <div className="flex items-center justify-between gap-4">
        {/* Botón anterior o, en el primer Pokémon, enlace a la hoja de cambios */}
        {prevPokemon ? (
          <button
            type="button"
            onClick={() => handleNavigation(prevPokemon.id)}
            className={`${navButtonBase} ${navButtonEnabled} lg:w-40 lg:flex-none`}
          >
            <svg aria-hidden="true" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="truncate capitalize">
              {prevPokemon.name}
            </span>
          </button>
        ) : (
          <a
            href="https://docs.google.com/spreadsheets/d/1I4Y5EYuUkHs6uYxWz3Wfm4PpgADuoSp3/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${navButtonBase} ${navButtonEnabled} lg:flex-none`}
          >
            <svg aria-hidden="true" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="whitespace-nowrap">Ver cambios de estadísticas y tipos</span>
          </a>
        )}

        {/* Buscador en el centro (solo desktop) */}
        <div className="hidden w-96 lg:block">
          <SearchBox
            id="pokemon-search-desktop"
            widthClass="w-full"
            search={search}
            suggestions={suggestions}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onSelect={handleClick}
            onClear={handleClear}
            onClose={handleCloseSuggestions}
          />
        </div>

        {/* Botón siguiente */}
        <button
          type="button"
          onClick={() => nextPokemon && handleNavigation(nextPokemon.id)}
          disabled={!nextPokemon}
          className={`${navButtonBase} lg:w-40 lg:flex-none ${nextPokemon
            ? navButtonEnabled
            : 'cursor-not-allowed border-blue-900 text-blue-300/50'
            }`}
        >
          {nextPokemon && (
            <span className="truncate capitalize">
              {nextPokemon.name}
            </span>
          )}
          <svg aria-hidden="true" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navegation;