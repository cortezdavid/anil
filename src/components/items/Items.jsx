import { useState, useMemo, useRef, useEffect } from "react";
import itemsLocationData from "../../data/itemsLocation.json";
import pokemonItemsData from "../../data/pokemonItems.json";
import itemsData from "../../data/items.json";
import pokemonesData from "../../data/pokemones.json";
import AutoScrollTop from "../autoScrollTop/AutoScrollTop";
import { useSEO } from '../../hooks/useSEO';

const ITEMS_PER_PAGE = 50;

const Items = () => {
  useSEO({
    title: 'Objetos - Pokémon Añil',
    description: 'Encuentra todos los objetos del mapa en Pokémon Añil con ubicaciones. Lista completa de ítems, bayas, piedras evolutivas y objetos especiales.',
    keywords: 'pokémon añil objetos, ubicación objetos pokémon añil, ítems pokémon añil, objetos ocultos pokémon añil, bayas pokémon añil, piedras evolutivas'
  });

  const [activeTab, setActiveTab] = useState('map');
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const loadMoreRef = useRef(null);

  // Función para obtener datos del item desde items.json
  const getItemData = (itemName) => {
    return itemsData.items.find(item => item.id === itemName);
  };

  // Función para obtener nombre del Pokémon
  const getPokemonName = (pokemonId) => {
    const pokemon = pokemonesData.pokemones.find(p => p.id === pokemonId);
    return pokemon?.name || pokemonId;
  };

  // Función para obtener color según rareza
  const getRarityColor = (rarity) => {
    return rarity === 'Común' ? 'bg-green-600' : 'bg-blue-700';
  };

  // Combinar datos de objetos del mapa y ordenar alfabéticamente
  const itemsWithData = useMemo(() => {
    return itemsLocationData.itemsLocation
      .map(locItem => {
        const itemData = getItemData(locItem.name);
        return {
          ...locItem,
          nameES: itemData?.name || locItem.name,
          description: itemData?.description || "Sin descripción"
        };
      })
      .sort((a, b) => a.nameES.localeCompare(b.nameES));
  }, []);

  // Procesar objetos de Pokémon - una fila por cada objeto
  const pokemonItemsFlattened = useMemo(() => {
    const flattened = [];
    pokemonItemsData.forEach(pkmnItem => {
      //Todos
      //const pokemonName = getPokemonName(pkmnItem.pokemon);
      //solo con ubicación
      const pokemon = pokemonesData.pokemones.find(p => p.id === pkmnItem.pokemon);
      if (!pokemon || !pokemon.route) return;
      const pokemonName = pokemon.name;
      //
      pkmnItem.items.forEach(itemObj => {
        const itemData = getItemData(itemObj.item);
        flattened.push({
          id: `${pkmnItem.id}-${itemObj.item}`,
          pokemon: pkmnItem.pokemon,
          pokemonName,
          itemId: itemObj.item,
          itemNameES: itemData?.name || itemObj.item,
          itemDescription: itemData?.description || "Sin descripción",
          rarity: itemObj.rarity,
          itemImg: `/images/items/${itemObj.item}.png`
        });
      });
    });
    return flattened.sort((a, b) => a.itemNameES.localeCompare(b.itemNameES));
  }, []);

  // Filtrar por búsqueda - Objetos del Mapa
  const filteredMapItems = useMemo(() => {
    const searchLower = search.toLowerCase();
    return itemsWithData.filter(item => {
      return (
        item.nameES.toLowerCase().includes(searchLower) ||
        item.location.toLowerCase().includes(searchLower)
      );
    });
  }, [search, itemsWithData]);

  // Filtrar por búsqueda - Objetos de Pokémon
  const filteredPokemonItems = useMemo(() => {
    const searchLower = search.toLowerCase();
    return pokemonItemsFlattened.filter(item => {
      return (
        item.itemNameES.toLowerCase().includes(searchLower) ||
        item.pokemonName.toLowerCase().includes(searchLower)
      );
    });
  }, [search, pokemonItemsFlattened]);

  const currentList = activeTab === 'map' ? filteredMapItems : filteredPokemonItems;
  const visibleList = currentList.slice(0, visibleCount);
  const hasMore = visibleCount < currentList.length;

  // Resetear visibleCount cuando cambia pestaña o búsqueda
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeTab, search]);

  // IntersectionObserver para cargar más al hacer scroll
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount(prev => prev + ITEMS_PER_PAGE);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore, visibleCount]);

  return (
    <div className="min-h-screen bg-blue-950 text-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Título */}
        <h1 className="text-4xl font-bold mb-6">
          Objetos
        </h1>

        {/* Pestañas: barra plana separada por líneas */}
        <div className="mb-6 flex border-y border-blue-800">
          <button
            type="button"
            aria-pressed={activeTab === 'map'}
            onClick={() => {
              setActiveTab('map');
              setSearch('');
            }}
            className={`flex-1 px-6 py-3 font-semibold transition-colors
              focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-100
              ${activeTab === 'map'
                ? 'bg-blue-900 text-blue-100'
                : 'text-blue-300 hover:bg-blue-900/50 hover:text-blue-100'
              }`}
          >
            Objetos del Mapa
          </button>
          <button
            type="button"
            aria-pressed={activeTab === 'pokemon'}
            onClick={() => {
              setActiveTab('pokemon');
              setSearch('');
            }}
            className={`flex-1 px-6 py-3 font-semibold transition-colors
              focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-100
              ${activeTab === 'pokemon'
                ? 'bg-blue-900 text-blue-100'
                : 'text-blue-300 hover:bg-blue-900/50 hover:text-blue-100'
              }`}
          >
            Objetos de Pokémon
          </button>
        </div>

        {/* Nota informativa: un texto con una línea a la izquierda, sin caja */}
        {activeTab === 'map' && (
          <p className="mb-8 border-l-2 border-blue-700 pl-4 leading-relaxed">
            Nota: Algunos objetos pueden repetirse en distintas ubicaciones, en esos casos, solo se muestra la primera aparición.
            No se incluyen objetos de uso común como pokéballs, repelentes, medicamentos y otros objetos similares.
          </p>
        )}

        {activeTab === 'pokemon' && (
          <p className="mb-8 border-l-2 border-blue-700 pl-4 leading-relaxed">
            Nota: No se incluyeron los Pokémon que no aparecen de forma salvaje en el mapa. La rareza indica la probabilidad de que el Pokémon lleve el objeto.
          </p>
        )}

        {/* Buscador */}
        <div className="mb-6">
          <div className="relative mx-auto">
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
              placeholder={activeTab === 'map' ? 'Buscar por nombre o ubicación...' : 'Buscar por objeto o Pokémon...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 pr-12 text-blue-100 bg-blue-900 rounded-lg font-medium outline-none
                placeholder:text-blue-300/60
                [&::-webkit-search-cancel-button]:appearance-none"
            />
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
              {currentList.length} resultado{currentList.length !== 1 ? 's' : ''} encontrado{currentList.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Lista de items */}
        {currentList.length === 0 ? (
          <p className="text-center py-12 text-blue-300 font-medium">
            No se encontraron resultados para "{search}"
          </p>
        ) : (
          <>
            {/* OBJETOS DEL MAPA: una fila por objeto, separadas por líneas */}
            {activeTab === 'map' && (
              <ul className="grid gap-x-8 md:grid-cols-2 xl:grid-cols-3">
                {visibleList.map((item) => (
                  <li key={item.id} className="flex items-start gap-4 border-b border-blue-800 py-4">

                    {/* Imagen de ubicación */}
                    <div className="flex-shrink-0 w-[100px] h-[100px] bg-blue-900 rounded-lg overflow-hidden flex items-center justify-center">
                      <img
                        src={`/images/items/ubicacion/${item.name}.jpg`}
                        alt={`Ubicación ${item.nameES}`}
                        className="w-[100px] h-[100px] object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="text-blue-300 text-xs">Sin imagen</div>';
                        }}
                      />
                    </div>

                    {/* Info del item */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <img
                          src={item.img}
                          alt=""
                          className="w-8 h-8 object-contain flex-shrink-0"
                        />
                        <h3 className="font-semibold leading-tight">
                          {item.nameES}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                      <p className="mt-2 text-sm font-medium text-amber-400">
                        {item.location}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* OBJETOS DE POKÉMON: una fila por objeto */}
            {activeTab === 'pokemon' && (
              <ul className="grid gap-x-8 md:grid-cols-3 xl:grid-cols-4">
                {visibleList.map((item) => (
                  <li key={item.id} className="flex items-start gap-3 border-b border-blue-800 py-4">
                    <img
                      src={item.itemImg}
                      alt=""
                      className="w-12 h-12 object-contain flex-shrink-0"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold leading-tight">
                        {item.itemNameES}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed line-clamp-3">
                        {item.itemDescription}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <span className="min-w-0 truncate text-sm font-medium text-amber-400">
                          {item.pokemonName}
                        </span>
                        <span className={`${getRarityColor(item.rarity)} text-white text-xs font-semibold px-2 py-1 rounded flex-shrink-0`}>
                          {item.rarity}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Sentinel para cargar más */}
            {hasMore && (
              <div ref={loadMoreRef} className="mt-8 flex flex-col items-center gap-3">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-3 border-blue-300 border-t-transparent"></div>
                <p className="text-blue-300 text-sm">
                  Mostrando {visibleCount} de {currentList.length}
                </p>
              </div>
            )}
          </>
        )}
      </div>
      <AutoScrollTop />
    </div>
  );
};

export default Items;