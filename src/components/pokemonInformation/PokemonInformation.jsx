import abilitiesData from "../../data/abilities.json";

const PokemonInformation = ({ pokemon }) => {
  // Habilidades normales y ocultas en una sola lista (se ignoran los ids vacíos)
  const abilities = [
    ...(pokemon.abilities ?? []).filter(Boolean).map((id) => ({ id, hidden: false })),
    ...(pokemon.hiddenAbilities ?? []).filter(Boolean).map((id) => ({ id, hidden: true })),
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Columna izquierda: descripción y datos físicos */}
      <div className="space-y-6">
        <section className="rounded-xl bg-blue-950/50 p-5">
          <h3 className="mb-3 text-base font-semibold">Descripción</h3>
          <p className="text-sm leading-relaxed">{pokemon.pokedex}</p>
        </section>

        <section className="rounded-xl bg-blue-950/50 p-5">
          <h3 className="mb-3 text-base font-semibold">Datos físicos</h3>
          <dl className="grid grid-cols-2 gap-3 text-center">
            <div className="rounded-lg bg-blue-900 p-4">
              <dt className="mb-1 text-sm text-blue-300">Altura</dt>
              <dd className="text-2xl font-semibold">
                {pokemon.physicalData?.height}
                <span className="ml-1 text-base font-medium text-blue-300">m</span>
              </dd>
            </div>
            <div className="rounded-lg bg-blue-900 p-4">
              <dt className="mb-1 text-sm text-blue-300">Peso</dt>
              <dd className="text-2xl font-semibold">
                {pokemon.physicalData?.weight}
                <span className="ml-1 text-base font-medium text-blue-300">kg</span>
              </dd>
            </div>
          </dl>
        </section>
      </div>

      {/* Columna derecha: habilidades */}
      <section className="rounded-xl bg-blue-950/50 p-5 lg:col-span-2">
        <h3 className="mb-3 text-base font-semibold">Habilidades</h3>
        <ul className="grid gap-3 md:grid-cols-2">
          {abilities.map(({ id, hidden }) => {
            const ability = abilitiesData.abilities.find((a) => a.id === id);
            return (
              <li
                key={`${hidden}-${id}`}
                className="rounded-lg bg-blue-900 p-4"
              >
                <div className="mb-2 flex items-start justify-between gap-3">
                  <span className="font-semibold">{ability?.name ?? id}</span>
                  <span
                    className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
                      hidden ? "bg-blue-100 text-blue-950" : "bg-blue-800 text-blue-100"
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