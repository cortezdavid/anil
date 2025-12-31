import { useState, useMemo } from 'react';
import movesData from '../../data/moves.json';
import abilitiesData from '../../data/abilities.json';
import typesData from '../../data/types.json';
import AutoScrollTop from '../autoScrollTop/AutoScrollTop';
import { useSEO } from '../../hooks/useSEO';

const MovesAndAbilities = () => {
  useSEO({
    title: 'Movimientos y Habilidades - Pokémon Añil',
    description: 'Guía completa de movimientos y habilidades en Pokémon Añil con detalles, estadísticas y descripciones.',
    keywords: 'pokémon añil movimientos, habilidades pokémon añil, moves pokémon añil, abilities'
  });

  const [activeTab, setActiveTab] = useState('moves');
  const [search, setSearch] = useState('');

  const getTypeName = (typeId) => {
    const type = typesData.types.find(t => t.id === typeId);
    return type ? type.name : typeId;
  };

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

  // Filtrar y ordenar movimientos (useMemo para optimizar)
  const filteredMoves = useMemo(() => {
    const searchLower = search.toLowerCase();
    return movesData.moves
      .filter(move => {
        return (
          move.name.toLowerCase().includes(searchLower)
        );
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [search]);

  // Filtrar y ordenar habilidades (useMemo para optimizar)
  const filteredAbilities = useMemo(() => {
    const searchLower = search.toLowerCase();
    return abilitiesData.abilities
      .filter(ability => {
        return ability.name.toLowerCase().includes(searchLower);
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [search]);

  const currentList = activeTab === 'moves' ? filteredMoves : filteredAbilities;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">

        <h1 className="text-4xl font-black text-slate-100 mb-6 uppercase tracking-wider drop-shadow-sm">
          Movimientos y Habilidades
        </h1>

        {/* Pestañas */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => {
              setActiveTab('moves');
              setSearch('');
            }}
            className={`flex-1 px-6 py-3 rounded-xl font-black transition-all duration-200 ${activeTab === 'moves'
              ? 'bg-blue-600 text-white shadow-xl'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
          >
            Movimientos ({movesData.moves.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('abilities');
              setSearch('');
            }}
            className={`flex-1 px-6 py-3 rounded-xl font-black transition-all duration-200 ${activeTab === 'abilities'
              ? 'bg-blue-600 text-white shadow-xl'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
          >
            Habilidades ({abilitiesData.abilities.length})
          </button>
        </div>

        {/* Buscador */}
        <div className="mb-6">
          <div className="relative mx-auto">
            <input
              type="search"
              inputMode="search"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              data-form-type="other"
              placeholder={`Buscar ${activeTab === 'moves' ? 'movimiento' : 'habilidad'}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 pr-12 text-slate-100 bg-slate-800 rounded-lg shadow-lg font-medium 
                border-none outline-none focus:outline-none focus:border-none focus:ring-0 placeholder:text-slate-500"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          {search && (
            <p className="text-center mt-2 text-sm text-blue-400 font-semibold">
              {currentList.length} resultado{currentList.length !== 1 ? 's' : ''} encontrado{currentList.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Grid de Cards */}
        {currentList.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-slate-400 font-semibold">
              No se encontraron resultados para "{search}"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* MOVIMIENTOS */}
            {activeTab === 'moves' && filteredMoves.map(move => (
              <div key={move.id} className="bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-700 hover:shadow-blue-900/20 transition-all duration-200">
                {/* Header */}
                <div className="p-4 bg-slate-700/50 border-b border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-black text-lg text-slate-100">{move.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getTypeColor(move.type)}`}>
                      {getTypeName(move.type)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-8 rounded flex items-center overflow-hidden">
                      <img
                        src={`/images/category/${move.category.toLowerCase()}.png`}
                        alt={move.category}
                        className="h-6 object-contain"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                    <span className="text-sm text-slate-400">{move.category}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 space-y-4">
                  {/* Descripción */}
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {move.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2">
                    {move.category !== 'Estado' && (
                      <div className="bg-slate-900/50 rounded-lg p-2 text-center">
                        <div className="text-xs text-slate-400 font-semibold">Poder</div>
                        <div className="text-lg font-black text-slate-100">{move.power || '-'}</div>
                      </div>
                    )}
                    <div className="bg-slate-900/50 rounded-lg p-2 text-center">
                      <div className="text-xs text-slate-400 font-semibold">Precisión</div>
                      <div className="text-lg font-black text-slate-100">
                        {typeof move.accuracy === 'number' ? `${move.accuracy}%` : '-'}
                      </div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-2 text-center">
                      <div className="text-xs text-slate-400 font-semibold">PP</div>
                      <div className="text-lg font-black text-slate-100">{move.pp}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* HABILIDADES */}
            {activeTab === 'abilities' && filteredAbilities.map(ability => (
              <div key={ability.id} className="bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-700 hover:shadow-blue-900/20 transition-all duration-200">
                {/* Header */}
                <div className="p-4 bg-slate-700/50 border-b border-slate-600">
                  <h3 className="font-black text-lg text-slate-100">{ability.name}</h3>
                </div>

                {/* Body */}
                <div className="p-4">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {ability.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
      <AutoScrollTop />
    </div>
  );
};

export default MovesAndAbilities;