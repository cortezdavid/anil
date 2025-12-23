import { useMemo } from 'react';
import raids from '../../data/raids.json';
import items from '../../data/items.json';
import types from '../../data/types.json';
import pokemones from '../../data/pokemones.json';
import { useSEO } from '../../hooks/useSEO';
import AutoScrollTop from '../autoScrollTop/AutoScrollTop';

const Raids = () => {
  useSEO({
    title: 'Raids - Pokémon Añil',
    description: 'Guía completa de raids en Pokémon Añil: ubicaciones, Pokémon disponibles, recompensas y estadísticas mejoradas.',
    keywords: 'pokémon añil raids, raids pokémon añil, incursiones pokémon añil, recompensas raids'
  });

  // Crear map de items para búsqueda rápida
  const itemsMap = useMemo(() => {
    return new Map(items.items.map(item => [item.id, item]));
  }, []);

  // Crear map de tipos para nombres en español
  const typesMap = useMemo(() => {
    return new Map(types.types.map(type => [type.id, type]));
  }, []);

  // Crear map de pokémon para nombres
  const pokemonMap = useMemo(() => {
    return new Map(pokemones.pokemones.map(poke => [poke.id, poke]));
  }, []);

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
    return colors[type.toUpperCase()] || 'bg-gray-500';
  };

  const getTypeName = (typeId) => {
    const typeData = typesMap.get(typeId);
    return typeData?.name || typeId;
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
          Nidos Alfas
        </h1>

        {/* Lista de raids */}
        <div className="space-y-6">
          {raids.raids.map((raid) => (
            <div
              key={raid.id}
              className="bg-slate-800 rounded-xl shadow-lg shadow-gray-900/30 border border-slate-700 overflow-hidden"
            >
              {/* Header del raid */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-2 rounded-lg text-sm font-bold text-white ${getTypeColor(raid.type)}`}>
                      {getTypeName(raid.type)}
                    </span>
                    <span className="text-white font-bold text-lg">
                      Nivel {raid.nivel}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="font-semibold">{raid.location}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                
                {/* Pokémon disponibles */}
                <div>
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
                    Pokémon Posibles
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {raid.pokemon.map((pokemonId, index) => (
                      <div
                        key={index}
                        className="bg-slate-700 rounded-lg p-3 flex flex-col items-center border border-slate-600 hover:border-slate-500 transition-colors"
                      >
                        <div className="w-full aspect-square bg-slate-900 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                          <img
                            src={`/images/raids/${pokemonId}.png`}
                            alt={getPokemonName(pokemonId)}
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
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
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
                    Recompensas Posibles
                  </h3>
                  <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
                    <div className="flex flex-wrap gap-3">
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
                            <span className="text-sm text-slate-200 font-medium">
                              {itemData?.name || objetoId}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
      <AutoScrollTop />
    </div>
  );
};

export default Raids;