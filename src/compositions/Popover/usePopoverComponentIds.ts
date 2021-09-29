import produce from 'immer';
import { useCallback, useRef } from 'react';
import { useComponentId } from '../../hooks/useComponentId';

export type UsePopoverComponentIdsResponse = {
  componentId: string;
  generateTogglerId: () => string;
};

/**
 * Returns an ID to use as the element ID for the
 * popover, and a function to generate an ID to use
 * for the popover's toggle. This is so the aria values
 * reference each other properly.
 */
export function usePopoverComponentIds(id?: string): UsePopoverComponentIdsResponse {
  const previousResponse = useRef<UsePopoverComponentIdsResponse>({} as UsePopoverComponentIdsResponse);
  const { componentId, generateComponentId } = useComponentId(id);
  const generateTogglerId = useCallback(() => generateComponentId('toggle'), [generateComponentId]);

  previousResponse.current = produce(previousResponse.current, draftState => {
    draftState.componentId = componentId;
    draftState.generateTogglerId = generateTogglerId;
  });
  return previousResponse.current;
}
