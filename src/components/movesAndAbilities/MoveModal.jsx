import { useEffect, useMemo } from 'react';
import pokemonesData from '../../data/pokemones.json';
import pokemonFormsData from '../../data/pokemon_forms.json';
import pokemonMovesData from '../../data/pokemonMoves.json';
import mtData from '../../data/MT.json';

// Tarjeta de cada Pokémon. Está fuera del modal para que React no la vuelva a
// crear (y a montar) en cada render.
const PokemonCard = ({ name, icon, subtitle }) => (
  <div className="bg-blue-950/50 rounded-lg p-3 text-center hover:bg-blue-800/50 transition-colors">
    <div className="w-16 h-16 mx-auto mb-2 overflow-hidden">
      <img
        src={icon}
        alt={name}
        className="w-32 h-16 object-cover object-left"
        loading="lazy"
        onError={(e) => { e.target.style.display = 'none'; }}
      />
    </div>
    <p className="font-semibold text-sm">
      {name}
    </p>
    {subtitle && (
      <p className="text-blue-300 text-xs mt-0.5">{subtitle}</p>
    )}
  </div>
);

const MoveModal = ({ move, onClose }) => {
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

  // Set de IDs válidos (pokemones + formas)
  const validIds = useMemo(() => {
    const ids = new Set();
    pokemonesData.pokemones.forEach(p => ids.add(p.id));
    pokemonFormsData.variants.forEach(p => ids.add(p.id));
    return ids;
  }, []);

  // Buscar pokémon por ID en ambos JSONs
  const getPokemonData = (pokemonId) => {
    const base = pokemonesData.pokemones.find(p => p.id === pokemonId);
    if (base) return base;
    const form = pokemonFormsData.variants.find(p => p.id === pokemonId);
    if (form) return form;
    return null;
  };

  // Función para convertir ID a formato de imagen
  const getIconPath = (pokemonId) => {
    const pokemon = getPokemonData(pokemonId);
    if (pokemon?.image) {
      // Convertir imagen front a icon (ej: /images/pokemonFront/VULPIX_1.png → /images/icons/VULPIX_1.png)
      return pokemon.image.replace('pokemonFront/', 'icons/');
    }
    // Fallback
    const match = pokemonId.match(/^([A-Z]+)(\d+)$/);
    if (match) {
      return `/images/icons/${match[1]}_${match[2]}.png`;
    }
    return `/images/icons/${pokemonId}.png`;
  };

  // Obtener nombre del Pokémon por ID
  const getPokemonName = (pokemonId) => {
    const pokemon = getPokemonData(pokemonId);
    if (!pokemon) return pokemonId;

    // Si es forma, mostrar nombre + forma (ej: "Vulpix Alola")
    if (pokemon.baseId) {
      const formName = pokemon.name || pokemon.baseId;
      // Intentar obtener nombre de la forma específica si existe
      return pokemon.formName ? `${formName} ${pokemon.formName}` : formName;
    }

    return pokemon.name;
  };

  // Datos de la MT de este movimiento, si existe (es la misma para todos los Pokémon)
  const mtInfo = useMemo(() => {
    return mtData.mt.find(m => m.move === move?.id);
  }, [move?.id]);

  // Buscar todos los Pokémon que aprenden este movimiento clasificados
  // Solo incluir Pokémon que existan en pokemones.json o pokemon_forms.json
  const { byLevel, byMT, byEgg } = useMemo(() => {
    const byLevel = [];
    const byMT = [];
    const byEgg = [];

    if (!move) return { byLevel, byMT, byEgg };

    Object.entries(pokemonMovesData).forEach(([pokemonId, data]) => {
      // Filtrar: solo mostrar si el pokémon existe en alguno de los dos JSONs
      if (!validIds.has(pokemonId)) return;

      const moves = data?.moves;
      if (!moves) return;

      // Por nivel
      const levelMove = moves.levelUpMoves?.find(m => m.move === move.id);
      if (levelMove) {
        byLevel.push({ id: pokemonId, level: levelMove.level });
      }

      // Por MT (solo si el movimiento existe en MT.json)
      if (moves.tutorMoves?.includes(move.id) && mtInfo) {
        byMT.push({ id: pokemonId });
      }

      // Por Huevo
      if (moves.eggMoves?.includes(move.id)) {
        byEgg.push({ id: pokemonId });
      }
    });

    // Ordenar por nombre
    const sortByName = (a, b) => getPokemonName(a.id).localeCompare(getPokemonName(b.id));
    byLevel.sort(sortByName);
    byMT.sort(sortByName);
    byEgg.sort(sortByName);

    return { byLevel, byMT, byEgg };
  }, [move?.id, mtInfo, validIds]);

  // Con los hooks ya llamados, recién acá se puede cortar el render
  if (!move) return null;

  const totalPokemon = byLevel.length + byMT.length + byEgg.length;

  return (
    <div
      className="fixed inset-0 bg-blue-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Pokémon que aprenden ${move.name}`}
        className="flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-blue-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="shrink-0 bg-blue-700 p-6 border-b border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-blue-100 mb-1">
                {move.name}
              </h2>
              <p className="text-blue-100/80 text-sm">
                {totalPokemon} Pokémon aprenden este movimiento
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

          {/* Por Nivel */}
          {byLevel.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">
                Por Nivel ({byLevel.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {byLevel.map(p => (
                  <PokemonCard
                    key={`level-${p.id}`}
                    name={getPokemonName(p.id)}
                    icon={getIconPath(p.id)}
                    subtitle={`Nivel ${p.level}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Por MT: el número se muestra una sola vez, en el título */}
          {byMT.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">
                Por {mtInfo.id} ({byMT.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {byMT.map(p => (
                  <PokemonCard
                    key={`mt-${p.id}`}
                    name={getPokemonName(p.id)}
                    icon={getIconPath(p.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Por Huevo */}
          {byEgg.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">
                Por Huevo ({byEgg.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {byEgg.map(p => (
                  <PokemonCard
                    key={`egg-${p.id}`}
                    name={getPokemonName(p.id)}
                    icon={getIconPath(p.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sin resultados */}
          {totalPokemon === 0 && (
            <p className="text-center py-8 text-blue-300">
              No se encontraron Pokémon que aprendan este movimiento
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoveModal;