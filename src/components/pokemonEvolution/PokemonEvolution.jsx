import { Link } from "react-router-dom";
import itemsData from "../../data/items.json"
import PokemonFront from "../pokemonFront/PokemonFront";

const PokemonEvolution = ({ pokemon }) => {

  const getItemName = (id) => {
    const item = itemsData.items.find(i => i.id === id);
    return item ? item.name : id; // Si no existe, devuelve el id tal cual
  }

  return (
    <div className="bg-gradient-to-br from-blue-300 to-blue-600 rounded-xl shadow-2xl p-6 border-2 border-none">
      <h2 className="text-2xl font-black text-blue-900 mb-4 uppercase tracking-wider drop-shadow-sm">Evolución</h2>

      {pokemon.evolutions && pokemon.evolutions.length > 0 ? (
        <div className="space-y-4">
          {pokemon.evolutions.map((evo, index) => (
            <Link
              key={index}
              to={`/pokemon/${evo.species.replace(/_\d+$/, "").toLowerCase()}`}
              className="block"
            >
              <div className="flex items-center justify-between p-4 bg-white rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl">

                {/* Flecha y método */}
                <div className="flex flex-col items-center">
                  <div className="text-2xl text-blue-600 mb-1">→</div>
                  <div className=" text-sm text-blue-900 text-center">
                    <div className="font-bold">{evo.method}</div>
                    {evo.requirement && (
                      <div className="text-gray-600">{getItemName(evo.requirement)}</div>
                    )}
                  </div>
                </div>

                {/* Sprite + nombre */}
                <div className="flex items-center space-x-4 flex-1 ml-4">
                  <div className="bg-blue-50 rounded-lg p-2 border border-blue-200">
                    <PokemonFront
                      img={`/images/pokemonFront/${evo.species}.png`}
                      scale={80}
                    />
                  </div>
                  <div>
                    <div className="font-black text-lg text-blue-900 capitalize">
                      {evo.species.replace(/_\d+$/, "").toLowerCase()}
                    </div>
                    <div className="text-sm font-semibold text-blue-700">
                      Siguiente evolución
                    </div>
                  </div>
                </div>

                {/* Icono de enlace */}
                <div className="text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg p-8 text-center shadow-lg">
          <div className="text-4xl mb-2">✨</div>
          <p className="text-gray-700 font-semibold">
            Este Pokémon no tiene más evoluciones
          </p>
        </div>
      )}
    </div>)
}

export default PokemonEvolution