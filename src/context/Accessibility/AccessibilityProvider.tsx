import produce from 'immer';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AccessibilityContext, AccessibilityContextValue, FocusType } from './AccessibilityContext';

export interface AccessibilityProviderProps {
  children: React.ReactNode;
}

function isFakeMousedownFromScreenReader(event: MouseEvent) {
  return event.buttons === 0;
}

function isNavigationKey(keycode: string) {
  return ['Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(keycode);
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps): React.ReactElement {
  const previousValue = useRef<AccessibilityContextValue>({} as AccessibilityContextValue);
  const [focusType, setFocusType] = useState<FocusType | undefined>();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const element = event.target as HTMLElement;

      if (
        isNavigationKey(event.key) ||
        (!['input', 'select', 'textarea'].includes(element.tagName.toLowerCase()) &&
          !element.getAttribute('contentEditable'))
      ) {
        setFocusType('keyboard');
      }
    },
    [setFocusType],
  );

  const handleMouseDown = useCallback(
    (event: MouseEvent): void => setFocusType(isFakeMousedownFromScreenReader(event) ? 'keyboard' : 'mouse'),
    [setFocusType],
  );

  const handleTouchStart = useCallback((): void => setFocusType('mouse'), [setFocusType]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousedown', handleMouseDown, { passive: true });
      window.addEventListener('keydown', handleKeyDown, { passive: true });
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('touchstart', handleTouchStart);
      }
    };
  }, [handleMouseDown, handleKeyDown, handleTouchStart]);

  const value = produce(previousValue.current, draftState => {
    draftState.accessible = focusType === 'keyboard';
    draftState.focusType = focusType;
    draftState.setFocusType = setFocusType;
  });
  previousValue.current = value;

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

AccessibilityProvider.displayName = 'AccessibilityProvider';
