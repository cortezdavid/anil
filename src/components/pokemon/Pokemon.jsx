import { useParams } from "react-router-dom";
import data from "../../data/pokemones.json";
import PokemonRoute from "../pokemonRoute/PokemonRoute";
import PokemonDescription from "../pokemonDescription/PokemonDescription";
import PokemonBaseStats from "../pokemonBaseStats/PokemonBaseStats";
import PokemonEvolution from "../pokemonEvolution/PokemonEvolution";
import PokemonInformation from "../pokemonInformation/PokemonInformation";
// import MovimientosSection from "../movimientosSection/movimientosSection";

const Pokemon = () => {
  const { id } = useParams();
  const pokemones = data.pokemones;
  const pokemon = pokemones.find(p => p.id.toLowerCase() === id.toLowerCase());

  if (!pokemon) return <p>Pokémon no encontrado</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
      {/* Aquí va tu Navbar */}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Título del Pokémon */}
        <h1 className="text-4xl font-black text-blue-900 mb-8 uppercase tracking-wider drop-shadow-sm">
          {pokemon.name}
        </h1>

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