import React, { useCallback, useState } from 'react';
import { useSafeTimeout } from '../../hooks/useSafeTimeout';

const MOUSE_OUT_TIMEOUT_ID = 'mouseout';

export type HoverableProps = {
  children: React.ReactElement;
  defaultProps: React.Attributes;
  hoverableProps: React.Attributes;
};

/**
 * The hoverable component accepts a child element
 * and applies either the defaultProps or the
 * hoverableProps to it depending on the mouseover
 * state.
 */
export function Hoverable({ children, defaultProps, hoverableProps }: HoverableProps): JSX.Element {
  const { setSafeTimeout, clearSafeTimeout } = useSafeTimeout();
  const [hovered, setHovered] = useState<boolean>(false);

  const handleMouseOver = useCallback((): void => {
    clearSafeTimeout(MOUSE_OUT_TIMEOUT_ID);
    setHovered(true);
  }, [clearSafeTimeout]);

  const handleMouseOut = useCallback((): void => {
    setSafeTimeout(() => setHovered(false), 500, MOUSE_OUT_TIMEOUT_ID);
  }, [setSafeTimeout]);

  return React.cloneElement(children, {
    onMouseOver: handleMouseOver,
    onMouseOut: handleMouseOut,
    ...(hovered ? hoverableProps : defaultProps),
  });
}

Hoverable.displayName = 'Hoverable';
