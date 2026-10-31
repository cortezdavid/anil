import abilitiesData from "../../data/abilities.json";

const PokemonInformation = ({ pokemon }) => {
  // Habilidades normales y ocultas en una sola lista (se ignoran los ids vacíos)
  const abilities = [
    ...(pokemon.abilities ?? []).filter(Boolean).map((id) => ({ id, hidden: false })),
    ...(pokemon.hiddenAbilities ?? []).filter(Boolean).map((id) => ({ id, hidden: true })),
  ];

  return (
    <div>
      {/* Descripción a la izquierda, datos físicos a la derecha, separados por una línea */}
      <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:gap-10">
        <section>
          <h3 className="mb-2 text-lg font-bold">Descripción</h3>
          <p className="max-w-prose leading-relaxed">{pokemon.pokedex}</p>
        </section>

        <section className="lg:border-l lg:border-blue-800 lg:pl-10">
          <h3 className="mb-2 text-lg font-bold">Datos físicos</h3>
          <dl className="flex gap-10">
            <div>
              <dt className="text-sm text-blue-300">Altura</dt>
              <dd className="text-2xl font-semibold">
                {pokemon.physicalData?.height}
                <span className="ml-1 text-base font-medium text-blue-300">m</span>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-blue-300">Peso</dt>
              <dd className="text-2xl font-semibold">
                {pokemon.physicalData?.weight}
                <span className="ml-1 text-base font-medium text-blue-300">kg</span>
              </dd>
            </div>
          </dl>
        </section>
      </div>

      {/* Habilidades: una fila por habilidad, separadas por líneas */}
      <section className="mt-10">
        <h3 className="mb-2 text-lg font-bold">Habilidades</h3>
        <ul>
          {abilities.map(({ id, hidden }) => {
            const ability = abilitiesData.abilities.find((a) => a.id === id);
            return (
              <li
                key={`${hidden}-${id}`}
                className="grid gap-2 border-t border-blue-800 py-4 md:grid-cols-[14rem_1fr] md:gap-8"
              >
                <div className="flex flex-wrap items-center gap-2 md:flex-col md:items-start">
                  <span className="font-semibold">{ability?.name ?? id}</span>
                  <span
                    className={`border px-2 py-0.5 text-xs font-medium ${
                      hidden
                        ? "border-amber-400/60 text-amber-300"
                        : "border-blue-700 text-blue-300"
                    }`}
                  >
                    {hidden ? "Oculta" : "Normal"}
                  </span>
                </div>
                {ability?.description && (
                  <p className="text-sm leading-relaxed">{ability.description}</p>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default PokemonInformation;