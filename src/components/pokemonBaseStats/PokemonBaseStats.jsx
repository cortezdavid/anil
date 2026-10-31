import { useEffect, useState } from "react";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-100";

const rowGrid = "grid grid-cols-[6.5rem_3rem_1fr] items-center gap-4";

const PokemonBaseStats = ({ pokemon }) => {
  const hasOriginal = Boolean(pokemon.originalBaseStats);
  const [view, setView] = useState('game');

  useEffect(() => {
    setView('game');
  }, [pokemon.id]);

  const activeStats = view === 'original' && hasOriginal
    ? pokemon.originalBaseStats
    : pokemon.baseStats;

  const stats = [
    { label: "PS", value: activeStats.hp, color: "bg-red-500" },
    { label: "Ataque", value: activeStats.attack, color: "bg-orange-500" },
    { label: "Defensa", value: activeStats.defense, color: "bg-yellow-500" },
    { label: "At. Esp", value: activeStats.specialAttack, color: "bg-purple-500" },
    { label: "Def. Esp", value: activeStats.specialDefense, color: "bg-green-500" },
    { label: "Velocidad", value: activeStats.speed, color: "bg-pink-500" }
  ];

  const total = Object.values(activeStats).reduce((sum, stat) => sum + stat, 0);

  return (
    <div>
      <h3 className="mb-2 px-3 text-lg font-bold">Estadísticas base</h3>

      <ul className="space-y-1">
        {stats.map((stat) => (
          <li key={stat.label} className={`${rowGrid} px-3 py-1`}>
            <span className="text-sm text-blue-300">{stat.label}</span>
            <span className="text-right font-semibold tabular-nums">{stat.value}</span>
            {/* La barra es decorativa: el valor ya está en texto */}
            <div aria-hidden="true" className="h-3 overflow-hidden rounded-full bg-blue-900">
              <div
                className={`${stat.color} h-full rounded-full transition-all duration-500 ease-out`}
                style={{ width: `${Math.min((stat.value / 255) * 100, 100)}%` }}
              />
            </div>
          </li>
        ))}

        {/* Total: más aire arriba para separarlo del resto */}
        <li className={`${rowGrid} px-3 pb-2 pt-6`}>
          <span className="font-bold">Total</span>
          <span className="text-right font-bold tabular-nums">{total}</span>
          <div aria-hidden="true" className="h-3 overflow-hidden rounded-full bg-blue-900">
            <div
              className="h-full rounded-full bg-blue-100 transition-all duration-700 ease-out"
              style={{ width: `${Math.min((total / 720) * 100, 100)}%` }}
            />
          </div>
        </li>
      </ul>

      {hasOriginal && (
        <div className="mt-6 flex items-center gap-3 px-3">
          <span className={`text-sm font-medium ${view === 'game' ? 'text-blue-100' : 'text-blue-300'}`}>
            Juego
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={view === 'original'}
            aria-label="Mostrar estadísticas originales"
            onClick={() => setView((v) => (v === 'game' ? 'original' : 'game'))}
            className={`relative h-6 w-11 shrink-0 rounded-full border border-blue-800 bg-blue-900 transition-colors ${focusRing}`}
          >
            <span
              className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-blue-100 transition-transform duration-200
                ${view === 'original' ? 'translate-x-5' : 'translate-x-0'}`}
            />
          </button>
          <span className={`text-sm font-medium ${view === 'original' ? 'text-blue-100' : 'text-blue-300'}`}>
            Original
          </span>
        </div>
      )}
    </div>
  );
};

export default PokemonBaseStats;