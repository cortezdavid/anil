import { useState, useMemo } from 'react';
import pokemonMovesData from "../../data/pokemonMoves.json";
import mtData from "../../data/MT.json";
import movesData from "../../data/moves.json";
import AutoScrollTop from '../autoScrollTop/AutoScrollTop';
import { getTypeColor, getTypeName } from "../../utils/typeHelpers";

// Una fila de movimiento: dato a la izquierda (nivel o MT), nombre y tipo a la derecha
const MoveRow = ({ lead, name, type }) => (
  <li className="flex items-center gap-3 border-t border-blue-800 py-2">
    {lead != null && (
      <span className="min-w-[3.5rem] shrink-0 text-sm font-semibold tabular-nums">
        {lead}
      </span>
    )}
    <span className="min-w-0 flex-1 truncate text-sm font-semibold capitalize">
      {name}
    </span>
    {type && (
      <span className={`shrink-0 px-2 py-1 rounded text-xs font-semibold text-white ${getTypeColor(type)}`}>
        {getTypeName(type)}
      </span>
    )}
  </li>
);

const MovimientosSection = ({ pokemon }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(prev => prev === section ? null : section);
  };

  // Obtener datos del movimiento
  const getMoveData = (moveId) => {
    const moveData = movesData.moves.find(m => m.id === moveId);
    return moveData;
  };

  // Obtener nombre del movimiento
  const getMoveName = (moveId) => {
    const moveData = getMoveData(moveId);
    return moveData?.name || moveId;
  };

  // Obtener movimientos del Pokémon desde pokemonMoves.json
  const pokemonMoves = useMemo(() => {
    const data = pokemonMovesData[pokemon.id];
    return {
      levelUpMoves: data?.moves?.levelUpMoves || [],
      tutorMoves: data?.moves?.tutorMoves || [],
      eggMoves: data?.moves?.eggMoves || []
    };
  }, [pokemon.id]);

  // Filtrar movimientos MT y obtener número
  const mtMoves = useMemo(() => {
    const mtMovesMap = new Map(mtData.mt.map(item => [item.move, item.id]));
    return (pokemonMoves.tutorMoves || [])
      .filter(move => mtMovesMap.has(move))
      .map(move => ({
        move,
        mtNumber: mtMovesMap.get(move).replace('MT', '')
      }))
      .sort((a, b) => {
        const nameA = getMoveName(a.move).toLowerCase();
        const nameB = getMoveName(b.move).toLowerCase();
        return nameA.localeCompare(nameB);
      });
  }, [pokemonMoves.tutorMoves]);

  const sortedEggMoves = useMemo(() => {
    return [...(pokemonMoves.eggMoves || [])].sort((a, b) => {
      const nameA = getMoveName(a).toLowerCase();
      const nameB = getMoveName(b).toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }, [pokemonMoves.eggMoves]);

  // Las tres listas con la misma forma, para dibujarlas igual en escritorio y celular
  const buildRow = (move, lead) => {
    const data = getMoveData(move);
    return { key: `${move}-${lead ?? ''}`, lead, name: data?.name || move, type: data?.type };
  };

  const sections = [
    {
      id: 'levelUp',
      title: 'Por Nivel',
      empty: 'No aprende movimientos por nivel',
      rows: pokemonMoves.levelUpMoves.map(item => buildRow(item.move, `Nv. ${item.level}`)),
    },
    {
      id: 'mt',
      title: 'Por MT',
      empty: 'No aprende movimientos por MT',
      rows: mtMoves.map(item => buildRow(item.move, `MT${item.mtNumber}`)),
    },
    {
      id: 'egg',
      title: 'Movimientos Huevo',
      empty: 'Sin movimientos huevo',
      rows: sortedEggMoves.map(move => buildRow(move, null)),
    },
  ];

  // En celular, los movimientos huevo solo aparecen si hay alguno
  const mobileSections = sections.filter(s => s.id !== 'egg' || s.rows.length > 0);

  return (
    <div>

      {/* Layout Desktop: 3 columnas */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-x-8">
        {sections.map(section => (
          <div key={section.id}>
            <h3 className="mb-2 flex items-baseline justify-between text-lg font-bold">
              <span>{section.title}</span>
              <span className="text-sm font-semibold">{section.rows.length}</span>
            </h3>
            {section.rows.length > 0 ? (
              <ul>
                {section.rows.map((row, index) => (
                  <MoveRow key={`${row.key}-${index}`} lead={row.lead} name={row.name} type={row.type} />
                ))}
              </ul>
            ) : (
              <p className="border-t border-blue-800 py-6 text-center text-sm">{section.empty}</p>
            )}
          </div>
        ))}
      </div>

      {/* Layout Móvil: acordeones planos */}
      <div className="lg:hidden border-b border-blue-800">
        {mobileSections.map(section => {
          const isOpen = openSection === section.id;
          return (
            <div key={section.id} className="border-t border-blue-800">
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between py-3 text-left font-bold
                  focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-100"
              >
                <span>
                  {section.title} <span>({section.rows.length})</span>
                </span>
                <svg
                  aria-hidden="true"
                  className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isOpen && (
                section.rows.length > 0 ? (
                  <ul>
                    {section.rows.map((row, index) => (
                      <MoveRow key={`${row.key}-${index}`} lead={row.lead} name={row.name} type={row.type} />
                    ))}
                  </ul>
                ) : (
                  <p className="border-t border-blue-800 py-6 text-center text-sm">{section.empty}</p>
                )
              )}
            </div>
          );
        })}
      </div>
      <AutoScrollTop />
    </div>
  );
};

export default MovimientosSection;