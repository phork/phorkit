import produce from 'immer';
import { nanoid } from 'nanoid';
import { useCallback, useRef } from 'react';

export type UseComponentIdResponse = {
  componentId: string;
  generateComponentId: (id?: string | number, suffix?: string) => string;
};

/**
 * Append a component ID to an element ID to prevent
 * any ID collision.
 */
export function useComponentId(initialId?: string): UseComponentIdResponse {
  const previousUseComponentIdResponse = useRef<UseComponentIdResponse>({} as UseComponentIdResponse);
  const componentId = useRef<string>(initialId || nanoid());
  const generateComponentId: UseComponentIdResponse['generateComponentId'] = useCallback(
    (id, suffix) => `${componentId.current}${id || id === 0 ? `_${id}` : ''}${suffix ? `_${suffix}` : ''}`,
    [],
  );

  previousUseComponentIdResponse.current = produce(previousUseComponentIdResponse.current, draftState => {
    draftState.componentId = componentId.current;
    draftState.generateComponentId = generateComponentId;
  });
  return previousUseComponentIdResponse.current;
}
