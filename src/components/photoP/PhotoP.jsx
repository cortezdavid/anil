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
    <div className="bg-blue-900 border border-blue-800 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-blue-900/40 transition-all duration-200">
      <div className="relative">
        <img
          src={spot.img}
          alt={spot.location}
          className="w-full h-auto object-cover"
        />
        <div className="absolute top-2 right-2 bg-blue-700 text-blue-100 font-bold px-3 py-1 rounded-full text-sm">
          #{index + 1}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-center">
          {spot.location}
        </h3>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-blue-950 text-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-8">

        <h1 className="text-4xl font-bold mb-6">
          Puntos Fotográficos
        </h1>

        <div className="bg-blue-900 border border-blue-800 rounded-xl p-4 mb-8 text-center">
          <span className="text-2xl font-semibold">
            Total de Fotografías: {photos.length}
          </span>
        </div>

        <div className="mb-12">
          <div className="bg-blue-700 rounded-lg p-4 mb-6">
            <h2 className="text-2xl font-semibold text-blue-100 text-center">
              Lugares ({placeSpots.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {placeSpots.map((spot, index) => (
              <SpotCard key={index} spot={spot} index={index} />
            ))}
          </div>
        </div>

        <div>
          <div className="bg-blue-700 rounded-lg p-4 mb-6">
            <h2 className="text-2xl font-semibold text-blue-100 text-center">
              Entrenadores ({trainerSpots.length})
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