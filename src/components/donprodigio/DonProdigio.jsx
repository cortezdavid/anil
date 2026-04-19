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
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length > 0) {
      const filtered = pokemonesData.pokemones
        .filter(p => p.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 10);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleClick = (pokemon) => {
    setSelectedPokemon(pokemon);
    setSearch("");
    setSuggestions([]);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // ← Esta línea
  };

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

  // Buscar pokémon similares (±10%) - ordenados por aparición en JSON
  const similarPokemon = useMemo(() => {
    if (!selectedPokemon) return [];

    const selectedTotal = getTotalStats(selectedPokemon);
    const tenPercent = selectedTotal * 0.1;
    const minRange = selectedTotal - tenPercent;
    const maxRange = selectedTotal + tenPercent;

    return pokemonesData.pokemones
      .filter(pokemon => {
        const total = getTotalStats(pokemon);
        return total >= minRange && total <= maxRange && pokemon.id !== selectedPokemon.id;
      });
  }, [selectedPokemon]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-black text-slate-100 mb-6 uppercase tracking-wider drop-shadow-sm">
          Don Prodigio
        </h1>

        <div className="bg-blue-900/20 border border-blue-600/30 rounded-xl p-4 mb-8">
          <p className="text-slate-300 leading-relaxed">
            Nota: No es compatible con el modo Random. Acá no están incluidas las formas alternativas de los Pokémon para los intercambios.</p>
        </div>

        {/* Buscador */}
        <div className="mb-6">
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
              placeholder="Buscar Pokémon para dar..."
              value={search}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 pr-12 text-slate-100 bg-slate-800 rounded-lg shadow-lg font-medium 
                border-none outline-none focus:outline-none focus:border-none focus:ring-0 placeholder:text-slate-500"
            />
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
                      className="px-4 py-2 hover:bg-slate-700 cursor-pointer transition-colors duration-150 flex items-center justify-between"
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
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Resultado seleccionado */}
        {selectedPokemon ? (
          <div className="space-y-6">
            {/* Info del Pokémon seleccionado */}
            <div className="bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-700">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Sprite del Pokémon */}
                <div className="flex justify-center md:justify-start">
                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                    <PokemonStaticSprite
                      img={selectedPokemon.image}
                      size={128}
                    />
                  </div>
                </div>

                {/* Información */}
                <div className="flex-1">
                  <h2 className="text-2xl font-black text-slate-100 mb-4">
                    {selectedPokemon.name}
                  </h2>
                  <div className="text-slate-300 space-y-2">
                    <div className="mt-4 text-sm grid grid-cols-2 gap-2">
                      <p><strong>HP:</strong> {selectedPokemon.baseStats.hp}</p>
                      <p><strong>Ataque:</strong> {selectedPokemon.baseStats.attack}</p>
                      <p><strong>Defensa:</strong> {selectedPokemon.baseStats.defense}</p>
                      <p><strong>Ataque Esp.:</strong> {selectedPokemon.baseStats.specialAttack}</p>
                      <p><strong>Defensa Esp.:</strong> {selectedPokemon.baseStats.specialDefense}</p>
                      <p><strong>Velocidad:</strong> {selectedPokemon.baseStats.speed}</p>
                    </div>
                    <p className="text-lg">
                      <strong className="text-slate-100">Estadística Total:</strong>{' '}
                      <span className="font-black text-blue-400">
                        {getTotalStats(selectedPokemon)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pokémon similares */}
            <div className="bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-700">
              <h3 className="text-xl font-black text-slate-100 mb-4">
                {similarPokemon.length} Pokémon posibles que puedes recibir a cambio de {selectedPokemon.name}
              </h3>

              {similarPokemon.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                  {similarPokemon.map(pokemon => (
                    <div
                      key={pokemon.id}
                      className="bg-slate-700 rounded-lg p-3 flex flex-col items-center hover:bg-slate-600 transition-colors cursor-pointer"
                      onClick={() => handleClick(pokemon)}
                    >
                      <div className="w-16 h-16 overflow-hidden flex-shrink-0 mb-2">
                        <img
                          src={`/images/icons/${pokemon.id}.png`}
                          alt={pokemon.name}
                          loading="lazy"
                          className="w-32 h-16 object-cover object-left"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                      <span className="text-slate-200 font-semibold text-sm text-center">
                        {pokemon.name}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-center py-4">
                  No se encontraron Pokémon similares en este rango
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-slate-400 font-semibold">
              Busca un pokémon que quieres intercambiar
            </p>
          </div>
        )}

        <AutoScrollTop />
      </div>
    </div>
  );
};

export default DonProdigio;