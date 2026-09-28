import { Link } from "react-router-dom";
import Tooltip from "../tooltip/Tooltip";

const PokemonRoute = ({ pokemon }) => {
  // Sin ruta: explica otras formas de conseguirlo
  if (!pokemon.route) {
    return (
      <div className="rounded-xl p-6 sm:p-10">
        <div className="mx-auto max-w-lg text-center">
          <h3 className="text-2xl font-semibold">No aparece en ninguna ruta</h3>
          <p className="mt-2 leading-relaxed">
            <span className="capitalize">{pokemon.name}</span> no se encuentra en
            estado salvaje, pero puede conseguirse de otras formas.
          </p>
        </div>

        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          <li className="rounded-lg bg-blue-950/50 p-5">
            <h4 className="font-semibold">Por crianza</h4>
            <p className="mt-2 text-sm leading-relaxed">
              Puede nacer de un huevo si crías a otro Pokémon.
            </p>
          </li>
          <li className="rounded-lg bg-blue-950/50 p-5">
            <h4 className="font-semibold">Por evolución</h4>
            <p className="mt-2 text-sm leading-relaxed">
              Puede evolucionar de otro Pokémon.
            </p>
          </li>
          <li className="rounded-lg bg-blue-950/50 p-5">
            <h4 className="font-semibold">Con Don Prodigio</h4>
            <Link
              to="/donprodigio"
              className="mt-3 inline-block text-sm font-semibold underline decoration-blue-800 underline-offset-4 hover:decoration-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-100"
            >
              Ver Don Prodigio
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Columna 1: Imagen del mapa */}
        <div className="bg-blue-950/50 border border-blue-800 rounded-2xl overflow-hidden">
          <img
            src={pokemon.location}
            alt={`Ubicación de ${pokemon.name}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Columna 2: Ubicación y Descripción */}
        <div className="space-y-6">
          {/* Card de ubicación */}
          <div className="p-6">
            <div className="flex items-center gap-3">
              <div>
                <div className='flex items-center gap-1'>
                  <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Ubicación</p>
                  <Tooltip text="La ubicación mostrada puede no ser la única. Algunos Pokémon aparecen en varias zonas." position="top">
                    <svg className="w-4 h-4 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </Tooltip>
                </div>
                <p className="text-base font-bold text-blue-100">
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