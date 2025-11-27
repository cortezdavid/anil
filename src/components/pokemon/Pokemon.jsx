import { useParams } from "react-router-dom";
import data from "../../data/pokemones.json";
import dataVariant from "../../data/pokemon_forms.json"
import PokemonImageAndForms from "../pokemonImageAndForms/PokemonImageAndForms";
import PokemonDetailsTabs from "../pokemonDetailsTabs/PokemonDetailsTabs";
import Navegation from "../navegation/Navegation";
import { useEffect, useState } from "react";
import { useSEO } from '../../hooks/useSEO';

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

  const [activeTab, setActiveTab] = useState('caracteristicas');

  if (!pokemon) return <p>Pokémon no encontrado</p>;

  useSEO({
    title: `Pokédex Añil - ${pokemon.name}`,
    description: `Guía de ${pokemon.name} en Pokémon Añil: estadísticas, ubicación, evoluciones y habilidades.`,
    keywords: `${pokemon.name}, pokémon añil ${pokemon.name}, ${pokemon.name} ubicación`
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-sm">
            <div className="flex items-start">
              <div className="ml-3">
                <p className="text-sm font-medium text-yellow-800">
                  ⚠️ Guía en construcción
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                  Esta sección está siendo actualizada a la última versión del juego. Pueden faltar detalles.
                </p>
              </div>
            </div>
          </div>
        </div>
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