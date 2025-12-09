import { useState, useEffect } from 'react';
import pokemonData from '../../data/pokemonGeneration.json';
import PokemonCard from './PokemonCard';
import { useSEO } from '../../hooks/useSEO';

const Collection = () => {
  const [selectedGeneration, setSelectedGeneration] = useState(1);
  const [collectedPokemon, setCollectedPokemon] = useState({});

  useSEO({
    title: 'Colección Shiny - Pokémon Añil',
    description: 'Lleva el registro de tu colección de Pokémon Shiny en Pokémon Añil. Marca los shinies que has capturado y comparte tu progreso.',
    keywords: 'pokémon añil colección, shinies pokémon añil, colección shiny, registro pokémon, shinies capturados'
  });

  // Cargar colección desde localStorage al montar
  useEffect(() => {
    const saved = localStorage.getItem('pokemon_anil_collection');
    if (saved) {
      try {
        setCollectedPokemon(JSON.parse(saved));
      } catch (error) {
        console.error('Error al cargar colección:', error);
      }
    }
  }, []);

  // Guardar colección en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem('pokemon_anil_collection', JSON.stringify(collectedPokemon));
  }, [collectedPokemon]);

  const togglePokemon = (pokemonId) => {
    setCollectedPokemon(prev => ({
      ...prev,
      [pokemonId]: !prev[pokemonId]
    }));
  };

  // Filtrar Pokémon por generación
  const filteredPokemon = pokemonData.pokemones.filter(
    p => p.generation === selectedGeneration
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Título */}
        <h1 className="text-4xl font-black text-slate-100 mb-4 uppercase tracking-wider drop-shadow-sm">
          Colección Shiny
        </h1>

        {/* Descripción */}
        {/* <div className="bg-blue-900/20 border border-blue-600/30 rounded-xl p-4 mb-6">
          <p className="text-slate-300 leading-relaxed">
            Lleva el registro de todos los Pokémon Shiny que has capturado. 
            Haz clic en cada Pokémon para marcarlo como capturado. 
            Tu colección se guarda automáticamente en tu navegador.
          </p>
        </div> */}

        {/* Selector de Generaciones */}
        <div className="bg-slate-800 rounded-xl shadow-lg shadow-gray-900/30 p-6 border border-slate-700 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-100">Seleccionar Generación</h2>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(gen => (
              <button
                key={gen}
                onClick={() => setSelectedGeneration(gen)}
                className={`px-6 py-3 rounded-lg font-bold transition-all duration-200 ${
                  selectedGeneration === gen
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                Gen {gen}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Pokémon - 8 columnas */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-4">
          {filteredPokemon.map(pokemon => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              isCollected={collectedPokemon[pokemon.id] || false}
              onToggle={() => togglePokemon(pokemon.id)}
            />
          ))}
        </div>

        {/* Mensaje si no hay Pokémon */}
        {filteredPokemon.length === 0 && (
          <div className="text-center py-12 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-slate-400 font-semibold">
              No hay Pokémon de la Generación {selectedGeneration}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;