import { useState, useMemo, useRef, useEffect } from 'react';
import movesData from '../../data/moves.json';
import abilitiesData from '../../data/abilities.json';
import AutoScrollTop from '../autoScrollTop/AutoScrollTop';
import AbilityModal from './AbilityModal';
import MoveModal from './MoveModal';
import { getTypeColor, getTypeName } from "../../utils/typeHelpers";
import { useSEO } from '../../hooks/useSEO';

const ITEMS_PER_PAGE = 50;

const MovesAndAbilities = () => {
  useSEO({
    title: 'Movimientos y Habilidades - Pokémon Añil',
    description: 'Guía completa de movimientos y habilidades en Pokémon Añil con detalles, estadísticas y descripciones.',
    keywords: 'pokémon añil movimientos, habilidades pokémon añil, moves pokémon añil, abilities'
  });

  const [activeTab, setActiveTab] = useState('moves');
  const [search, setSearch] = useState('');
  const [selectedAbility, setSelectedAbility] = useState(null);
  const [selectedMove, setSelectedMove] = useState(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const loadMoreRef = useRef(null);

  // Filtrar y ordenar movimientos
  const filteredMoves = useMemo(() => {
    const searchLower = search.toLowerCase();
    return movesData.moves
      .filter(move => move.name.toLowerCase().includes(searchLower))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [search]);

  // Filtrar y ordenar habilidades
  const filteredAbilities = useMemo(() => {
    const searchLower = search.toLowerCase();
    return abilitiesData.abilities
      .filter(ability => ability.name.toLowerCase().includes(searchLower))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [search]);

  const currentList = activeTab === 'moves' ? filteredMoves : filteredAbilities;
  const visibleList = currentList.slice(0, visibleCount);
  const hasMore = visibleCount < currentList.length;

  // Resetear visibleCount cuando cambia pestaña o búsqueda
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeTab, search]);

  // IntersectionObserver para cargar más al hacer scroll
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount(prev => prev + ITEMS_PER_PAGE);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore, visibleCount]);

  return (
    <div className="min-h-screen bg-blue-950 text-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-8">

        <h1 className="text-4xl font-bold mb-6">
          Movimientos y Habilidades
        </h1>

        {/* Pestañas */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => {
              setActiveTab('moves');
              setSearch('');
            }}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-colors ${activeTab === 'moves'
              ? 'bg-blue-700 text-blue-100'
              : 'bg-blue-900 text-blue-300 hover:bg-blue-800/50 border border-blue-800'
              }`}
          >
            Movimientos ({movesData.moves.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('abilities');
              setSearch('');
            }}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-colors ${activeTab === 'abilities'
              ? 'bg-blue-700 text-blue-100'
              : 'bg-blue-900 text-blue-300 hover:bg-blue-800/50 border border-blue-800'
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
              className="w-full px-4 py-3 pr-12 text-blue-100 bg-blue-900 rounded-lg font-medium outline-none
                placeholder:text-blue-300/60 
                [&::-webkit-search-cancel-button]:appearance-none"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {search ? (
                <button
                  type="button"
                  onClick={() => setSearch('')}
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
          </div>
          {search && (
            <p className="text-center mt-2 text-sm text-blue-300 font-medium">
              {currentList.length} resultado{currentList.length !== 1 ? 's' : ''} encontrado{currentList.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Grid de Cards */}
        {currentList.length === 0 ? (
          <p className="text-center py-12 text-blue-300 font-medium">
            No se encontraron resultados para "{search}"
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* MOVIMIENTOS */}
              {activeTab === 'moves' && visibleList.map(move => (
                <div
                  key={move.id}
                  onClick={() => setSelectedMove(move)}
                  className="bg-blue-900 rounded-xl overflow-hidden border border-blue-800 hover:shadow-lg hover:shadow-blue-900/40 transition-all duration-200 cursor-pointer hover:scale-[1.02]"
                >
                  <div className="p-4 bg-blue-950/50 border-b border-blue-800">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{move.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getTypeColor(move.type)}`}>
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
                      <span className="text-sm text-blue-300">{move.category}</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-4">
                    <p className="text-sm leading-relaxed">
                      {move.description}
                    </p>
                    <div className={`grid gap-2 ${move.category !== 'Estado' ? 'grid-cols-3' : 'grid-cols-2'}`}>
                      {move.category !== 'Estado' && (
                        <div className="bg-blue-950/50 rounded-lg p-2 text-center">
                          <div className="text-xs text-blue-300 font-medium">Poder</div>
                          <div className="text-lg font-semibold">{move.power || '-'}</div>
                        </div>
                      )}
                      <div className="bg-blue-950/50 rounded-lg p-2 text-center">
                        <div className="text-xs text-blue-300 font-medium">Precisión</div>
                        <div className="text-lg font-semibold">
                          {typeof move.accuracy === 'number' ? `${move.accuracy}%` : '-'}
                        </div>
                      </div>
                      <div className="bg-blue-950/50 rounded-lg p-2 text-center">
                        <div className="text-xs text-blue-300 font-medium">PP</div>
                        <div className="text-lg font-semibold">{move.pp}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* HABILIDADES */}
              {activeTab === 'abilities' && visibleList.map(ability => (
                <div
                  key={ability.id}
                  onClick={() => setSelectedAbility(ability)}
                  className="bg-blue-900 rounded-xl overflow-hidden border border-blue-800 hover:shadow-lg hover:shadow-blue-900/40 transition-all duration-200 cursor-pointer hover:scale-[1.02]"
                >
                  <div className="p-4 bg-blue-950/50 border-b border-blue-800">
                    <h3 className="font-semibold text-lg">{ability.name}</h3>
                  </div>
                  <div className="p-4">
                    <p className="text-sm leading-relaxed">
                      {ability.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sentinel para cargar más */}
            {hasMore && (
              <div ref={loadMoreRef} className="mt-8 flex flex-col items-center gap-3">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-3 border-blue-300 border-t-transparent"></div>
                <p className="text-blue-300 text-sm">
                  Mostrando {visibleCount} de {currentList.length}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal de movimiento */}
      {selectedMove && (
        <MoveModal
          move={selectedMove}
          onClose={() => setSelectedMove(null)}
        />
      )}

      {/* Modal de habilidad */}
      {selectedAbility && (
        <AbilityModal
          ability={selectedAbility}
          onClose={() => setSelectedAbility(null)}
        />
      )}
      <AutoScrollTop />
    </div>
  );
};

export default MovesAndAbilities;