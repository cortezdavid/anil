import { useNavigate, useParams } from 'react-router-dom';

const Navegation = ({ pokemones }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentIndex = pokemones.findIndex(p => p.id.toLowerCase() === id.toLowerCase());
  const prevPokemon = currentIndex > 0 ? pokemones[currentIndex - 1] : null;
  const nextPokemon = currentIndex < pokemones.length - 1 ? pokemones[currentIndex + 1] : null;
  
  const handleNavigation = (pokemonId) => {
    navigate(`/pokemon/${pokemonId.toLowerCase()}`);
  };
  
  return (
    <div className="flex justify-between items-center mb-8">
      <button
        onClick={() => handleNavigation(prevPokemon.id)}
        disabled={!prevPokemon}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-bold transition-all duration-200 ${prevPokemon
          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {prevPokemon && (
          <span>
            {prevPokemon.name}
          </span>
        )}
      </button>

      <div className="text-center">
        <span className="text-sm font-bold text-blue-700">
          #{currentIndex + 1} / {pokemones.length}
        </span>
      </div>
      <button
        onClick={() => handleNavigation(nextPokemon.id)}
        disabled={!nextPokemon}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-bold transition-all duration-200 ${nextPokemon
          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
      >
        {nextPokemon && (
          <span>
            {nextPokemon.name}
          </span>
        )}
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default Navegation