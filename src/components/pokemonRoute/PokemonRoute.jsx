const PokemonRoute = ({ pokemon }) => {
	return (
		<div className="bg-gradient-to-br from-blue-300 to-blue-600 rounded-xl shadow-2xl p-6 border-2 border-none">
			<h2 className="text-2xl font-black text-blue-900 mb-4 tracking-wider uppercase drop-shadow-sm">
				Ubicación
			</h2>
			{/* Imagen de ubicación con fondo blanco */}
			<div className="bg-white rounded-lg p-4 mb-3 shadow-lg">
				<img src={pokemon.location} alt={pokemon.name} className="block mx-auto rounded-lg" />
			</div>
			<div className="bg-white rounded-lg px-4 py-2 shadow-md">
				<span className="font-bold text-blue-900">{pokemon.route}</span>
			</div>
		</div>)
}

export default PokemonRoute