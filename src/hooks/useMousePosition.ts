import { useEffect, useState } from 'react';

type UseMousePositionResponse = {
  x: number;
  y: number;
};

export const useMousePosition = (): UseMousePositionResponse => {
  const [position, setPosition] = useState<UseMousePositionResponse>({ x: 0, y: 0 });

  useEffect((): (() => void) => {
    const setFromEvent = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY });
    typeof window !== 'undefined' && window.addEventListener('mousemove', setFromEvent);

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', setFromEvent);
      }
    };
  }, []);

  return position;
};
