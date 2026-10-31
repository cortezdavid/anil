import { useEffect, useRef } from 'react';

const PokemonFront = ({ img, scale, outline = 0, outlineColor = '#ffffff' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const currentFrameRef = useRef(0);

  useEffect(() => {
    if (!img) return;

    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    currentFrameRef.current = 0;

    const image = new Image();

    image.onload = () => {
      const frameHeight = image.height;
      const frameWidth = frameHeight;
      const totalFrames = Math.floor(image.width / frameWidth);

      const pad = outline;
      const lowW = frameWidth + pad * 2;
      const lowH = frameHeight + pad * 2;

      const pixelScale = scale / frameWidth;

      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = Math.round(lowW * pixelScale);
      canvas.height = Math.round(lowH * pixelScale);

      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = false;

      const low = document.createElement('canvas');
      low.width = lowW;
      low.height = lowH;
      const lowCtx = low.getContext('2d');
      lowCtx.imageSmoothingEnabled = false;

      const sil = document.createElement('canvas');
      sil.width = frameWidth;
      sil.height = frameHeight;
      const silCtx = sil.getContext('2d');

      const offsets = [];
      for (let dx = -outline; dx <= outline; dx++) {
        for (let dy = -outline; dy <= outline; dy++) {
          if (dx !== 0 || dy !== 0) offsets.push([dx, dy]);
        }
      }

      const frameInterval = 60;
      let lastTime = 0;

      const animate = (currentTime) => {
        if (currentTime - lastTime >= frameInterval) {
          const sourceX = currentFrameRef.current * frameWidth;

          silCtx.clearRect(0, 0, frameWidth, frameHeight);
          silCtx.globalCompositeOperation = 'source-over';
          silCtx.drawImage(image, sourceX, 0, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);
          silCtx.globalCompositeOperation = 'source-in';
          silCtx.fillStyle = outlineColor;
          silCtx.fillRect(0, 0, frameWidth, frameHeight);

          lowCtx.clearRect(0, 0, lowW, lowH);
          for (const [dx, dy] of offsets) {
            lowCtx.drawImage(sil, pad + dx, pad + dy);
          }
          lowCtx.drawImage(image, sourceX, 0, frameWidth, frameHeight, pad, pad, frameWidth, frameHeight);

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(low, 0, 0, lowW, lowH, 0, 0, canvas.width, canvas.height);

          currentFrameRef.current = (currentFrameRef.current + 1) % totalFrames;
          lastTime = currentTime;
        }
        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    image.onerror = () => console.error('No se pudo cargar la imagen:', img);
    image.src = img;

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [img, scale, outline, outlineColor]);

  return <canvas ref={canvasRef} style={{ imageRendering: 'pixelated' }} />;
};

export default PokemonFront;