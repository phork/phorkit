import produce from 'immer';
import { useCallback, useRef } from 'react';
import { useComponentId } from '../../hooks/useComponentId';

export type UseModalComponentIdsResponse = {
  componentId: string;
  generateTitleId: () => string;
};

/**
 * Returns an ID to use as the element ID for the
 * modal, and a function to generate an ID to use
 * for the modal title. This is so the aria values
 * reference each other properly.
 */
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
