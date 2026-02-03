import { useEffect, useMemo } from 'react';
import pokemonesData from '../../data/pokemones.json';
import pokemonFormsData from '../../data/pokemon_forms.json';
import pokemonMovesData from '../../data/pokemonMoves.json';
import mtData from '../../data/MT.json';

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

  if (!move) return null;

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

  // Set de MTs que existen en el juego
  const mtSet = useMemo(() => {
    return new Set(mtData.mt.map(item => item.move));
  }, []);

  // Buscar todos los Pokémon que aprenden este movimiento clasificados
  // Solo incluir Pokémon que existan en pokemones.json o pokemon_forms.json
  const { byLevel, byMT, byEgg } = useMemo(() => {
    const byLevel = [];
    const byMT = [];
    const byEgg = [];

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
      if (moves.tutorMoves?.includes(move.id) && mtSet.has(move.id)) {
        const mtInfo = mtData.mt.find(m => m.move === move.id);
        byMT.push({ id: pokemonId, mtNumber: mtInfo?.id?.replace('MT', '') });
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
  }, [move.id, mtSet, validIds]);

  const totalPokemon = byLevel.length + byMT.length + byEgg.length;

  // Componente reutilizable para cada Pokémon
  const PokemonCard = ({ pokemonId, subtitle }) => (
    <div className="bg-slate-700 rounded-lg p-3 text-center hover:bg-slate-600 transition-colors">
      <div className="w-16 h-16 mx-auto mb-2 overflow-hidden">
        <img
          src={getIconPath(pokemonId)}
          alt={getPokemonName(pokemonId)}
          className="w-32 h-16 object-cover object-left"
          loading="lazy"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>
      <p className="text-slate-100 font-semibold text-sm">
        {getPokemonName(pokemonId)}
      </p>
      {subtitle && (
        <p className="text-slate-400 text-xs mt-0.5">{subtitle}</p>
      )}
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-white mb-1">
                {move.name}
              </h2>
              <p className="text-blue-100 text-sm">
                {totalPokemon} Pokémon aprenden este movimiento
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body - Scrollable */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">

          {/* Por Nivel */}
          {byLevel.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-100 mb-3">
                Por Nivel ({byLevel.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {byLevel.map(p => (
                  <PokemonCard key={`level-${p.id}`} pokemonId={p.id} subtitle={`Nivel ${p.level}`} />
                ))}
              </div>
            </div>
          )}

          {/* Por MT */}
          {byMT.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-100 mb-3">
                Por MT ({byMT.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {byMT.map(p => (
                  <PokemonCard key={`mt-${p.id}`} pokemonId={p.id} />
                ))}
              </div>
            </div>
          )}

          {/* Por Huevo */}
          {byEgg.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-100 mb-3">
                Por Huevo ({byEgg.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {byEgg.map(p => (
                  <PokemonCard key={`egg-${p.id}`} pokemonId={p.id} />
                ))}
              </div>
            </div>
          )}

          {/* Sin resultados */}
          {totalPokemon === 0 && (
            <div className="text-center py-8">
              <p className="text-slate-400">
                No se encontraron Pokémon que aprendan este movimiento
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoveModal;