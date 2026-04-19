import { useState, useMemo } from 'react';
import pokemonMovesData from "../../data/pokemonMoves.json";
import mtData from "../../data/MT.json";
import movesData from "../../data/moves.json";
import Tooltip from '../tooltip/Tooltip';
import AutoScrollTop from '../autoScrollTop/AutoScrollTop';
import { getTypeColor, getTypeName } from "../../utils/typeHelpers";

const MovimientosSection = ({ pokemon }) => {
  const [openSection, setOpenSection] = useState('null');

  const toggleSection = (section) => {
    setOpenSection(prev => prev === section ? null : section);
  };

  // Obtener datos del movimiento
  const getMoveData = (moveId) => {
    const moveData = movesData.moves.find(m => m.id === moveId);
    return moveData;
  };

  // Obtener nombre del movimiento
  const getMoveName = (moveId) => {
    const moveData = getMoveData(moveId);
    return moveData?.name || moveId;
  };

  // Obtener movimientos del Pokémon desde pokemonMoves.json
  const pokemonMoves = useMemo(() => {
    const data = pokemonMovesData[pokemon.id];
    return {
      levelUpMoves: data?.moves?.levelUpMoves || [],
      tutorMoves: data?.moves?.tutorMoves || [],
      eggMoves: data?.moves?.eggMoves || []
    };
  }, [pokemon.id]);

  // Filtrar movimientos MT y obtener número
  const mtMoves = useMemo(() => {
    const mtMovesMap = new Map(mtData.mt.map(item => [item.move, item.id]));
    return (pokemonMoves.tutorMoves || [])
      .filter(move => mtMovesMap.has(move))
      .map(move => ({
        move,
        mtNumber: mtMovesMap.get(move).replace('MT', '')
      }))
      .sort((a, b) => {
        const nameA = getMoveName(a.move).toLowerCase();
        const nameB = getMoveName(b.move).toLowerCase();
        return nameA.localeCompare(nameB);
      });
  }, [pokemonMoves.tutorMoves]);

  const sortedEggMoves = useMemo(() => {
    return [...(pokemonMoves.eggMoves || [])].sort((a, b) => {
      const nameA = getMoveName(a).toLowerCase();
      const nameB = getMoveName(b).toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }, [pokemonMoves.eggMoves]);

  return (
    <div className="space-y-6">

      {/* Layout Desktop: 3 columnas */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6">

        {/* Columna 1: Movimientos por Nivel */}
        <div className="bg-slate-800 rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3">
            <h3 className="text-white font-bold text-sm flex items-center justify-between">
              <span>Por Nivel</span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                {pokemonMoves.levelUpMoves.length}
              </span>
            </h3>
          </div>
          <div className="py-2 space-y-1">
            {pokemonMoves.levelUpMoves.length > 0 ? (
              pokemonMoves.levelUpMoves.map((item, index) => {
                const moveData = getMoveData(item.move);
                return (
                  <div
                    key={index}
                    className="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-slate-100 capitalize truncate">
                          {getMoveName(item.move)}
                        </div>
                        <div className="text-xs text-slate-400">
                          Nivel {item.level}
                        </div>
                      </div>
                      {moveData?.type && (
                        <span className={`px-2 py-1 rounded text-xs font-bold text-white ${getTypeColor(moveData.type)} flex-shrink-0`}>
                          {getTypeName(moveData.type)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-slate-400 text-sm">
                No aprende movimientos por nivel
              </div>
            )}
          </div>
        </div>

        {/* Columna 2: Movimientos por MT */}
        <div className="bg-slate-800 rounded-xl">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 rounded-t-xl">
            <h3 className="text-white font-bold text-sm flex items-center justify-between">
              <span className="flex items-center gap-2">
                Por MT
              </span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                {mtMoves.length}
              </span>
            </h3>
          </div>
          <div className="py-2 space-y-1">
            {mtMoves.length > 0 ? (
              mtMoves.map((item, index) => {
                const moveData = getMoveData(item.move);
                return (
                  <div
                    key={index}
                    className="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-slate-100 capitalize truncate">
                          {getMoveName(item.move)}
                        </div>
                        <div className="text-xs text-slate-400">
                          MT{item.mtNumber}
                        </div>
                      </div>
                      {moveData?.type && (
                        <span className={`px-2 py-1 rounded text-xs font-bold text-white ${getTypeColor(moveData.type)} flex-shrink-0`}>
                          {getTypeName(moveData.type)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-slate-400 text-sm">
                No aprende movimientos por MT
              </div>
            )}
          </div>
        </div>

        {/* Columna 3: Movimientos Huevo */}
        <div className="bg-slate-800 rounded-xl">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 rounded-t-xl">
            <h3 className="text-white font-bold text-sm flex items-center justify-between">
              <span className="flex items-center gap-2">
                Movimientos Huevo
                <Tooltip text="Movimientos disponibles en el Dojo de Ciudad Azafrán. Requiere una Escama Corazón." position="left">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </Tooltip>
              </span>
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                {sortedEggMoves.length}
              </span>
            </h3>
          </div>
          <div className="py-2 space-y-1">
            {sortedEggMoves && sortedEggMoves.length > 0 ? (
              sortedEggMoves.map((move, index) => {
                const moveData = getMoveData(move);
                return (
                  <div
                    key={index}
                    className="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-semibold text-sm text-slate-100 capitalize flex-1 min-w-0 truncate">
                        {getMoveName(move)}
                      </div>
                      {moveData?.type && (
                        <span className={`px-2 py-1 rounded text-xs font-bold text-white ${getTypeColor(moveData.type)} flex-shrink-0`}>
                          {getTypeName(moveData.type)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-8 text-center text-slate-400 text-sm">
                Sin movimientos huevo
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Layout Móvil: Acordeones */}
      <div className="lg:hidden space-y-4">

        {/* Movimientos por Nivel */}
        <div className="rounded-xl overflow-hidden bg-slate-800">
          <button
            onClick={() => toggleSection('levelUp')}
            className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 flex justify-between items-center text-white"
          >
            <span className="font-bold text-sm">Por Nivel ({pokemonMoves.levelUpMoves.length})</span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-200 ${openSection === 'levelUp' ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openSection === 'levelUp' && (
            <div className="py-2 space-y-1">
              {pokemonMoves.levelUpMoves.map((item, index) => {
                const moveData = getMoveData(item.move);
                return (
                  <div key={index} className="px-3 py-2 rounded-lg bg-slate-700">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-slate-100 capitalize truncate">
                          {getMoveName(item.move)}
                        </div>
                        <div className="text-xs text-slate-400">Nivel {item.level}</div>
                      </div>
                      {moveData?.type && (
                        <span className={`px-2 py-1 rounded text-xs font-bold text-white ${getTypeColor(moveData.type)} flex-shrink-0`}>
                          {getTypeName(moveData.type)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Movimientos por MT */}
        <div className="rounded-xl bg-slate-800">
          <button
            onClick={() => toggleSection('mt')}
            className={`w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 flex justify-between items-center text-white ${openSection === 'mt' ? 'rounded-t-xl' : 'rounded-xl'
              }`}
          >
            <span className="font-bold text-sm flex items-center gap-2">
              Por MT ({mtMoves.length})
            </span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-200 ${openSection === 'mt' ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openSection === 'mt' && (
            <div className="py-2 space-y-1">
              {mtMoves.map((item, index) => {
                const moveData = getMoveData(item.move);
                return (
                  <div key={index} className="px-3 py-2 rounded-lg bg-slate-700">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-slate-100 capitalize truncate">
                          {getMoveName(item.move)}
                        </div>
                        <div className="text-xs text-slate-400">MT{item.mtNumber}</div>
                      </div>
                      {moveData?.type && (
                        <span className={`px-2 py-1 rounded text-xs font-bold text-white ${getTypeColor(moveData.type)} flex-shrink-0`}>
                          {getTypeName(moveData.type)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Movimientos Huevo */}
        {sortedEggMoves && sortedEggMoves.length > 0 && (
          <div className="rounded-xl overflow-hidden bg-slate-800">
            <button
              onClick={() => toggleSection('egg')}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 flex justify-between items-center text-white"
            >
              <span className="font-bold text-sm">Movimientos Huevo ({sortedEggMoves.length})</span>
              <svg
                className={`w-5 h-5 transform transition-transform duration-200 ${openSection === 'egg' ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openSection === 'egg' && (
              <div className="py-2 space-y-1">
                {sortedEggMoves.map((move, index) => {
                  const moveData = getMoveData(move);
                  return (
                    <div key={index} className="px-3 py-2 rounded-lg bg-slate-700">
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-semibold text-sm text-slate-100 capitalize flex-1 min-w-0 truncate">
                          {getMoveName(move)}
                        </div>
                        {moveData?.type && (
                          <span className={`px-2 py-1 rounded text-xs font-bold text-white ${getTypeColor(moveData.type)} flex-shrink-0`}>
                            {getTypeName(moveData.type)}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
      <AutoScrollTop />
    </div>
  );
};

export default MovimientosSection;