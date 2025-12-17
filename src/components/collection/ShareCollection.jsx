import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { collectionsDb } from '../../firebase/configCollections';
import { useSEO } from '../../hooks/useSEO';
import SharedPokemonCard from './SharedPokemonCard';

const ShareCollection = () => {
  const { id } = useParams();
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useSEO({
    title: 'Colección Compartida - Pokémon Añil',
    description: 'Mira esta colección de Pokémon compartida en Pokémon Añil',
    keywords: 'pokémon añil colección compartida, colección pokémon'
  });

  useEffect(() => {
    const fetchCollection = async () => {
      if (!id) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(collectionsDb, 'pokemon_collections', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCollection(docSnap.data());
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error al cargar colección:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <p className="text-slate-300 text-lg font-semibold">Cargando colección...</p>
        </div>
      </div>
    );
  }

  if (error || !collection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="text-6xl mb-4">😞</div>
          <h1 className="text-2xl font-bold text-slate-100 mb-2">
            Colección no encontrada
          </h1>
          <p className="text-slate-400 mb-6">
            Esta colección no existe o ha sido eliminada.
          </p>
        </div>
      </div>
    );
  }

  const { pokemon = [] } = collection;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Título simple */}
        <h1 className="text-4xl font-black text-slate-100 mb-8 uppercase tracking-wider drop-shadow-sm">
          Colección Compartida
        </h1>

        {/* Grid de Pokémon - 6 columnas para imágenes más grandes */}
        {pokemon.length > 0 ? (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-4">
            {pokemon.map((poke, index) => (
              <SharedPokemonCard
                key={`${poke.id}-${index}`}
                pokemon={poke}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
            <div className="text-6xl mb-4">😕</div>
            <p className="text-slate-400 font-semibold text-lg">
              Esta colección está vacía
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareCollection;