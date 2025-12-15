import { useEffect, useRef, useState } from 'react';
import { COLOR_PALETTES } from './colorPalettes';

const ColorModal = ({ pokemon, onClose, onConfirm }) => {
  const canvasRef = useRef(null);
  const [colorShift, setColorShift] = useState(pokemon.colorShift || 0);
  const [formIndex, setFormIndex] = useState(pokemon.formIndex || 0);

  const hasForms = pokemon.forms && pokemon.forms.length > 1;
  const currentForm = hasForms ? pokemon.forms[formIndex] : null;
  const currentPokemonId = currentForm ? currentForm.id : pokemon.id;

  // Renderizar el canvas con el color y forma seleccionados
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
    };

    // Determinar imagen según colorShift y forma
    if (colorShift === 0) {
      img.src = `/images/pokemonFront/${currentPokemonId}.png`;
    } else {
      img.src = `/images/pokemonFrontShiny/${currentPokemonId}.png`;
    }
  }, [currentPokemonId, colorShift]);

  const handleConfirm = () => {
    onConfirm(pokemon.uniqueId, colorShift, formIndex);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full border-2 border-slate-700">
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-slate-100">
            {pokemon.name}
          </h2>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          {/* Canvas Preview */}
          <div className="flex justify-center bg-slate-900/50 rounded-xl p-8">
            <canvas
              ref={canvasRef}
              className="object-contain"
              style={{
                imageRendering: 'pixelated',
                width: '130px',
                height: '130px'
              }}
            />
          </div>

          {/* Form Slider - Solo si hay formas alternativas */}
          {hasForms && (
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setFormIndex(Math.max(0, formIndex - 1))}
                disabled={formIndex === 0}
                className={`p-2 rounded-lg ${formIndex === 0
                  ? 'bg-slate-700 text-slate-500'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                  }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-slate-100 font-bold min-w-[120px] text-center">
                {currentForm?.name || 'Normal'}
              </span>
              <button
                onClick={() => setFormIndex(Math.min(pokemon.forms.length - 1, formIndex + 1))}
                disabled={formIndex === pokemon.forms.length - 1}
                className={`p-2 rounded-lg ${formIndex === pokemon.forms.length - 1
                  ? 'bg-slate-700 text-slate-500'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                  }`}
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Color Slider */}
          <div className="space-y-3">
            <label className="text-slate-200 font-semibold text-sm block">
              {colorShift === 0 ? 'Normal' : colorShift === 1 ? 'Shiny' : `Super Shiny #${colorShift - 1}`}
            </label>
            <div className="flex items-center gap-4">
              <span className="text-slate-400 text-xs whitespace-nowrap">Normal</span>
              <input
                type="range"
                min="0"
                max="11"
                value={colorShift}
                onChange={(e) => setColorShift(Number(e.target.value))}
                className="flex-1 h-2 bg-blue-900 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-blue-400 text-xs font-medium whitespace-nowrap">
                {colorShift === 0 ? 'Normal' : colorShift === 1 ? 'Shiny' : `#${colorShift - 1}`}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-700 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 
                       rounded-lg font-semibold transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white 
                       rounded-lg font-semibold transition-colors shadow-lg"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorModal;