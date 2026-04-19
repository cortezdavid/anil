import { useMemo, useState } from 'react';
import raids from '../../data/raids.json';
import items from '../../data/items.json';
import pokemones from '../../data/pokemones.json';
import PokemonStaticSprite from './PokemonStaticSprite';
import Tooltip from '../tooltip/Tooltip';
import { useSEO } from '../../hooks/useSEO';
import AutoScrollTop from '../autoScrollTop/AutoScrollTop';
import { getTypeColor, getTypeName } from "../../utils/typeHelpers";

const Raids = () => {
  useSEO({
    title: 'Nidos - Pokémon Añil',
    description: 'Guía completa de nidos en Pokémon Añil: ubicaciones, Pokémon disponibles, recompensas y estadísticas mejoradas.',
    keywords: 'pokémon añil nidos, nidos pokémon añil, incursiones pokémon añil, recompensas nidos'
  });

  const [openRaid, setOpenRaid] = useState(null);

  const toggleRaid = (raidId) => {
    setOpenRaid(openRaid === raidId ? null : raidId);
  };

  const itemsMap = useMemo(() => {
    return new Map(items.items.map(item => [item.id, item]));
  }, []);

  const pokemonMap = useMemo(() => {
    return new Map(pokemones.pokemones.map(poke => [poke.id, poke]));
  }, []);

  const getTypeStyle = (type) => {
    const styles = {
      FIRE: { border: 'border-red-500/40', headerBg: 'bg-red-500/15', badge: 'bg-red-500' },
      WATER: { border: 'border-blue-500/40', headerBg: 'bg-blue-500/15', badge: 'bg-blue-500' },
      GRASS: { border: 'border-green-500/40', headerBg: 'bg-green-500/15', badge: 'bg-green-500' },
      ELECTRIC: { border: 'border-yellow-400/40', headerBg: 'bg-yellow-400/15', badge: 'bg-yellow-400' },
      PSYCHIC: { border: 'border-pink-500/40', headerBg: 'bg-pink-500/15', badge: 'bg-pink-500' },
      ICE: { border: 'border-cyan-400/40', headerBg: 'bg-cyan-400/15', badge: 'bg-cyan-400' },
      DRAGON: { border: 'border-indigo-500/40', headerBg: 'bg-indigo-500/15', badge: 'bg-indigo-600' },
      DARK: { border: 'border-gray-600/40', headerBg: 'bg-gray-700/30', badge: 'bg-gray-800' },
      FAIRY: { border: 'border-pink-300/40', headerBg: 'bg-pink-300/15', badge: 'bg-pink-400' },
      FIGHTING: { border: 'border-red-700/40', headerBg: 'bg-red-700/15', badge: 'bg-red-700' },
      POISON: { border: 'border-purple-600/40', headerBg: 'bg-purple-600/15', badge: 'bg-purple-600' },
      GROUND: { border: 'border-yellow-600/40', headerBg: 'bg-yellow-600/15', badge: 'bg-yellow-600' },
      FLYING: { border: 'border-indigo-400/40', headerBg: 'bg-indigo-400/15', badge: 'bg-indigo-400' },
      BUG: { border: 'border-lime-600/40', headerBg: 'bg-lime-600/15', badge: 'bg-lime-600' },
      ROCK: { border: 'border-amber-700/40', headerBg: 'bg-amber-700/15', badge: 'bg-yellow-800' },
      GHOST: { border: 'border-purple-700/40', headerBg: 'bg-purple-900/25', badge: 'bg-purple-800' },
      STEEL: { border: 'border-slate-500/40', headerBg: 'bg-slate-500/15', badge: 'bg-slate-500' },
      NORMAL: { border: 'border-gray-400/40', headerBg: 'bg-gray-400/15', badge: 'bg-gray-400' },
    };
    return styles[type.toUpperCase()] || { border: 'border-slate-700', headerBg: 'bg-slate-700/20', badge: 'bg-slate-500', glow: 'none' };
  };

  const getItemData = (itemId) => {
    return itemsMap.get(itemId);
  };

  const getPokemonName = (pokemonId) => {
    const pokemon = pokemonMap.get(pokemonId);
    return pokemon?.name || pokemonId.toLowerCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Título */}
        <h1 className="text-4xl font-black text-slate-100 mb-6 uppercase tracking-wider drop-shadow-sm">
          Nidos
        </h1>

        {/* Lista de raids */}
        <div className="space-y-6">
          {raids.raids.map((raid) => {
            const typeStyle = getTypeStyle(raid.type);
            const isOpen = openRaid === raid.id;

            return (
              <div
                key={raid.id}
                className={`bg-slate-800 rounded-xl shadow-lg shadow-gray-900/30 overflow-hidden`}
              >
                {/* Header del raid — ahora clickeable */}
                <button
                  onClick={() => toggleRaid(raid.id)}
                  className={`w-full ${typeStyle.headerBg} border-b ${typeStyle.border} px-6 py-4 hover:brightness-110 transition-all duration-200`}
                >
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <span className={`px-4 py-2 rounded-lg text-sm font-bold text-white ${getTypeColor(raid.type)}`}>
                        {getTypeName(raid.type)}
                      </span>
                      <span className="text-white font-bold text-lg">
                        Nivel {raid.nivel}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-white">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="font-semibold">{raid.location}</span>
                      </div>
                      <svg
                        className={`w-6 h-6 text-blue-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* Contenido expandible */}
                {isOpen && (
                  <div className="p-6 space-y-6">

                    {/* Pokémon disponibles */}
                    <div>
                      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
                        Posibles Pokémon
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {raid.pokemon.map((pokemonId, index) => (
                          <div
                            key={index}
                            className="bg-slate-700 rounded-lg p-3 flex flex-col items-center border border-slate-600 shadow-lg shadow-gray-900/30 hover:shadow-blue-900/20 transition-all duration-200"                        >
                            <div className="w-full aspect-square bg-slate-900 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                              <PokemonStaticSprite
                                img={`/images/pokemonFront/${pokemonId}.png`}
                                scale={140}
                              />
                            </div>
                            <span className="text-sm font-bold text-slate-100 text-center">
                              {getPokemonName(pokemonId)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mejoras de stats */}
                    <div>
                      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">
                        Mejoras
                      </h3>
                      <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400">Ataque:</span>
                            <span className="text-red-400 font-bold">+{raid.information.ataque}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400">Defensa:</span>
                            <span className="text-blue-400 font-bold">+{raid.information.defensa}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400">At. Esp:</span>
                            <span className="text-purple-400 font-bold">+{raid.information.atEspecial}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400">Def. Esp:</span>
                            <span className="text-green-400 font-bold">+{raid.information.deEspecial}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400">Velocidad:</span>
                            <span className="text-yellow-400 font-bold">+{raid.information.velocidad}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Objetos recompensa */}
                    <div>
                      <h3 className="text-sm  text-slate-300 tracking-wider mb-4 flex items-center">
                        <span className="uppercase font-bold">Posibles Recompensas</span>
                        <Tooltip text="Existe la posibilidad de que falte algún objeto." position="right">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </Tooltip>
                      </h3>
                      <div className="bg-slate-700 rounded-lg p-3 border border-slate-600">
                        <div className="flex flex-wrap gap-2">
                          {raid.objetos.map((objetoId, index) => {
                            const itemData = getItemData(objetoId);
                            return (
                              <div
                                key={index}
                                className="flex items-center gap-2 bg-slate-800 px-3 py-2 rounded-lg border border-slate-600"
                              >
                                <img
                                  src={`/images/items/${objetoId}.png`}
                                  alt={itemData?.name || objetoId}
                                  className="w-8 h-8 object-contain"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                                <span className="text-sm text-slate-200 font-medium cursor-help">
                                  <Tooltip text={itemData.description} position="top">
                                    {itemData?.name || objetoId}
                                  </Tooltip >
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <AutoScrollTop />
    </div>
  );
};

export default Raids;