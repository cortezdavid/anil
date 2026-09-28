import { useState } from "react";
import mtData from "../../data/MT.json";
import movesData from "../../data/moves.json";
import AutoScrollTop from "../autoScrollTop/AutoScrollTop";
import { useSEO } from '../../hooks/useSEO';
import { getTypeColor, getTypeName } from "../../utils/typeHelpers";


const MT = () => {

  useSEO({
    title: 'MT - Pokémon Añil',
    description: 'Lista completa de MTs en Pokémon Añil con ubicaciones exactas, mapas y detalles de los movimientos que enseñan. Encuentra todas las máquinas técnicas del juego.',
    keywords: 'pokémon añil MTs, máquinas técnicas pokémon añil, ubicación MTs, MTs pokémon añil lista, movimientos MT pokémon añil'
  });

  const mts = mtData.mt;
  const moves = movesData.moves;
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const getMoveData = (moveId) => moves.find(m => m.id === moveId);

  // Filtrar MTs según búsqueda
  const filteredMTs = mts.filter(mt => {
    const moveData = getMoveData(mt.move);
    if (!moveData) return false;

    const searchLower = search.toLowerCase();
    return (
      moveData.name.toLowerCase().includes(searchLower) ||
      mt.id.toLowerCase().includes(searchLower) ||
      mt.route.toLowerCase().includes(searchLower)
    );
  });

  const selectedMT = mts.find(mt => mt.id === selectedId);
  const selectedMove = selectedMT ? getMoveData(selectedMT.move) : null;

  return (
    <div className="min-h-screen bg-blue-950 text-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">
          Máquinas Técnicas
        </h1>

        {/* Buscador */}
        <div className="mb-6">
          <div className="relative mx-auto">
            <input
              id="mt-search"
              name="mt-search"
              type="search"
              inputMode="search"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              data-form-type="other"
              placeholder="Buscar por nombre, MT o ubicación..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 pr-12 text-lg text-blue-100 bg-blue-900 rounded-lg font-medium outline-none
             placeholder:text-blue-300/60 
             [&::-webkit-search-cancel-button]:appearance-none"/>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {search ? (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Borrar búsqueda"
                  className="p-1 rounded-full text-blue-300 hover:text-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-100"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ) : (
                <svg className="h-5 w-5 text-blue-300 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </div>
          </div>
          {search && (
            <p className="text-center mt-2 text-sm text-blue-300 font-medium">
              {filteredMTs.length} resultado{filteredMTs.length !== 1 ? 's' : ''} encontrado{filteredMTs.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Lista: queda fija en su lugar, no se empuja al abrir un detalle */}
        {filteredMTs.length === 0 ? (
          <p className="text-center py-12 text-blue-300 font-medium">
            No se encontraron resultados para "{search}"
          </p>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMTs.map(mt => {
              const moveData = getMoveData(mt.move);
              if (!moveData) return null;

              return (
                <li key={mt.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(mt.id)}
                    className="w-full flex items-center gap-3 rounded-lg bg-blue-900 px-4 py-3 text-left hover:bg-blue-800/50 transition-colors cursor-pointer"
                  >
                    <span className="shrink-0 rounded-md bg-blue-700 px-2.5 py-1 text-xs font-bold text-blue-100">
                      {mt.id}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold truncate">{moveData.name}</span>
                      <span className="block text-sm text-blue-300 truncate">{mt.route}</span>
                    </span>
                    <span className={`shrink-0 px-2 py-1 rounded text-xs font-semibold text-white ${getTypeColor(moveData.type)}`}>
                      {getTypeName(moveData.type)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {/* Detalle: se abre encima de todo, la lista de atrás no se mueve */}
        {selectedMT && selectedMove && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Detalle de ${selectedMT.id}`}
            className="fixed inset-0 z-50 flex items-end justify-center bg-blue-950/80 p-0 sm:items-center sm:p-4"
            onClick={() => setSelectedId(null)}
          >
            <div
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-blue-800 bg-blue-900 p-6 sm:rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <h2 className="text-2xl font-semibold">{selectedMT.id} {selectedMove.name}</h2>
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  aria-label="Cerrar"
                  className="shrink-0 rounded-full p-1.5 text-blue-300 hover:bg-blue-800 hover:text-blue-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-100"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <span className={`inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${getTypeColor(selectedMove.type)}`}>
                {getTypeName(selectedMove.type)}
              </span>

              <div className="grid md:grid-cols-[3fr_2fr] gap-6">
                {/* Imagen (470x350), aprox. 60% del ancho */}
                <img
                  src={selectedMT.img}
                  alt={`Ubicación ${selectedMT.id}`}
                  width={470}
                  height={350}
                  className="w-full h-auto rounded-lg border border-blue-800"
                />

                <div className="space-y-4">
                  <p className="leading-relaxed">{selectedMove.description}</p>

                  <dl className="space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-blue-800">
                      <dt className="text-sm text-blue-300">Categoría</dt>
                      <dd className="text-sm font-semibold">{selectedMove.category}</dd>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-blue-800">
                      <dt className="text-sm text-blue-300">Poder</dt>
                      <dd className="text-xl font-semibold">{selectedMove.power ? selectedMove.power : '-'}</dd>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-blue-800">
                      <dt className="text-sm text-blue-300">Precisión</dt>
                      <dd className="text-xl font-semibold">
                        {typeof selectedMove.accuracy === 'number' ? `${selectedMove.accuracy}%` : '-'}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-blue-300">PP</dt>
                      <dd className="text-xl font-semibold">{selectedMove.pp}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        )}

        <AutoScrollTop />
      </div>
    </div>
  );
};

export default MT;