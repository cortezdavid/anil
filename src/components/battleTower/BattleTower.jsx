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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Título */}
        <h1 className="text-4xl font-black text-slate-100 mb-6 uppercase tracking-wider drop-shadow-sm">
          Torre Batalla
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

        {/* Contador simple */}
        <div className="bg-slate-800 rounded-xl shadow-lg shadow-gray-900/30  p-4 mb-8 text-center">
          <span className="text-2xl font-black text-slate-100">
            🏆 Derrotados: {defeatedCount} / {trainers.length}
          </span>
        </div>

        {/* Grid de entrenadores */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {trainers.map((trainer) => {
            const isDefeated = defeated[trainer.id] || false;

            return (
              <div
                key={trainer.id}
                onClick={() => toggleDefeated(trainer.id)}
                className={`relative bg-slate-800 rounded-xl shadow-lg shadow-gray-900/30 p-4 cursor-pointer transition-all duration-200 border-2 ${isDefeated
                  ? 'border-green-500 bg-green-900/30'
                  : 'border-slate-700 hover:shadow-blue-900/20 transition-all duration-200'
                  }`}
              >
                {/* Imagen del entrenador */}
                <div className="relative mb-3">
                  <img
                    src={trainer.img}
                    alt={trainer.name}
                    className={`w-full h-auto rounded-lg ${isDefeated ? 'opacity-60' : ''}`}
                  />

                  {/* Checkmark overlay */}
                  {isDefeated && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-green-500 rounded-full p-3 shadow-xl">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Nombre */}
                <h3 className={`text-center font-black text-sm ${isDefeated ? 'text-green-400 line-through' : 'text-slate-100'
                  }`}>
                  {trainer.name}
                </h3>

                {/* Badge de número */}
                <div className="absolute top-2 left-2 bg-blue-600 text-white font-black px-2 py-1 rounded-full text-xs shadow-lg">
                  #{trainer.id}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BattleTower;