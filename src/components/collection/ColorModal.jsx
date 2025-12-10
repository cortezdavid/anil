import { useEffect, useRef, useState } from 'react';
import { COLOR_PALETTES } from './colorPalettes';

const ColorModal = ({ pokemon, onClose, onConfirm }) => {
  const canvasRef = useRef(null);
  const previewContainerRef = useRef(null);
  const [colorShift, setColorShift] = useState(pokemon.colorShift || 0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  // Renderizar el canvas con el color seleccionado
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

      if (colorShift > 0) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const palette = COLOR_PALETTES[colorShift - 1];

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

    img.src = pokemon.image;
  }, [pokemon.image, colorShift]);

  const handleMouseMove = (e) => {
    if (!previewContainerRef.current) return;
    
    const rect = previewContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setZoomPosition({ x, y });
  };

  const handleTouchMove = (e) => {
    if (!previewContainerRef.current) return;
    
    // Prevenir scroll mientras se hace zoom
    e.preventDefault();
    
    const touch = e.touches[0];
    const rect = previewContainerRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    setZoomPosition({ x, y });
  };

  const handleConfirm = () => {
    onConfirm(pokemon.uniqueId, colorShift);
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
          {/* Canvas Preview con Zoom */}
          <div 
            ref={previewContainerRef}
            className="relative flex justify-center bg-slate-900/50 rounded-xl p-8 overflow-hidden"
            style={{ cursor: isZooming ? 'zoom-in' : 'default', touchAction: 'none' }}
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={(e) => {
              setIsZooming(true);
              handleTouchMove(e);
            }}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setIsZooming(false)}
          >
            {/* Canvas normal */}
            <canvas
              ref={canvasRef}
              className="object-contain transition-opacity duration-200"
              style={{
                imageRendering: 'pixelated',
                width: '100px',
                height: '100px',
                opacity: isZooming ? 0 : 1
              }}
            />

            {/* Canvas con zoom que sigue al mouse */}
            {isZooming && (
              <canvas
                ref={(zoomCanvas) => {
                  if (zoomCanvas && canvasRef.current) {
                    const ctx = zoomCanvas.getContext('2d');
                    const sourceCanvas = canvasRef.current;
                    zoomCanvas.width = sourceCanvas.width;
                    zoomCanvas.height = sourceCanvas.height;
                    ctx.drawImage(sourceCanvas, 0, 0);
                  }
                }}
                className="absolute pointer-events-none"
                style={{
                  imageRendering: 'pixelated',
                  width: '200px',
                  height: '200px',
                  left: `${zoomPosition.x}px`,
                  top: `${zoomPosition.y}px`,
                  transform: 'translate(-50%, -50%)',
                  filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))',
                  zIndex: 10
                }}
              />
            )}
          </div>

          {/* Color Slider */}
          <div className="space-y-3">
            <label className="text-slate-200 font-semibold text-sm block">
              {colorShift === 0 ? 'Shiny' : `Super Shiny #${colorShift}`}
            </label>
            <div className="flex items-center gap-4">
              <span className="text-slate-400 text-sm whitespace-nowrap">Original</span>
              <input
                type="range"
                min="0"
                max="10"
                value={colorShift}
                onChange={(e) => setColorShift(Number(e.target.value))}
                className="flex-1 h-2 bg-blue-900 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-blue-400 text-sm font-medium whitespace-nowrap">
                {colorShift === 0 ? 'Original' : `#${colorShift}`}
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