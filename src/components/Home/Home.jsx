import { Link } from "react-router-dom";
import { useSEO } from '../../hooks/useSEO';

const Home = () => {
  useSEO({
    title: 'Pokémon Añil - Guía',
    description: 'Guía de Pokémon Añil: Pokédex completa, ubicaciones de objetos y MTs, lista de entrenadores, Torre de Batalla y misiones especiales.',
    keywords: 'pokémon añil, guía pokémon añil, pokédex añil, fangame pokémon añil, guía completa pokémon añil'
  });
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">

        {/* <div className="max-w-7xl mx-auto px-4 mb-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-sm">
            <div className="flex items-start">
              <div className="ml-3">
                <p className="text-sm font-medium text-yellow-800">
                  ⚠️¡Aviso importante!
                </p>
                <p className="text-sm font-medium text-yellow-700 mt-1">
                  Ahora estamos en guianil.pages.dev (ya estas! no necesitas redireccionar). Será la página principal y la anterior (guianil.vercel.app) dejará de estar disponible dentro de un tiempo.
                </p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Header con logo */}
        <div className="text-center mb-12">
          <img
            src="/logop.png"
            alt="Pokémon Añil Logo"
            className="mx-auto max-w-2xl w-full h-auto drop-shadow-2xl"
          />
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-2xl p-8 sm:p-12 mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-white text-center mb-6 drop-shadow-lg">
            Bienvenido a la Pokédex de Añil
          </h1>
          <p className="text-xl text-blue-100 text-center mb-8 font-medium leading-relaxed max-w-3xl mx-auto">
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
              href="https://lostiefangames.blogspot.com/p/pokemon-anil.html"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-black py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-200 text-center text-lg"
            >
              ⬇️ Descargar Juego
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-800 rounded-xl shadow-lg shadow-gray-900/30 border border-slate-700 p-6">
            <div className="text-4xl mb-4 text-center">🗺️</div>
            <h3 className="text-xl font-black text-slate-100 mb-3 text-center">Ubicaciones</h3>
            <p className="text-slate-300 text-center font-medium">
              Descubre dónde encontrar cada Pokémon en el mapa de la región Kanto
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl shadow-lg shadow-gray-900/30 border border-slate-700 p-6">
            <div className="text-4xl mb-4 text-center">📊</div>
            <h3 className="text-xl font-black text-slate-100 mb-3 text-center">Estadísticas</h3>
            <p className="text-slate-300 text-center font-medium">
              Consulta stats, tipos y habilidades de todos los Pokémon
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl shadow-lg shadow-gray-900/30 border border-slate-700 p-6">
            <div className="text-4xl mb-4 text-center">🔄</div>
            <h3 className="text-xl font-black text-slate-100 mb-3 text-center">Evoluciones</h3>
            <p className="text-slate-300 text-center font-medium">
              Conoce las cadenas evolutivas y requisitos para cada evolución
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl shadow-lg shadow-gray-900/30 border border-slate-700 p-8">
          <div className="text-center space-y-3">
            <p className="text-slate-300 font-medium">
              <span className="font-black text-slate-100">Juego creado por</span>{' '}
              <a
                href="https://x.com/Eric_Lostie"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-bold hover:underline transition-colors duration-200"
              >
                Eric Lostie
              </a>
              <span className="font-black text-slate-100"> en colaboración con </span>{' '}
              <a
                href="https://x.com/Skyflyer_R"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-bold hover:underline transition-colors duration-200"
              >
                Skyflyer
              </a>
              <span className="font-black text-slate-100"> y </span>{' '}
              <a
                href="https://x.com/dpertierra"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-bold hover:underline transition-colors duration-200"
              >
                DPertierra
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;

//  <div className="bg-yellow-100 border-l-4 border-yellow-500 rounded-lg p-6 mb-12 shadow-lg">
//           <div className="flex items-start">
//             <div className="text-3xl mr-4">🚧</div>
//             <div>
//               <h3 className="text-lg font-black text-yellow-800 mb-2">Proyecto en Desarrollo</h3>
//               <p className="text-yellow-700 font-medium">
//                 Esta Pokédex está en constante actualización. Actualmente estamos trabajando en completar todas las ubicaciones, megas, objetos etc. de los Pokémon. ¡Vuelve pronto para ver las novedades!
//               </p>
//             </div>
//           </div>
//         </div>