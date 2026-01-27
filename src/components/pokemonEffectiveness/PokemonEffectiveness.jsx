import typesData from "../../data/types.json";

const PokemonEffectiveness = ({ pokemon }) => {
  
  // Función para calcular la efectividad de cada tipo de ataque
  const calculateTypeEffectiveness = () => {
    const effectiveness = {};
    
    // Para cada tipo de ataque posible
    typesData.types.forEach(attackType => {
      let multiplier = 1;
      
      // Calcular multiplicador para cada tipo del Pokémon
      pokemon.types.forEach(defenseType => {
        const typeData = typesData.types.find(t => t.id === defenseType);
        
        if (typeData.weaknesses.includes(attackType.id)) {
          multiplier *= 2;  // Débil
        } else if (typeData.resistances.includes(attackType.id)) {
          multiplier *= 0.5;  // Resiste
        } else if (typeData.immunities.includes(attackType.id)) {
          multiplier *= 0;  // Inmune
        }
      });
      
      // Agrupar por multiplicador
      if (!effectiveness[multiplier]) {
        effectiveness[multiplier] = [];
      }
      effectiveness[multiplier].push(attackType);
    });
    
    return effectiveness;
  };

  const effectiveness = calculateTypeEffectiveness();

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

  // Orden de multiplicadores para mostrar (TODOS)
  const effectivenessConfig = [
    { mult: 4, label: 'Sufre x4 a' },
    { mult: 2, label: 'Sufre x2 a' },
    { mult: 1, label: 'Sufre x1 a' },
    { mult: 0.5, label: 'Resiste x0.5 a' },
    { mult: 0.25, label: 'Resiste x0.25 a' },
    { mult: 0, label: 'Inmune a' },
  ];

  return (
    <div className="bg-slate-800 rounded-2xl shadow-gray-900/30 p-6">
      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
        Efectividad de Tipos
      </h3>
      
      <div className="space-y-4">
        {effectivenessConfig.map(({ mult, label }) => {
          const types = effectiveness[mult];
          if (!types || types.length === 0) return null;

          return (
            <div key={mult} className="border-b border-slate-700 last:border-0 pb-4 last:pb-0">
              <h4 className="text-sm font-bold text-slate-300 mb-3">
                {label}
              </h4>
              <div className="flex flex-wrap gap-2">
                {types.map(type => (
                  <span
                    key={type.id}
                    className={`px-3 py-1.5 rounded-lg text-sm font-bold text-white ${getTypeColor(type.id)} shadow-sm`}
                  >
                    {type.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PokemonEffectiveness;