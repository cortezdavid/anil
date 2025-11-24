import { useState, useEffect, useRef } from 'react';

const PokemonFront = ({ img, scale }) => {
  const canvasRef = useRef(null);
  const [spriteData, setSpriteData] = useState(null);
  const animationRef = useRef(null);
  const currentFrameRef = useRef(0);

  useEffect(() => {
    if (!img) return;

    const image = new Image();
    image.onload = () => {
      const frameHeight = image.height;
      const frameWidth = frameHeight; // frames cuadrados
      const totalFrames = Math.floor(image.width / frameWidth);

      if (totalFrames >= 1) {
        setSpriteData({
          image,
          frameWidth,
          frameHeight,
          totalFrames
        });
      }
    };

    image.src = img;
  }, [img]);

  useEffect(() => {
    if (!spriteData || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Tamaño fijo para todos los sprites
    const fixedSize = scale; // puedes cambiar este número
    canvas.width = fixedSize;
    canvas.height = fixedSize;
    ctx.imageSmoothingEnabled = false;

    let lastTime = 0;
    const frameInterval = 40; // 10 FPS

    const animate = (currentTime) => {
      if (currentTime - lastTime >= frameInterval) {
        const sourceX = currentFrameRef.current * spriteData.frameWidth;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
          spriteData.image,
          sourceX, 0, spriteData.frameWidth, spriteData.frameHeight,
          0, 0, fixedSize, fixedSize
        );

        currentFrameRef.current = (currentFrameRef.current + 1) % spriteData.totalFrames;
        lastTime = currentTime;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [spriteData]);

  return <canvas ref={canvasRef} />;
};

export default PokemonFront;