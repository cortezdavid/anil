import { useRef, useEffect } from "react";
import PokemonInformation from "../pokemonInformation/PokemonInformation";
import PokemonRoute from "../pokemonRoute/PokemonRoute";
import PokemonEvolution from "../pokemonEvolution/PokemonEvolution";
import PokemonBaseStats from "../pokemonBaseStats/PokemonBaseStats";
import MovimientosSection from "../movimientosSection/movimientosSection";
import PokemonEffectiveness from "../pokemonEffectiveness/PokemonEffectiveness";

const PokemonDetailsTabs = ({ pokemon, activeTab, setActiveTab }) => {
  const hasMega = Boolean(pokemon?.MegaStore);
  const tabs = [
    { id: "caracteristicas", label: "Características" },
    { id: "ubicacion", label: hasMega ? "Megapiedra" : "Ubicación" },
    { id: "evolucion", label: "Evolución" },
    { id: "estadisticas", label: "Estadísticas" },
    { id: "efectividad", label: "Efectividad" },
    { id: "movimientos", label: "Movimientos" },
  ];

  const tabsContainerRef = useRef(null);
  const activeTabRef = useRef(null);

  // Centra la pestaña activa dentro de la barra, sin mover el scroll de la página
  // (scrollIntoView también puede desplazar la página en vertical)
  useEffect(() => {
    const container = tabsContainerRef.current;
    const tab = activeTabRef.current;
    if (!container || !tab) return;
    container.scrollTo({
      left: tab.offsetLeft - (container.clientWidth - tab.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [activeTab]);

  return (
    <div className="overflow-hidden rounded-2xl border border-blue-800 bg-blue-900 text-blue-100">
      {/* Pestañas (el contenedor es relative para calcular offsetLeft) */}
      <div
        ref={tabsContainerRef}
        role="tablist"
        aria-label="Información del Pokémon"
        className="relative flex overflow-x-auto border-b border-blue-800
          [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={isActive ? activeTabRef : null}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls="panel-pokemon"
              onClick={() => setActiveTab(tab.id)}
              className={`min-w-[120px] flex-1 whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors
  focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-100
  ${isActive
                  ? "bg-blue-700 text-blue-100"
                  : "text-blue-300 hover:bg-blue-800/50 hover:text-blue-100"
                }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Contenido */}
      <div
        role="tabpanel"
        id="panel-pokemon"
        aria-labelledby={`tab-${activeTab}`}
        className="p-4 sm:p-6"
      >
        {activeTab === "caracteristicas" && <PokemonInformation pokemon={pokemon} />}
        {activeTab === "ubicacion" && <PokemonRoute pokemon={pokemon} />}
        {activeTab === "evolucion" && <PokemonEvolution pokemon={pokemon} />}
        {activeTab === "estadisticas" && <PokemonBaseStats pokemon={pokemon} />}
        {activeTab === "efectividad" && <PokemonEffectiveness pokemon={pokemon} />}
        {activeTab === "movimientos" && <MovimientosSection pokemon={pokemon} />}
      </div>
    </div>
  );
};

export default PokemonDetailsTabs;