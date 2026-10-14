import { useEffect, useState } from "react";

const rowGrid = "grid grid-cols-[100px_50px_1fr] gap-4 items-center";

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
    <div className="max-w-4xl mx-auto">
      <div className="rounded-2xl p-6">
        <div className="space-y-4">
          {stats.map((stat) => (
            <div key={stat.label} className={rowGrid}>
              <span className="text-sm font-bold text-slate-300 text-right">
                {stat.label}
              </span>
              <span className="text-sm font-bold text-slate-100 text-center">
                {stat.value}
              </span>
              <div className="relative">
                <div className="bg-blue-950 rounded-full h-4 overflow-hidden">
                  <div
                    className={`${stat.color} h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2`}
                    style={{ width: `${Math.min((stat.value / 255) * 100, 100)}%` }}
                  >
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="pt-4 mt-4 border-t-2 border-slate-600">
            <div className={rowGrid}>
              <span className="text-base font-black text-slate-100 text-right">
                Total
              </span>
              <span className="text-base font-black text-blue-400 text-center">
                {total}
              </span>
              <div className="relative">
                <div className="bg-blue-950 rounded-full h-5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-2"
                    style={{ width: `${Math.min((total / 720) * 100, 100)}%` }}
                  >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {hasOriginal && (
          <div className="mt-6 pt-4 flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium ${view === 'game' ? 'text-slate-100' : 'text-slate-400'}`}>
                juego
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={view === 'original'}
                onClick={() => setView(v => (v === 'game' ? 'original' : 'game'))}
                className="relative h-6 w-11 shrink-0 rounded-full border border-blue-800 bg-blue-950 transition-colors
                           focus-visible:outline-offset-2 focus-visible:outline-blue-100"
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-blue-100 transition-transform duration-200
                    ${view === 'original' ? 'translate-x-5' : 'translate-x-0'}`}
                />
              </button>
              <span className={`text-sm font-medium ${view === 'original' ? 'text-slate-100' : 'text-slate-400'}`}>
                Original
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonBaseStats;