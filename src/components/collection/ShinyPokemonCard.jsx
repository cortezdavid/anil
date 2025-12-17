import { useEffect, useRef, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { COLOR_PALETTES } from './colorPalettes';

const ShinyPokemonCard = ({ pokemon, onRemove, onOpenModal }) => {
  const canvasRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: pokemon.uniqueId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 999 : 'auto',
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const img = new Image();

    img.onload = () => {
      const size = img.height;
      canvas.width = size;
      canvas.height = size;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(
        img,
        0, 0, size, size,
        0, 0, size, size
      );

      // Aplicar paleta solo si colorShift >= 2
      const colorShift = pokemon.colorShift || 0;
      if (colorShift >= 2) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const palette = COLOR_PALETTES[colorShift - 2];

        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] > 0) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            const max = Math.max(r, g, b) / 255;
            const min = Math.min(r, g, b) / 255;
            const l = (max + min) / 2;

            let h = 0;
            let s = 0;

            if (max !== min) {
              const d = max - min;
              s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

              if (max === r / 255) {
                h = ((g / 255 - b / 255) / d + (g < b ? 6 : 0)) / 6;
              } else if (max === g / 255) {
                h = ((b / 255 - r / 255) / d + 2) / 6;
              } else {
                h = ((r / 255 - g / 255) / d + 4) / 6;
              }
            }

            h = (h + palette.hueShift / 360) % 1;
            s = Math.min(1, s * palette.saturation);
            const newL = Math.min(1, l * palette.brightness);

            const hue2rgb = (p, q, t) => {
              if (t < 0) t += 1;
              if (t > 1) t -= 1;
              if (t < 1 / 6) return p + (q - p) * 6 * t;
              if (t < 1 / 2) return q;
              if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
              return p;
            };

            let newR, newG, newB;
            if (s === 0) {
              newR = newG = newB = newL;
            } else {
              const q = newL < 0.5 ? newL * (1 + s) : newL + s - newL * s;
              const p = 2 * newL - q;
              newR = hue2rgb(p, q, h + 1 / 3);
              newG = hue2rgb(p, q, h);
              newB = hue2rgb(p, q, h - 1 / 3);
            }

            data[i] = Math.round(newR * 255);
            data[i + 1] = Math.round(newG * 255);
            data[i + 2] = Math.round(newB * 255);
          }
        }

        ctx.putImageData(imageData, 0, 0);
      }

      setImageLoaded(true);
    };

    img.onerror = () => {
      setImageError(true);
      setImageLoaded(true);
    };

    // Determinar imagen según colorShift
    const colorShift = pokemon.colorShift || 0;
    if (colorShift === 0) {
      img.src = `/images/pokemonFront/${pokemon.id}.png`;
    } else {
      img.src = `/images/pokemonFrontShiny/${pokemon.id}.png`;
    }
  }, [pokemon.id, pokemon.colorShift]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative bg-slate-800/50 rounded-lg overflow-hidden border 
           ${isDragging ? 'border-blue-500 cursor-grabbing scale-105' : 'border-slate-700/50 cursor-grab'}
           select-none touch-none transition-all duration-200 hover:border-blue-500`}
    >
      {/* Botón eliminar (X) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(pokemon.uniqueId);
        }}
        onPointerDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        className="absolute top-2 right-2 z-20 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white 
                   rounded-full w-7 h-7 flex items-center justify-center shadow-lg 
                   transition-colors duration-200 cursor-pointer touch-manipulation"
        title="Eliminar"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Botón de opciones (3 puntos) - abre modal */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onOpenModal(pokemon);
        }}
        onPointerDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        className="absolute top-2 left-2 z-20 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white 
                   rounded-full w-7 h-7 flex items-center justify-center shadow-lg 
                   transition-colors duration-200 cursor-pointer touch-manipulation"
        title="Cambiar color"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>

      {/* Indicador de variante */}
      {pokemon.colorShift === 1 && (
        <div className="absolute bottom-2 left-2 z-10 bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg pointer-events-none">
          ⭐
        </div>
      )}
      {pokemon.colorShift >= 2 && (
        <div className="absolute bottom-2 left-2 z-10 bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg pointer-events-none">
          ⭐
        </div>
      )}

      {/* Canvas con la imagen */}
      <div className="aspect-square bg-slate-900/30 flex items-center justify-center p-4">
        {!imageLoaded && !imageError && (
          <div className="text-slate-500 text-xs pointer-events-none">Cargando...</div>
        )}
        {imageError && (
          <div className="text-red-400 text-xs text-center pointer-events-none">
            Error al cargar
          </div>
        )}
        <canvas
          ref={canvasRef}
          className={`w-full h-full object-contain pointer-events-none ${!imageLoaded ? 'hidden' : ''}`}
          style={{
            imageRendering: 'pixelated',
          }}
        />
      </div>

      {/* Nombre del Pokémon */}
      <div className="p-2 bg-slate-900/30">
        <p className="text-center text-sm font-bold truncate text-blue-400 pointer-events-none">
          {pokemon.name}
        </p>
      </div>
    </div>
  );
};

export default ShinyPokemonCard;