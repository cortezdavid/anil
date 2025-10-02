import { useParams } from "react-router-dom";
import data from "../../data/pokemones.json";
import dataVariant from "../../data/pokemon_forms.json"
import PokemonRoute from "../pokemonRoute/PokemonRoute";
import PokemonDescription from "../pokemonDescription/PokemonDescription";
import PokemonBaseStats from "../pokemonBaseStats/PokemonBaseStats";
import PokemonEvolution from "../pokemonEvolution/PokemonEvolution";
import PokemonInformation from "../pokemonInformation/PokemonInformation";
import Navegation from "../navegation/Navegation";
import { useEffect, useState } from "react";

const Pokemon = () => {
  const { id } = useParams();
  const pokemones = data.pokemones;
  const pokemon = pokemones.find(p => p.id.toLowerCase() === id.toLowerCase());

  const variants = dataVariant.variants.filter(v => v.baseId === pokemon.id);

  // Estado para controlar qué forma se está mostrando
  const [selectedForm, setSelectedForm] = useState(null); // null = forma base

  // Determinar qué datos mostrar
  const displayPokemon = selectedForm || pokemon;

  const handleFormChange = (variant) => {
    setSelectedForm(variant); // Cambiar a variante
  };

  const handleBaseForm = () => {
    setSelectedForm(null); // Volver a forma base
  };

  useEffect(() => {
    setSelectedForm(null);
  }, [id]); // cada vez que cambia el id de la URL


  if (!pokemon) return <p>Pokémon no encontrado</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Navegation pokemones={pokemones} />
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PokemonInformation pokemon={displayPokemon} variants={variants} handleFormChange={handleFormChange} handleBaseForm={handleBaseForm} selectedForm={selectedForm} />
            <div className="space-y-6">
              <PokemonRoute pokemon={displayPokemon} />
              <PokemonDescription pokemon={displayPokemon} />
            </div>
            <div className="space-y-6">
              <PokemonBaseStats pokemon={displayPokemon} />
              <PokemonEvolution pokemon={displayPokemon} />
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