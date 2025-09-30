import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import data from "../../data/pokemones.json";
import PokemonRoute from "../pokemonRoute/PokemonRoute";
import PokemonDescription from "../pokemonDescription/PokemonDescription";
import PokemonBaseStats from "../pokemonBaseStats/PokemonBaseStats";
import PokemonEvolution from "../pokemonEvolution/PokemonEvolution";
import PokemonInformation from "../pokemonInformation/PokemonInformation";
// import MovimientosSection from "../movimientosSection/movimientosSection";

const Pokemon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pokemones = data.pokemones;
  const pokemon = pokemones.find(p => p.id.toLowerCase() === id.toLowerCase());

  if (!pokemon) return <p>Pokémon no encontrado</p>;

  const currentIndex = pokemones.findIndex(p => p.id.toLowerCase() === id.toLowerCase());
  const prevPokemon = currentIndex > 0 ? pokemones[currentIndex - 1] : null;
  const nextPokemon = currentIndex < pokemones.length - 1 ? pokemones[currentIndex + 1] : null;

  const handleNavigation = (pokemonId) => {
    navigate(`/pokemon/${pokemonId.toLowerCase()}`);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Botones de navegación */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => handleNavigation(prevPokemon.id)}
            disabled={!prevPokemon}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-bold transition-all duration-200 ${prevPokemon
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {prevPokemon && (
              <span>
                {prevPokemon.name}
              </span>
            )}
          </button>

          <div className="text-center">
            <span className="text-sm font-bold text-blue-700">
              #{currentIndex + 1} / {pokemones.length}
            </span>
          </div>

          <button
            onClick={() => handleNavigation(nextPokemon.id)}
            disabled={!nextPokemon}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-bold transition-all duration-200 ${nextPokemon
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            {nextPokemon && (
              <span>
                {nextPokemon.name}
              </span>
            )}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Layout principal */}
        <div className="space-y-8">

          {/* Grid superior - 3 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Columna 1 - Sprite + Info básica */}
            <PokemonInformation pokemon={pokemon} />

            {/* Columna 2 - Stack vertical con Ubicación y Descripción */}
            <div className="space-y-6">
              {/* Ubicación */}
              <PokemonRoute pokemon={pokemon} />
              {/* Descripción */}
              <PokemonDescription pokemon={pokemon} />
            </div>

            {/* Columna 3 - Stack vertical con Stats y Evolución */}
            <div className="space-y-6">
              {/* Base Stats */}
              <PokemonBaseStats pokemon={pokemon} />
              {/* Evolución */}
              <PokemonEvolution pokemon={pokemon} />
            </div>
          </div>

          {/* Movimientos - Ancho completo abajo */}
          {/* <div className="bg-white rounded-lg shadow-sm p-6">
            <MovimientosSection pokemon={pokemon} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Pokemon;