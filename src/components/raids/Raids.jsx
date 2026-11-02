import { useMemo, useState } from 'react';
import raids from '../../data/raids.json';
import items from '../../data/items.json';
import pokemones from '../../data/pokemones.json';
import PokemonStaticSprite from '../PokemonStaticSprite/PokemonStaticSprite';
import Tooltip from '../tooltip/Tooltip';
import { useSEO } from '../../hooks/useSEO';
import AutoScrollTop from '../autoScrollTop/AutoScrollTop';
import { getTypeColor, getTypeName } from "../../utils/typeHelpers";

const Raids = () => {
  useSEO({
    title: 'Nidos - Pokémon Añil',
    description: 'Guía completa de nidos en Pokémon Añil: ubicaciones, Pokémon disponibles, recompensas y estadísticas mejoradas.',
    keywords: 'pokémon añil nidos, nidos pokémon añil, incursiones pokémon añil, recompensas nidos'
  });

  const [openRaid, setOpenRaid] = useState(null);

  const toggleRaid = (raidId) => {
    setOpenRaid(openRaid === raidId ? null : raidId);
  };

  const itemsMap = useMemo(() => {
    return new Map(items.items.map(item => [item.id, item]));
  }, []);

  const pokemonMap = useMemo(() => {
    return new Map(pokemones.pokemones.map(poke => [poke.id, poke]));
  }, []);

  const getItemData = (itemId) => {
    return itemsMap.get(itemId);
  };

  const getPokemonName = (pokemonId) => {
    const pokemon = pokemonMap.get(pokemonId);
    return pokemon?.name || pokemonId.toLowerCase();
  };

  return (
    <div className="min-h-screen bg-blue-950 text-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Título */}
        <h1 className="text-4xl font-bold mb-6">
          Nidos
        </h1>

        {/* Lista de nidos: filas separadas por líneas, como los enlaces del Home */}
        <div className="space-y-4">
          {raids.raids.map((raid) => {
            const isOpen = openRaid === raid.id;

            return (
              <section
                key={raid.id}
                className={`overflow-hidden rounded-xl border bg-blue-950 transition-colors ${isOpen ? 'border-blue-700' : 'border-blue-800'}`}
              >
                {/* Encabezado clickeable: queda resaltado mientras está abierto */}
                <button
                  type="button"
                  onClick={() => toggleRaid(raid.id)}
                  aria-expanded={isOpen}
                  className={`flex w-full flex-wrap items-center justify-between gap-3 p-4 text-left transition-colors duration-200
                    focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-100
                    ${isOpen ? 'bg-blue-800/50' : 'hover:bg-blue-800/50'}`}
                >
                  <span className="flex items-center gap-3">
                    <span className={`rounded px-3 py-1 text-sm font-semibold text-white ${getTypeColor(raid.type)}`}>
                      {getTypeName(raid.type)}
                    </span>
                    <span className="text-lg font-semibold">
                      Nivel {raid.nivel}
                    </span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="font-medium">{raid.location}</span>
                    <svg
                      aria-hidden="true"
                      className={`w-6 h-6 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {/* Contenido expandible, directamente sobre el fondo */}
                {isOpen && (
                  <div className="space-y-8 border-t border-blue-800 p-6">

                    {/* Pokémon disponibles */}
                    <div>
                      <h3 className="mb-4 text-lg font-bold">
                        Posibles Pokémon
                      </h3>
                      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                        {raid.pokemon.map((pokemonId, index) => (
                          <li key={index} className="text-center">
                            <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-blue-900">
                              <PokemonStaticSprite
                                img={`/images/pokemonFront/${pokemonId}.png`}
                                scale={140}
                              />
                            </div>
                            <span className="mt-2 block text-sm font-semibold">
                              {getPokemonName(pokemonId)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Mejoras de stats: una franja con líneas arriba y abajo */}
                    <div>
                      <h3 className="mb-4 text-lg font-bold">
                        Mejoras
                      </h3>
                      <dl className="grid grid-cols-2 gap-4 border-y border-blue-800 py-2 sm:grid-cols-5">
                        <div>
                          <dt className="text-sm">Ataque</dt>
                          <dd className="text-xl font-semibold">+{raid.information.ataque}</dd>
                        </div>
                        <div>
                          <dt className="text-sm ">Defensa</dt>
                          <dd className="text-xl font-semibold">+{raid.information.defensa}</dd>
                        </div>
                        <div>
                          <dt className="text-sm ">At. Esp</dt>
                          <dd className="text-xl font-semibold">+{raid.information.atEspecial}</dd>
                        </div>
                        <div>
                          <dt className="text-sm">Def. Esp</dt>
                          <dd className="text-xl font-semibold">+{raid.information.deEspecial}</dd>
                        </div>
                        <div>
                          <dt className="text-sm">Velocidad</dt>
                          <dd className="text-xl font-semibold">+{raid.information.velocidad}</dd>
                        </div>
                      </dl>
                    </div>

                    {/* Objetos recompensa */}
                    <div>
                      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                        Posibles Recompensas
                        <Tooltip text="Existe la posibilidad de que falte algún objeto." position="right">
                          <svg className="w-4 h-4 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </Tooltip>
                      </h3>
                      <ul className="grid gap-x-8 sm:grid-cols-3 lg:grid-cols-4">
                        {raid.objetos.map((objetoId, index) => {
                          const itemData = getItemData(objetoId);
                          return (
                            <li
                              key={index}
                              className="flex items-center gap-3 border-b border-blue-800 py-2"
                            >
                              <img
                                src={`/images/items/${objetoId}.png`}
                                alt=""
                                className="w-8 h-8 object-contain"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                              <span className="text-sm font-medium cursor-help">
                                <Tooltip text={itemData?.description} position="top">
                                  {itemData?.name || objetoId}
                                </Tooltip>
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
      <AutoScrollTop />
    </div>
  );
};

export default Raids;