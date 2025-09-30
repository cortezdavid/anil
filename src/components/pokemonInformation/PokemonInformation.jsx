import PokemonFront from "../pokemonFront/PokemonFront";
import types from "../../data/types.json"
import abilitiesData from "../../data/abilities.json"

const PokemonInformation = ({ pokemon }) => {
  const getTypeName = (typeId) => {
    const typeObj = types.types.find(t => t.id === typeId);
    return typeObj ? typeObj.name : typeId;
  }

  const getAbilityName = (id) => {
    const ability = abilitiesData.abilities.find(a => a.id === id);
    return ability ? ability.name : id;
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
                className={`px-4 py-1.5 rounded-full text-sm font-bold text-white ${getTypeColor(type)} shadow-lg`}
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
  )
}

export default PokemonInformation