import Tooltip from '../tooltip/Tooltip';

const PokemonRoute = ({ pokemon }) => {
  if (!pokemon.route) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-slate-800 rounded-2xl p-10 text-center">
          <div className="text-5xl mb-3">🗺️</div>
          <p className="text-slate-300 font-semibold">
            Este Pokémon no aparece en ninguna ruta
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Columna 1: Imagen del mapa */}
        <div className="bg-slate-800 rounded-2xl overflow-hidden">
          <img
            src={pokemon.location}
            alt={`Ubicación de ${pokemon.name}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Columna 2: Ubicación y Descripción */}
        <div className="space-y-6">
          {/* Card de ubicación */}
          <div className="bg-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 rounded-full p-2 flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className='flex items-center gap-1'>
                  <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Ubicación</p>
                  <Tooltip text="La ubicación mostrada puede no ser la única. Algunos Pokémon aparecen en varias zonas." position="top">
                    <svg className="w-4 h-4 text-slate-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </Tooltip>
                </div>
                <p className="text-base font-bold text-slate-100">
                  {pokemon.route}
                </p>
              </div>
            </div>
            {pokemon.map && (
              <img
                src={pokemon.map}
                alt={`Mapa de ${pokemon.route}`}
                className="mt-3 rounded-xl w-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonRoute;