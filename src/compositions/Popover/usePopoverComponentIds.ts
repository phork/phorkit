import produce from 'immer';
import { useCallback, useRef } from 'react';
import { useComponentId } from '../../hooks/useComponentId';

export type UsePopoverComponentIdsResponse = {
  componentId: string;
  generatePopoverId: () => string;
  generateToggleId: () => string;
};

export function usePopoverComponentIds(id?: string): UsePopoverComponentIdsResponse {
  const previousResponse = useRef<UsePopoverComponentIdsResponse>({} as UsePopoverComponentIdsResponse);
  const { componentId, generateComponentId } = useComponentId(id);

  const generatePopoverId = useCallback<UsePopoverComponentIdsResponse['generatePopoverId']>(
    () => generateComponentId('popover'),
    [generateComponentId],
  );

  const generateToggleId = useCallback<UsePopoverComponentIdsResponse['generateToggleId']>(
    () => generateComponentId('toggle'),
    [generateComponentId],
  );

  previousResponse.current = produce(previousResponse.current, draftState => {
    draftState.componentId = componentId;
    draftState.generatePopoverId = generatePopoverId;
    draftState.generateToggleId = generateToggleId;
  });
  return previousResponse.current;
}
