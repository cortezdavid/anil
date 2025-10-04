import { useState } from "react";
import fire from "../../data/trainers_fire.json";
import ground from "../../data/trainers_ground.json";
import water from "../../data/trainers_water.json";
import dataMoves from "../../data/moves.json";
import data from "../../data/pokemones.json";
import abilitiesData from "../../data/abilities.json";
import itemsData from "../../data/items.json"
import PokemonFront from "../pokemonFront/PokemonFront";
import types from "../../data/types.json"


const Trainers = () => {
  const [selectedStarter, setSelectedStarter] = useState("ground");
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");

  const trainersData = {
    fire: fire.trainers,
    ground: ground.trainers,
    water: water.trainers
  };

  const trainers = trainersData[selectedStarter];

  const getPokemonName = (pokemonId) => {
    const pokemon = data.pokemones.find(p => p.id === pokemonId);
    return pokemon ? pokemon.name : pokemonId;
  };

  const getAbilityName = (abilityId) => {
    const ability = abilitiesData.abilities.find(a => a.id === abilityId);
    return ability ? ability.name : abilityId;
  };

  const getMoveName = (moveId) => {
    const move = dataMoves.moves.find(m => m.id === moveId);
    return move ? move.name : moveId;
  };

  const getItemName = (itemId) => {
    if (!itemId || itemId === "") return "Ninguno";
    const item = itemsData.items.find(i => i.id === itemId);
    return item ? item.name : itemId;
  };

  const getPokemonTypes = (pokemonId) => {
    const pokemon = data.pokemones.find(p => p.id === pokemonId);
    return pokemon ? pokemon.types : [];
  };

  const getTypeName = (typeId) => {
    const type = types.types.find(t => t.id === typeId);
    return type ? type.name : typeId;
  };

  const getTypeColor = (type) => {
    const colors = {
      'FIRE': 'bg-red-500',
      'WATER': 'bg-blue-500',
      'GRASS': 'bg-green-500',
      'ELECTRIC': 'bg-yellow-500',
      'PSYCHIC': 'bg-purple-500',
      'ICE': 'bg-cyan-400',
      'DRAGON': 'bg-indigo-600',
      'DARK': 'bg-gray-800',
      'FAIRY': 'bg-pink-400',
      'FIGHTING': 'bg-red-700',
      'POISON': 'bg-purple-600',
      'GROUND': 'bg-yellow-600',
      'FLYING': 'bg-indigo-400',
      'BUG': 'bg-green-600',
      'ROCK': 'bg-yellow-800',
      'GHOST': 'bg-purple-800',
      'STEEL': 'bg-gray-500',
      'NORMAL': 'bg-gray-400'
    };
    return colors[type] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-black text-blue-900 mb-6 uppercase tracking-wider drop-shadow-sm">
          Entrenadores
        </h1>

        {/* Selectores en una fila */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Selector de inicial */}
          <div>
            <h2 className="text-2xl font-black text-blue-900 uppercase tracking-wide text-center mb-4">
              Elige tu inicial
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={() => setSelectedStarter("ground")}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-black transition-all duration-200 ${selectedStarter === "ground"
                  ? "bg-green-600 text-white shadow-xl scale-105"
                  : "bg-white text-green-600 border-2 border-green-600 hover:bg-green-50"
                  }`}
              >
                Planta
              </button>

              <button
                onClick={() => setSelectedStarter("water")}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-black transition-all duration-200 ${selectedStarter === "water"
                  ? "bg-blue-600 text-white shadow-xl scale-105"
                  : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
                  }`}
              >
                Agua
              </button>
              <button
                onClick={() => setSelectedStarter("fire")}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-black transition-all duration-200 ${selectedStarter === "fire"
                  ? "bg-red-600 text-white shadow-xl scale-105"
                  : "bg-white text-red-600 border-2 border-red-600 hover:bg-red-50"
                  }`}
              >
                Fuego
              </button>
            </div>
          </div>

          {/* Selector de dificultad */}
          <div>
            <h2 className="text-2xl font-black text-blue-900 uppercase tracking-wide text-center mb-4">
              Elige la dificultad
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={() => setSelectedDifficulty("easy")}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-black transition-all duration-200 ${selectedDifficulty === "easy"
                  ? "bg-green-500 text-white shadow-xl scale-105"
                  : "bg-white text-green-500 border-2 border-green-500 hover:bg-green-50"
                  }`}
              >
                Clásico
              </button>
              <button
                onClick={() => setSelectedDifficulty("normal")}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-black transition-all duration-200 ${selectedDifficulty === "normal"
                  ? "bg-blue-500 text-white shadow-xl scale-105"
                  : "bg-white text-blue-500 border-2 border-blue-500 hover:bg-blue-50"
                  }`}
              >
                Completo
              </button>
              <button
                onClick={() => setSelectedDifficulty("hard")}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-black transition-all duration-200 ${selectedDifficulty === "hard"
                  ? "bg-red-500 text-white shadow-xl scale-105"
                  : "bg-white text-red-500 border-2 border-red-500 hover:bg-red-50"
                  }`}
              >
                Radical
              </button>
            </div>
          </div>
        </div>

        {/* Listado de entrenadores en orden */}
        <div className="space-y-6">
          {trainers.map((trainer) => {
            const trainerData = trainer.difficulties[selectedDifficulty];

            return (
              <div key={trainer.id}>
                {/* Siempre mostrar ubicación */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 shadow-lg">
                  <h2 className="text-2xl font-black text-white uppercase tracking-wider">
                    {trainer.location}
                  </h2>
                </div>

                {/* Card del entrenador */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="grid md:grid-cols-12 gap-6">
                    {/* Imagen del entrenador */}
                    <div className="md:col-span-2 flex flex-col items-center">
                      <img
                        src={trainer.img}
                        alt={`Entrenador ${trainer.id}`}
                        className="w-auto h-auto mb-2"
                      />
                      <div className="text-center">
                        <h3 className="font-black text-blue-900 text-lg">
                          {trainer.trainer}
                        </h3>
                        {trainerData.items && trainerData.items !== "" && (
                          <p className="text-sm text-gray-700 font-semibold mt-1">
                            Objetos: {getItemName(trainerData.items)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Pokémon del entrenador */}
                    <div className="md:col-span-10">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {trainerData.pokemon.map((poke, pokeIndex) => (
                          <div key={pokeIndex} className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-4 border-2 border-blue-200 shadow">
                            {/* Imagen del Pokémon */}
                            <div className="flex justify-center mb-2">
                              <PokemonFront img={`/images/pokemonFront/${poke.name}.png`} scale={70} />
                            </div>

                            {/* Header del Pokémon */}
                            <div className="mb-3 pb-2 border-b-2 border-blue-200">
                              <div className="flex justify-between items-center mb-2">
                                <h3 className="font-black text-blue-900 text-base">
                                  {getPokemonName(poke.name)}
                                </h3>
                                <span className="bg-blue-600 text-white font-bold px-2 py-1 rounded text-xs">
                                  Nv. {poke.level}
                                </span>
                              </div>

                              {/* Tipos del Pokémon */}
                              <div className="flex gap-1 flex-wrap">
                                {getPokemonTypes(poke.name).map((type, typeIdx) => (
                                  <span
                                    key={typeIdx}
                                    className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${getTypeColor(type)}`}
                                  >
                                    {getTypeName(type)}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Detalles */}
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between">
                                <span className="font-semibold text-gray-700">Objeto:</span>
                                <span className="text-gray-900">{getItemName(poke.item)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="font-semibold text-gray-700">Habilidad:</span>
                                <span className="text-gray-900">{getAbilityName(poke.abilit)}</span>
                              </div>

                              {/* Movimientos */}
                              <div className="pt-2 border-t border-blue-100">
                                <div className="font-semibold text-gray-700 mb-1">Movimientos:</div>
                                <div className="space-y-1">
                                  {poke.moves.map((move, moveIdx) => (
                                    <div key={moveIdx} className="text-xs bg-white px-2 py-1 rounded border border-blue-100">
                                      {getMoveName(move)}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Trainers;