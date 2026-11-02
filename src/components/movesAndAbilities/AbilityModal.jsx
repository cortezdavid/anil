import { useEffect } from 'react';
import pokemonesData from '../../data/pokemones.json';
import pokemonFormsData from '../../data/pokemon_forms.json';

// Función para convertir ID a formato de imagen
const getIconPath = (pokemonId) => {
  // Si termina en números, insertar guión bajo antes del último número
  const match = pokemonId.match(/^([A-Z]+)(\d+)$/);
  if (match) {
    return `/images/icons/${match[1]}_${match[2]}.png`;
  }
  // Si no tiene números, usar normal
  return `/images/icons/${pokemonId}.png`;
};

// Tarjeta de cada Pokémon (mismo patrón que en MoveModal). Está fuera del modal
// para que React no la vuelva a crear (y a montar) en cada render.
const PokemonCard = ({ pokemon }) => (
  <div className="bg-blue-950/50 rounded-lg p-3 text-center hover:bg-blue-800/50 transition-colors">
    <div className="w-16 h-16 mx-auto mb-2 overflow-hidden">
      <img
        src={getIconPath(pokemon.id)}
        alt={pokemon.name}
        className="w-32 h-16 object-cover object-left"
        loading="lazy"
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    </div>
    <p className="font-semibold text-sm">
      {pokemon.name}
    </p>
  </div>
);

const AbilityModal = ({ ability, onClose }) => {
  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!ability) return null;

  // Buscar Pokémon con esta habilidad (normal) - incluye formas
  const pokemonWithAbility = [
    ...pokemonesData.pokemones.filter(p => p.abilities?.includes(ability.id)),
    ...(pokemonFormsData.variants?.filter(v => v.abilities?.includes(ability.id)) || [])
  ];

  // Buscar Pokémon con esta habilidad (oculta) - incluye formas
  const pokemonWithHiddenAbility = [
    ...pokemonesData.pokemones.filter(p => p.hiddenAbilities?.includes(ability.id)),
    ...(pokemonFormsData.variants?.filter(v => v.hiddenAbilities?.includes(ability.id)) || [])
  ];

  const totalPokemon = pokemonWithAbility.length + pokemonWithHiddenAbility.length;

  return (
    <div
      className="fixed inset-0 bg-blue-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Pokémon con la habilidad ${ability.name}`}
        className="flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-blue-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="shrink-0 bg-blue-700 p-6 border-b border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-blue-100 mb-1">
                {ability.name}
              </h2>
              <p className="text-blue-100/80 text-sm">
                {totalPokemon} Pokémon con esta habilidad
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="text-blue-100 hover:bg-blue-800 rounded-lg p-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body - Scrollable: ocupa el alto que queda debajo del header */}
        <div className="min-h-0 flex-1 overflow-y-auto p-6">

          {/* Pokémon con habilidad normal */}
          {pokemonWithAbility.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">
                Habilidad Normal ({pokemonWithAbility.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {pokemonWithAbility.map(pokemon => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
              </div>
            </div>
          )}

          {/* Pokémon con habilidad oculta */}
          {pokemonWithHiddenAbility.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">
                Habilidad Oculta ({pokemonWithHiddenAbility.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {pokemonWithHiddenAbility.map(pokemon => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
              </div>
            </div>
          )}

          {/* Sin resultados */}
          {totalPokemon === 0 && (
            <p className="text-center py-8 text-blue-300">
              No se encontraron Pokémon con esta habilidad
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AbilityModal;