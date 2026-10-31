import { useEffect, useRef } from 'react';
import { COLOR_PALETTES } from './colorPalettes';

const hue2rgb = (p, q, t) => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
};

const ShinyPokemonCard = ({ pokemon, size = 200, outline = 1, outlineColor = '#ffffff' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const currentFrameRef = useRef(0);

  useEffect(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    currentFrameRef.current = 0;

    const colorShift = pokemon.colorShift || 0;

    const src = colorShift === 0
      ? pokemon.image
      : pokemon.image.replace('/pokemonFront/', '/pokemonFrontShiny/');

    const img = new Image();

    img.onload = () => {
      const frameHeight = img.height;
      const frameWidth = frameHeight;
      const totalFrames = Math.floor(img.width / frameWidth);

      const canvas = canvasRef.current;
      if (!canvas) return;

      const pad = outline;
      const lowW = frameWidth + pad * 2;
      const lowH = frameHeight + pad * 2;
      const pixelScale = size / frameWidth;

      canvas.width = Math.round(lowW * pixelScale);
      canvas.height = Math.round(lowH * pixelScale);

      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = false;

      const frameCanvas = document.createElement('canvas');
      frameCanvas.width = frameWidth;
      frameCanvas.height = frameHeight;
      const frameCtx = frameCanvas.getContext('2d', { willReadFrequently: true });
      frameCtx.imageSmoothingEnabled = false;

      const sil = document.createElement('canvas');
      sil.width = frameWidth;
      sil.height = frameHeight;
      const silCtx = sil.getContext('2d');

      const low = document.createElement('canvas');
      low.width = lowW;
      low.height = lowH;
      const lowCtx = low.getContext('2d');
      lowCtx.imageSmoothingEnabled = false;

      const offsets = [];
      for (let dx = -outline; dx <= outline; dx++) {
        for (let dy = -outline; dy <= outline; dy++) {
          if (dx !== 0 || dy !== 0) offsets.push([dx, dy]);
        }
      }

      const palette = colorShift >= 2 ? COLOR_PALETTES[colorShift - 2] : null;
      const frameInterval = 100;
      let lastTime = 0;

      const animate = (currentTime) => {
        if (currentTime - lastTime >= frameInterval) {
          const sourceX = currentFrameRef.current * frameWidth;

          frameCtx.clearRect(0, 0, frameWidth, frameHeight);
          frameCtx.drawImage(img, sourceX, 0, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);

          if (palette) {
            const imageData = frameCtx.getImageData(0, 0, frameWidth, frameHeight);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
              if (data[i + 3] > 0) {
                const r = data[i] / 255;
                const g = data[i + 1] / 255;
                const b = data[i + 2] / 255;

                const max = Math.max(r, g, b);
                const min = Math.min(r, g, b);
                const l = (max + min) / 2;
                let h = 0, s = 0;

                if (max !== min) {
                  const d = max - min;
                  s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                  else if (max === g) h = ((b - r) / d + 2) / 6;
                  else h = ((r - g) / d + 4) / 6;
                }

                h = (h + palette.hueShift / 360) % 1;
                s = Math.min(1, s * palette.saturation);
                const newL = Math.min(1, l * palette.brightness);

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

            frameCtx.putImageData(imageData, 0, 0);
          }

          lowCtx.clearRect(0, 0, lowW, lowH);
          if (outline > 0) {
            silCtx.clearRect(0, 0, frameWidth, frameHeight);
            silCtx.globalCompositeOperation = 'source-over';
            silCtx.drawImage(frameCanvas, 0, 0);
            silCtx.globalCompositeOperation = 'source-in';
            silCtx.fillStyle = outlineColor;
            silCtx.fillRect(0, 0, frameWidth, frameHeight);

            for (const [dx, dy] of offsets) {
              lowCtx.drawImage(sil, pad + dx, pad + dy);
            }
          }
          lowCtx.drawImage(frameCanvas, pad, pad);

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(low, 0, 0, lowW, lowH, 0, 0, canvas.width, canvas.height);

          currentFrameRef.current = (currentFrameRef.current + 1) % totalFrames;
          lastTime = currentTime;
        }

        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    img.onerror = () => console.error('No se pudo cargar la imagen:', src);
    img.src = src;

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [pokemon.id, pokemon.image, pokemon.colorShift, pokemon.formIndex, size, outline, outlineColor]);

  return <canvas ref={canvasRef} style={{ imageRendering: 'pixelated' }} />;
};

export default ShinyPokemonCard;