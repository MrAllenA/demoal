import { useEffect, useRef, useState, useCallback } from 'react';

interface Position {
  x: number;
  y: number;
}

interface CursorTrackerProps {
  meltingDuration?: number; // Optional prop for melting duration
  size?: number; // Optional prop for size
  hoverColor?: string; // Optional prop for hover color
  defaultColor?: string; // Optional prop for default color
}

const CursorTracker: React.FC<CursorTrackerProps> = ({
  meltingDuration = 800,
  size = 20,
  hoverColor = 'rgba(255, 255, 255, 0.8)',
  defaultColor = 'rgba(255, 255, 255, 0.6)',
}) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [melting, setMelting] = useState(false);
  const targetRef = useRef<Position>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    const updatePosition = () => {
      setPosition((prev) => {
        const x = prev.x + (targetRef.current.x - prev.x) * 0.15;
        const y = prev.y + (targetRef.current.y - prev.y) * 0.15;
        return { x, y };
      });
      requestAnimationFrame(updatePosition);
    };

    requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  const handleClick = () => {
    setMelting(true);
    setTimeout(() => {
      setMelting(false);
    }, meltingDuration); // Reset melting state after the duration
  };

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
      style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
        transform: `translate(-50%, -50%) scale(${hover ? 1.2 : 1})`,
        pointerEvents: 'none',
        width: melting ? `${size / 4}px` : `${size}px`, // Narrower width during melting
        height: melting ? `${size * 2.5}px` : `${size}px`, // Taller height during melting
        background: melting
          ? `radial-gradient(circle, rgba(255, 190, 130, 0.8) 0%, rgba(255, 150, 90, 0.6) 70%)` // Melting color effect
          : hover
          ? `radial-gradient(circle, ${hoverColor} 0%, rgba(255, 255, 255, 0.4) 70%)`
          : `radial-gradient(circle, ${defaultColor} 0%, rgba(255, 255, 255, 0.3) 70%)`,
        borderRadius: melting ? '50% 50% 10% 10%' : '50%', // Adjusted for dripping effect
        boxShadow: hover
          ? '0 0 12px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.6)'
          : '0 0 8px rgba(255, 255, 255, 0.7), 0 0 15px rgba(255, 255, 255, 0.4)',
        transition: `transform 0.2s ease, width ${melting ? meltingDuration : 0}ms ease, height ${melting ? meltingDuration : 0}ms ease, border-radius ${melting ? meltingDuration : 0}ms ease, opacity ${melting ? meltingDuration : 0}ms ease`,
        opacity: melting ? 0.7 : 1, // Slight transparency when melting
        zIndex: 9999,
      }}
    />
  );
};

export default CursorTracker;
