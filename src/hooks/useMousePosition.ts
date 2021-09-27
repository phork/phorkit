import { useEffect, useState } from 'react';

type UseMousePositionResponse =
  | {
      x: number;
      y: number;
    }
  | {
      x: undefined;
      y: undefined;
    };

/**
 * Adds an window event listener to update the mouse
 * position in state when the mouse moves.
 */
export const useMousePosition = (): UseMousePositionResponse => {
  const [position, setPosition] = useState<UseMousePositionResponse>({ x: undefined, y: undefined });

  useEffect((): (() => void) => {
    const handleMouseMove = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY });
    typeof window !== 'undefined' && window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return position;
};
