import { Link, useParams } from "react-router-dom";
import data from "../../data/pokemones.json";
import types from "../../data/types.json"
import abilitiesData from "../../data/abilities.json"
import itemsData from "../../data/items.json"
import PokemonFront from "../pokemonFront/PokemonFront";
// import MovimientosSection from "../movimientosSection/movimientosSection";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
      {/* Aquí va tu Navbar */}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Título del Pokémon */}
        <h1 className="text-4xl font-black text-blue-900 mb-8 uppercase tracking-wider drop-shadow-sm">
          {pokemon.name}
        </h1>

        {/* Layout principal */}
        <div className="space-y-8">

          {/* Grid superior - 3 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Columna 1 - Sprite + Info básica */}
            <div className="bg-gradient-to-br from-blue-300 to-blue-600 rounded-xl shadow-2xl p-6 h-fit border-2 border-none">
              {/* Sprite del Pokémon */}
              <div className="bg-blue-100 rounded-xl p-8 mb-6 flex justify-center border-2 border-blue-300 shadow-lg">
                <PokemonFront img={pokemon.image} scale={200} />
              </div>

              {/* Info básica mejorada */}
              <div className="space-y-4">
                {/* Tipos con badges */}
                <div className="flex flex-col">
                  <span className="text-sm font-black text-blue-900 uppercase tracking-wide mb-3">Tipo</span>
                  <div className="flex gap-2 flex-wrap">
                    {pokemon.types.map((type, index) => (
                      <span
                        key={index}
                        className={`px-4 py-1.5 rounded-full text-sm font-bold text-white ${getTypeColor(type)} shadow-lg border-2 border-white/30`}
                      >
                        {getTypeName(type)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Datos físicos */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 text-center shadow-lg">
                    <div className="text-xs font-black text-blue-700 uppercase tracking-wider mb-2">Altura</div>
                    <div className="text-2xl font-black text-blue-900">{pokemon.physicalData.height}</div>
                    <div className="text-xs font-semibold text-blue-600">metros</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center shadow-lg">
                    <div className="text-xs font-black text-blue-700 uppercase tracking-wider mb-2">Peso</div>
                    <div className="text-2xl font-black text-blue-900">{pokemon.physicalData.weight}</div>
                    <div className="text-xs font-semibold text-blue-600">kg</div>
                  </div>
                </div>

                {/* Habilidades */}
                <div>
                  <span className="text-sm font-black text-blue-900 uppercase tracking-wide mb-3 block">Habilidades</span>
                  <div className="space-y-2">
                    {pokemon.abilities.map((ability, index) => {
                      return (
                        <div
                          key={index}
                          className="relative flex items-center justify-between bg-white hover:bg-blue-50 rounded-lg px-4 py-3 transition-all duration-150 shadow-lg"
                        >
                          <span className="text-sm font-bold text-blue-900">
                            {getAbilityName(ability)}
                          </span>
                          <span className="text-xs font-bold text-white bg-blue-600 px-3 py-1 rounded-full shadow-sm">Normal</span>
                        </div>
                      );
                    })}

                    {pokemon.hiddenAbilities &&
                      pokemon.hiddenAbilities.map((ability, index) => {
                        return (
                          <div
                            key={`hidden-${index}`}
                            className="relative flex items-center justify-between bg-white hover:bg-indigo-50 rounded-lg px-4 py-3 transition-all duration-150 shadow-lg"
                          >
                            <span className="text-sm font-bold text-indigo-900">
                              {getAbilityName(ability)}
                            </span>
                            <span className="text-xs font-bold text-white bg-indigo-600 px-3 py-1 rounded-full shadow-sm">Oculta</span>
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
              <div className="bg-gradient-to-br from-blue-300 to-blue-600 rounded-xl shadow-2xl p-6 border-2 border-none">
                <h2 className="text-2xl font-black text-blue-900 mb-4 tracking-wider uppercase drop-shadow-sm">
                  Ubicación
                </h2>
                {/* Imagen de ubicación con fondo blanco */}
                <div className="bg-white rounded-lg p-4 mb-3 shadow-lg">
                  <img src={pokemon.location} alt={pokemon.name} className="block mx-auto rounded-lg" />
                </div>
                <div className="bg-white rounded-lg px-4 py-2 shadow-md">
                  <span className="font-bold text-blue-900">{pokemon.route}</span>
                </div>
              </div>

              {/* Descripción */}
              <div className="bg-gradient-to-br from-blue-300 to-blue-600 rounded-xl shadow-2xl p-6 border-2 border-none">
                <h2 className="text-2xl font-black text-blue-900 mb-4 tracking-wider uppercase drop-shadow-sm">
                  Descripción
                </h2>
                <div className="bg-white rounded-lg p-4 shadow-lg">
                  <p className="text-gray-900 text-base leading-relaxed font-medium">
                    {pokemon.pokedex}
                  </p>
                </div>
              </div>
            </div>

            {/* text-sm font-bold text-gray-900 text-center w-8 */}

            {/* Columna 3 - Stack vertical con Stats y Evolución */}
            <div className="space-y-6">
              {/* Base Stats */}
              <div className="bg-gradient-to-br from-blue-300 to-blue-600 rounded-xl shadow-2xl p-6 border-2 border-none">
                <h2 className="text-2xl font-black text-blue-900 mb-6 uppercase tracking-wider drop-shadow-sm">Estadísticas base</h2>

                <div className="bg-white rounded-lg p-4 shadow-lg">
                  <div className="space-y-4">

                    <div className="grid grid-cols-4 gap-4 items-center">
                      <span className="text-sm font-bold text-gray-700 text-right">PS:</span>
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
                      <span className="text-sm font-bold text-gray-700 text-right">Ataque:</span>
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
                      <span className="text-sm font-bold text-gray-700 text-right">Defensa:</span>
                      <span className="text-sm font-bold text-gray-900 text-center w-8">{pokemon.baseStats.defense}</span>
                      <div className="col-span-2">
                        <div className="bg-gray-200 rounded-full h-3 relative">
                          <div
                            className="bg-yellow-500 h-3 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${Math.min((pokemon.baseStats.defense / 255) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                      <span className="text-sm font-bold text-gray-700 text-right">At. Esp:</span>
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
                      <span className="text-sm font-bold text-gray-700 text-right">Def. Esp:</span>
                      <span className="text-sm font-bold text-gray-900 text-center w-8">{pokemon.baseStats.specialDefense}</span>
                      <div className="col-span-2">
                        <div className="bg-gray-200 rounded-full h-3 relative">
                          <div
                            className="bg-green-500 h-3 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${Math.min((pokemon.baseStats.specialDefense / 255) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                      <span className="text-sm font-bold text-gray-700 text-right">Velocidad:</span>
                      <span className="text-sm font-bold text-gray-900 text-center w-8">{pokemon.baseStats.speed}</span>
                      <div className="col-span-2">
                        <div className="bg-gray-200 rounded-full h-3 relative">
                          <div
                            className="bg-pink-500 h-3 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${Math.min((pokemon.baseStats.speed / 255) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="pt-4 mt-4 border-t border-gray-300">
                      <div className="grid grid-cols-4 gap-4 items-center">
                        <span className="text-sm font-black text-gray-900 text-right">Total:</span>
                        <span className="text-sm font-black text-gray-900 text-center w-8">
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
              </div>

              {/* Evolución */}
              <div className="bg-gradient-to-br from-blue-300 to-blue-600 rounded-xl shadow-2xl p-6 border-2 border-none">
                <h2 className="text-2xl font-black text-blue-900 mb-4 uppercase tracking-wider drop-shadow-sm">Evolución</h2>

                {pokemon.evolutions && pokemon.evolutions.length > 0 ? (
                  <div className="space-y-4">
                    {pokemon.evolutions.map((evo, index) => (
                      <Link
                        key={index}
                        to={`/pokemon/${evo.species.toLowerCase()}`}
                        className="block"
                      >
                        <div className="flex items-center justify-between p-4 bg-white rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl">

                          {/* Flecha y método */}
                          <div className="flex flex-col items-center">
                            <div className="text-2xl text-blue-600 mb-1">→</div>
                            <div className=" text-sm text-blue-900 text-center">
                              <div className="font-bold">{evo.method}</div>
                              {evo.requirement && (
                                <div className="text-gray-600">{getItemName(evo.requirement)}</div>
                              )}
                            </div>
                          </div>

                          {/* Sprite + nombre */}
                          <div className="flex items-center space-x-4 flex-1 ml-4">
                            <div className="bg-blue-50 rounded-lg p-2 border border-blue-200">
                              <PokemonFront
                                img={`/images/pokemonFront/${evo.species}.png`}
                                scale={80}
                              />
                            </div>
                            <div>
                              <div className="font-black text-lg text-blue-900 capitalize">
                                {evo.species.toLowerCase()}
                              </div>
                              <div className="text-sm font-semibold text-blue-700">
                                Siguiente evolución
                              </div>
                            </div>
                          </div>

                          {/* Icono de enlace */}
                          <div className="text-blue-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg p-8 text-center shadow-lg">
                    <div className="text-4xl mb-2">✨</div>
                    <p className="text-gray-700 font-semibold">
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