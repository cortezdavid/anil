import { useEffect, useState } from "react";
import typesData from "../../data/types.json";
import Tooltip from '../tooltip/Tooltip';
import { getTypeColor } from "../../utils/typeHelpers";

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

  // Orden de multiplicadores para mostrar (TODOS)
  const effectivenessConfig = [
    { mult: 4, label: 'Sufre x4 a' },
    { mult: 2, label: 'Sufre x2 a' },
    { mult: 1, label: 'Sufre x1 a' },
    { mult: 0.5, label: 'Resiste x0.5 a' },
    { mult: 0.25, label: 'Resiste x0.25 a' },
    { mult: 0, label: 'Inmune a' },
  ];

  const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
  };

  // Dentro del componente
  const isMobile = useIsMobile();

  return (
    <div className="bg-slate-800 rounded-2xl shadow-gray-900/30 p-6">
      <h3 className="flex items-center text-sm font-bold text-slate-300 tracking-wider mb-4">
        EFECTIVIDAD DE TIPOS
        <Tooltip text="Efectividad basada solo en tipos, sin considerar habilidades" position={isMobile ? "bottom" : "right"}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </Tooltip>
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