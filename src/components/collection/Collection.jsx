import { useState, useEffect } from 'react';
import { 
  DndContext, 
  closestCenter, 
  PointerSensor, 
  TouchSensor, 
  useSensor, 
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import pokemonData from '../../data/pokemonGeneration.json';
import ShinyPokemonCard from './ShinyPokemonCard';
import ColorModal from './ColorModal';
import { useSEO } from '../../hooks/useSEO';

const Collection = () => {
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [modalPokemon, setModalPokemon] = useState(null);

  // Configurar sensores con activación más rápida
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Menos distancia = más responsivo
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100, // Menos delay en móvil
        tolerance: 5,
      },
    })
  );

  useSEO({
    title: 'Colección Shiny - Pokémon Añil',
    description: 'Lleva el registro de tu colección de Pokémon Shiny en Pokémon Añil. Busca, selecciona y organiza los shinies que has capturado.',
    keywords: 'pokémon añil colección, shinies pokémon añil, colección shiny, registro pokémon, shinies capturados'
  });

  // Cargar colección desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem('pokemon_anil_collection_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSelectedPokemon(parsed);
      } catch (error) {
        console.error('Error al cargar colección:', error);
      }
    }
  }, []);

  // Guardar colección en localStorage cuando cambia
  useEffect(() => {
    if (selectedPokemon.length > 0) {
      localStorage.setItem('pokemon_anil_collection_v2', JSON.stringify(selectedPokemon));
    } else {
      localStorage.removeItem('pokemon_anil_collection_v2');
    }
  }, [selectedPokemon]);

  // Manejar búsqueda
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length > 0) {
      const filtered = pokemonData.pokemones
        .filter(p => p.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 10);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  // Agregar Pokémon a la colección (permite duplicados)
  const handleAddPokemon = (pokemon) => {
    const pokemonWithUniqueId = {
      ...pokemon,
      uniqueId: `${pokemon.id}-${Date.now()}-${Math.random()}`,
      colorShift: 0
    };
    setSelectedPokemon(prev => [...prev, pokemonWithUniqueId]);
    setSearch("");
    setSuggestions([]);
  };

  // Eliminar Pokémon de la colección
  const handleRemovePokemon = (uniqueId) => {
    setSelectedPokemon(prev => prev.filter(p => p.uniqueId !== uniqueId));
  };

  // Manejar drag end con dnd-kit
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSelectedPokemon((items) => {
        const oldIndex = items.findIndex((item) => item.uniqueId === active.id);
        const newIndex = items.findIndex((item) => item.uniqueId === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      handleAddPokemon(suggestions[0]);
    }
  };

  // Abrir modal
  const handleOpenModal = (pokemon) => {
    setModalPokemon(pokemon);
  };

  // Confirmar cambio de color
  const handleConfirmColor = (uniqueId, colorShift) => {
    setSelectedPokemon(prev =>
      prev.map(p =>
        p.uniqueId === uniqueId ? { ...p, colorShift } : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Título */}
        <h1 className="text-4xl font-black text-slate-100 mb-4 uppercase tracking-wider drop-shadow-sm">
          Colección Shiny
        </h1>

        {/* Descripción */}
        <div className="bg-blue-900/20 border border-blue-600/30 rounded-xl p-4 mb-6">
          <p className="text-slate-300 leading-relaxed">
            Busca y agrega los Pokémon Shiny que has capturado. 
            Arrastra las tarjetas para reorganizar tu colección. 
            Tu colección se guarda automáticamente.
          </p>
        </div>

        {/* Buscador */}
        <div className="bg-slate-800 rounded-xl shadow-lg shadow-gray-900/30 p-6 border border-slate-700 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar Pokémon para agregar..."
              value={search}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 pr-12 text-slate-100 bg-slate-900 rounded-lg shadow-lg font-medium 
                         border-2 border-slate-700 focus:border-blue-500 outline-none transition-colors
                         placeholder:text-slate-500"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Sugerencias */}
            {suggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-2 bg-slate-800 rounded-lg shadow-2xl max-h-80 overflow-y-auto border border-slate-700">
                <ul className="py-2">
                  {suggestions.map(pokemon => (
                    <li
                      key={`${pokemon.id}-${Math.random()}`}
                      onClick={() => handleAddPokemon(pokemon)}
                      className="px-4 py-2 hover:bg-slate-700 cursor-pointer transition-colors duration-150 flex items-center justify-between"
                    >
                      <span className="text-slate-200 font-semibold">
                        {pokemon.name}
                      </span>
                      <div className="w-16 h-16 overflow-hidden flex-shrink-0">
                        <img
                          src={`/images/icons/${pokemon.id}.png`}
                          alt={pokemon.name}
                          loading="lazy"
                          className="w-32 h-16 object-cover object-left"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Contador */}
        {selectedPokemon.length > 0 && (
          <div className="mb-4 text-center">
            <span className="text-blue-400 font-bold text-lg">
              {selectedPokemon.length} Pokémon en tu colección
            </span>
          </div>
        )}

        {/* Grid de Pokémon con dnd-kit */}
        {selectedPokemon.length > 0 ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={selectedPokemon.map(p => p.uniqueId)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-4">
                {selectedPokemon.map((pokemon) => (
                  <ShinyPokemonCard
                    key={pokemon.uniqueId}
                    pokemon={pokemon}
                    onRemove={handleRemovePokemon}
                    onOpenModal={handleOpenModal}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        ) : (
          <div className="text-center py-16 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
            <div className="text-6xl mb-4">✨</div>
            <p className="text-slate-400 font-semibold text-lg mb-2">
              Tu colección está vacía
            </p>
            <p className="text-slate-500">
              Usa el buscador para agregar Pokémon Shiny
            </p>
          </div>
        )}
      </div>

      {/* Modal de cambio de color */}
      {modalPokemon && (
        <ColorModal
          pokemon={modalPokemon}
          onClose={() => setModalPokemon(null)}
          onConfirm={handleConfirmColor}
        />
      )}
    </div>
  );
};

export default Collection;