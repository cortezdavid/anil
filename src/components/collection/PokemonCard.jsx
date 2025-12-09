import { useEffect, useRef, useState } from 'react';

const PokemonCard = ({ pokemon, isCollected, onToggle }) => {
  const canvasRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const img = new Image();

    img.onload = () => {
      // El tamaño cuadrado es el alto de la imagen
      const size = img.height;
      
      // Configurar el canvas con el tamaño cuadrado
      canvas.width = size;
      canvas.height = size;

      // Habilitar suavizado para mejor calidad
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Dibujar SOLO el primer cuadro (de 0 a size en X, de 0 a size en Y)
      // sx, sy, sWidth, sHeight son las coordenadas de origen en la imagen
      // dx, dy, dWidth, dHeight son las coordenadas de destino en el canvas
      ctx.drawImage(
        img,
        0, 0, size, size,  // Recortar desde (0,0) un cuadrado de size x size
        0, 0, size, size   // Dibujarlo en el canvas de (0,0) con tamaño size x size
      );

      // Si no está coleccionado, aplicar filtro blanco y negro
      if (!isCollected) {
        const imageData = ctx.getImageData(0, 0, size, size);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
          data[i] = gray;     // Red
          data[i + 1] = gray; // Green
          data[i + 2] = gray; // Blue
          // data[i + 3] es alpha, no lo tocamos
        }

        ctx.putImageData(imageData, 0, 0);
      }

      setImageLoaded(true);
    };

    img.onerror = () => {
      setImageError(true);
      setImageLoaded(true);
    };

    img.src = pokemon.image;
  }, [pokemon.image, isCollected]);

  return (
    <div
      onClick={onToggle}
      className={`relative bg-slate-800 rounded-xl shadow-lg overflow-hidden cursor-pointer 
                  transition-all duration-300 hover:scale-105 border-2 ${
        isCollected 
          ? 'border-blue-500 shadow-blue-500/30' 
          : 'border-slate-700 hover:border-slate-600'
      }`}
    >
      {/* Indicador de capturado */}
      {isCollected && (
        <div className="absolute top-2 right-2 z-10 bg-blue-600 text-white rounded-full p-1 shadow-lg">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}

      {/* Canvas con la imagen */}
      <div className="aspect-square bg-slate-900/50 flex items-center justify-center p-2">
        {!imageLoaded && !imageError && (
          <div className="text-slate-500 text-xs">Cargando...</div>
        )}
        {imageError && (
          <div className="text-red-400 text-xs text-center">
            Error al cargar imagen
          </div>
        )}
        <canvas
          ref={canvasRef}
          className={`max-w-full max-h-full object-contain ${!imageLoaded ? 'hidden' : ''}`}
          style={{
            imageRendering: 'pixelated',
          }}
        />
      </div>

      {/* Nombre del Pokémon */}
      <div className="p-2 bg-slate-900/50">
        <p className={`text-center text-sm font-bold truncate ${
          isCollected ? 'text-blue-300' : 'text-slate-400'
        }`}>
          {pokemon.name}
        </p>
      </div>
    </div>
  );
};

export default PokemonCard;