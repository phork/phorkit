import produce from 'immer';
import React, { useRef } from 'react';
import { InteractiveGroupContext } from './InteractiveGroupContext';
import { useInteractiveGroup, UseInteractiveGroupInterface, UseInteractiveGroupResponse } from './useInteractiveGroup';

export interface InteractiveGroupProviderProps<
  E extends HTMLElement = HTMLDivElement,
  I extends HTMLElement = HTMLElement
> extends Omit<React.HTMLAttributes<E>, 'onKeyDown' | 'onSelect'>,
    UseInteractiveGroupInterface {
  children:
    | React.ReactElement
    | ((ref: UseInteractiveGroupResponse<E, I>['ref'], props: unknown) => React.ReactElement<E>)
    | null;
}

/**
 * - E is the type of the element that the returned ref gets attached to
 * - I is the type of item element
 */
export function InteractiveGroupProvider<E extends HTMLElement = HTMLDivElement, I extends HTMLElement = HTMLElement>({
  allowMultiSelect,
  allowReselect,
  children,
  disabled,
  disableUnselect,
  initialSelected,
  items,
  onItemClick,
  onItemFocus,
  onKeyDown,
  onSelect,
  onUnselect,
  parentRef,
  selectOnFocus,
  triggerLinks,
  ...props
}: InteractiveGroupProviderProps<E, I>): React.ReactElement {
  const previousValue = useRef<Omit<UseInteractiveGroupResponse<E, I>, 'ref'>>({} as UseInteractiveGroupResponse<E, I>);
  const {
    focusedIndex,
    handleItemClick,
    isSelected,
    ref,
    selectedId,
    setFocused,
    setSelected,
    unsetSelected,
  } = useInteractiveGroup<E, I>({
    allowMultiSelect,
    allowReselect,
    disabled,
    disableUnselect,
    initialSelected,
    items,
    onItemClick,
    onItemFocus,
    onKeyDown,
    onSelect,
    onUnselect,
    parentRef,
    selectOnFocus,
    triggerLinks,
  });

  const value = produce(previousValue.current, draftState => {
    draftState.focusedIndex = focusedIndex;
    draftState.handleItemClick = handleItemClick;
    draftState.isSelected = isSelected;
    draftState.selectedId = selectedId;
    draftState.setFocused = setFocused;
    draftState.setSelected = setSelected;
    draftState.unsetSelected = unsetSelected;
  });
  previousValue.current = value;

  return (
    <InteractiveGroupContext.Provider value={value}>
      {typeof children === 'function' ? (
        children(ref, props)
      ) : (
        <div ref={ref as React.Ref<HTMLDivElement>} {...(props as React.HTMLAttributes<HTMLDivElement>)}>
          {children}
        </div>
      )}
    </InteractiveGroupContext.Provider>
  );
}

InteractiveGroupProvider.displayName = 'InteractiveGroupProvider';
