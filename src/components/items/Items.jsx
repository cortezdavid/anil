import { useState } from "react";
import itemsLocationData from "../../data/itemsLocation.json";
import itemsData from "../../data/items.json";
import AutoScrollTop from "../autoScrollTop/AutoScrollTop";
import { useSEO } from '../../hooks/useSEO';


const Items = () => {

  useSEO({
    title: 'Objetos - Pokémon Añil',
    description: 'Encuentra todos los objetos del mapa en Pokémon Añil con ubicaciones. Lista completa de ítems, bayas, piedras evolutivas y objetos especiales.',
    keywords: 'pokémon añil objetos, ubicación objetos pokémon añil, ítems pokémon añil, objetos ocultos pokémon añil, bayas pokémon añil, piedras evolutivas'
  });

  const [search, setSearch] = useState("");

  // Función para obtener datos del item desde items.json
  const getItemData = (itemName) => {
    return itemsData.items.find(item => item.id === itemName);
  };

  // Combinar datos y ordenar alfabéticamente por nombre español
  const itemsWithData = itemsLocationData.itemsLocation
    .map(locItem => {
      const itemData = getItemData(locItem.name);
      return {
        ...locItem,
        nameES: itemData?.name || locItem.name,
        description: itemData?.description || "Sin descripción"
      };
    })
    .sort((a, b) => a.nameES.localeCompare(b.nameES));

  // Filtrar por búsqueda
  const filteredItems = itemsWithData.filter(item => {
    const searchLower = search.toLowerCase();
    return (
      item.nameES.toLowerCase().includes(searchLower) ||
      item.location.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Título */}
        <h1 className="text-4xl font-black text-slate-100 mb-6 uppercase tracking-wider drop-shadow-sm">
          Objetos
        </h1>

        {/* <div className="max-w-7xl mx-auto px-4 mb-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-sm">
            <div className="flex items-start">
              <div className="ml-3">
                <p className="text-sm font-medium text-yellow-800">
                  ⚠️ Guía en construcción
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                  Esta sección está incompleta. Pueden faltar objetos.
                </p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Buscador */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <input
              id="item-search"
              name="item-search"
              type="search"
              inputMode="search"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              data-form-type="other"
              placeholder="Buscar por nombre o ubicación..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 pr-12 text-slate-100 bg-slate-800 rounded-lg shadow-lg font-medium 
             border-none outline-none focus:outline-none focus:border-none focus:ring-0 placeholder:text-slate-500"/>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          {search && (
            <p className="text-center mt-2 text-sm text-blue-400 font-semibold">
              {filteredItems.length} resultado{filteredItems.length !== 1 ? 's' : ''} encontrado{filteredItems.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Grid de items */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-slate-400 font-semibold">No se encontraron resultados para "{search}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-slate-800 rounded-lg shadow-lg shadow-gray-900/30 p-4 hover:shadow-blue-900/20 transition-all duration-200"
              >
                {/* Header con imagen y nombre */}
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={item.img}
                    alt={item.nameES}
                    className="w-12 h-12 object-contain flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-slate-100 text-base leading-tight">
                      {item.nameES}
                    </h3>
                  </div>
                </div>

                {/* Descripción */}
                <p className="text-xs text-slate-300 leading-relaxed mb-3 line-clamp-2">
                  {item.description}
                </p>

                {/* Ubicación */}
                <div className="flex items-center gap-1 text-xs font-semibold text-blue-300 bg-blue-900/30 px-2 py-1.5 rounded border border-blue-700/50">
                  <span>🗺️</span>
                  <span className="truncate">{item.location}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <AutoScrollTop />
    </div>
  );
};

export default Items;