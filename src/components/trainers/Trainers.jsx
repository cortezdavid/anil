import { useState, useEffect, useMemo, memo } from "react";
import fire from "../../data/trainers_fire.json";
import ground from "../../data/trainers_ground.json";
import water from "../../data/trainers_water.json";
import dataMoves from "../../data/moves.json";
import data from "../../data/pokemones.json";
import pokemonForms from "../../data/pokemon_forms.json"
import abilitiesData from "../../data/abilities.json";
import itemsData from "../../data/items.json"
import types from "../../data/types.json"
import AutoScrollTop from "../autoScrollTop/AutoScrollTop";
import Tooltip from "../tooltip/Tooltip";
import { useSEO } from '../../hooks/useSEO';

// Componente memoizado para cada Pokémon
const PokemonCard = memo(({
  poke,
  pokemonMap,
  itemsMap,
  abilitiesMap,
  movesMap,
  typesMap,
  getTypeColor
}) => {
  const pokemon = pokemonMap.get(poke.name);
  const pokemonName = pokemon?.name || poke.name;
  const pokemonTypes = pokemon?.types || [];

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-4 shadow-lg shadow-gray-900/30">
      {/* Imagen del Pokémon */}
      <div className="flex justify-center mb-2">
        <img
          src={`/images/trainersPokemon/${poke.name}.png`}
          alt={pokemonName}
          className="w-24"
        />
      </div>

      {/* Header del Pokémon */}
      <div className="mb-3 pb-2 border-b-2 border-slate-600">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-black text-slate-100 text-base">
            {pokemonName}
          </h3>
          <span className="bg-blue-600 text-white font-bold px-2 py-1 rounded text-xs">
            Nv. {poke.level}
          </span>
        </div>

        {/* Tipos del Pokémon */}
        <div className="flex gap-1 flex-wrap">
          {pokemonTypes.map((type, typeIdx) => {
            const typeName = typesMap.get(type)?.name || type;
            return (
              <span
                key={typeIdx}
                className={`px-2 py-0.5 rounded text-xs font-bold text-white ${getTypeColor(type)}`}
              >
                {typeName}
              </span>
            );
          })}
        </div>
      </div>

      {/* Detalles */}
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="font-semibold text-slate-300">Objeto:</span>
          <Tooltip text={itemsMap.get(poke.item)?.description} position="left">
            <span className="text-slate-100">
              {poke.item && poke.item !== "" ? (itemsMap.get(poke.item)?.name || poke.item) : "Ninguno"}
            </span>
          </Tooltip>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-slate-300">Habilidad:</span>
          <Tooltip text={abilitiesMap.get(poke.ability)?.description} position="left">
            <span className="text-slate-100">
              {abilitiesMap.get(poke.ability)?.name || poke.ability}
            </span>
          </Tooltip>
        </div>

        {/* Movimientos */}
        <div className="pt-2 border-t border-slate-600">
          <div className="font-semibold text-slate-300 mb-1">Movimientos:</div>
          <div className="space-y-1">
            {poke.moves.map((moveId, moveIdx) => {
              const move = movesMap.get(moveId);
              const moveType = move?.type;
              const moveTypeName = typesMap.get(moveType)?.name;

              return (
                <div key={moveIdx} className="flex items-center justify-between text-xs bg-slate-900 px-2 py-1 rounded">
                  <Tooltip text={move?.description} position="right">
                    <span className="font-medium text-slate-200">{move?.name || moveId}</span>
                  </Tooltip>
                  {moveType && (
                    <span className={`px-2 py-0.5 rounded text-xs font-bold text-white ${getTypeColor(moveType)}`}>
                      {moveTypeName}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

PokemonCard.displayName = 'PokemonCard';

const Trainers = () => {
  useSEO({
    title: 'Entrenadores - Pokémon Añil',
    description: 'Lista completa de entrenadores en Pokémon Añil con sus equipos Pokémon, niveles y estrategias.',
    keywords: 'pokémon añil entrenadores, equipos entrenadores pokémon añil, lista entrenadores, batalla entrenadores pokémon añil'
  });

  const [selectedStarter, setSelectedStarter] = useState(() => {
    return localStorage.getItem('selectedStarter') || 'ground';
  });

  const [selectedDifficulty, setSelectedDifficulty] = useState(() => {
    return localStorage.getItem('selectedDifficulty') || 'easy';
  });

  const [openTrainer, setOpenTrainer] = useState(null);

  // Guardar en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('selectedStarter', selectedStarter);
  }, [selectedStarter]);

  useEffect(() => {
    localStorage.setItem('selectedDifficulty', selectedDifficulty);
  }, [selectedDifficulty]);

  // Crear Maps una sola vez 
  const pokemonMap = useMemo(() => {
    const map = new Map();
    data.pokemones.forEach(p => map.set(p.id, p));
    pokemonForms.variants.forEach(v => map.set(v.id, v));
    return map;
  }, []);

  const movesMap = useMemo(() => {
    return new Map(dataMoves.moves.map(m => [m.id, m]));
  }, []);

  const abilitiesMap = useMemo(() => {
    return new Map(abilitiesData.abilities.map(a => [a.id, a]));
  }, []);

  const itemsMap = useMemo(() => {
    return new Map(itemsData.items.map(i => [i.id, i]));
  }, []);

  const typesMap = useMemo(() => {
    return new Map(types.types.map(t => [t.id, t]));
  }, []);

  // Obtener datos según starter
  const trainersData = useMemo(() => {
    const dataMap = {
      fire: fire.trainers,
      ground: ground.trainers,
      water: water.trainers
    };
    return dataMap[selectedStarter] || [];
  }, [selectedStarter]);

  // Separar en categorías
  const routeTrainers = useMemo(() => trainersData.filter(t => t.category === "route"), [trainersData]);
  const eliteFour = useMemo(() => trainersData.filter(t => t.category === "liga"), [trainersData]);
  const postGame = useMemo(() => trainersData.filter(t => t.category === "postGame"), [trainersData]);

  const getTypeColor = (type) => {
    const colors = {
      'FIRE': 'bg-red-500',
      'WATER': 'bg-blue-500',
      'GRASS': 'bg-green-500',
      'ELECTRIC': 'bg-yellow-400',
      'ICE': 'bg-cyan-400',
      'PSYCHIC': 'bg-pink-500',
      'DARK': 'bg-gray-800',
      'DRAGON': 'bg-purple-500',
      'FAIRY': 'bg-pink-400',
      'FIGHTING': 'bg-red-700',
      'POISON': 'bg-purple-600',
      'GROUND': 'bg-yellow-600',
      'FLYING': 'bg-indigo-400',
      'BUG': 'bg-lime-600',
      'ROCK': 'bg-yellow-800',
      'GHOST': 'bg-purple-800',
      'STEEL': 'bg-gray-500',
      'NORMAL': 'bg-gray-400'
    };
    return colors[type] || 'bg-gray-500';
  };

  const toggleTrainer = (trainerId) => {
    setOpenTrainer(openTrainer === trainerId ? null : trainerId);
  };

  const formatIconName = (name) => {
    if (!name) return '';
    return name.replace(/(\d+)$/, '_$1');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-black text-slate-100 mb-6 uppercase tracking-wider drop-shadow-sm">
          Entrenadores
        </h1>

        {/* alert */}
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-sm">
            <div className="flex items-start">
              <div className="ml-3">
                <p className="text-sm font-medium text-yellow-800">
                  ⚠️ Guía en construcción
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                  Esta sección está siendo actualizada a la última versión del juego. La información puede estar sujeta a cambios.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Selectores en una fila */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Selector de inicial */}
          <div>
            <h2 className="text-2xl font-black text-slate-100 uppercase tracking-wide text-center mb-4">
              Elige tu inicial
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={() => setSelectedStarter("ground")}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-black transition-all duration-200 ${selectedStarter === "ground"
                  ? "bg-green-600 text-white shadow-xl scale-105"
                  : "bg-slate-800 text-green-400 hover:bg-slate-700"
                  }`}
              >
                Planta
              </button>

              <button
                onClick={() => setSelectedStarter("water")}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-black transition-all duration-200 ${selectedStarter === "water"
                  ? "bg-blue-600 text-white shadow-xl scale-105"
                  : "bg-slate-800 text-blue-400 hover:bg-slate-700"
                  }`}
              >
                Agua
              </button>
              <button
                onClick={() => setSelectedStarter("fire")}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-black transition-all duration-200 ${selectedStarter === "fire"
                  ? "bg-red-600 text-white shadow-xl scale-105"
                  : "bg-slate-800 text-red-400 hover:bg-slate-700"
                  }`}
              >
                Fuego
              </button>
            </div>
          </div>

          {/* Selector de dificultad */}
          <div>
            <h2 className="text-2xl font-black text-slate-100 uppercase tracking-wide text-center mb-4">
              Elige la dificultad
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={() => setSelectedDifficulty("easy")}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-black transition-all duration-200 ${selectedDifficulty === "easy"
                  ? "bg-green-500 text-white shadow-xl scale-105"
                  : "bg-slate-800 text-green-400 hover:bg-slate-700"
                  }`}
              >
                Clásico
              </button>
              <button
                onClick={() => setSelectedDifficulty("normal")}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-black transition-all duration-200 ${selectedDifficulty === "normal"
                  ? "bg-blue-500 text-white shadow-xl scale-105"
                  : "bg-slate-800 text-blue-400 hover:bg-slate-700"
                  }`}
              >
                Completo
              </button>
              <button
                onClick={() => setSelectedDifficulty("hard")}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-black transition-all duration-200 ${selectedDifficulty === "hard"
                  ? "bg-red-500 text-white shadow-xl scale-105"
                  : "bg-slate-800 text-red-400 hover:bg-slate-700"
                  }`}
              >
                Radical
              </button>
            </div>
          </div>
        </div>

        {/* Entrenadores de Ruta con Acordeón */}
        {routeTrainers.length > 0 && (
          <div className="mb-12">
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 shadow-2xl mb-6">
              <h2 className="text-3xl font-black text-white uppercase tracking-wider text-center">
                Combates importantes y gimnasios
              </h2>
            </div>
            <div className="space-y-4">
              {routeTrainers.map((trainer) => {
                const trainerData = trainer.difficulties[selectedDifficulty];
                const isOpen = openTrainer === trainer.id;

                return (
                  <div key={trainer.id} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-lg shadow-gray-900/30 overflow-hidden">
                    {/* Header clickeable */}
                    <button
                      onClick={() => toggleTrainer(trainer.id)}
                      className="w-full p-4 flex items-center justify-between hover:bg-slate-800/70 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        {/* Sprite del entrenador */}
                        <div className="flex-shrink-0">
                          <img
                            src={trainer.img}
                            alt={trainer.trainer}
                            className="w-20 h-20 object-contain"
                          />
                        </div>

                        {/* Info del entrenador */}
                        <div className="text-left">
                          <div className="font-black text-lg text-slate-100">{trainer.trainer}</div>
                          <div className="text-sm text-slate-400">{trainer.location}</div>
                          {trainerData.items && trainerData.items !== "" && (
                            <div className="text-xs text-slate-300 font-semibold mt-1">
                              <span className="text-blue-400">Objetos:</span> {itemsMap.get(trainerData.items)?.name || trainerData.items}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Iconos de Pokémon y flecha */}
                      <div className="flex items-center space-x-3">
                        {/* Iconos pequeños de los Pokémon */}
                        <div className="hidden md:flex items-center space-x-1">
                          {trainerData.pokemon.map((poke, idx) => {
                            const iconName = formatIconName(poke.name);
                            return (
                              <div key={idx} className="relative">
                                <div className="w-12 h-12 flex items-center justify-center rounded-lg">
                                  <img
                                    src={`/images/icons/${iconName}.png`}
                                    alt={poke.name}
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                    }}
                                  />
                                </div>
                                {/* Nivel del Pokémon */}
                                <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-xs font-bold px-1 rounded">
                                  {poke.level}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Flecha */}
                        <svg
                          className={`w-6 h-6 text-blue-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    {/* Contenido expandible con información COMPLETA */}
                    {isOpen && (
                      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 border-t border-slate-700">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {trainerData.pokemon.map((poke, pokeIndex) => (
                            <PokemonCard
                              key={pokeIndex}
                              poke={poke}
                              pokemonMap={pokemonMap}
                              itemsMap={itemsMap}
                              abilitiesMap={abilitiesMap}
                              movesMap={movesMap}
                              typesMap={typesMap}
                              getTypeColor={getTypeColor}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Liga Pokémon (Alto mando) con Acordeón */}
        {eliteFour.length > 0 && (
          <div className="mb-12">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 shadow-2xl mb-6">
              <h2 className="text-3xl font-black text-white uppercase tracking-wider text-center">
                Liga Pokémon
              </h2>
            </div>
            <div className="space-y-4">
              {eliteFour.map((trainer) => {
                const trainerData = trainer.difficulties[selectedDifficulty];
                const isOpen = openTrainer === trainer.id;

                return (
                  <div key={trainer.id} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-lg shadow-gray-900/30 overflow-hidden">
                    {/* Header clickeable */}
                    <button
                      onClick={() => toggleTrainer(trainer.id)}
                      className="w-full p-4 flex items-center justify-between hover:bg-slate-800/70 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        {/* Sprite del entrenador */}
                        <div className="flex-shrink-0">
                          <img
                            src={trainer.img}
                            alt={trainer.trainer}
                            className="w-20 h-20 object-contain"
                          />
                        </div>

                        {/* Info del entrenador */}
                        <div className="text-left">
                          <div className="font-black text-lg text-slate-100">{trainer.trainer}</div>
                          <div className="text-sm text-slate-400">{trainer.location}</div>
                          {trainerData.items && trainerData.items !== "" && (
                            <div className="text-xs text-slate-300 font-semibold mt-1">
                              <span className="text-blue-400">Objetos:</span> {itemsMap.get(trainerData.items)?.name || trainerData.items}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Iconos de Pokémon y flecha */}
                      <div className="flex items-center space-x-3">
                        {/* Iconos pequeños de los Pokémon */}
                        <div className="hidden md:flex items-center space-x-1">
                          {trainerData.pokemon.map((poke, idx) => {
                            const iconName = formatIconName(poke.name);
                            return (
                              <div key={idx} className="relative">
                                <div className="w-12 h-12 flex items-center justify-center rounded-lg">
                                  <img
                                    src={`/images/icons/${iconName}.png`}
                                    alt={poke.name}
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                    }}
                                  />
                                </div>
                                {/* Nivel del Pokémon */}
                                <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-xs font-bold px-1 rounded">
                                  {poke.level}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Flecha */}
                        <svg
                          className={`w-6 h-6 text-blue-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    {/* Contenido expandible con información COMPLETA */}
                    {isOpen && (
                      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 border-t border-slate-700">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {trainerData.pokemon.map((poke, pokeIndex) => (
                            <PokemonCard
                              key={pokeIndex}
                              poke={poke}
                              pokemonMap={pokemonMap}
                              itemsMap={itemsMap}
                              abilitiesMap={abilitiesMap}
                              movesMap={movesMap}
                              typesMap={typesMap}
                              getTypeColor={getTypeColor}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Post-Liga con Acordeón */}
        {postGame.length > 0 && (
          <div className="mb-12">
            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 shadow-2xl mb-6">
              <h2 className="text-3xl font-black text-white uppercase tracking-wider text-center">
                Post-Game
              </h2>
            </div>
            <div className="space-y-4">
              {postGame.map((trainer) => {
                const trainerData = trainer.difficulties[selectedDifficulty];
                const isOpen = openTrainer === trainer.id;

                return (
                  <div key={trainer.id} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-lg shadow-gray-900/30 overflow-hidden">
                    {/* Header clickeable */}
                    <button
                      onClick={() => toggleTrainer(trainer.id)}
                      className="w-full p-4 flex items-center justify-between hover:bg-slate-800/70 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        {/* Sprite del entrenador */}
                        <div className="flex-shrink-0">
                          <img
                            src={trainer.img}
                            alt={trainer.trainer}
                            className="w-20 h-20 object-contain"
                          />
                        </div>

                        {/* Info del entrenador */}
                        <div className="text-left">
                          <div className="font-black text-lg text-slate-100">{trainer.trainer}</div>
                          <div className="text-sm text-slate-400">{trainer.location}</div>
                          {trainerData.items && trainerData.items !== "" && (
                            <div className="text-xs text-slate-300 font-semibold mt-1">
                              <span className="text-blue-400">Objetos:</span> {itemsMap.get(trainerData.items)?.name || trainerData.items}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Iconos de Pokémon y flecha */}
                      <div className="flex items-center space-x-3">
                        {/* Iconos pequeños de los Pokémon */}
                        <div className="hidden md:flex items-center space-x-1">
                          {trainerData.pokemon.map((poke, idx) => {
                            const iconName = formatIconName(poke.name);
                            return (
                              <div key={idx} className="relative">
                                <div className="w-12 h-12 flex items-center justify-center rounded-lg">
                                  <img
                                    src={`/images/icons/${iconName}.png`}
                                    alt={poke.name}
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                    }}
                                  />
                                </div>
                                {/* Nivel del Pokémon */}
                                <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white text-xs font-bold px-1 rounded">
                                  {poke.level}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Flecha */}
                        <svg
                          className={`w-6 h-6 text-blue-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    {/* Contenido expandible con información COMPLETA */}
                    {isOpen && (
                      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 border-t border-slate-700">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {trainerData.pokemon.map((poke, pokeIndex) => (
                            <PokemonCard
                              key={pokeIndex}
                              poke={poke}
                              pokemonMap={pokemonMap}
                              itemsMap={itemsMap}
                              abilitiesMap={abilitiesMap}
                              movesMap={movesMap}
                              typesMap={typesMap}
                              getTypeColor={getTypeColor}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <AutoScrollTop />
      </div>
    </div>
  );
};

export default Trainers;