const PokemonBaseStats = ({ pokemon }) => {
  const stats = [
    { label: "PS", value: pokemon.baseStats.hp, color: "bg-red-500" },
    { label: "Ataque", value: pokemon.baseStats.attack, color: "bg-orange-500" },
    { label: "Defensa", value: pokemon.baseStats.defense, color: "bg-yellow-500" },
    { label: "At. Esp", value: pokemon.baseStats.specialAttack, color: "bg-purple-500" },
    { label: "Def. Esp", value: pokemon.baseStats.specialDefense, color: "bg-green-500" },
    { label: "Velocidad", value: pokemon.baseStats.speed, color: "bg-pink-500" }
  ];

  const total = Object.values(pokemon.baseStats).reduce((sum, stat) => sum + stat, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-800 rounded-2xl p-6">
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="grid grid-cols-[100px_50px_1fr] gap-4 items-center">
              <span className="text-sm font-bold text-slate-300 text-right">
                {stat.label}
              </span>
              <span className="text-sm font-bold text-slate-100 text-center">
                {stat.value}
              </span>
              <div className="relative">
                <div className="bg-slate-700 rounded-full h-4 overflow-hidden">
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
            <div className="grid grid-cols-[100px_50px_1fr] gap-4 items-center">
              <span className="text-base font-black text-slate-100 text-right">
                Total
              </span>
              <span className="text-base font-black text-blue-400 text-center">
                {total}
              </span>
              <div className="relative">
                <div className="bg-slate-700 rounded-full h-5 overflow-hidden">
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
      </div>
    </div>
  );
};

export default PokemonBaseStats;