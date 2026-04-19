import { useState } from "react";
import mtData from "../../data/MT.json";
import movesData from "../../data/moves.json";
import AutoScrollTop from "../autoScrollTop/AutoScrollTop";
import { useSEO } from '../../hooks/useSEO';
import { getTypeColor, getTypeName } from "../../utils/typeHelpers";


const MT = () => {

  useSEO({
    title: 'MT - Pokémon Añil',
    description: 'Lista completa de MTs en Pokémon Añil con ubicaciones exactas, mapas y detalles de los movimientos que enseñan. Encuentra todas las máquinas técnicas del juego.',
    keywords: 'pokémon añil MTs, máquinas técnicas pokémon añil, ubicación MTs, MTs pokémon añil lista, movimientos MT pokémon añil'
  });

  const mts = mtData.mt;
  const moves = movesData.moves;
  const [openMT, setOpenMT] = useState(null);
  const [search, setSearch] = useState("");

  const getMoveData = (moveId) => {
    return moves.find(m => m.id === moveId);
  };

  const toggleMT = (mtId) => {
    setOpenMT(openMT === mtId ? null : mtId);
  };

  // Filtrar MTs según búsqueda
  const filteredMTs = mts.filter(mt => {
    const moveData = getMoveData(mt.move);
    if (!moveData) return false;

    const searchLower = search.toLowerCase();
    return (
      moveData.name.toLowerCase().includes(searchLower) ||
      mt.id.toLowerCase().includes(searchLower) ||
      mt.route.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-black text-slate-100 mb-6 uppercase tracking-wider drop-shadow-sm">
          Máquinas Técnicas
        </h1>

        {/* alert */}
        {/* <div className="max-w-7xl mx-auto px-4 mb-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-sm">
            <div className="flex items-start">
              <div className="ml-3">
                <p className="text-sm font-medium text-yellow-800">
                  ⚠️¡Aviso importante!
                </p>
                <p className="text-sm font-medium text-yellow-700 mt-1">
                  Ahora estamos en guianil.pages.dev (ya estas! no necesitas redireccionar) . Posiblemente será la dirección principal y, si esto sucede, la versión anterior (guianil.vercel.app) dejará de estar disponible.
                </p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Buscador */}
        <div className="mb-6">
          <div className="relative mx-auto">
            <input
              id="mt-search"
              name="mt-search"
              type="search"
              inputMode="search"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              data-form-type="other"
              placeholder="Buscar por nombre, MT o ubicación..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 pr-12 text-slate-100 bg-slate-800 rounded-lg shadow-lg font-medium 
             border-none outline-none focus:outline-none focus:border-none focus:ring-0 placeholder:text-slate-500"           />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          {search && (
            <p className="text-center mt-2 text-sm text-blue-400 font-semibold">
              {filteredMTs.length} resultado{filteredMTs.length !== 1 ? 's' : ''} encontrado{filteredMTs.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {filteredMTs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-slate-400 font-semibold">No se encontraron resultados para "{search}"</p>
            </div>
          ) : (
            filteredMTs.map(mt => {
              const moveData = getMoveData(mt.move);
              if (!moveData) return null;

              const isOpen = openMT === mt.id;

              return (
                <div key={mt.id} className="bg-slate-800 rounded-xl shadow-lg shadow-gray-900/30 overflow-hidden">
                  {/* Header clickeable */}
                  <button
                    onClick={() => toggleMT(mt.id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-slate-700 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      {/* ID de la MT */}
                      <div className="bg-blue-600 text-white font-black px-4 py-2 rounded-lg shadow-md">
                        {mt.id}
                      </div>

                      {/* Nombre del movimiento */}
                      <div className="text-left">
                        <div className="font-black text-lg text-slate-100">{moveData.name}</div>
                        <div className="text-sm text-slate-400">{mt.route}</div>
                      </div>
                    </div>

                    {/* Tipo y flecha */}
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getTypeColor(moveData.type)}`}>
                        {getTypeName(moveData.type)}
                      </span>
                      <svg
                        className={`w-6 h-6 text-blue-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Contenido expandible */}
                  {isOpen && (
                    <div className="bg-gradient-to-br from-slate-700 via-slate-750 to-slate-800 p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Imagen */}
                        <div className="bg-slate-800/80 backdrop-blur rounded-lg p-4 shadow-md border border-slate-700">
                          <img
                            src={mt.img}
                            alt={`Ubicación ${mt.id}`}
                            className="w-full h-auto rounded-lg shadow-lg"
                          />
                        </div>

                        {/* Información del movimiento */}
                        <div className="space-y-4">
                          {/* Descripción */}
                          <div className="bg-slate-800/80 backdrop-blur rounded-lg p-4 shadow border border-slate-700">
                            <p className="text-slate-300 font-medium leading-relaxed">
                              {moveData.description}
                            </p>
                          </div>

                          {/* Stats en lista vertical */}
                          <div className="bg-slate-800/80 backdrop-blur rounded-lg p-4 shadow border border-slate-700">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between pb-3 border-b border-slate-600">
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-semibold text-slate-300">Categoría</span>
                                </div>
                                <span className="text-sm font-black text-slate-100">{moveData.category}</span>
                              </div>

                              <div className="flex items-center justify-between pb-3 border-b border-slate-600">
                                <span className="text-sm font-semibold text-slate-300">Poder</span>
                                <span className="text-xl font-black text-slate-100">
                                  {moveData.power ? moveData.power : '-'}
                                </span>
                              </div>

                              <div className="flex items-center justify-between pb-3 border-b border-slate-600">
                                <span className="text-sm font-semibold text-slate-300">Precisión</span>
                                <span className="text-xl font-black text-slate-100">
                                  {typeof moveData.accuracy === 'number' ? `${moveData.accuracy}%` : '-'}
                                </span>
                              </div>

                              <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-slate-300">PP</span>
                                <span className="text-xl font-black text-slate-100">{moveData.pp}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
        <AutoScrollTop />
      </div>
    </div>
  );
};

export default MT;