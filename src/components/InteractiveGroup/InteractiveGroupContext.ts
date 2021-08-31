import { createContext } from 'react';
import { InteractiveGroupItemId } from './types';
import { UseInteractiveGroupResponse } from './useInteractiveGroup';

export type InteractiveGroupContextValue<
  T extends InteractiveGroupItemId = string,
  E extends HTMLElement = HTMLDivElement,
  I extends HTMLElement = HTMLElement,
> = Omit<UseInteractiveGroupResponse<T, E, I>, 'ref'>;

export const InteractiveGroupContext = createContext<InteractiveGroupContextValue<any, any, any>>({
  focusedIndex: undefined,
  handleItemClick: (/* event, id */) => {},
  isSelected: (/* id */) => false,
  selectedIds: undefined,
  selectId: (/* id, [props] */) => {},
  setFocused: (/* id, [props] */) => {},
  unselectId: (/* id, [props] */) => {},
});
