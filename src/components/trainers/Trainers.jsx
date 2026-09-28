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
import { getTypeColor, getTypeName } from "../../utils/typeHelpers";

// Componente memoizado para cada Pokémon
const PokemonCard = memo(({
  poke,
  pokemonMap,
  itemsMap,
  abilitiesMap,
  movesMap,
  typesMap
}) => {
  const pokemon = pokemonMap.get(poke.name);
  const pokemonName = pokemon?.name || poke.name;
  const pokemonTypes = pokemon?.types || [];

  return (
    <div className="bg-blue-950 border border-blue-800 rounded-lg p-4">
      {/* Imagen del Pokémon */}
      <div className="flex justify-center mb-2">
        <img
          src={`/images/trainersPokemon/${poke.name}.png`}
          alt={pokemonName}
          className="w-24"
        />
      </div>

      {/* Header del Pokémon */}
      <div className="mb-3 pb-2 border-b border-blue-800">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-base">
            {pokemonName}
          </h3>
          <span className="bg-blue-700 text-blue-100 font-bold px-2 py-1 rounded text-xs">
            Nv. {poke.level}
          </span>
        </div>

        {/* Tipos del Pokémon */}
        <div className="flex gap-1 flex-wrap">
          {pokemonTypes.map((type, typeIdx) => (
            <span
              key={typeIdx}
              className={`px-2 py-0.5 rounded text-xs font-semibold text-white ${getTypeColor(type)}`}
            >
              {getTypeName(type)}
            </span>
          ))}
        </div>
      </div>

      {/* Detalles */}
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="font-medium text-blue-300">Objeto:</span>
          <Tooltip text={itemsMap.get(poke.item)?.description} position="left">
            <span>
              {poke.item && poke.item !== "" ? (itemsMap.get(poke.item)?.name || poke.item) : "Ninguno"}
            </span>
          </Tooltip>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-blue-300">Habilidad:</span>
          <Tooltip text={abilitiesMap.get(poke.ability)?.description} position="left">
            <span>
              {abilitiesMap.get(poke.ability)?.name || poke.ability}
            </span>
          </Tooltip>
        </div>

        {/* Movimientos */}
        <div className="pt-2 border-t border-blue-800">
          <div className="font-medium text-blue-300 mb-1">Movimientos:</div>
          <div className="space-y-1">
            {poke.moves.map((moveId, moveIdx) => {
              const move = movesMap.get(moveId);
              const moveType = move?.type;
              const moveTypeName = typesMap.get(moveType)?.name;

              return (
                <div key={moveIdx} className="flex items-center justify-between text-xs bg-blue-900 px-2 py-1 rounded">
                  <Tooltip text={move?.description} position="right">
                    <span className="font-medium">{move?.name || moveId}</span>
                  </Tooltip>
                  {moveType && (
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold text-white ${getTypeColor(moveType)}`}>
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

// Formatea el id del ícono ("PIKACHU1" -> "PIKACHU_1")
const formatIconName = (name) => {
  if (!name) return '';
  return name.replace(/(\d+)$/, '_$1');
};

// Una sección de entrenadores (Ruta, Liga o Post-Game) con su acordeón.
// Las tres secciones eran casi el mismo bloque repetido tres veces; ahora es uno solo.
const TrainerSection = ({ title, trainers, selectedDifficulty, openTrainer, toggleTrainer, pokemonMap, itemsMap, abilitiesMap, movesMap, typesMap }) => {
  if (trainers.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="bg-blue-700 rounded-xl p-6 mb-6">
        <h2 className="text-3xl font-semibold text-center">
          {title}
        </h2>
      </div>

      <div className="space-y-4">
        {trainers.map((trainer) => {
          const trainerData = trainer.difficulties[selectedDifficulty];
          const isOpen = openTrainer === trainer.id;

          return (
            <div key={trainer.id} className="bg-blue-950 border border-blue-800 rounded-xl overflow-hidden">
              {/* Header clickeable */}
              <button
                onClick={() => toggleTrainer(trainer.id)}
                aria-expanded={isOpen}
                className={`w-full p-4 flex items-center justify-between transition-colors duration-200 ${isOpen ? 'bg-blue-800/50' : 'hover:bg-blue-800/50'
                  }`}
              >
                <div className="flex items-center space-x-4">
                  {/* Sprite del entrenador */}
                  <img
                    src={trainer.img}
                    alt={trainer.trainer}
                    className="w-20 h-20 object-contain flex-shrink-0"
                  />

                  {/* Info del entrenador */}
                  <div className="text-left">
                    <div className="font-semibold text-lg">{trainer.trainer}</div>
                    <div className="text-sm text-blue-300">{trainer.location}</div>
                    {trainerData.items && trainerData.items !== "" && (
                      <div className="text-xs font-medium mt-1">
                        <span className="text-blue-300">Objetos:</span> {itemsMap.get(trainerData.items)?.name || trainerData.items}
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
                          <div className="absolute -bottom-1 -right-1 bg-blue-700 text-blue-100 text-xs font-bold px-1 rounded">
                            {poke.level}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Flecha */}
                  <svg
                    className={`w-6 h-6 text-blue-300 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Contenido expandible con información completa */}
              {isOpen && (
                <div className="p-6 border-t border-blue-800">
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
  );
};

// Botón de un selector (inicial o dificultad). El color activo es semántico
// (tipo del inicial o nivel de dificultad), no un acento del sitio.
// Tailwind necesita ver el nombre completo de cada clase para generarla,
// así que no se puede armar "bg-" + color + "-600" con una variable: se
// listan las clases completas de cada color en este mapa.
const SELECTOR_COLORS = {
  green: { active: 'bg-green-600 text-white', inactive: 'text-green-400' },
  blue: { active: 'bg-blue-600 text-white', inactive: 'text-blue-400' },
  red: { active: 'bg-red-600 text-white', inactive: 'text-red-400' },
};

const SelectorButton = ({ active, color, onClick, children }) => {
  const { active: activeClass, inactive: inactiveClass } = SELECTOR_COLORS[color];
  return (
    <button
      onClick={onClick}
      className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition-colors ${active ? activeClass : `bg-blue-900 border border-blue-800 hover:bg-blue-800/50 ${inactiveClass}`
        }`}
    >
      {children}
    </button>
  );
};

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

  const toggleTrainer = (trainerId) => {
    setOpenTrainer(openTrainer === trainerId ? null : trainerId);
  };

  // Props compartidas por las tres secciones de entrenadores
  const sectionProps = {
    selectedDifficulty,
    openTrainer,
    toggleTrainer,
    pokemonMap,
    itemsMap,
    abilitiesMap,
    movesMap,
    typesMap,
  };

  return (
    <div className="min-h-screen bg-blue-950 text-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">
          Entrenadores
        </h1>

        {/* Selectores en una fila */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Selector de inicial */}
          <div>
            <h2 className="text-xl font-semibold text-center mb-4">
              Elige tu inicial
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <SelectorButton active={selectedStarter === "ground"} color="green" onClick={() => setSelectedStarter("ground")}>
                Planta
              </SelectorButton>
              <SelectorButton active={selectedStarter === "water"} color="blue" onClick={() => setSelectedStarter("water")}>
                Agua
              </SelectorButton>
              <SelectorButton active={selectedStarter === "fire"} color="red" onClick={() => setSelectedStarter("fire")}>
                Fuego
              </SelectorButton>
            </div>
          </div>

          {/* Selector de dificultad */}
          <div>
            <h2 className="text-xl font-semibold text-center mb-4">
              Elige la dificultad
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <SelectorButton active={selectedDifficulty === "easy"} color="green" onClick={() => setSelectedDifficulty("easy")}>
                Clásico
              </SelectorButton>
              <SelectorButton active={selectedDifficulty === "normal"} color="blue" onClick={() => setSelectedDifficulty("normal")}>
                Completo
              </SelectorButton>
              <SelectorButton active={selectedDifficulty === "hard"} color="red" onClick={() => setSelectedDifficulty("hard")}>
                Radical
              </SelectorButton>
            </div>
          </div>
        </div>

        <TrainerSection title="Combates importantes y gimnasios" trainers={routeTrainers} {...sectionProps} />
        <TrainerSection title="Liga Pokémon" trainers={eliteFour} {...sectionProps} />
        <TrainerSection title="Post-Game" trainers={postGame} {...sectionProps} />

        <AutoScrollTop />
      </div>
    </div>
  );
};

export default Trainers;