import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Un solo campo de búsqueda, reutilizado para el layout móvil y el de escritorio
// (solo cambia el ancho). Con la X para borrar, igual que en la búsqueda de MT.
const SearchBox = ({ id, widthClass, search, suggestions, onChange, onKeyDown, onSelect, onClear }) => (
  <div className={`relative ${widthClass}`}>
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
      className="w-full rounded-lg border border-blue-800 bg-blue-900 px-4 py-3 pr-12 font-medium text-blue-100
        placeholder:text-blue-300/60 outline-none border-none
        [&::-webkit-search-cancel-button]:appearance-none"
    />
    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
      {search ? (
        <button
          type="button"
          onClick={onClear}
          aria-label="Borrar búsqueda"
          className="rounded-full p-1 text-blue-300 hover:text-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-100"
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

    {/* Sugerencias */}
    {suggestions.length > 0 && (
      <div className="absolute z-50 mt-2 max-h-80 w-full overflow-y-auto rounded-lg border border-blue-800 bg-blue-900 shadow-xl">
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

  const handleDownload = () => {
    window.open('https://docs.google.com/spreadsheets/d/1I4Y5EYuUkHs6uYxWz3Wfm4PpgADuoSp3/', '_blank');
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      handleClick(suggestions[0]);
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
        />
      </div>

      {/* Layout de botones y buscador */}
      <div className="flex items-center justify-between gap-4">
        {/* Botón anterior o descarga */}
        {prevPokemon ? (
          <button
            type="button"
            onClick={() => handleNavigation(prevPokemon.id)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2 font-semibold text-blue-100 transition-colors hover:bg-blue-800 lg:w-40 lg:flex-none"
          >
            <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="truncate">{prevPokemon.name}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleDownload}
            className="cursor-pointer flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2 font-semibold text-blue-100 transition-colors hover:bg-blue-800 lg:flex-none"
          >
            <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span className="whitespace-nowrap">Ver cambios de estadísticas y tipos</span>
          </button>
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
          />
        </div>

        {/* Botón siguiente */}
        <button
          type="button"
          onClick={() => nextPokemon && handleNavigation(nextPokemon.id)}
          disabled={!nextPokemon}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 font-semibold transition-colors lg:w-40 lg:flex-none
            ${nextPokemon
              ? 'bg-blue-700 text-blue-100 hover:bg-blue-800'
              : 'border border-blue-800 text-blue-300 cursor-not-allowed'
            }`}
        >
          {nextPokemon && <span className="truncate">{nextPokemon.name}</span>}
          <svg className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navegation;