import { useParams } from "react-router-dom";
import data from "../../data/pokemones.json";
import dataVariant from "../../data/pokemon_forms.json"
import PokemonRoute from "../pokemonRoute/PokemonRoute";
import PokemonDescription from "../pokemonDescription/PokemonDescription";
import PokemonBaseStats from "../pokemonBaseStats/PokemonBaseStats";
import PokemonEvolution from "../pokemonEvolution/PokemonEvolution";
import PokemonInformation from "../pokemonInformation/PokemonInformation";
import Navegation from "../navegation/Navegation";

const Pokemon = () => {
  const { id } = useParams();
  const pokemones = data.pokemones;
  const pokemon = pokemones.find(p => p.id.toLowerCase() === id.toLowerCase());

  if (!pokemon) return <p>Pokémon no encontrado</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Navegation pokemones={pokemones} />
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PokemonInformation pokemon={pokemon} />
            <div className="space-y-6">
              <PokemonRoute pokemon={pokemon} />
              <PokemonDescription pokemon={pokemon} />
            </div>
            <div className="space-y-6">
              <PokemonBaseStats pokemon={pokemon} />
              <PokemonEvolution pokemon={pokemon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;

// import MovimientosSection from "../movimientosSection/movimientosSection";
// {/* Movimientos - Ancho completo abajo */ }
// {/* <div className="bg-white rounded-lg shadow-sm p-6">
//             <MovimientosSection pokemon={pokemon} />
//           </div> */}