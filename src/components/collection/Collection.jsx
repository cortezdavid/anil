import { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { collection, addDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { collectionsDb } from '../../firebase/configCollections';
import pokemonData from '../../data/pokemonCollection.json';
import ShinyPokemonCard from './ShinyPokemonCard';
import ColorModal from './ColorModal';
import { useSEO } from '../../hooks/useSEO';
import toast, { Toaster } from 'react-hot-toast';

const Collection = () => {
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [modalPokemon, setModalPokemon] = useState(null);
  const [shareUrl, setShareUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [collectionId, setCollectionId] = useState(null);

  // Configurar sensores optimizados para móvil
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 8,
      },
    })
  );

  useSEO({
    title: 'Colección - Pokémon Añil',
    description: 'Lleva el registro de tu colección de Pokémon en Pokémon Añil. Busca, selecciona y organiza los que has capturado.',
    keywords: 'pokémon añil colección, pokémon añil, colección, registro pokémon, pokemon capturados'
  });

  // Cargar colección desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem('pokemon_anil_collection_v2');
    const savedId = localStorage.getItem('pokemon_anil_collection_id');

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSelectedPokemon(parsed);
      } catch (error) {
        console.error('Error al cargar colección:', error);
      }
    }

    if (savedId) {
      setCollectionId(savedId);
      const url = `${window.location.origin}/coleccion/${savedId}`;
      setShareUrl(url);
    }
  }, []);

  // Guardar colección en localStorage cuando cambia
  useEffect(() => {
    if (selectedPokemon.length > 0) {
      localStorage.setItem('pokemon_anil_collection_v2', JSON.stringify(selectedPokemon));
    } else {
      localStorage.removeItem('pokemon_anil_collection_v2');
    }
  }, [selectedPokemon]);

  // Manejar búsqueda
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length > 0) {
      const filtered = pokemonData.pokemones
        .filter(p => p.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 10);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  // Agregar Pokémon a la colección (permite duplicados)
  const handleAddPokemon = (pokemon) => {
    const pokemonWithUniqueId = {
      ...pokemon,
      uniqueId: `${pokemon.id}-${Date.now()}-${Math.random()}`,
      colorShift: 0,
      formIndex: 0
    };
    setSelectedPokemon(prev => [...prev, pokemonWithUniqueId]);
    setSearch("");
    setSuggestions([]);
  };

  // Eliminar Pokémon de la colección
  const handleRemovePokemon = (uniqueId) => {
    setSelectedPokemon(prev => prev.filter(p => p.uniqueId !== uniqueId));
  };

  // Manejar drag end con dnd-kit
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSelectedPokemon((items) => {
        const oldIndex = items.findIndex((item) => item.uniqueId === active.id);
        const newIndex = items.findIndex((item) => item.uniqueId === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      handleAddPokemon(suggestions[0]);
    }
  };

  // Abrir modal
  const handleOpenModal = (pokemon) => {
    setModalPokemon(pokemon);
  };

  // Confirmar cambio de color y forma
  const handleConfirmColor = (uniqueId, colorShift, formIndex) => {
    setSelectedPokemon(prev =>
      prev.map(p =>
        p.uniqueId === uniqueId ? { ...p, colorShift, formIndex: formIndex || 0 } : p
      )
    );
  };

  // Guardar y compartir colección
  const handleSaveAndShare = async () => {
    if (selectedPokemon.length === 0) {
      toast.error('No hay Pokémon en tu colección para compartir');
      return;
    }

    setSaving(true);
    const loadingToast = toast.loading('Iniciando guardado...');

    try {
      // Test 1: Verificar que collectionsDb existe
      if (!collectionsDb) {
        throw new Error('Firebase no inicializado');
      }
      toast.success('✓ Firebase inicializado', { duration: 2000 });

      // Test 2: Preparar datos
      const cleanedPokemon = selectedPokemon.map(({ uniqueId, ...rest }) => rest);
      toast.success(`✓ ${cleanedPokemon.length} Pokémon preparados`, { duration: 2000 });

      let docId = collectionId;

      if (collectionId) {
        // ACTUALIZAR
        toast.loading('Actualizando documento...', { id: loadingToast });
        
        const docRef = doc(collectionsDb, 'pokemon_collections', collectionId);
        
        const updatePromise = setDoc(docRef, {
          pokemon: cleanedPokemon,
          updatedAt: serverTimestamp(),
          count: cleanedPokemon.length
        }, { merge: true });

        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('TIMEOUT: Firebase tardó más de 15 segundos')), 15000)
        );

        await Promise.race([updatePromise, timeoutPromise]);
        toast.success('¡Colección actualizada!', { id: loadingToast });

      } else {
        // CREAR NUEVO
        toast.loading('Creando documento...', { id: loadingToast });
        
        const dataToSave = {
          pokemon: cleanedPokemon,
          createdAt: serverTimestamp(),
          count: cleanedPokemon.length
        };

        toast.success('✓ Datos listos para enviar', { duration: 2000 });

        const createPromise = addDoc(collection(collectionsDb, 'pokemon_collections'), dataToSave);

        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('TIMEOUT: Firebase tardó más de 15 segundos')), 15000)
        );

        toast.loading('Enviando a Firebase...', { id: loadingToast });
        const docRef = await Promise.race([createPromise, timeoutPromise]);

        if (!docRef || !docRef.id) {
          throw new Error('Firebase no devolvió un ID válido');
        }

        docId = docRef.id;
        toast.success(`✓ ID creado: ${docId.substring(0, 10)}`, { duration: 2000 });
        
        // Guardar en localStorage
        try {
          setCollectionId(docId);
          localStorage.setItem('pokemon_anil_collection_id', docId);
          toast.success('✓ ID guardado localmente', { duration: 2000 });
        } catch (storageError) {
          toast.error('⚠️ No se pudo guardar en localStorage', { duration: 3000 });
        }

        toast.success('¡Colección guardada!', { id: loadingToast });
      }

      // Generar URL
      const url = `${window.location.origin}/coleccion/${docId}`;
      setShareUrl(url);
      toast.success('✓ URL generada', { duration: 2000 });

      // Copiar al portapapeles
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(url);
          toast.success('✓ URL copiada');
        } catch (e) {
          // Ignorar si falla
        }
      }

    } catch (error) {
      const errorMsg = error.message || 'Error desconocido';
      
      toast.error(`❌ ${errorMsg}`, { id: loadingToast, duration: 8000 });
      
      if (errorMsg.includes('TIMEOUT')) {
        toast.error('Firebase no responde. Posibles causas:', { duration: 8000 });
        toast.error('1. Mala conexión a internet', { duration: 8000 });
        toast.error('2. Reglas de Firebase bloqueando', { duration: 8000 });
        toast.error('3. Proyecto Firebase mal configurado', { duration: 8000 });
      }

      if (error.code === 'permission-denied') {
        toast.error('⚠️ Firebase rechazó la operación', { duration: 8000 });
        toast.error('Revisa las reglas en Firebase Console', { duration: 8000 });
      }

    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid #334155',
          },
          success: {
            iconTheme: {
              primary: '#3b82f6',
              secondary: '#f1f5f9',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#f1f5f9',
            },
          },
        }}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Título */}
        <h1 className="text-4xl font-black text-slate-100 mb-4 uppercase tracking-wider drop-shadow-sm">
          Colección
        </h1>

        {/* Descripción */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 mb-6">
          <p className="text-slate-400 leading-relaxed text-sm">
            Busca y agrega los Pokémon que has capturado. Arrastra las tarjetas para reorganizar.
            Tu colección se guarda automáticamente en el navegador.
          </p>
        </div>

        {/* Buscador */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar Pokémon para agregar..."
              value={search}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 pr-12 text-slate-100 bg-slate-900 rounded-lg shadow-lg font-medium 
                         border-2 border-slate-700 focus:border-blue-500 outline-none transition-colors
                         placeholder:text-slate-500"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Sugerencias */}
            {suggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-2 bg-slate-800 rounded-lg shadow-2xl max-h-80 overflow-y-auto border border-slate-700">
                <ul>
                  {suggestions.map(pokemon => (
                    <li
                      key={`${pokemon.id}-${Math.random()}`}
                      onClick={() => handleAddPokemon(pokemon)}
                      className="px-4 hover:bg-slate-700 cursor-pointer transition-colors duration-150 flex items-center justify-between"
                    >
                      <span className="text-slate-200 font-semibold">
                        {pokemon.name}
                      </span>
                      <div className="w-16 h-16 overflow-hidden flex-shrink-0">
                        <img
                          src={`/images/icons/${pokemon.id}.png`}
                          alt={pokemon.name}
                          loading="lazy"
                          className="w-32 h-16 object-cover object-left"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Contador y Botones */}
        {selectedPokemon.length > 0 && (
          <div className="mb-6">
            {/* Botones y enlace */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3">
              {/* Botón principal: Guardar/Actualizar */}
              <button
                onClick={handleSaveAndShare}
                disabled={saving}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-slate-600 
                           text-white font-semibold rounded-lg shadow-lg transition-colors 
                           disabled:cursor-not-allowed touch-manipulation"
              >
                {saving ? (collectionId ? 'Actualizando...' : 'Guardando...') : (collectionId ? 'Actualizar' : 'Guardar y Compartir')}
              </button>

              {/* Botón copiar (solo si hay shareUrl) */}
              {shareUrl && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                    toast.success('URL copiada');
                  }}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white 
                             font-semibold rounded-lg shadow-lg transition-colors touch-manipulation"
                >
                  Copiar enlace
                </button>
              )}

              {/* URL (solo si existe) */}
              {shareUrl && (
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 min-w-0 sm:max-w-md px-3 py-3 bg-slate-800 text-slate-400 rounded-lg 
                             text-sm font-mono border border-slate-700"
                  onClick={(e) => e.target.select()}
                />
              )}
            </div>
          </div>
        )}

        {/* Grid de Pokémon con dnd-kit */}
        {selectedPokemon.length > 0 ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={selectedPokemon.map(p => p.uniqueId)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-4">
                {selectedPokemon.map((pokemon) => (
                  <ShinyPokemonCard
                    key={pokemon.uniqueId}
                    pokemon={pokemon}
                    onRemove={handleRemovePokemon}
                    onOpenModal={handleOpenModal}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        ) : (
          <div className="text-center py-16 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
            <div className="text-6xl mb-4">✨</div>
            <p className="text-slate-400 font-semibold text-lg mb-2">
              Tu colección está vacía
            </p>
            <p className="text-slate-500">
              Usa el buscador para agregar Pokémon
            </p>
          </div>
        )}
      </div>

      {/* Modal de cambio de color */}
      {modalPokemon && (
        <ColorModal
          pokemon={modalPokemon}
          onClose={() => setModalPokemon(null)}
          onConfirm={handleConfirmColor}
        />
      )}
    </div>
  );
};

export default Collection;