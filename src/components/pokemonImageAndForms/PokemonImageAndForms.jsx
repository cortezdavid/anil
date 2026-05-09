import { useState, useEffect } from 'react';
import PokemonFront from "../pokemonFront/PokemonFront";
import ShinyPokemonCard from "./ShinyPokemonCard";
import { getTypeColor, getTypeName } from "../../utils/typeHelpers";
import Tooltip from '../tooltip/Tooltip';

const SLIDER_LABELS = [
  'Normal',
  'Shiny',
  'Posible Super Shiny',
  'Posible Super Shiny',
  'Posible Super Shiny',
  'Posible Super Shiny',
  'Posible Super Shiny',
  'Posible Super Shiny',
  'Posible Super Shiny',
  'Posible Super Shiny',
  'Posible Super Shiny'
];

const PokemonImageAndForms = ({ pokemon, basePokemon, variants, handleFormChange, handleBaseForm, selectedForm, pokemonId }) => {
  useEffect(() => {
    setSliderValue(0);
  }, [pokemonId, pokemon.id]);

  const [sliderValue, setSliderValue] = useState(0);

  const isSuperShiny = sliderValue >= 2;
  const isShiny = sliderValue > 0;

  // Construir el objeto pokemon para ShinyPokemonCard
  const shinyPokemon = {
    ...pokemon,
    colorShift: sliderValue,
    formIndex: 0,
    forms: null,
  };

  return (
    <div className="bg-slate-800 rounded-2xl shadow-lg shadow-gray-900/30 p-6 h-fit lg:sticky lg:top-8 border border-slate-700">

      {/* Nombre del Pokémon */}
      <h1 className="text-4xl font-black text-slate-100 mb-6 uppercase tracking-wider text-center">
        {pokemon.name}
      </h1>

      {/* Imagen del Pokémon */}
      <div className={`
        relative bg-gradient-to-br from-slate-700 to-slate-600 
        rounded-2xl p-8 mb-6 flex justify-center items-center
        border-4 transition-all duration-300
        ${isSuperShiny ? 'border-purple-800 shadow-lg shadow-purple-800/30' : isShiny ? 'border-amber-400 shadow-lg shadow-amber-500/30' : 'border-slate-600'}
        min-h-[280px]
      `}>
        <div className="relative flex justify-center items-center">
          {sliderValue === 0 ? (
            <PokemonFront key={pokemon.image} img={pokemon.image} scale={200} />
          ) : (
            <ShinyPokemonCard key={`${pokemon.image}-${sliderValue}`} pokemon={{ ...shinyPokemon, colorShift: sliderValue }} />
          )}
        </div>

        {/* Tipos */}
        <div className="absolute bottom-3 left-3 flex gap-1 flex-wrap">
          {pokemon.types.map((type, typeIdx) => (
            <span
              key={typeIdx}
              className={`px-2 py-1 rounded text-xs font-bold text-white ${getTypeColor(type)} shadow-lg shadow-gray-900/30`}
            >
              {getTypeName(type)}
            </span>
          ))}
        </div>
      </div>

      {/* Barra Normal / Shiny / Paletas */}
      {/* <div className="mb-6">
        <h3 className="flex items-center gap-1 text-sm font-bold text-slate-300 uppercase tracking-wide">
          {SLIDER_LABELS[sliderValue]}
          {isSuperShiny && (
            <span className="normal-case">
              <Tooltip text="Solo uno de estos colores será el real al capturar" position="top">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </Tooltip>
            </span>
          )}
        </h3>
        <input
          min="0"
          max="10"
          type="range"
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="flex-1 w-full h-2 bg-blue-900 rounded-lg appearance-none cursor-pointer"
        />
      </div> */}

      {/* Botones de Formas */}
      {variants && variants.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wide">
            Formas
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleBaseForm}
              className={`
                px-4 py-2 rounded-xl text-sm font-bold 
                ${selectedForm === 'base' || !selectedForm
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600 border-2 border-slate-600'
                }
              `}
            >
              {basePokemon.form}
            </button>
            {variants.map(variant => (
              <button
                key={variant.id}
                onClick={() => handleFormChange(variant)}
                className={`
                  px-4 py-2 rounded-xl text-sm font-bold
                  ${selectedForm?.id === variant.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600 border-2 border-slate-600'
                  }
                `}
              >
                {variant.form}
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default PokemonImageAndForms;