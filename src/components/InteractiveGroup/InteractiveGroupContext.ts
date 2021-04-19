import { createContext } from 'react';
import { UseInteractiveGroupResponse } from './useInteractiveGroup';

export type InteractiveGroupContextValue<
  E extends HTMLElement = HTMLDivElement,
  I extends HTMLElement = HTMLElement
> = Omit<UseInteractiveGroupResponse<E, I>, 'ref'>;

export const InteractiveGroupContext = createContext<InteractiveGroupContextValue<any, any>>({
  focusedIndex: undefined,
  handleItemClick: (/* event, id */) => {},
  isSelected: (/* id */) => false,
  selectedId: undefined,
  setFocused: (/* id, [props] */) => {},
  setSelected: (/* id, [props] */) => {},
  unsetSelected: (/* id, [props] */) => {},
});
