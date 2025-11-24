import { Link } from 'react-router-dom';
import PokemonFront from "../pokemonFront/PokemonFront";
import itemsData from "../../data/items.json";

const PokemonEvolution = ({ pokemon }) => {

  const getItemName = (id) => {
    const item = itemsData.items.find(i => i.id === id);
    return item ? item.name : id;
  };

  const formatSpeciesName = (species) => {
    return species.replace(/_\d+$/, "").toLowerCase();
  };

  if (!pokemon.evolutionChain || pokemon.evolutionChain.length === 0) {
    return (
      <div className="bg-slate-800 rounded-2xl p-10 text-center">
        <div className="text-5xl mb-3">✨</div>
        <p className="text-slate-300 font-semibold">
          Este Pokémon no tiene evoluciones
        </p>
      </div>
    );
  }

  // Detectar el tipo de cadena evolutiva
  const detectChainType = () => {
    const firstStage = pokemon.evolutionChain[0];

    // Si tiene branches, es una cadena multi-ramificada (Wurmple)
    if (firstStage.branches) {
      return 'multi-branch';
    }

    // Si el primer stage tiene múltiples evoluciones, verificar si es una ramificación simple
    if (Array.isArray(firstStage.evolvesTo)) {
      // Si solo hay 1 stage y ramifica, tratarlo como mixto (caso Slowpoke)
      if (pokemon.evolutionChain.length === 1) {
        return 'mixed-simple';
      }
      return 'branched-start';
    }

    // Si algún stage intermedio tiene ramificación, es mixta (Oddish → Gloom → Vileplume/Bellossom)
    const hasMidBranch = pokemon.evolutionChain.some(
      (stage, index) => index > 0 && Array.isArray(stage.evolvesTo)
    );
    if (hasMidBranch) {
      return 'mixed';
    }

    // Si no tiene ramificaciones, es lineal (Bulbasaur → Ivysaur → Venusaur)
    return 'linear';
  };

  const chainType = detectChainType();

  // Renderizar cadena multi-ramificada (Wurmple → Silcoon/Cascoon → Beautifly/Dustox)
  if (chainType === 'multi-branch') {
    const baseStage = pokemon.evolutionChain[0];
    const branches = baseStage.branches || [];

    return (
      <div className="bg-slate-800 rounded-2xl  p-6">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-6">
          Cadena Evolutiva
        </h3>

        {/* Desktop: Horizontal con ramas */}
        <div className="hidden lg:block">
          <div className="flex items-start justify-center gap-4">
            {/* Pokémon base */}
            <Link to={`/pokemon/${formatSpeciesName(baseStage.species)}`}>
              <div className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl p-6 border-2 border-slate-600 hover:border-blue-500 hover:shadow-lg transition-all duration-200 text-center min-w-[160px]">
                <div className="bg-slate-900 rounded-xl p-3 mb-3 mx-auto w-fit">
                  <PokemonFront
                    img={`/images/pokemonFront/${baseStage.species}.png`}
                    scale={80}
                  />
                </div>
                <div className="font-black text-lg text-slate-100 capitalize">
                  {formatSpeciesName(baseStage.species)}
                </div>
              </div>
            </Link>

            {/* Ramas */}
            <div className="flex flex-col gap-3">
              {branches.map((branch, branchIndex) => (
                <div key={branchIndex} className="flex items-center gap-3">
                  {branch.line.map((evo, evoIndex) => (
                    <div key={evoIndex} className="flex items-center gap-3">
                      {/* Flecha y método */}
                      <div className="flex flex-col items-center min-w-[80px]">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <div className="text-center mt-1">
                          <div className="text-xs font-bold text-blue-400 whitespace-nowrap">
                            {evo.method}
                          </div>
                          {evo.requirement && (
                            <div className="text-xs text-slate-400 font-semibold whitespace-nowrap">
                              {evo.requirement}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card del Pokémon */}
                      <Link to={`/pokemon/${formatSpeciesName(evo.species)}`}>
                        <div className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl p-3 border-2 border-slate-600 hover:border-blue-500 hover:shadow-lg transition-all duration-200 min-w-[140px]">
                          <div className="bg-slate-900 rounded-lg p-2 mb-2 mx-auto w-fit">
                            <PokemonFront
                              img={`/images/pokemonFront/${evo.species}.png`}
                              scale={60}
                            />
                          </div>
                          <div className="text-center">
                            <div className="font-black text-sm text-slate-100 capitalize">
                              {formatSpeciesName(evo.species)}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Móvil: Vertical */}
        <div className="lg:hidden space-y-6">
          {/* Pokémon base */}
          <Link to={`/pokemon/${formatSpeciesName(baseStage.species)}`}>
            <div className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl p-4 border-2 border-slate-600 hover:border-blue-500 transition-all duration-200">
              <div className="flex items-center gap-4">
                <div className="bg-slate-900 rounded-lg p-2">
                  <PokemonFront
                    img={`/images/pokemonFront/${baseStage.species}.png`}
                    scale={60}
                  />
                </div>
                <div className="flex-1">
                  <div className="font-black text-lg text-slate-100 capitalize">
                    {formatSpeciesName(baseStage.species)}
                  </div>

                </div>
              </div>
            </div>
          </Link>

          {/* Separador */}
          <div className="flex flex-col items-center">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>

          {/* Ramas */}
          {branches.map((branch, branchIndex) => (
            <div key={branchIndex} className="space-y-3 border-l-4 border-blue-500 pl-4">
              {branch.line.map((evo, evoIndex) => (
                <div key={evoIndex}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex flex-col items-center min-w-[80px]">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <div className="text-center mt-1">
                        <div className="text-xs font-bold text-blue-400 whitespace-nowrap">
                          {evo.method}
                        </div>
                        {evo.requirement && (
                          <div className="text-xs text-slate-400 font-semibold whitespace-nowrap">
                            {evo.requirement}
                          </div>
                        )}
                      </div>
                    </div>

                    <Link to={`/pokemon/${formatSpeciesName(evo.species)}`} className="flex-1">
                      <div className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl p-3 border-2 border-slate-600 hover:border-blue-500 transition-all duration-200">
                        <div className="flex items-center gap-3">
                          <div className="bg-slate-900 rounded-lg p-2">
                            <PokemonFront
                              img={`/images/pokemonFront/${evo.species}.png`}
                              scale={50}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-black text-sm text-slate-100 capitalize">
                              {formatSpeciesName(evo.species)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Renderizar evolución lineal (Bulbasaur → Ivysaur → Venusaur)
  if (chainType === 'linear') {
    return (
      <div className="bg-slate-800 rounded-2xl  p-6">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-6">
          Cadena Evolutiva
        </h3>

        {/* Desktop: Horizontal */}
        <div className="hidden lg:flex items-center justify-center gap-4">
          {pokemon.evolutionChain.map((stage, index) => (
            <div key={index} className="flex items-center gap-4">
              {/* Card del Pokémon */}
              <Link
                to={`/pokemon/${formatSpeciesName(stage.species)}`}
                className="group"
              >
                <div className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl p-6 border-2 border-slate-600 hover:border-blue-500 hover:shadow-lg transition-all duration-200 text-center min-w-[160px]">
                  <div className="bg-slate-900 rounded-xl p-3 mb-3 mx-auto w-fit">
                    <PokemonFront
                      img={`/images/pokemonFront/${stage.species}.png`}
                      scale={80}
                    />
                  </div>
                  <div className="font-black text-lg text-slate-100 capitalize">
                    {formatSpeciesName(stage.species)}
                  </div>

                </div>
              </Link>

              {/* Flecha de evolución */}
              {stage.evolvesTo && (
                <div className="flex flex-col items-center">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <div className="mt-2 text-center">
                    <div className="text-xs font-bold text-blue-400">
                      {stage.evolvesTo.method}
                    </div>
                    {stage.evolvesTo.requirement && (
                      <div className="text-xs text-slate-400 font-semibold">
                        {typeof stage.evolvesTo.requirement === 'number'
                          ? `${stage.evolvesTo.requirement}`
                          : getItemName(stage.evolvesTo.requirement)
                        }
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Móvil: Vertical */}
        <div className="lg:hidden space-y-4">
          {pokemon.evolutionChain.map((stage, index) => (
            <div key={index}>
              <Link
                to={`/pokemon/${formatSpeciesName(stage.species)}`}
                className="block"
              >
                <div className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl p-4 border-2 border-slate-600 hover:border-blue-500 transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-900 rounded-lg p-2">
                      <PokemonFront
                        img={`/images/pokemonFront/${stage.species}.png`}
                        scale={60}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-black text-lg text-slate-100 capitalize">
                        {formatSpeciesName(stage.species)}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Flecha hacia abajo */}
              {stage.evolvesTo && (
                <div className="flex flex-col items-center my-3">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <div className="text-xs font-bold text-blue-400 mt-1">
                    {stage.evolvesTo.method}
                    {stage.evolvesTo.requirement && (
                      <span className="text-slate-400 ml-1">
                        {typeof stage.evolvesTo.requirement === 'number'
                          ? `${stage.evolvesTo.requirement}`
                          : getItemName(stage.evolvesTo.requirement)
                        }
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Renderizar evolución mixta (Oddish → Gloom → Vileplume/Bellossom)
  // O ramificación simple desde stage 1 (Slowpoke → Slowbro/Slowking)
  if (chainType === 'mixed' || chainType === 'mixed-simple') {
    // Encontrar el stage donde ocurre la ramificación
    const branchStageIndex = pokemon.evolutionChain.findIndex(
      stage => Array.isArray(stage.evolvesTo)
    );
    const linearStages = pokemon.evolutionChain.slice(0, branchStageIndex + 1);
    const branchStage = pokemon.evolutionChain[branchStageIndex];
    const finalEvolutions = Array.isArray(branchStage.evolvesTo) ? branchStage.evolvesTo : [];

    return (
      <div className="bg-slate-800 rounded-2xl  p-6">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-6">
          Cadena Evolutiva
        </h3>

        {/* Desktop: Parte lineal horizontal, luego ramificaciones a la derecha */}
        <div className="hidden lg:block">
          <div className="flex items-start justify-center gap-4">
            {/* Parte lineal */}
            <div className="flex items-center gap-4">
              {linearStages.map((stage, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Link to={`/pokemon/${formatSpeciesName(stage.species)}`}>
                    <div className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl p-6 border-2 border-slate-600 hover:border-blue-500 hover:shadow-lg transition-all duration-200 text-center min-w-[160px]">
                      <div className="bg-slate-900 rounded-xl p-3 mb-3 mx-auto w-fit">
                        <PokemonFront
                          img={`/images/pokemonFront/${stage.species}.png`}
                          scale={80}
                        />
                      </div>
                      <div className="font-black text-lg text-slate-100 capitalize">
                        {formatSpeciesName(stage.species)}
                      </div>
                    </div>
                  </Link>

                  {index < linearStages.length - 1 && stage.evolvesTo && !Array.isArray(stage.evolvesTo) && (
                    <div className="flex flex-col items-center">
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <div className="mt-2 text-center">
                        <div className="text-xs font-bold text-blue-400">
                          {stage.evolvesTo.method}
                        </div>
                        {stage.evolvesTo.requirement && (
                          <div className="text-xs text-slate-400 font-semibold">
                            {typeof stage.evolvesTo.requirement === 'number'
                              ? `${stage.evolvesTo.requirement}`
                              : getItemName(stage.evolvesTo.requirement)
                            }
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Ramificaciones en columna vertical */}
            <div className="flex flex-col gap-2">
              {finalEvolutions.map((evo, index) => (
                <div key={index} className="flex items-center gap-2">
                  {/* Flecha y método */}
                  <div className="flex flex-col items-center min-w-[80px]">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <div className="text-center mt-1">
                      <div className="text-xs font-bold text-blue-400 whitespace-nowrap">
                        {evo.method}
                      </div>
                      {evo.requirement && (
                        <div className="text-xs text-slate-400 font-semibold whitespace-nowrap">
                          {typeof evo.requirement === 'number'
                            ? `${evo.requirement}`
                            : getItemName(evo.requirement)
                          }
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card del Pokémon */}
                  <Link to={`/pokemon/${formatSpeciesName(evo.species)}`} className="flex-1">
                    <div className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl p-3 border-2 border-slate-600 hover:border-blue-500 hover:shadow-lg transition-all duration-200 flex items-center gap-3">
                      <div className="bg-slate-900 rounded-lg p-2">
                        <PokemonFront
                          img={`/images/pokemonFront/${evo.species}.png`}
                          scale={60}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-black text-sm text-slate-100 capitalize">
                          {formatSpeciesName(evo.species)}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Móvil: Todo vertical */}
        <div className="lg:hidden space-y-4">
          {linearStages.map((stage, index) => (
            <div key={index}>
              <Link to={`/pokemon/${formatSpeciesName(stage.species)}`}>
                <div className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl p-4 border-2 border-slate-600 hover:border-blue-500 transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-900 rounded-lg p-2">
                      <PokemonFront
                        img={`/images/pokemonFront/${stage.species}.png`}
                        scale={60}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-black text-lg text-slate-100 capitalize">
                        {formatSpeciesName(stage.species)}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {index < linearStages.length - 1 && stage.evolvesTo && !Array.isArray(stage.evolvesTo) && (
                <div className="flex flex-col items-center my-3">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <div className="text-xs font-bold text-blue-400 mt-1">
                    {stage.evolvesTo.method}
                    {stage.evolvesTo.requirement && (
                      <span className="text-slate-400 ml-1">
                        {typeof stage.evolvesTo.requirement === 'number'
                          ? `${stage.evolvesTo.requirement}`
                          : getItemName(stage.evolvesTo.requirement)
                        }
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Separador */}
          <div className="flex flex-col items-right my-4">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>

          {/* Evoluciones finales */}
          {finalEvolutions.map((evo, index) => (
            <div key={index} className="flex items-center gap-3">
              {/* Flecha horizontal hacia la derecha */}
              <div className="flex flex-col items-center min-w-[80px]">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <div className="text-center mt-1">
                  <div className="text-xs font-bold text-blue-400 whitespace-nowrap">
                    {evo.method}
                  </div>
                  {evo.requirement && (
                    <div className="text-xs text-slate-400 font-semibold whitespace-nowrap">
                      {typeof evo.requirement === 'number'
                        ? `${evo.requirement}`
                        : getItemName(evo.requirement)
                      }
                    </div>
                  )}
                </div>
              </div>

              <Link to={`/pokemon/${formatSpeciesName(evo.species)}`} className="flex-1">
                <div className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl p-4 border-2 border-slate-600 hover:border-blue-500 transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-900 rounded-lg p-2">
                      <PokemonFront
                        img={`/images/pokemonFront/${evo.species}.png`}
                        scale={60}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-black text-base text-slate-100 capitalize">
                        {formatSpeciesName(evo.species)}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Renderizar evoluciones ramificadas desde el inicio (Eevee, Applin, etc.)
  const baseStage = pokemon.evolutionChain[0];
  const evolutions = Array.isArray(baseStage.evolvesTo) ? baseStage.evolvesTo : [];

  return (
    <div className="bg-slate-800 rounded-2xl  p-6">
      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-6">
        Evoluciones Posibles
      </h3>

      {/* Pokémon base */}
      <div className="mb-6">
        <Link
          to={`/pokemon/${formatSpeciesName(baseStage.species)}`}
          className="block max-w-xs mx-auto"
        >
          <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-2xl p-6 border-2 border-purple-600/50 hover:border-purple-500 hover:shadow-lg transition-all duration-200 text-center">
            <div className="bg-slate-900 rounded-xl p-4 mb-3 mx-auto w-fit">
              <PokemonFront
                img={`/images/pokemonFront/${baseStage.species}.png`}
                scale={100}
              />
            </div>
            <div className="font-black text-xl text-slate-100 capitalize">
              {formatSpeciesName(baseStage.species)}
            </div>
            <div className="text-sm text-slate-400 font-semibold mt-1">
              Forma Base
            </div>
          </div>
        </Link>
      </div>

      <div className="text-center mb-4">
        <div className="inline-block text-sm font-bold text-slate-400 uppercase tracking-wider bg-slate-700 px-4 py-2 rounded-full">
          Puede evolucionar a
        </div>
      </div>

      {/* Grid de evoluciones */}
      <div className="flex flex-wrap justify-center gap-4">
        {evolutions.map((evo, index) => (
          <Link
            key={index}
            to={`/pokemon/${formatSpeciesName(evo.species)}`}
            className="block"
          >
            <div className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl p-4 border-2 border-slate-600 hover:border-blue-500 hover:shadow-lg transition-all duration-200 min-w-[160px]">
              <div className="bg-slate-900 rounded-lg p-3 mb-3 mx-auto w-fit">
                <PokemonFront
                  img={`/images/pokemonFront/${evo.species}.png`}
                  scale={70}
                />
              </div>
              <div className="text-center">
                <div className="font-black text-base text-slate-100 capitalize mb-2">
                  {formatSpeciesName(evo.species)}
                </div>
                <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full inline-block">
                  {evo.method}
                </div>
                {evo.requirement && (
                  <div className="text-xs text-slate-400 font-semibold mt-2">
                    {typeof evo.requirement === 'number'
                      ? `Nivel ${evo.requirement}`
                      : getItemName(evo.requirement)
                    }
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PokemonEvolution;