import produce from 'immer';
import { useCallback, useRef } from 'react';
import { useComponentId } from '../../hooks/useComponentId';

export type UseToastComponentIdsResponse = {
  componentId: string;
  generateTitleId: () => string;
};

/**
 * Returns an ID to use as the element ID for the
 * toast, and a function to generate an ID to use
 * for the toast title. This is so the aria values
 * reference each other properly.
 */
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
