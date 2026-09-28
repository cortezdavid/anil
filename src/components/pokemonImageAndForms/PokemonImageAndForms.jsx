import { useState, useEffect } from 'react';
import PokemonFront from "../pokemonFront/PokemonFront";
import ShinyPokemonCard from "./ShinyPokemonCard";
import { getTypeColor, getTypeName } from "../../utils/typeHelpers";
import Tooltip from '../tooltip/Tooltip';

// Botones de formas (base, mega, regionales...): misma clase para todos
const formButtonClass = (isActive) => `rounded-lg border px-4 py-2 text-sm font-medium transition-colors
  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-100
  ${isActive
    ? 'border-blue-700 bg-blue-700'
    : 'border-blue-800 bg-blue-950 hover:bg-blue-700'
  }`;

const PokemonImageAndForms = ({ pokemon, basePokemon, variants, handleFormChange, handleBaseForm, selectedForm, pokemonId }) => {

  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    setSliderValue(0);
  }, [pokemonId, pokemon.id]);

  const hasRealPalette = pokemon.superShinyPalette != null;

  // Pasos reales cuando ya está configurado
  const buildSteps = () => {
    const steps = [
      { label: 'Normal', colorShift: 0 },
      { label: 'Shiny', colorShift: 1 },
    ];
    if (hasRealPalette) {
      steps.push({ label: 'Super Shiny por captura', colorShift: pokemon.superShinyPalette });
    }
    if (pokemon.superShinyFromEvolution?.length) {
      pokemon.superShinyFromEvolution.forEach((palette) => {
        steps.push({ label: 'Super Shiny por Evolución', colorShift: palette });
      });
    }
    return steps;
  };

  const steps = buildSteps();
  const maxSlider = hasRealPalette ? steps.length - 1 : 10;

  // El colorShift real depende del modo
  const getColorShift = () => {
    if (!hasRealPalette) return sliderValue;         // modo posibles: directo
    return steps[sliderValue]?.colorShift ?? 0;      // modo real: desde steps
  };

  const colorShift = getColorShift();
  const currentLabel = hasRealPalette
    ? (steps[sliderValue]?.label ?? 'Normal')
    : sliderValue === 0 ? 'Normal' : sliderValue === 1 ? 'Shiny' : 'Posible Super Shiny';

  const isSuperShiny = sliderValue >= 2;
  const isShiny = sliderValue > 0;
  const isBaseForm = selectedForm === 'base' || !selectedForm;

  return (
    <div className="h-fit rounded-2xl border border-blue-800 bg-blue-900 p-6 lg:sticky lg:top-8">

      {/* Nombre */}
      <h1 className="mb-6 text-center text-4xl font-bold capitalize">
        {pokemon.name}
      </h1>

      {/* Imagen */}
      <div className={`
        relative mb-6 flex min-h-[280px] items-center justify-center
        rounded-2xl border-4 bg-blue-950 p-8 transition-all duration-300
        ${isSuperShiny ? 'border-purple-800 shadow-lg shadow-purple-800/30' : isShiny ? 'border-amber-400 shadow-lg shadow-amber-500/30' : 'border-blue-800'}
      `}>
        <div className="relative flex justify-center items-center">
          {colorShift === 0 ? (
            <PokemonFront key={pokemon.image} img={pokemon.image} scale={200} />
          ) : (
            <ShinyPokemonCard
              key={`${pokemon.image}-${colorShift}`}
              pokemon={{ ...pokemon, colorShift, formIndex: 0, forms: null }}
            />
          )}
        </div>

        {/* Tipos */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
          {pokemon.types.map((type) => (
            <span key={type} className={`rounded px-2 py-1 text-xs font-semibold text-white ${getTypeColor(type)}`}>
              {getTypeName(type)}
            </span>
          ))}
        </div>
      </div>

      {/* Barra */}
      <div className="mb-6">
        <h3 className="mb-2 flex items-center gap-1 text-sm font-medium text-blue-300">
          {currentLabel}
          {!hasRealPalette && isSuperShiny && (
            <Tooltip text="Solo uno de estos colores será el real al capturar" position="top">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </Tooltip>
          )}
        </h3>
        <input
          type="range"
          min="0"
          max={maxSlider}
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          aria-label="Variante de color"
          aria-valuetext={currentLabel}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-blue-950"
        />
      </div>

      {/* Botones de Formas */}
      {variants && variants.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-blue-300">
            Formas
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleBaseForm}
              aria-pressed={isBaseForm}
              className={formButtonClass(isBaseForm)}
            >
              {basePokemon.form}
            </button>
            {variants.map(variant => {
              const isActive = selectedForm?.id === variant.id;
              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => handleFormChange(variant)}
                  aria-pressed={isActive}
                  className={formButtonClass(isActive)}
                >
                  {variant.form}
                </button>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};

export default PokemonImageAndForms;