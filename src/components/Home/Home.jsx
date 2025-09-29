import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">

        {/* Header con logo */}
        <div className="text-center mb-12">
          <img
            src="/pokemon-logo-black-transparent.png"
            alt="Pokémon Añil Logo"
            className="mx-auto max-w-2xl w-full h-auto drop-shadow-2xl"
          />
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-2xl p-8 sm:p-12 mb-12 border-4 border-blue-800">
          <h1 className="text-4xl sm:text-5xl font-black text-white text-center mb-6 drop-shadow-lg">
            Bienvenido a la Pokédex de Añil
          </h1>
          <p className="text-xl text-blue-50 text-center mb-8 font-medium leading-relaxed max-w-3xl mx-auto">
            Tu guía completa para encontrar y conocer todos los Pokémon en <span className="font-bold text-white">Pokémon Añil</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pokemon/bulbasaur"
              className="bg-white hover:bg-blue-50 text-blue-900 font-black py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 text-center text-lg"
            >
              🔍 Explorar Pokédex
            </Link>
            <a
              href="https://skyfangames.blogspot.com/2025/07/pokemon-anil-definitive-edition.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-black py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 text-center text-lg"
            >
              ⬇️ Descargar el Juego
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-300">
            <div className="text-4xl mb-4 text-center">🗺️</div>
            <h3 className="text-xl font-black text-blue-900 mb-3 text-center">Ubicaciones</h3>
            <p className="text-gray-700 text-center font-medium">
              Descubre dónde encontrar cada Pokémon en el mapa de la región Kanto
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-300">
            <div className="text-4xl mb-4 text-center">📊</div>
            <h3 className="text-xl font-black text-blue-900 mb-3 text-center">Estadísticas</h3>
            <p className="text-gray-700 text-center font-medium">
              Consulta stats, tipos y habilidades de todos los Pokémon
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-300">
            <div className="text-4xl mb-4 text-center">🔄</div>
            <h3 className="text-xl font-black text-blue-900 mb-3 text-center">Evoluciones</h3>
            <p className="text-gray-700 text-center font-medium">
              Conoce las cadenas evolutivas y requisitos para cada evolución
            </p>
          </div>
        </div>

        {/* Work in Progress Banner */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 rounded-lg p-6 mb-12 shadow-lg">
          <div className="flex items-start">
            <div className="text-3xl mr-4">🚧</div>
            <div>
              <h3 className="text-lg font-black text-yellow-800 mb-2">Proyecto en Desarrollo</h3>
              <p className="text-yellow-700 font-medium">
                Esta Pokédex está en constante actualización. Actualmente estamos trabajando en completar todas las ubicaciones, megas, objetos etc. de los Pokémon. ¡Vuelve pronto para ver las novedades!
              </p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg p-8 border-2 border-blue-300">
          <div className="text-center space-y-3">
            <p className="text-gray-800 font-medium">
              <span className="font-black text-blue-900">Juego creado por:</span>{' '}
              <a
                href="https://x.com/Eric_Lostie"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-bold hover:underline transition-colors duration-200"
              >
                Eric Lostie (@Eric_Lostie)
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;