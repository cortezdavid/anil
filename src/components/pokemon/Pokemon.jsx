import { useParams, Link } from "react-router-dom";
import data from "../../data/pokemones.json";
import dataVariant from "../../data/pokemon_forms.json";
import PokemonImageAndForms from "../pokemonImageAndForms/PokemonImageAndForms";
import PokemonDetailsTabs from "../pokemonDetailsTabs/PokemonDetailsTabs";
import Navegation from "../navegation/Navegation";
import { useEffect, useState } from "react";
import { useSEO } from "../../hooks/useSEO";

const Pokemon = () => {
  const { id } = useParams();
  const pokemones = data.pokemones;
  const pokemon = pokemones.find(
    (p) => p.id.toLowerCase() === id.toLowerCase(),
  );

  const variants = pokemon
    ? dataVariant.variants.filter((v) => v.baseId === pokemon.id)
    : [];

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

  const [activeTab, setActiveTab] = useState("caracteristicas");

  useSEO({
    title: pokemon ? `Pokédex Añil - ${pokemon.name}` : "Pokémon no encontrado - Guía Pokémon Añil",
    description: pokemon
      ? `Guía de ${pokemon.name} en Pokémon Añil: estadísticas, ubicación, evoluciones y habilidades.`
      : "El Pokémon solicitado no se encuentra en la guía Pokémon Añil.",
    keywords: pokemon
      ? `${pokemon.name}, pokémon añil ${pokemon.name}, ${pokemon.name} ubicación`
      : "guía Pokémon Añil",
  });

  if (!pokemon) {
    return (
      <div className="min-h-screen bg-blue-950 text-blue-100 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-blue-900 rounded-xl p-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">Pokémon no encontrado</h1>
          <p className="text-blue-300 mb-6">
            No encontramos ningún Pokémon con el id <span className="font-semibold text-blue-100">"{id}"</span>.
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-700 hover:bg-blue-800 text-blue-100 font-semibold px-6 py-3 rounded-lg transition-colors
                       focus-visible:outline-offset-2 focus-visible:outline-blue-100"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-950 text-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-8">

        <Navegation pokemones={pokemones} />
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 mt-8">
          {/* COLUMNA IZQUIERDA: Imagen y Formas */}
          <PokemonImageAndForms
            pokemon={displayPokemon}
            basePokemon={pokemon}
            variants={variants}
            handleFormChange={handleFormChange}
            handleBaseForm={handleBaseForm}
            selectedForm={selectedForm}
            pokemonId={id}
          />

          {/* COLUMNA DERECHA: Tabs con toda la información */}
          <PokemonDetailsTabs
            pokemon={displayPokemon}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            variants={variants}
            handleFormChange={handleFormChange}
            handleBaseForm={handleBaseForm}
            selectedForm={selectedForm}
          />
        </div>
      </div>
    </div>
  );
};

export default Pokemon;