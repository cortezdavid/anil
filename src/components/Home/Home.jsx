import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import pokemonesData from "../../data/pokemones.json";
import { useSEO } from "../../hooks/useSEO";

const SECTIONS = [
  {
    title: "Dónde encontrar",
    items: [
      { to: "/objetos", name: "Objetos", desc: "Ubicación de los objetos del juego." },
      { to: "/mt", name: "MTs", desc: "Dónde conseguir cada MT." },
      { to: "/nidos", name: "Nidos", desc: "Qué Pokémon aparece en cada nido." },
      { to: "/fotos", name: "Fotos", desc: "Ubicación de los puntos fotográficos." }
    ],
  },
  {
    title: "Combates",
    items: [
      { to: "/combates", name: "Entrenadores", desc: "Equipos de todos los entrenadores." },
      { to: "/torrebatalla", name: "Torre de Batalla", desc: "Rivales de la Torre Batalla." }],
  },
  {
    title: "Consultar",
    items: [
      { to: "/movshabs", name: "Movimientos y habilidades", desc: "Datos de cada movimiento y habilidad." },
      { to: "/donprodigio", name: "Don Prodigio", desc: "Consulta intercambios." },
      { to: "/chat", name: "Foro", desc: "Escribe tus preguntas sobre el juego." }

    ],
  },
];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-100";

// Dentro de la lista con scroll el contorno va hacia adentro para que no se recorte
const listFocusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-100";

const ExternalLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`underline decoration-blue-800 underline-offset-4 hover:decoration-blue-100 ${focusRing}`}
  >
    {children}
    <span className="sr-only"> (se abre en una pestaña nueva)</span>
  </a>
);

const Home = () => {
  useSEO({
    title: "Pokémon Añil - Guía",
    description:
      "Guía de Pokémon Añil: Pokédex completa, ubicaciones de objetos y MTs, lista de entrenadores, Torre de Batalla y misiones especiales.",
    keywords:
      "pokémon añil, guía pokémon añil, pokédex añil, fangame pokémon añil, guía completa pokémon añil",
  });

  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const term = query.trim().toLowerCase();
  const suggestions = term
    ? pokemonesData.pokemones
      .filter((p) => p.name.toLowerCase().includes(term))
      .slice(0, 8)
    : [];

  // Enter (o el botón) lleva al primer resultado
  const handleSearch = (e) => {
    e.preventDefault();
    if (suggestions[0]) navigate(`/pokemon/${suggestions[0].id}`);
  };

  return (
    <div className="min-h-screen bg-blue-950 text-blue-100">
      <main className="mx-auto max-w-6xl px-5 py-12 sm:py-20">
        {/* Hero */}
        <section className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
              Guía de Pokémon Añil{" "}
              <span className="whitespace-nowrap text-base font-medium tracking-normal text-blue-300 sm:text-xl">
                (no oficial)
              </span>
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed">
              Pokédex, ubicaciones, MTs, entrenadores y más, en un solo lugar.
            </p>

            <form onSubmit={handleSearch} className="mt-8 max-w-xl" role="search">
              <label htmlFor="buscar-pokemon" className="mb-2 block font-medium">
                Busca un Pokémon
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative w-full">
                  <input
                    id="buscar-pokemon"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Escape" && setQuery("")}
                    placeholder="Bulbasaur, Pikachu..."
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    className={`w-full outline-none rounded-lg bg-blue-900 px-4 py-3.5 text-lg text-blue-100 placeholder:text-blue-300/60 ${focusRing}`}
                  />

                  {/* Sugerencias */}
                  {term && (
                    <div className="absolute z-10 mt-2 max-h-80 w-full overflow-y-auto rounded-lg border border-blue-800 bg-blue-900 shadow-xl">
                      {suggestions.length > 0 ? (
                        <ul>
                          {suggestions.map((pokemon) => (
                            <li key={pokemon.id}>
                              <Link
                                to={`/pokemon/${pokemon.id}`}
                                className={`flex items-center justify-between gap-3 px-4 py-1.5 hover:bg-blue-800/50 ${listFocusRing}`}
                              >
                                <span className="font-medium capitalize">{pokemon.name}</span>
                                <span className="h-12 w-12 shrink-0 overflow-hidden">
                                  <img
                                    src={`/images/icons/${pokemon.id}.png`}
                                    alt=""
                                    loading="lazy"
                                    className="h-full w-full object-cover object-left"
                                    onError={(e) => {
                                      e.target.style.display = "none";
                                    }}
                                  />
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="px-4 py-3">
                          No hay ningún Pokémon con ese nombre.
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className={`shrink-0 rounded-lg bg-white px-6 py-3.5 text-lg font-bold text-blue-950 hover:bg-blue-100 ${focusRing}`}
                >
                  Buscar
                </button>
              </div>
            </form>

            <p className="mt-6 text-blue-300">
              <ExternalLink href="https://lostiefangames.blogspot.com/p/pokemon-anil.html">
                Descarga el juego
              </ExternalLink>
            </p>
          </div>

          <div className="order-first lg:order-last">
            <img
              src="/logop.png"
              alt="Pokémon Añil"
              className="mx-auto h-auto w-full max-w-xs lg:max-w-md"
            />
          </div>
        </section>

        {/* Secciones de la guía */}
        <section className="mt-20 grid gap-x-12 gap-y-12 md:grid-cols-3" aria-label="Secciones de la guía">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="mb-2 px-3 text-xl font-bold">{section.title}</h2>
              <ul>
                {section.items.map((item) => (
                  <li key={item.to} className="border-t border-blue-800">
                    <Link
                      to={item.to}
                      className={`block px-3 py-4 hover:bg-blue-900 ${focusRing}`}
                    >
                      <span className="block font-semibold">{item.name}</span>
                      <span className="mt-0.5 block text-sm">
                        {item.desc}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Créditos */}
        <footer className="mt-20 border-t border-blue-800 pt-6 text-sm text-blue-300">
          <p>
            Juego creado por{" "}
            <ExternalLink href="https://x.com/Eric_Lostie">Eric Lostie</ExternalLink> en
            colaboración con{" "}
            <ExternalLink href="https://x.com/Skyflyer_R">Skyflyer</ExternalLink> y{" "}
            <ExternalLink href="https://x.com/dpertierra">DPertierra</ExternalLink>.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Home;