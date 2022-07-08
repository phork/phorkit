/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { InteractiveGroupItemId } from './types';
import { UseInteractiveGroupResponse } from './useInteractiveGroup';

export type InteractiveGroupContextValue<
  T extends InteractiveGroupItemId = string,
  E extends HTMLElement = HTMLDivElement,
  I extends HTMLElement = HTMLElement,
> = Omit<UseInteractiveGroupResponse<T, E, I>, 'ref'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const InteractiveGroupContext = createContext<InteractiveGroupContextValue<any, any, any>>({
  focusedIndex: undefined,
  handleItemClick: (/* event, id */) => {},
  isSelected: (/* id */) => false,
  selectedIds: undefined,
  selectId: (/* id, [props] */) => {},
  setFocused: (/* id, [props] */) => {},
  unselectId: (/* id, [props] */) => {},
});
