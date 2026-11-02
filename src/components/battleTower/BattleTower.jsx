import { useState, useEffect } from "react";
import battleTowerData from "../../data/battle_tower.json";
import { useSEO } from '../../hooks/useSEO';

const BattleTower = () => {

  useSEO({
    title: 'Torre Batalla - Pokémon Añil',
    description: 'Guía de entrenadores de la Torre de Batalla en Pokémon Añil.',
    keywords: 'pokémon añil torre batalla, battle tower pokémon añil, entrenadores torre batalla, equipos torre batalla'
  });

  const trainers = battleTowerData.trainers;

  // Inicializar desde localStorage
  const [defeated, setDefeated] = useState(() => {
    const saved = localStorage.getItem('battleTowerDefeated');
    return saved ? JSON.parse(saved) : {};
  });

  // Guardar en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('battleTowerDefeated', JSON.stringify(defeated));
  }, [defeated]);

  const toggleDefeated = (trainerId) => {
    setDefeated(prev => ({
      ...prev,
      [trainerId]: !prev[trainerId]
    }));
  };

  const defeatedCount = Object.values(defeated).filter(Boolean).length;
  const progress = trainers.length > 0 ? (defeatedCount / trainers.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-blue-950 text-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Título */}
        <h1 className="text-4xl font-bold tracking-tight mb-6">
          Torre Batalla
        </h1>

        {/* Contador con barra de progreso */}
        <div className="mb-8">
          <p aria-live="polite" className="font-semibold">
            Derrotados: {defeatedCount} / {trainers.length}
          </p>
          <div aria-hidden="true" className="mt-2 h-2 overflow-hidden rounded-full bg-blue-900">
            <div
              className="h-full rounded-full bg-blue-100 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Entrenadores: sin cajas, cada uno con una línea arriba que se pone verde al derrotarlo */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-6">
          {trainers.map((trainer) => {
            const isDefeated = defeated[trainer.id] || false;

            return (
              <button
                key={trainer.id}
                type="button"
                aria-pressed={isDefeated}
                onClick={() => toggleDefeated(trainer.id)}
                className={`block w-full-2 px-2 pb-3 pt-3 rounded text-left transition-colors
                  focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-100
                  ${isDefeated
                    ? 'border-green-500'
                    : 'border-blue-800 rounded hover:bg-blue-900'
                  }`}
              >
                {/* Imagen del entrenador */}
                <div className="relative overflow-hidden rounded-lg bg-blue-900">
                  <img
                    src={trainer.img}
                    alt=""
                    className={`block h-auto w-full object-cover ${isDefeated ? 'opacity-60' : ''}`}
                  />

                  {/* Checkmark overlay */}
                  {isDefeated && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-green-500 rounded-full p-3">
                        <svg aria-hidden="true" className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Nombre: encima de la imagen, en un cuadro pegado al borde de abajo */}
                  <span className={`absolute inset-x-0 bottom-0 bg-blue-950/85 px-4 py-3 text-sm font-semibold`}>
                    {trainer.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BattleTower;