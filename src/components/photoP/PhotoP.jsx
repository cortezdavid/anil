import photoData from "../../data/photo.json";
import AutoScrollTop from "../autoScrollTop/AutoScrollTop";
import { useSEO } from '../../hooks/useSEO';

const SpotCard = ({ spot, index }) => (
  <li className="relative overflow-hidden rounded-lg bg-blue-900">
    <img
      src={spot.img}
      alt=""
      loading="lazy"
      className="block h-auto w-full object-cover"
    />
    <span className="absolute top-2 right-2 rounded-full bg-blue-700 px-3 py-1 text-sm font-bold text-blue-100">
      #{index + 1}
    </span>
    <span className="absolute inset-x-0 bottom-0 bg-blue-950/85 px-4 py-3 font-semibold">
      {spot.location}
    </span>
  </li>
);

const PhotoP = () => {

  useSEO({
    title: 'Fotos - Pokémon Añil',
    description: 'Guía de la misión de fotos en Pokémon Añil: ubicaciones exactas donde sacarte fotos y lista de entrenadores para completar el desafío fotográfico.',
    keywords: 'pokémon añil fotos, misión fotos pokémon añil, ubicaciones fotos pokémon añil, entrenadores fotos, desafío fotográfico pokémon añil, lugares fotos'
  });

  const photos = photoData.data;

  const placeSpots = photos.filter(spot => spot.type === "place");
  const trainerSpots = photos.filter(spot => spot.type === "trainer");

  return (
    <div className="min-h-screen bg-blue-950 text-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-8">

        <h1 className="text-4xl font-bold mb-6">
          Puntos Fotográficos
        </h1>

        <section className="mb-12">
          <h2 className="mb-6 border-b border-blue-800 pb-3 text-2xl font-bold">
            Lugares ({placeSpots.length})
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {placeSpots.map((spot, index) => (
              <SpotCard key={index} spot={spot} index={index} />
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-6 border-b border-blue-800 pb-3 text-2xl font-bold">
            Entrenadores ({trainerSpots.length})
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainerSpots.map((spot, index) => (
              <SpotCard key={index} spot={spot} index={index} />
            ))}
          </ul>
        </section>
        <AutoScrollTop />
      </div>
    </div>
  );
};

export default PhotoP;