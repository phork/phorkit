import produce from 'immer';
import { useCallback, useRef } from 'react';
import { useComponentId } from '../../hooks/useComponentId';

export type UseToastComponentIdsResponse = {
  componentId: string;
  generateTitleId: () => string;
};

export function useToastComponentIds(id?: string): UseToastComponentIdsResponse {
  const previousResponse = useRef<UseToastComponentIdsResponse>({} as UseToastComponentIdsResponse);
  const { componentId, generateComponentId } = useComponentId(id);
  const generateTitleId = useCallback(() => generateComponentId('title'), [generateComponentId]);

  previousResponse.current = produce(previousResponse.current, draftState => {
    draftState.componentId = componentId;
    draftState.generateTitleId = generateTitleId;
  });
  return previousResponse.current;
}
