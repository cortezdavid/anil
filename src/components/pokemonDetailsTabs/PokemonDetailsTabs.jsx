import { useRef, useEffect } from "react";
import PokemonInformation from "../pokemonInformation/PokemonInformation";
import PokemonRoute from "../pokemonRoute/PokemonRoute";
import PokemonEvolution from "../pokemonEvolution/PokemonEvolution";
import PokemonBaseStats from "../pokemonBaseStats/PokemonBaseStats";
import MovimientosSection from "../movimientosSection/movimientosSection";

const PokemonDetailsTabs = ({ pokemon, activeTab, setActiveTab }) => {
  const hasMega = Boolean(pokemon?.MegaStore);
  const tabs = [
    { id: "caracteristicas", label: "Características" },
    {
      id: "ubicacion",
      label: hasMega ? "Megapiedra" : "Ubicación",
    },
    { id: "evolucion", label: "Evolución" },
    { id: "estadisticas", label: "Estadísticas" },
    { id: "movimientos", label: "Movimientos" },
  ];

  // Ref para acceder al contenedor de pestañas
  const tabsContainerRef = useRef(null);
  const activeTabRef = useRef(null);

  // Efecto: centrar la pestaña activa automáticamente
  useEffect(() => {
    if (activeTabRef.current && tabsContainerRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeTab]);

  return (
    <div className="bg-slate-800 rounded-2xl shadow-lg shadow-gray-900/30 overflow-hidden border border-slate-700">

      {/* TABS HEADER */}
      <div className="relative">
        <div
          ref={tabsContainerRef}
          className="flex border-b border-slate-600 bg-slate-900/50 overflow-x-auto scroll-smooth
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={activeTab === tab.id ? activeTabRef : null}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[120px] px-4 py-3 text-sm font-semibold transition-all duration-200 whitespace-nowrap
                ${activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="p-6">
        {activeTab === "caracteristicas" && (
          <div className="space-y-6">
            <PokemonInformation pokemon={pokemon} />
          </div>
        )}

        {activeTab === "ubicacion" && (
          <div>
            <PokemonRoute pokemon={pokemon} />
          </div>
        )}

        {activeTab === "evolucion" && (
          <div>
            <PokemonEvolution pokemon={pokemon} />
          </div>
        )}

        {activeTab === "estadisticas" && (
          <div>
            <PokemonBaseStats pokemon={pokemon} />
          </div>
        )}

        {activeTab === "movimientos" && (
          // <div className="text-slate-400 text-center py-8">
          //   <div className="text-xl font-semibold mb-2">Próximamente...</div>
          // </div>
          <MovimientosSection pokemon={pokemon} />
        )}
      </div>
    </div>
  );
};

export default PokemonDetailsTabs;