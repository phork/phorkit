import produce, { castDraft, Draft } from 'immer';
import React, { useRef } from 'react';
import { InteractiveGroupContext, InteractiveGroupContextValue } from './InteractiveGroupContext';
import { InteractiveGroupItemId } from './types';
import { useInteractiveGroup, UseInteractiveGroupProps, UseInteractiveGroupResponse } from './useInteractiveGroup';

export type PartialInteractiveGroupProviderProps<
  T extends InteractiveGroupItemId = string,
  E extends HTMLElement = HTMLDivElement,
  I extends HTMLElement = HTMLElement,
> = Omit<React.HTMLAttributes<E>, 'onKeyDown' | 'onSelect'> &
  UseInteractiveGroupProps<T> & {
    children:
      | React.ReactElement
      | ((ref: UseInteractiveGroupResponse<T, E, I>['ref'], props: unknown) => React.ReactElement<E>)
      | null;
  };

/**
 * The interactive group provider accepts a reducer
 * that contains an array of items and, through that
 * reducer, manages which items are focused and
 * selected. It listens for `keydown` events to track
 * the focus, and provides a `handleItemClick` function
 * which should be called when an item is clicked.
 *
 * Generally the `InteractiveGroupProvider` component
 * should be used. The partial interactive group
 * provider is only necessary in cases when the
 * parent needs access to the reducer and the state.
 *
 * The `initialSelected` prop can be used to set up which
 * items are selected on load, but after that the state is
 * stored internally. The `onSelectionChange`, `onSelect` or
 * `onUnselect` callbacks can be used by the parent.
 *
 * @template T,E,I
 * @param {T} - The type of item IDs allowed
 * @param {E} - The HTML element type that the returned ref gets attached to
 * @param {I} - The HTML element type of the items
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
