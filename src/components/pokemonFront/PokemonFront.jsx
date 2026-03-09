import { useEffect, useRef } from 'react';

const PokemonFront = ({ img, scale }) => {
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

      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = scale;
      canvas.height = scale;

      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = false;

      const frameInterval = 100;
      let lastTime = 0;

      const animate = (currentTime) => {
        if (currentTime - lastTime >= frameInterval) {
          const sourceX = currentFrameRef.current * frameWidth;

          ctx.clearRect(0, 0, scale, scale);
          ctx.drawImage(image, sourceX, 0, frameWidth, frameHeight, 0, 0, scale, scale);

          currentFrameRef.current = (currentFrameRef.current + 1) % totalFrames;
          lastTime = currentTime;
        }
        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    image.src = img;

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [img, scale]);

  return <canvas ref={canvasRef} />;
};

export default PokemonFront;