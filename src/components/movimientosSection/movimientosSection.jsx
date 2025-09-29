import { useState } from 'react';
import Moves from "../moves/Moves";

const MovimientosSection = ({ pokemon }) => {
  const [openSections, setOpenSections] = useState({
    levelUp: false,
    tutor: false,
    egg: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="space-y-4">

      {/* Movimientos por nivel */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection('levelUp')}
          className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex justify-between items-center text-left font-medium text-gray-800 transition-colors"
        >
          <span>Movimientos por nivel ({pokemon.moves.levelUpMoves.length})</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${openSections.levelUp ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {openSections.levelUp && (
          <div className="bg-white border-t border-gray-200">
            {/* Header de tabla */}
            <div className="grid grid-cols-12 gap-4 py-3 px-4 bg-gray-100 border-b border-gray-200 font-semibold text-xs text-gray-700 uppercase tracking-wide">
              <div className="col-span-1">Nivel</div>
              <div className="col-span-3">Nombre</div>
              <div className="col-span-2">Tipo</div>
              <div className="col-span-1 text-center">Poder</div>
              <div className="col-span-1 text-center">Precisión</div>
              <div className="col-span-1 text-center">PP</div>
              <div className="col-span-3">Descripción</div>
            </div>

            {/* Movimientos */}
            <div>
              {pokemon.moves.levelUpMoves.map((move, index) => (
                <Moves key={index} level={move.level} moveId={move.move} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Movimientos del tutor */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection('tutor')}
          className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex justify-between items-center text-left font-medium text-gray-800 transition-colors"
        >
          <span>Movimientos por tutor ({pokemon.moves.tutorMoves.length})</span>
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${openSections.tutor ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {openSections.tutor && (
          <div className="bg-white border-t border-gray-200">
            {/* Header de tabla */}
            <div className="grid grid-cols-12 gap-4 py-3 px-4 bg-gray-100 border-b border-gray-200 font-semibold text-xs text-gray-700 uppercase tracking-wide">
              <div className="col-span-1">-</div>
              <div className="col-span-3">Nombre</div>
              <div className="col-span-2">Tipo</div>
              <div className="col-span-1 text-center">Poder</div>
              <div className="col-span-1 text-center">Precisión</div>
              <div className="col-span-1 text-center">PP</div>
              <div className="col-span-3">Descripción</div>
            </div>

            {/* Movimientos */}
            <div>
              {pokemon.moves.tutorMoves.map((move, index) => (
                <Moves key={index} moveId={move} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Movimientos huevo - solo si existen */}
      {pokemon.eggMoves && pokemon.eggMoves.length > 0 && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection('egg')}
            className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex justify-between items-center text-left font-medium text-gray-800 transition-colors"
          >
            <span>Movimientos huevo ({pokemon.eggMoves.length})</span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-200 ${openSections.egg ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {openSections.egg && (
            <div className="bg-white border-t border-gray-200">
              {/* Header de tabla */}
              <div className="grid grid-cols-12 gap-4 py-3 px-4 bg-gray-100 border-b border-gray-200 font-semibold text-xs text-gray-700 uppercase tracking-wide">
                <div className="col-span-1">-</div>
                <div className="col-span-3">Nombre</div>
                <div className="col-span-2">Tipo</div>
                <div className="col-span-1 text-center">Poder</div>
                <div className="col-span-1 text-center">Precisión</div>
                <div className="col-span-1 text-center">PP</div>
                <div className="col-span-3">Descripción</div>
              </div>

              {/* Movimientos */}
              <div>
                {pokemon.eggMoves.map((move, index) => (
                  <Moves key={index} moveId={move} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovimientosSection;