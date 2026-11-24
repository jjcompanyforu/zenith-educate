import { useEffect } from 'react';

// Tilts an element in 3D as the pointer moves over a (larger) area.
// Writes CSS custom properties (e.g. --rx / --ry) on the target element.
// Skipped for touch-only devices and when the user prefers reduced motion.
export default function usePointerTilt(areaRef, targetRef, { xVar, yVar, maxX, maxY, measureRef, clamp = 0.5 }) {
  useEffect(() => {
    const area = areaRef.current;
    const target = targetRef.current;
    if (!area || !target) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (!window.matchMedia('(hover: hover)').matches) return undefined;

    const box = () => (measureRef?.current || area).getBoundingClientRect();
    const limit = (v) => Math.max(-clamp, Math.min(clamp, v));
    const onMove = (e) => {
      const r = box();
      const x = limit((e.clientX - r.left) / r.width - 0.5);
      const y = limit((e.clientY - r.top) / r.height - 0.5);
      target.style.setProperty(yVar, `${(x * maxY).toFixed(2)}deg`);
      target.style.setProperty(xVar, `${(y * -maxX).toFixed(2)}deg`);
    };
    const onLeave = () => {
      target.style.setProperty(yVar, '0deg');
      target.style.setProperty(xVar, '0deg');
    };
    area.addEventListener('pointermove', onMove);
    area.addEventListener('pointerleave', onLeave);
    return () => {
      area.removeEventListener('pointermove', onMove);
      area.removeEventListener('pointerleave', onLeave);
    };
  }, [areaRef, targetRef, measureRef, xVar, yVar, maxX, maxY, clamp]);
}
