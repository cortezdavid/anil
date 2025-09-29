import { Link, useParams } from "react-router-dom";
import data from "../../data/pokemones.json";
import PokemonFront from "../pokemonFront/PokemonFront";
import MovimientosSection from "../movimientosSection/movimientosSection";

const Pokemon = () => {
  const { id } = useParams();
  const pokemones = data.pokemones;

  const pokemon = pokemones.find(p => p.id.toLowerCase() === id.toLowerCase());

  if (!pokemon) return <p>Pokémon no encontrado</p>;

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <p>Tipos: {pokemon.types.join(", ")}</p>
      <div>
        <h3>bases</h3>
        <p>HP: {pokemon.baseStats.hp}</p>
        <p>Ataque: {pokemon.baseStats.attack}</p>
        <p>Defensa: {pokemon.baseStats.defense}</p>
        <p>Ataque especial: {pokemon.baseStats.specialAttack}</p>
        <p>Defensa especial: {pokemon.baseStats.specialDefense}</p>
      </div>
      <PokemonFront img={pokemon.image} scale={200} />
      <div>
        <h3>Evolución</h3>
        {pokemon.evolutions ? (
          pokemon.evolutions.map((evo, index) => (
            <div key={index}>
              {evo.species}
              <Link to={`/pokemon/${evo.species.toLowerCase()}`} className="inline-block">
                <PokemonFront img={`/images/pokemonFront/${evo.species}.png`} scale={90} />
              </Link>
              <p>{evo.method} {evo.requirement}</p>
            </div>
          ))
        ) : (
          <p>No tiene más evoluciones.</p>
        )}
      </div>
      <MovimientosSection pokemon={pokemon} />
    </div>
  );
};

export default Pokemon;
