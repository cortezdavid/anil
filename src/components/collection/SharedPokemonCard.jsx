import { useEffect, useRef, useState } from 'react';
import { COLOR_PALETTES } from './colorPalettes';

const SharedPokemonCard = ({ pokemon }) => {
  const canvasRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

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

    const colorShift = pokemon.colorShift || 0;
    const formIndex = pokemon.formIndex || 0;

    let pokemonId = pokemon.id;
    if (pokemon.forms && pokemon.forms[formIndex]) {
      pokemonId = pokemon.forms[formIndex].id;
    }

    if (colorShift === 0) {
      img.src = `/images/pokemonFront/${pokemonId}.png`;
    } else {
      img.src = `/images/pokemonFrontShiny/${pokemonId}.png`;
    }
  }, [pokemon]);

  return (
    <div className="relative bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700/50 
                    transition-all duration-200 hover:scale-105 hover:border-blue-500">
      
      {pokemon.colorShift === 1 && (
        <div className="absolute top-2 left-2 z-10 bg-purple-600 text-white rounded-full w-6 h-6 
                        flex items-center justify-center text-xs font-black shadow-lg">
          S
        </div>
      )}
      {pokemon.colorShift >= 2 && (
        <div className="absolute top-2 left-2 z-10 bg-purple-600 text-white rounded-full w-6 h-6 
                        flex items-center justify-center text-xs font-black shadow-lg">
          SS
        </div>
      )}

      <div className="aspect-square bg-slate-900/30 flex items-center justify-center p-4">
        {!imageLoaded && !imageError && (
          <div className="text-slate-500 text-xs">Cargando...</div>
        )}
        {imageError && (
          <div className="text-red-400 text-xs text-center">Error</div>
        )}
        <canvas
          ref={canvasRef}
          className={`w-full h-full object-contain ${!imageLoaded ? 'hidden' : ''}`}
          style={{
            imageRendering: 'pixelated',
          }}
        />
      </div>

      <div className="p-2 bg-slate-900/30">
        <p className="text-center text-sm font-bold truncate text-blue-400">
          {pokemon.name}
        </p>
      </div>
    </div>
  );
};

export default SharedPokemonCard;