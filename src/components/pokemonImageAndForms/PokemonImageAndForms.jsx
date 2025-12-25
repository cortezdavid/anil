import { useMemo } from 'react';
import PokemonFront from "../pokemonFront/PokemonFront";

const PokemonImageAndForms = ({ pokemon, basePokemon, variants, handleFormChange, handleBaseForm, selectedForm }) => {
  const isShiny = useMemo(() => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    return randomNum === 1;
  }, [pokemon.id]);

  const getImagePath = () => {
    if (isShiny) {
      return pokemon.image.replace('/pokemonFront/', '/pokemonFrontShiny/');
    }
    return pokemon.image;
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
        ${isShiny ? 'border-amber-400 shadow-lg shadow-amber-500/30' : 'border-slate-600'}
        min-h-[280px]
      `}>
        <div className="relative">
          <PokemonFront img={getImagePath()} scale={200} />

          {isShiny && (
            <>
              <div className="absolute -top-3 -right-3 text-5xl animate-bounce">
                ✨
              </div>
            </>
          )}
        </div>
      </div>

      {/* Botones de Formas - Solo si existen variantes */}
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