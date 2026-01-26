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

  const getAbilityDescription = (abilityId) => {
    if (!abilityId || abilityId === "") return null;
    const ability = abilitiesData.abilities.find(a => a.id === abilityId);
    return ability?.description;
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* COLUMNA 1: Tipo y Datos Físicos */}
      <div className="space-y-6 lg:col-span-1">

        {/* Card de Tipos */}
        <div className="bg-slate-800 rounded-2xl p-6">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
            Tipo
          </h3>
          <div className="flex gap-3 flex-wrap">
            {pokemon.types?.map((type, index) => (
              <span
                key={index}
                className={`px-4 py-2 rounded-xl text-sm font-bold text-white ${getTypeColor(type)}`}
              >
                {getTypeName(type)}
              </span>
            ))}
          </div>
        </div>

        {/* Card de Datos Físicos */}
        <div className="bg-slate-800 rounded-2xl p-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
            Datos Físicos
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-xl p-5 border border-blue-700/50 text-center">
              <div className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-2">
                Altura
              </div>
              <div className="text-2xl font-black text-blue-100">
                {pokemon.physicalData?.height}<span className="text-base font-bold text-blue-400 ml-1">m</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-xl p-5 border border-blue-700/50 text-center">
              <div className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-2">
                Peso
              </div>
              <div className="text-2xl font-black text-blue-100">
                {pokemon.physicalData?.weight}<span className="text-base font-bold text-blue-400 ml-1">kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COLUMNA 2-3: Habilidades*/}
      <div className="lg:col-span-2">
        {/* Card de Habilidades */}
        <div className="bg-slate-800 rounded-2xl p-6 h-full">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
            Habilidades
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pokemon.abilities?.map((ability, index) => (
              <div
                key={index}
                className="bg-blue-900/20 border border-blue-600/30 rounded-xl p-4"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-base font-bold text-slate-100">
                    {getAbilityName(ability)}
                  </span>
                  <span className="text-xs font-bold text-white bg-blue-600 px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
                    Normal
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {getAbilityDescription(ability)}
                </p>
              </div>
            ))}

            {pokemon.hiddenAbilities?.map((ability, index) => (
              <div
                key={`hidden-${index}`}
                className="bg-purple-900/20 border border-purple-600/30 rounded-xl p-4"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-base font-bold text-slate-100">
                    {getAbilityName(ability)}
                  </span>
                  <span className="text-xs font-bold text-white bg-purple-600 px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
                    Oculta
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {getAbilityDescription(ability)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default PokemonInformation