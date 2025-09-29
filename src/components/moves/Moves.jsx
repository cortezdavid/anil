import dataMoves from "../../data/moves.json"
import typesData from "../../data/types.json"

const Moves = ({ level, moveId }) => {
  const moveInfo = dataMoves.moves.find(m => m.id === moveId);
  const name = moveInfo ? moveInfo.name : moveId;

  if (!moveInfo) {
    return (
      <div className="grid grid-cols-12 gap-4 py-3 px-4 border-b border-gray-100 text-gray-500">
        <div className="col-span-1 text-sm">{level || '-'}</div>
        <div className="col-span-3 text-sm">{name}</div>
        <div className="col-span-2"></div>
        <div className="col-span-1 text-sm text-center">-</div>
        <div className="col-span-1 text-sm text-center">-</div>
        <div className="col-span-1 text-sm text-center">-</div>
        <div className="col-span-3 text-sm">Movimiento no encontrado</div>
      </div>
    );
  }

  // Función para obtener color del tipo
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

  // Obtener nombre del tipo en español
  const getTypeName = (typeId) => {
    const typeObj = typesData.types.find(t => t.id === typeId);
    return typeObj ? typeObj.name : typeId;
  };


  return (
    <div className="grid grid-cols-12 gap-4 py-3 px-4 hover:bg-gray-50 border-b border-gray-100 items-center transition-colors duration-150">

      {/* Nivel */}
      <div className="col-span-1">
        <span className="text-sm font-medium text-gray-900">
          {level || '-'}
        </span>
      </div>

      {/* Nombre del movimiento */}
      <div className="col-span-3">
        <span className="text-sm font-medium text-gray-900">
          {name}
        </span>
      </div>

      {/* Tipo + Icono categoría */}
      <div className="col-span-2 flex items-center space-x-2">
        <span className={`px-2 py-1 rounded text-xs font-medium text-white ${getTypeColor(moveInfo.type)}`}>
          {getTypeName(moveInfo.type)}
        </span>
      </div>

      {/* Poder */}
      <div className="col-span-1 text-center">
        <span className="text-sm font-semibold text-gray-900">
          {moveInfo.power ? moveInfo.power : '-'}
        </span>
      </div>

      {/* Precisión */}
      <div className="col-span-1 text-center">
        <span className="text-sm font-semibold text-gray-900">
          {typeof moveInfo.accuracy === 'number' ? moveInfo.accuracy : '-'}
        </span>
      </div>

      {/* PP */}
      <div className="col-span-1 text-center">
        <span className="text-sm font-semibold text-gray-900">
          {moveInfo.pp}
        </span>
      </div>

      {/* Descripción */}
      <div className="col-span-3">
        <span className="text-xs text-gray-600 line-clamp-2">
          {moveInfo.description || 'Sin descripción'}
        </span>
      </div>
    </div>
  );
}

export default Moves