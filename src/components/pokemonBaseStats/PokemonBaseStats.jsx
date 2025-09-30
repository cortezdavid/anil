const PokemonBaseStats = ({pokemon}) => {
  return (
    <div className="bg-gradient-to-br from-blue-300 to-blue-600 rounded-xl shadow-2xl p-6 border-2 border-none">
      <h2 className="text-2xl font-black text-blue-900 mb-6 uppercase tracking-wider drop-shadow-sm">Estadísticas base</h2>
      <div className="bg-white rounded-lg p-4 shadow-lg">
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4 items-center">
            <span className="text-sm font-bold text-gray-700 text-right">PS:</span>
            <span className="text-sm font-bold text-gray-900 text-center w-8">{pokemon.baseStats.hp}</span>
            <div className="col-span-2">
              <div className="bg-gray-200 rounded-full h-3 relative">
                <div
                  className="bg-red-500 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.min((pokemon.baseStats.hp / 255) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 items-center">
            <span className="text-sm font-bold text-gray-700 text-right">Ataque:</span>
            <span className="text-sm font-bold text-gray-900 text-center w-8">{pokemon.baseStats.attack}</span>
            <div className="col-span-2">
              <div className="bg-gray-200 rounded-full h-3 relative">
                <div
                  className="bg-orange-500 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.min((pokemon.baseStats.attack / 255) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 items-center">
            <span className="text-sm font-bold text-gray-700 text-right">Defensa:</span>
            <span className="text-sm font-bold text-gray-900 text-center w-8">{pokemon.baseStats.defense}</span>
            <div className="col-span-2">
              <div className="bg-gray-200 rounded-full h-3 relative">
                <div
                  className="bg-yellow-500 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.min((pokemon.baseStats.defense / 255) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 items-center">
            <span className="text-sm font-bold text-gray-700 text-right">At. Esp:</span>
            <span className="text-sm font-bold text-gray-900 text-center w-8">{pokemon.baseStats.specialAttack}</span>
            <div className="col-span-2">
              <div className="bg-gray-200 rounded-full h-3 relative">
                <div
                  className="bg-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.min((pokemon.baseStats.specialAttack / 255) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 items-center">
            <span className="text-sm font-bold text-gray-700 text-right">Def. Esp:</span>
            <span className="text-sm font-bold text-gray-900 text-center w-8">{pokemon.baseStats.specialDefense}</span>
            <div className="col-span-2">
              <div className="bg-gray-200 rounded-full h-3 relative">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.min((pokemon.baseStats.specialDefense / 255) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 items-center">
            <span className="text-sm font-bold text-gray-700 text-right">Velocidad:</span>
            <span className="text-sm font-bold text-gray-900 text-center w-8">{pokemon.baseStats.speed}</span>
            <div className="col-span-2">
              <div className="bg-gray-200 rounded-full h-3 relative">
                <div
                  className="bg-pink-500 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.min((pokemon.baseStats.speed / 255) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="pt-4 mt-4 border-t border-gray-300">
            <div className="grid grid-cols-4 gap-4 items-center">
              <span className="text-sm font-black text-gray-900 text-right">Total:</span>
              <span className="text-sm font-black text-gray-900 text-center w-8">
                {Object.values(pokemon.baseStats).reduce((sum, stat) => sum + stat, 0)}
              </span>
              <div className="col-span-2">
                <div className="bg-gray-200 rounded-full h-3 relative">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${Math.min((Object.values(pokemon.baseStats).reduce((sum, stat) => sum + stat, 0) / 720) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)
}

export default PokemonBaseStats