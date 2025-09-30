const PokemonDescription = ({ pokemon }) => {
  return (
    <div className="bg-gradient-to-br from-blue-300 to-blue-600 rounded-xl shadow-2xl p-6 border-2 border-none">
      <h2 className="text-2xl font-black text-blue-900 mb-4 tracking-wider uppercase drop-shadow-sm">
        Descripción
      </h2>
      <div className="bg-white rounded-lg p-4 shadow-lg">
        <p className="text-gray-900 text-base leading-relaxed font-medium">
          {pokemon.pokedex}
        </p>
      </div>
    </div>)
}

export default PokemonDescription