import { useState } from "react";
import mtData from "../../data/MT.json";
import movesData from "../../data/moves.json";
import typesData from "../../data/types.json";

const MT = () => {
  const mts = mtData.mt;
  const moves = movesData.moves;
  const [openMT, setOpenMT] = useState(null);

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
    if (category === 'Physical') return '💥';
    if (category === 'Special') return '✨';
    if (category === 'Status') return '🔧';
    return '';
  };

  const toggleMT = (mtId) => {
    setOpenMT(openMT === mtId ? null : mtId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-black text-blue-900 mb-8 uppercase tracking-wider drop-shadow-sm">
          Máquinas Técnicas
        </h1>

        <div className="space-y-4">
          {mts.map(mt => {
            const moveData = getMoveData(mt.move);
            if (!moveData) return null;

            const isOpen = openMT === mt.id;

            return (
              <div key={mt.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
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
                  <div className="border-t-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Imagen */}
                      <div className="bg-white rounded-lg p-4 shadow-md border-2 border-blue-200">
                        <img 
                          src={mt.img} 
                          alt={`Ubicación ${mt.id}`}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>

                      {/* Información del movimiento */}
                      <div className="space-y-4">
                        {/* Descripción */}
                        <div className="bg-white rounded-lg p-4 shadow-md border-2 border-blue-200">
                          <p className="text-gray-800 font-medium leading-relaxed">
                            {moveData.description}
                          </p>
                        </div>

                        {/* Stats del movimiento */}
                        <div className="bg-white rounded-lg p-4 shadow-md border-2 border-blue-200">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl">{getCategoryIcon(moveData.category)}</span>
                              <div>
                                <div className="text-xs text-gray-600 font-semibold">Categoría</div>
                                <div className="text-sm font-bold text-gray-900">{moveData.category}</div>
                              </div>
                            </div>

                            <div>
                              <div className="text-xs text-gray-600 font-semibold">Poder</div>
                              <div className="text-lg font-black text-blue-900">
                                {typeof moveData.power === 'number' ? moveData.power : '-'}
                              </div>
                            </div>

                            <div>
                              <div className="text-xs text-gray-600 font-semibold">Precisión</div>
                              <div className="text-lg font-black text-blue-900">
                                {typeof moveData.accuracy === 'number' ? `${moveData.accuracy}%` : '-'}
                              </div>
                            </div>

                            <div>
                              <div className="text-xs text-gray-600 font-semibold">PP</div>
                              <div className="text-lg font-black text-blue-900">{moveData.pp}</div>
                            </div>
                          </div>
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
    </div>
  );
};

export default MT;