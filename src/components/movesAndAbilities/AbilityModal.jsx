import { useEffect } from 'react';
import pokemonesData from '../../data/pokemones.json';
import pokemonFormsData from '../../data/pokemon_forms.json';

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

  // Componente reutilizable para cada Pokémon (mismo patrón que en MoveModal)
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

  return (
    <div
      className="fixed inset-0 bg-blue-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-blue-900 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-blue-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-blue-700 p-6 border-b border-blue-800">
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

        {/* Body - Scrollable */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">

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