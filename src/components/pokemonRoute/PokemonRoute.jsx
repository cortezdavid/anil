const PokemonRoute = ({ pokemon }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Columna 1: Imagen del mapa */}
        <div className="bg-slate-800 rounded-2xl shadow-lg shadow-gray-900/30 border border-slate-700 overflow-hidden">
          <img 
            src={pokemon.location} 
            alt={`Ubicación de ${pokemon.name}`} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Columna 2: Ubicación y Descripción */}
        <div className="space-y-6">
          {/* Card de ubicación */}
          <div className="bg-slate-800 rounded-2xl shadow-lg shadow-gray-900/30 p-6 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 rounded-full p-2 flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Ubicación</p>
                <p className="text-base font-bold text-slate-100">
                  {pokemon.route || "Desconocida"}
                </p>
              </div>
            </div>
          </div>

          {/* Card de descripción */}
          <div className="bg-slate-800 rounded-2xl shadow-lg shadow-gray-900/30 p-6 border border-slate-700">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">
              Descripción
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {pokemon.pokedex}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonRoute;