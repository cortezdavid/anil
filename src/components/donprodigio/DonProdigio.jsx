import { useState, useMemo } from "react";
import pokemonesData from "../../data/pokemones.json";
import PokemonStaticSprite from '../PokemonStaticSprite/PokemonStaticSprite';
import AutoScrollTop from "../autoScrollTop/AutoScrollTop";
import { useSEO } from '../../hooks/useSEO';

const DonProdigio = () => {
  useSEO({
    title: 'Don Prodigio - Pokémon Añil',
    description: 'Don Prodigio en Pokémon Añil',
    keywords: 'pokémon añil don prodigio'
  });

  const [search, setSearch] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  // 'give': tengo este Pokémon y lo doy → veo qué puedo recibir
  // 'receive': quiero este Pokémon → veo qué podría dar para recibirlo
  const [mode, setMode] = useState('give');

  const term = search.trim().toLowerCase();
  const suggestions = term
    ? pokemonesData.pokemones
        .filter(p => p.name.toLowerCase().includes(term))
        .slice(0, 10)
    : [];

  const handleClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setSearch("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClear = () => setSearch("");

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      handleClick(suggestions[0]);
    }
  };

  // Calcular estadística total
  const getTotalStats = (pokemon) => {
    if (!pokemon?.baseStats) return 0;
    const { hp, attack, defense, specialAttack, specialDefense, speed } = pokemon.baseStats;
    return hp + attack + defense + specialAttack + specialDefense + speed;
  };

  // Buscar pokémon dentro del ±10% - ordenados por aparición en JSON
  const similarPokemon = useMemo(() => {
    if (!selectedPokemon) return [];

    const selectedTotal = getTotalStats(selectedPokemon);

    // Modo "doy este Pokémon": el resultado debe estar dentro del ±10% del elegido
    // Modo "quiero este Pokémon": es la relación inversa, el rango queda más ancho
    const [minRange, maxRange] = mode === 'give'
      ? [selectedTotal * 0.9, selectedTotal * 1.1]
      : [selectedTotal / 1.1, selectedTotal / 0.9];

    return pokemonesData.pokemones
      .filter(pokemon => {
        const total = getTotalStats(pokemon);
        return total >= minRange && total <= maxRange && pokemon.id !== selectedPokemon.id;
      });
  }, [selectedPokemon, mode]);

  return (
    <div className="min-h-screen bg-blue-950 text-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">
          Don Prodigio
        </h1>

        {/* Nota: un texto con una línea a la izquierda, sin caja */}
        <p className="mb-8 border-l-2 border-blue-700 pl-4 leading-relaxed">
          Nota: No es compatible con el modo Random. Acá no están incluidas las formas alternativas de los Pokémon para los intercambios.
        </p>

        {/* Modo: tengo este Pokémon / quiero este Pokémon (barra plana separada por líneas) */}
        <div className="mb-6 flex border-y border-blue-800">
          <button
            type="button"
            aria-pressed={mode === 'give'}
            onClick={() => setMode('give')}
            className={`flex-1 px-6 py-3 font-semibold transition-colors
              focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-100
              ${mode === 'give'
                ? 'bg-blue-900 text-blue-100'
                : 'text-blue-300 hover:bg-blue-900/50 hover:text-blue-100'
              }`}
          >
            Tengo este Pokémon
          </button>
          <button
            type="button"
            aria-pressed={mode === 'receive'}
            onClick={() => setMode('receive')}
            className={`flex-1 px-6 py-3 font-semibold transition-colors
              focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-100
              ${mode === 'receive'
                ? 'bg-blue-900 text-blue-100'
                : 'text-blue-300 hover:bg-blue-900/50 hover:text-blue-100'
              }`}
          >
            Quiero este Pokémon
          </button>
        </div>

        {/* Buscador */}
        <div className="mb-8">
          <div className="relative mx-auto">
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
              placeholder={mode === 'give' ? "Buscar Pokémon para dar..." : "Buscar el Pokémon que quieres..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 pr-12 text-blue-100 bg-blue-900 rounded-lg font-medium outline-none
                placeholder:text-blue-300/60
                [&::-webkit-search-cancel-button]:appearance-none"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {search ? (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Borrar búsqueda"
                  className="p-1 rounded-full text-blue-300 hover:text-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-100"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ) : (
                <svg className="h-5 w-5 text-blue-300 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </div>

            {/* Sugerencias */}
            {term && (
              <div className="absolute z-50 w-full mt-2 max-h-80 overflow-y-auto rounded-lg border border-blue-800 bg-blue-900 shadow-2xl">
                {suggestions.length > 0 ? (
                  <ul className="py-2">
                    {suggestions.map(pokemon => (
                      <li key={pokemon.id}>
                        <button
                          type="button"
                          onClick={() => handleClick(pokemon)}
                          className="w-full flex items-center justify-between gap-3 px-4 py-2 text-left hover:bg-blue-800/50 transition-colors duration-150"
                        >
                          <span className="font-semibold capitalize">{pokemon.name}</span>
                          <span className="w-16 h-16 overflow-hidden flex-shrink-0">
                            <img
                              src={`/images/icons/${pokemon.id}.png`}
                              alt=""
                              loading="lazy"
                              className="w-32 h-16 object-cover object-left"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="px-4 py-3 text-blue-300">No hay ningún Pokémon con ese nombre.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Resultado seleccionado */}
        {selectedPokemon ? (
          <div className="space-y-10">
            {/* Pokémon elegido: sprite a la izquierda, estadísticas a la derecha */}
            <section className="flex flex-col gap-6 md:flex-row md:items-start">
              <div className="flex justify-center md:justify-start">
                <div className="rounded-lg bg-blue-900 p-4">
                  <PokemonStaticSprite
                    img={selectedPokemon.image}
                    size={128}
                  />
                </div>
              </div>

              <div className="flex-1">
                <h2 className="mb-4 text-2xl font-semibold">
                  {selectedPokemon.name}
                </h2>

                <dl className="grid grid-cols-3 gap-4 border-y border-blue-800 py-4 lg:grid-cols-6">
                  <div>
                    <dt className="text-sm">HP</dt>
                    <dd className="text-xl font-semibold">{selectedPokemon.baseStats.hp}</dd>
                  </div>
                  <div>
                    <dt className="text-sm">Ataque</dt>
                    <dd className="text-xl font-semibold">{selectedPokemon.baseStats.attack}</dd>
                  </div>
                  <div>
                    <dt className="text-sm ">Defensa</dt>
                    <dd className="text-xl font-semibold">{selectedPokemon.baseStats.defense}</dd>
                  </div>
                  <div>
                    <dt className="text-sm">Ataque Esp.</dt>
                    <dd className="text-xl font-semibold">{selectedPokemon.baseStats.specialAttack}</dd>
                  </div>
                  <div>
                    <dt className="text-sm">Defensa Esp.</dt>
                    <dd className="text-xl font-semibold">{selectedPokemon.baseStats.specialDefense}</dd>
                  </div>
                  <div>
                    <dt className="text-sm ">Velocidad</dt>
                    <dd className="text-xl font-semibold">{selectedPokemon.baseStats.speed}</dd>
                  </div>
                </dl>

                <p className="mt-4 border-blue-700">
                  <span className="block text-sm font-medium">Estadística Total</span>
                  <span className="block text-3xl font-bold">{getTotalStats(selectedPokemon)}</span>
                </p>
              </div>
            </section>

            {/* Pokémon similares */}
            <section>
              <h3 className="mb-4 border-b border-blue-800 pb-3 text-xl font-bold">
                {mode === 'give'
                  ? `${similarPokemon.length} Pokémon posibles que puedes recibir a cambio de ${selectedPokemon.name}`
                  : `${similarPokemon.length} Pokémon posibles que podrías dar para recibir a ${selectedPokemon.name}`}
              </h3>

              {similarPokemon.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                  {similarPokemon.map(pokemon => (
                    <button
                      key={pokemon.id}
                      type="button"
                      onClick={() => handleClick(pokemon)}
                      className="bg-blue-900 rounded-lg p-3 flex flex-col items-center hover:bg-blue-800 transition-colors
                        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-100"
                    >
                      <span className="w-16 h-16 overflow-hidden flex-shrink-0 mb-2">
                        <img
                          src={`/images/icons/${pokemon.id}.png`}
                          alt=""
                          loading="lazy"
                          className="w-32 h-16 object-cover object-left"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </span>
                      <span className="font-semibold text-sm text-center capitalize">
                        {pokemon.name}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-blue-300 text-center py-4">
                  No se encontraron Pokémon similares en este rango
                </p>
              )}
            </section>
          </div>
        ) : (
          <p className="text-center py-12 text-blue-300 font-medium">
            {mode === 'give'
              ? 'Busca un pokémon que quieres intercambiar'
              : 'Busca el pokémon que quieres recibir'}
          </p>
        )}

        <AutoScrollTop />
      </div>
    </div>
  );
};

export default DonProdigio;