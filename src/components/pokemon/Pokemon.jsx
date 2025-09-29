import { Link, useParams } from "react-router-dom";
import data from "../../data/pokemones.json";
import types from "../../data/types.json"
import abilitiesData from "../../data/abilities.json"
import itemsData from "../../data/items.json"
import PokemonFront from "../pokemonFront/PokemonFront";
import MovimientosSection from "../movimientosSection/movimientosSection";

const Pokemon = () => {
  const { id } = useParams();
  const pokemones = data.pokemones;

  const pokemon = pokemones.find(p => p.id.toLowerCase() === id.toLowerCase());

  if (!pokemon) return <p>Pokémon no encontrado</p>;

  const getTypeName = (typeId) => {
    const typeObj = types.types.find(t => t.id === typeId);
    return typeObj ? typeObj.name : typeId;
  }

  const getAbilityName = (id) => {
    const ability = abilitiesData.abilities.find(a => a.id === id);
    return ability ? ability.name : id;
  }

  const getItemName = (id) => {
    const item = itemsData.items.find(i => i.id === id);
    return item ? item.name : id; // Si no existe, devuelve el id tal cual
  }



  const getTypeColor = (type) => {
    const colors = {
      'FIRE': 'bg-red-500',
      'WATER': 'bg-blue-500',
      'GRASS': 'bg-green-500',
      'ELECTRIC': 'bg-yellow-500',
      'PSYCHIC': 'bg-purple-500',
      'ICE': 'bg-cyan-400',
      'DRAGON': 'bg-indigo-600',
      'DARK': 'bg-gray-800',
      'FAIRY': 'bg-pink-400',
      'FIGHTING': 'bg-red-700',
      'POISON': 'bg-purple-600',
      'GROUND': 'bg-yellow-600',
      'FLYING': 'bg-indigo-400',
      'BUG': 'bg-green-600',
      'ROCK': 'bg-yellow-800',
      'GHOST': 'bg-purple-800',
      'STEEL': 'bg-gray-500',
      'NORMAL': 'bg-gray-400'
    };
    return colors[type] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Aquí va tu Navbar */}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Título del Pokémon */}
        <h1 className="text-4xl font-black text-gray-900 mb-8 uppercase tracking-wider">
          {pokemon.name}
        </h1>

        {/* Layout principal - 3 columnas */}
        {/* Layout principal */}
        <div className="space-y-8">

          {/* Grid superior - 3 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Columna 1 - Sprite + Info básica */}
            <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
              {/* Sprite del Pokémon */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 mb-6 flex justify-center border border-gray-100">
                <PokemonFront img={pokemon.image} scale={200} />
              </div>

              {/* Info básica mejorada */}
              <div className="space-y-4">
                {/* Tipos con badges */}
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Tipo</span>
                  <div className="flex gap-2 flex-wrap">
                    {pokemon.types.map((type, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getTypeColor(type)}`}
                      >
                        {getTypeName(type)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Datos físicos */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Altura</div>
                    <div className="text-lg font-bold text-gray-900">{pokemon.physicalData.height}</div>
                    <div className="text-xs text-gray-500">metros</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Peso</div>
                    <div className="text-lg font-bold text-gray-900">{pokemon.physicalData.weight}</div>
                    <div className="text-xs text-gray-500">kg</div>
                  </div>
                </div>

                {/* Habilidades */}
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">Habilidades</span>
                  <div className="space-y-2">
                    {pokemon.abilities.map((ability, index) => {
                      return (
                        <div
                          key={index}
                          className="relative flex items-center justify-between bg-blue-50 hover:bg-blue-100 rounded-lg px-3 py-2 transition-colors duration-150"
                        >
                          <span className="text-sm font-medium text-blue-900 capitalize">
                            {getAbilityName(ability)}
                          </span>
                          <span className="text-xs text-blue-600">Normal</span>
                        </div>
                      );
                    })}

                    {pokemon.hiddenAbilities &&
                      pokemon.hiddenAbilities.map((ability, index) => {
                        return (
                          <div
                            key={`hidden-${index}`}
                            className="relative flex items-center justify-between bg-purple-50 hover:bg-purple-100 rounded-lg px-3 py-2 transition-colors duration-150"
                          >
                            <span className="text-sm font-medium text-purple-900 capitalize">
                              {getAbilityName(ability)}
                            </span>
                            <span className="text-xs text-purple-600">Oculta</span>

                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>

            {/* Columna 2 - Stack vertical con Ubicación y Descripción */}
            <div className="space-y-6">
              {/* Ubicación */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-wider">
                  Ubicación
                </h2>
                {/* Placeholder para imagen de ubicación */}
                <img src={pokemon.location} alt={pokemon.name} className="block mx-auto" />
                <span className="font-semibold text-gray-700">{pokemon.route}</span>
              </div>

              {/* Descripción */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Descripción</h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {pokemon.pokedex}
                </p>
              </div>
            </div>

            {/* Columna 3 - Stack vertical con Stats y Evolución */}
            <div className="space-y-6">
              {/* Base Stats */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Estadísticas base</h2>
                <div className="space-y-4">

                  <div className="grid grid-cols-4 gap-4 items-center">
                    <span className="text-sm font-medium text-gray-700 text-right">PS:</span>
                    <span className="text-sm font-bold text-gray-900 text-center w-8">{pokemon.baseStats.hp}</span>
                    <div className="col-span-2">
                      <div className="bg-gray-200 rounded-full h-3 relative">
                        <div
                          className="bg-red-500 h-3 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${Math.min((pokemon.baseStats.hp / 255) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 items-center">
                    <span className="text-sm font-medium text-gray-700 text-right">Ataque:</span>
                    <span className="text-sm font-bold text-gray-900 text-center w-8">{pokemon.baseStats.attack}</span>
                    <div className="col-span-2">
                      <div className="bg-gray-200 rounded-full h-3 relative">
                        <div
                          className="bg-orange-500 h-3 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${Math.min((pokemon.baseStats.attack / 255) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 items-center">
                    <span className="text-sm font-medium text-gray-700 text-right">Defensa:</span>
                    <span className="text-sm font-bold text-gray-900 text-center w-8">{pokemon.baseStats.defense}</span>
                    <div className="col-span-2">
                      <div className="bg-gray-200 rounded-full h-3 relative">
                        <div
                          className="bg-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${Math.min((pokemon.baseStats.defense / 255) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 items-center">
                    <span className="text-sm font-medium text-gray-700 text-right">At. Esp:</span>
                    <span className="text-sm font-bold text-gray-900 text-center w-8">{pokemon.baseStats.specialAttack}</span>
                    <div className="col-span-2">
                      <div className="bg-gray-200 rounded-full h-3 relative">
                        <div
                          className="bg-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${Math.min((pokemon.baseStats.specialAttack / 255) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 items-center">
                    <span className="text-sm font-medium text-gray-700 text-right">Def. Esp:</span>
                    <span className="text-sm font-bold text-gray-900 text-center w-8">{pokemon.baseStats.specialDefense}</span>
                    <div className="col-span-2">
                      <div className="bg-gray-200 rounded-full h-3 relative">
                        <div
                          className="bg-pink-500 h-3 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${Math.min((pokemon.baseStats.specialDefense / 255) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 items-center">
                    <span className="text-sm font-medium text-gray-700 text-right">Velocidad:</span>
                    <span className="text-sm font-bold text-gray-900 text-center w-8">{pokemon.baseStats.speed}</span>
                    <div className="col-span-2">
                      <div className="bg-gray-200 rounded-full h-3 relative">
                        <div
                          className="bg-green-500 h-3 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${Math.min((pokemon.baseStats.speed / 255) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <span className="text-sm font-bold text-gray-900 text-right">Total:</span>
                      <span className="text-sm font-bold text-blue-600 text-center w-8">
                        {Object.values(pokemon.baseStats).reduce((sum, stat) => sum + stat, 0)}
                      </span>
                      <div className="col-span-2">
                        <div className="bg-gray-200 rounded-full h-3 relative">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${Math.min((Object.values(pokemon.baseStats).reduce((sum, stat) => sum + stat, 0) / 720) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Evolución */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Evolución</h2>

                {pokemon.evolutions && pokemon.evolutions.length > 0 ? (
                  <div className="space-y-4">
                    {pokemon.evolutions.map((evo, index) => (
                      <Link
                        key={index}
                        to={`/pokemon/${evo.species.toLowerCase()}`}
                        className="block"
                      >
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg hover:from-blue-100 hover:to-purple-100 transition-all duration-200 border border-gray-200 hover:border-blue-300">

                          {/* Flecha y método */}
                          <div className="flex flex-col items-center">
                            <div className="text-2xl text-blue-600 mb-1">→</div>
                            <div className="text-xs text-gray-600 text-center">
                              <div className="font-semibold">{evo.method}</div>
                              {evo.requirement && (
                                <div className="text-gray-500">{getItemName(evo.requirement)}</div>
                              )}
                            </div>
                          </div>

                          {/* Sprite + nombre */}
                          <div className="flex items-center space-x-4 flex-1 ml-4">
                            <div className="bg-white rounded-lg p-2 shadow-sm">
                              <PokemonFront
                                img={`/images/pokemonFront/${evo.species}.png`}
                                scale={80}
                              />
                            </div>
                            <div>
                              <div className="font-bold text-lg text-gray-900 capitalize">
                                {evo.species.toLowerCase()}
                              </div>
                              <div className="text-sm text-gray-500">
                                Siguiente evolución
                              </div>
                            </div>
                          </div>

                          {/* Icono de enlace */}
                          <div className="text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">✨</div>
                    <p className="text-gray-500 text-sm">
                      Este Pokémon no tiene más evoluciones
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Movimientos - Ancho completo abajo */}
          {/* <div className="bg-white rounded-lg shadow-sm p-6">
            <MovimientosSection pokemon={pokemon} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Pokemon;