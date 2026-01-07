import photoData from "../../data/photo.json";
import AutoScrollTop from "../autoScrollTop/AutoScrollTop";
import { useSEO } from '../../hooks/useSEO';


const PhotoP = () => {

  useSEO({
    title: 'Fotos - Pokémon Añil',
    description: 'Guía de la misión de fotos en Pokémon Añil: ubicaciones exactas donde sacarte fotos y lista de entrenadores para completar el desafío fotográfico.',
    keywords: 'pokémon añil fotos, misión fotos pokémon añil, ubicaciones fotos pokémon añil, entrenadores fotos, desafío fotográfico pokémon añil, lugares fotos'
  });

  const photos = photoData.data;

  const placeSpots = photos.filter(spot => spot.type === "place");
  const trainerSpots = photos.filter(spot => spot.type === "trainer");

  const SpotCard = ({ spot, index }) => (
    <div className="bg-slate-800 rounded-xl shadow-lg shadow-gray-900/30 overflow-hidden hover:shadow-blue-900/20 transition-all duration-200">
      <div className="relative">
        <img
          src={spot.img}
          alt={spot.location}
          className="w-full h-auto object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white font-black px-3 py-1 rounded-full text-sm shadow-lg">
          #{index + 1}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-black text-slate-100 text-center">
          {spot.location}
        </h3>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">

        <h1 className="text-4xl font-black text-slate-100 mb-6 uppercase tracking-wider drop-shadow-sm">
          Puntos Fotográficos
        </h1>

        {/* alert */}
        {/* <div className="max-w-7xl mx-auto px-4 mb-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-sm">
            <div className="flex items-start">
              <div className="ml-3">
                <p className="text-sm font-medium text-yellow-800">
                  ⚠️ Guía en construcción
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                  Esta sección está siendo actualizada a la última versión del juego. La información puede estar sujeta a cambios.
                </p>
              </div>
            </div>
          </div>
        </div> */}

        <div className="bg-slate-800 rounded-xl shadow-lg shadow-gray-900/30 p-4 mb-8 text-center">
          <span className="text-2xl font-black text-slate-100">
            📸 Total de Fotografías: {photos.length}
          </span>
        </div>

        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 mb-6 shadow-lg">
            <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center justify-center gap-2">
              🗺️ Lugares ({placeSpots.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {placeSpots.map((spot, index) => (
              <SpotCard key={index} spot={spot} index={index} />
            ))}
          </div>
        </div>

        <div>
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 mb-6 shadow-lg">
            <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center justify-center gap-2">
              👤 Entrenadores ({trainerSpots.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainerSpots.map((spot, index) => (
              <SpotCard key={index} spot={spot} index={index} />
            ))}
          </div>
        </div>
        <AutoScrollTop />
      </div>
    </div>
  );
};

export default PhotoP;