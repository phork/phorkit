import produce from 'immer';
import { useCallback, useRef } from 'react';
import { v4 as uuid } from 'uuid';

export type UseComponentIdResponse = {
  componentId: string;
  generateComponentId: (id?: string | number, suffix?: string) => string;
};

// append a component ID to an element ID to prevent any ID collision
export function useComponentId(initialId?: string): UseComponentIdResponse {
  const previousUseComponentIdResponse = useRef<UseComponentIdResponse>({} as UseComponentIdResponse);
  const componentId = useRef<string>(initialId || uuid());
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
