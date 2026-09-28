import { Link } from 'react-router-dom';
import PokemonFront from "../pokemonFront/PokemonFront";
import itemsData from "../../data/items.json";

const getItemName = (id) => {
  const item = itemsData.items.find(i => i.id === id);
  return item ? item.name : id;
};

const formatSpeciesName = (species) => species.replace(/_\d+$/, "").toLowerCase();

// El requisito puede ser un número (nivel) o el id de un objeto
const requirementLabel = (requirement) =>
  typeof requirement === 'number' ? requirement : getItemName(requirement);

// Tarjeta grande: sprite arriba centrado y nombre debajo (cadena horizontal de escritorio)
const EvoCardLg = ({ species }) => (
  <Link to={`/pokemon/${formatSpeciesName(species)}`} className="block h-full">
    <div className="h-full min-w-[160px] rounded-xl bg-blue-950/50 p-6 text-center transition-colors hover:border-blue-300">
      <div className="mx-auto mb-3 w-fit rounded-lg bg-blue-950 p-3">
        <PokemonFront img={`/images/pokemonFront/${species}.png`} scale={80} />
      </div>
      <div className="text-lg font-semibold capitalize">{formatSpeciesName(species)}</div>
    </div>
  </Link>
);

// Tarjeta chica: sprite a la izquierda y nombre a la derecha (celular y ramas)
const EvoCardSm = ({ species }) => (
  <Link to={`/pokemon/${formatSpeciesName(species)}`} className="block h-full">
    <div className="flex h-full items-center gap-3 rounded-xl bg-blue-950/50 p-3 transition-colors hover:border-blue-300">
      <div className="shrink-0 rounded-lg bg-blue-950 p-2">
        <PokemonFront img={`/images/pokemonFront/${species}.png`} scale={60} />
      </div>
      <div className="text-sm font-semibold capitalize">{formatSpeciesName(species)}</div>
    </div>
  </Link>
);

const EvoCard = ({ species, size = "lg" }) =>
  size === "lg" ? <EvoCardLg species={species} /> : <EvoCardSm species={species} />;

// Flecha horizontal con el método de evolución (para el layout de escritorio)
const ArrowRight = ({ method, requirement }) => (
  <div className="flex min-w-[80px] flex-col items-center">
    <svg className="h-6 w-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
    <div className="mt-1 text-center text-xs font-medium text-blue-300">
      <div className="whitespace-nowrap">{method}</div>
      {requirement != null && <div className="whitespace-nowrap">{requirementLabel(requirement)}</div>}
    </div>
  </div>
);

// Flecha hacia abajo con el método de evolución (para el layout móvil)
const ArrowDown = ({ method, requirement }) => (
  <div className="my-3 flex flex-col items-center text-center text-xs font-medium text-blue-300">
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
    {method && (
      <div className="mt-1">
        {method}
        {requirement != null && <span className="ml-1">{requirementLabel(requirement)}</span>}
      </div>
    )}
  </div>
);

const PokemonEvolution = ({ pokemon }) => {
  if (!pokemon.evolutionChain || pokemon.evolutionChain.length === 0) {
    return (
      <div className="rounded-2xl p-10 text-center">
        <p className="font-medium text-blue-300">Este Pokémon no tiene evoluciones</p>
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
      <div>
        <h3 className="mb-6 text-lg font-bold">Cadena evolutiva</h3>

        {/* Desktop: Horizontal con ramas */}
        <div className="hidden lg:flex items-start justify-center gap-4">
          <EvoCard species={baseStage.species} size="lg" />

          <div className="flex flex-col gap-3">
            {branches.map((branch, branchIndex) => (
              <div key={branchIndex} className="flex items-center gap-3">
                {branch.line.map((evo, evoIndex) => (
                  <div key={evoIndex} className="flex items-center gap-3">
                    <ArrowRight method={evo.method} requirement={evo.requirement} />
                    <div className="min-w-[140px]">
                      <EvoCard species={evo.species} size="sm" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Móvil: Vertical */}
        <div className="lg:hidden space-y-6">
          <EvoCard species={baseStage.species} size="sm" />
          <ArrowDown />

          {branches.map((branch, branchIndex) => (
            <div key={branchIndex} className="space-y-3 border-l-4 border-blue-700 pl-4">
              {branch.line.map((evo, evoIndex) => (
                <div key={evoIndex} className="flex items-center gap-3">
                  <ArrowRight method={evo.method} requirement={evo.requirement} />
                  <div className="flex-1">
                    <EvoCard species={evo.species} size="sm" />
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
      <div>
        <h3 className="mb-6 text-lg font-bold">Cadena evolutiva</h3>

        {/* Desktop: Horizontal */}
        <div className="hidden lg:flex items-center justify-center gap-4">
          {pokemon.evolutionChain.map((stage, index) => (
            <div key={index} className="flex items-center gap-4">
              <EvoCard species={stage.species} size="lg" />
              {stage.evolvesTo && (
                <ArrowRight method={stage.evolvesTo.method} requirement={stage.evolvesTo.requirement} />
              )}
            </div>
          ))}
        </div>

        {/* Móvil: Vertical */}
        <div className="lg:hidden space-y-1">
          {pokemon.evolutionChain.map((stage, index) => (
            <div key={index}>
              <EvoCard species={stage.species} size="sm" />
              {stage.evolvesTo && (
                <ArrowDown method={stage.evolvesTo.method} requirement={stage.evolvesTo.requirement} />
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
      <div>
        <h3 className="mb-6 text-lg font-bold">Cadena evolutiva</h3>

        {/* Desktop: Parte lineal horizontal, luego ramificaciones a la derecha */}
        <div className="hidden lg:flex items-start justify-center gap-4">
          <div className="flex items-center gap-4">
            {linearStages.map((stage, index) => (
              <div key={index} className="flex items-center gap-4">
                <EvoCard species={stage.species} size="lg" />
                {index < linearStages.length - 1 && stage.evolvesTo && !Array.isArray(stage.evolvesTo) && (
                  <ArrowRight method={stage.evolvesTo.method} requirement={stage.evolvesTo.requirement} />
                )}
              </div>
            ))}
          </div>

          {/* Ramificaciones en columna vertical */}
          <div className="flex flex-col gap-2">
            {finalEvolutions.map((evo, index) => (
              <div key={index} className="flex items-center gap-2">
                <ArrowRight method={evo.method} requirement={evo.requirement} />
                <div className="flex-1">
                  <EvoCard species={evo.species} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Móvil: Todo vertical */}
        <div className="lg:hidden space-y-1">
          {linearStages.map((stage, index) => (
            <div key={index}>
              <EvoCard species={stage.species} size="sm" />
              {index < linearStages.length - 1 && stage.evolvesTo && !Array.isArray(stage.evolvesTo) && (
                <ArrowDown method={stage.evolvesTo.method} requirement={stage.evolvesTo.requirement} />
              )}
            </div>
          ))}

          <ArrowDown />

          {finalEvolutions.map((evo, index) => (
            <div key={index} className="flex items-center gap-3">
              <ArrowRight method={evo.method} requirement={evo.requirement} />
              <div className="flex-1">
                <EvoCard species={evo.species} size="sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default PokemonEvolution;