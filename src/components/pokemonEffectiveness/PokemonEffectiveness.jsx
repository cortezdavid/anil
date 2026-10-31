import Tooltip from '../tooltip/Tooltip';
import typesData from "../../data/types.json";
import { getTypeColor } from "../../utils/typeHelpers";

// Orden de multiplicadores para mostrar (TODOS)
const effectivenessConfig = [
  { mult: 4, label: 'Sufre x4 a' },
  { mult: 2, label: 'Sufre x2 a' },
  { mult: 1, label: 'Sufre x1 a' },
  { mult: 0.5, label: 'Resiste x0.5 a' },
  { mult: 0.25, label: 'Resiste x0.25 a' },
  { mult: 0, label: 'Inmune a' },
];

// Calcula la efectividad de cada tipo de ataque contra los tipos del Pokémon
const calculateTypeEffectiveness = (pokemonTypes) => {
  const effectiveness = {};

  typesData.types.forEach((attackType) => {
    let multiplier = 1;

    pokemonTypes.forEach((defenseType) => {
      const typeData = typesData.types.find((t) => t.id === defenseType);

      if (typeData.weaknesses.includes(attackType.id)) {
        multiplier *= 2; // Débil
      } else if (typeData.resistances.includes(attackType.id)) {
        multiplier *= 0.5; // Resiste
      } else if (typeData.immunities.includes(attackType.id)) {
        multiplier *= 0; // Inmune
      }
    });

    if (!effectiveness[multiplier]) {
      effectiveness[multiplier] = [];
    }
    effectiveness[multiplier].push(attackType);
  });

  return effectiveness;
};

const PokemonEffectiveness = ({ pokemon }) => {
  const effectiveness = calculateTypeEffectiveness(pokemon.types);

  return (
    <div>
      <h3 className="mb-2 flex items-center gap-2 px-3 text-lg font-bold">
        Efectividad de tipos
        <Tooltip text="Efectividad basada solo en tipos, sin considerar habilidades" position="bottom">
          <svg aria-hidden="true" className="h-4 w-4 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </Tooltip>
      </h3>

      <ul>
        {effectivenessConfig.map(({ mult, label }) => {
          const types = effectiveness[mult];
          if (!types || types.length === 0) return null;

          return (
            <li
              key={mult}
              className="grid gap-3 border-t border-blue-800 px-3 py-4 md:grid-cols-[14rem_1fr] md:gap-8"
            >
              <h4 className="font-semibold">{label}</h4>
              <div className="flex flex-wrap gap-2">
                {types.map((type) => (
                  <span
                    key={type.id}
                    className={`rounded px-2.5 py-1 text-sm font-bold text-white ${getTypeColor(type.id)}`}
                  >
                    {type.name}
                  </span>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PokemonEffectiveness;