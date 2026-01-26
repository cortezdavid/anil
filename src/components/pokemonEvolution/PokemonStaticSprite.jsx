import { useEffect, useRef } from 'react';

const PokemonStaticSprite = ({ img, scale = 128 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!img) return;

    const image = new Image();
    image.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const frameHeight = image.height;
      const frameWidth = frameHeight; // frames cuadrados

      canvas.width = scale;
      canvas.height = scale;
      ctx.imageSmoothingEnabled = false;

      // Dibujar solo el primer frame (posición 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        image,
        0, 0, frameWidth, frameHeight, // primer frame en posición 0
        0, 0, scale, scale
      );
    };

    image.src = img;
  }, [img, scale]);

  return <canvas ref={canvasRef} className="rounded-lg" />;
};

export default PokemonStaticSprite;