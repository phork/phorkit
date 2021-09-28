import produce, { castDraft, Draft } from 'immer';
import React, { useRef } from 'react';
import { InteractiveGroupContext, InteractiveGroupContextValue } from './InteractiveGroupContext';
import { InteractiveGroupItemId } from './types';
import { useInteractiveGroup, UseInteractiveGroupProps, UseInteractiveGroupResponse } from './useInteractiveGroup';

export interface PartialInteractiveGroupProviderProps<
  T extends InteractiveGroupItemId = string,
  E extends HTMLElement = HTMLDivElement,
  I extends HTMLElement = HTMLElement,
> extends Omit<React.HTMLAttributes<E>, 'onKeyDown' | 'onSelect'>,
    UseInteractiveGroupProps<T> {
  children:
    | React.ReactElement
    | ((ref: UseInteractiveGroupResponse<T, E, I>['ref'], props: unknown) => React.ReactElement<E>)
    | null;
}

/**
 * The interactive group provider accepts a reducer
 * that contains an array of items and, through that
 * reducer, manages which items are focused and
 * selected. It listens for keyDown events to track
 * the focus, and provides a handleItemClick function
 * which should be called when an item is clicked.
 *
 * - T is the type of IDs allowed
 * - E is the type of the element that the returned ref gets attached to
 * - I is the type of item element
 */
export function PartialInteractiveGroupProvider<
  T extends InteractiveGroupItemId = string,
  E extends HTMLElement = HTMLDivElement,
  I extends HTMLElement = HTMLElement,
>({
  allowReselect,
  children,
  disabled,
  maxSelect,
  minSelect,
  onItemClick,
  onItemFocus,
  onKeyDown,
  onSelect,
  onSelectionChange,
  onUnselect,
  parentRef,
  reducer,
  selectOnFocus,
  triggerLinks,
  ...props
}: PartialInteractiveGroupProviderProps<T, E, I>): React.ReactElement {
  const previousValue = useRef<Omit<UseInteractiveGroupResponse<T, E, I>, 'ref'>>(
    {} as UseInteractiveGroupResponse<T, E, I>,
  );

  const { focusedIndex, handleItemClick, isSelected, ref, selectedIds, selectId, setFocused, unselectId } =
    useInteractiveGroup<T, E, I>({
      allowReselect,
      disabled,
      maxSelect,
      minSelect,
      onItemClick,
      onItemFocus,
      onKeyDown,
      onSelect,
      onSelectionChange,
      onUnselect,
      parentRef,
      reducer,
      selectOnFocus,
      triggerLinks,
    });

  const value = produce<InteractiveGroupContextValue<T, E, I>, Draft<InteractiveGroupContextValue<T, E, I>>>(
    previousValue.current,
    draftState => {
      draftState.focusedIndex = focusedIndex;
      draftState.handleItemClick = handleItemClick;
      draftState.isSelected = isSelected;
      draftState.selectedIds = castDraft(selectedIds);
      draftState.selectId = selectId;
      draftState.setFocused = setFocused;
      draftState.unselectId = unselectId;
    },
  );
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

PartialInteractiveGroupProvider.displayName = 'PartialInteractiveGroupProvider';
