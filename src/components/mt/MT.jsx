import { useState } from "react";
import mtData from "../../data/MT.json";
import movesData from "../../data/moves.json";
import typesData from "../../data/types.json";

const MT = () => {
  const mts = mtData.mt;
  const moves = movesData.moves;
  const [openMT, setOpenMT] = useState(null);
  const [search, setSearch] = useState("");

  const getMoveData = (moveId) => {
    return moves.find(m => m.id === moveId);
  };

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

  const getCategoryIcon = (category) => {
    if (category === 'Físico') return '💥';
    if (category === 'Special') return '✨';
    if (category === 'Status') return '🔧';
    return '';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-black text-blue-900 mb-6 uppercase tracking-wider drop-shadow-sm">
          Máquinas Técnicas
        </h1>

        {/* Buscador */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Buscar por nombre, MT o ubicación..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 pr-12 text-gray-900 bg-white border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-medium shadow-lg"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          {search && (
            <p className="text-center mt-2 text-sm text-blue-800 font-semibold">
              {filteredMTs.length} resultado{filteredMTs.length !== 1 ? 's' : ''} encontrado{filteredMTs.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {filteredMTs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-gray-600 font-semibold">No se encontraron resultados para "{search}"</p>
            </div>
          ) : (
            filteredMTs.map(mt => {
              const moveData = getMoveData(mt.move);
              if (!moveData) return null;

              const isOpen = openMT === mt.id;

              return (
                <div key={mt.id} className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-blue-300">
                  {/* Header clickeable */}
                  <button
                    onClick={() => toggleMT(mt.id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-blue-50 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      {/* ID de la MT */}
                      <div className="bg-blue-600 text-white font-black px-4 py-2 rounded-lg shadow-md">
                        {mt.id}
                      </div>

                      {/* Nombre del movimiento */}
                      <div className="text-left">
                        <div className="font-black text-lg text-gray-900">{moveData.name}</div>
                        <div className="text-sm text-gray-600">{mt.route}</div>
                      </div>
                    </div>

                    {/* Tipo y flecha */}
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getTypeColor(moveData.type)}`}>
                        {getTypeName(moveData.type)}
                      </span>
                      <svg
                        className={`w-6 h-6 text-blue-600 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
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
                    <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-white p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Imagen */}
                        <div className="bg-white rounded-lg p-4 shadow-md border-2 border-blue-200">
                          <img
                            src={mt.img}
                            alt={`Ubicación ${mt.id}`}
                            className="w-full h-auto rounded-lg shadow-lg"
                          />
                        </div>

                        {/* Información del movimiento */}
                        <div className="space-y-4">
                          {/* Descripción */}
                          <div className="bg-white/80 backdrop-blur rounded-lg p-4 shadow">
                            <p className="text-gray-900 font-medium leading-relaxed">
                              {moveData.description}
                            </p>
                          </div>

                          {/* Stats en lista vertical */}
                          <div className="bg-white/80 backdrop-blur rounded-lg p-4 shadow">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between pb-3 border-b border-blue-200">
                                <div className="flex items-center space-x-2">
                                  <span className="text-xl">{getCategoryIcon(moveData.category)}</span>
                                  <span className="text-sm font-semibold text-gray-700">Categoría</span>
                                </div>
                                <span className="text-sm font-black text-blue-900">{moveData.category}</span>
                              </div>

                              <div className="flex items-center justify-between pb-3 border-b border-blue-200">
                                <span className="text-sm font-semibold text-gray-700">Poder</span>
                                <span className="text-xl font-black text-blue-900">
                                  {typeof moveData.power === 'number' ? moveData.power : '-'}
                                </span>
                              </div>

                              <div className="flex items-center justify-between pb-3 border-b border-blue-200">
                                <span className="text-sm font-semibold text-gray-700">Precisión</span>
                                <span className="text-xl font-black text-blue-900">
                                  {typeof moveData.accuracy === 'number' ? `${moveData.accuracy}%` : '-'}
                                </span>
                              </div>

                              <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-gray-700">PP</span>
                                <span className="text-xl font-black text-blue-900">{moveData.pp}</span>
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
      </div>
    </div>
  );
};

export default MT;