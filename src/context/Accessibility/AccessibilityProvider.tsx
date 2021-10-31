import produce from 'immer';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AccessibilityContext, AccessibilityContextValue, EventType } from './AccessibilityContext';

export type AccessibilityProviderProps = {
  children: React.ReactNode;
};

function isFakeMousedownFromScreenReader(event: MouseEvent) {
  return event.buttons === 0;
}

function isNavigationKey(keycode: string) {
  return ['Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(keycode);
}

/**
 * The accessibility provider is a top level component
 * that adds window event listeners for key down, mouse
 * down and touch start events to determine which input
 * method is used for interaction.
 *
 * This provides an `eventType` value which stores the type
 * of input event, a `setEventType` function to update the
 * event type manually, and an `accessible` flag which is
 * set to true if the event type is the keyboard.
 */
export function AccessibilityProvider({ children }: AccessibilityProviderProps): JSX.Element {
  const previousValue = useRef<AccessibilityContextValue>({} as AccessibilityContextValue);
  const [eventType, setEventType] = useState<EventType | undefined>();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const element = event.target as HTMLElement;

      if (
        isNavigationKey(event.key) ||
        (!['input', 'select', 'textarea'].includes(element.tagName.toLowerCase()) &&
          !element.getAttribute('contentEditable'))
      ) {
        setEventType('keyboard');
      }
    },
    [setEventType],
  );

  const handleMouseDown = useCallback(
    (event: MouseEvent): void => setEventType(isFakeMousedownFromScreenReader(event) ? 'keyboard' : 'mouse'),
    [setEventType],
  );

  const handleTouchStart = useCallback((): void => setEventType('mouse'), [setEventType]);

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
    draftState.accessible = eventType === 'keyboard';
    draftState.eventType = eventType;
    draftState.setEventType = setEventType;
  });
  previousValue.current = value;

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

AccessibilityProvider.displayName = 'AccessibilityProvider';
