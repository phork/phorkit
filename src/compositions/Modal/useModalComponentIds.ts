import produce from 'immer';
import { useCallback, useRef } from 'react';
import { useComponentId } from '../../hooks/useComponentId';

export type UseModalComponentIdsResponse = {
  componentId: string;
  generateTitleId: () => string;
};

export function useModalComponentIds(id?: string): UseModalComponentIdsResponse {
  const previousResponse = useRef<UseModalComponentIdsResponse>({} as UseModalComponentIdsResponse);
  const { componentId, generateComponentId } = useComponentId(id);
  const generateTitleId = useCallback(() => generateComponentId('title'), [generateComponentId]);

  previousResponse.current = produce(previousResponse.current, draftState => {
    draftState.componentId = componentId;
    draftState.generateTitleId = generateTitleId;
  });
  return previousResponse.current;
}
