import produce, { Draft } from 'immer';
import React, { useRef } from 'react';
import { InteractiveGroupContext, InteractiveGroupContextValue } from './InteractiveGroupContext';
import { InteractiveGroupItemId } from './types';
import { useInteractiveGroup, UseInteractiveGroupInterface, UseInteractiveGroupResponse } from './useInteractiveGroup';

export interface UnmanagedInteractiveGroupProviderProps<
  T extends InteractiveGroupItemId = string,
  E extends HTMLElement = HTMLDivElement,
  I extends HTMLElement = HTMLElement
> extends Omit<React.HTMLAttributes<E>, 'onKeyDown' | 'onSelect'>,
    UseInteractiveGroupInterface<T> {
  children:
    | React.ReactElement
    | ((ref: UseInteractiveGroupResponse<T, E, I>['ref'], props: unknown) => React.ReactElement<E>)
    | null;
}

/**
 * - T is the type of IDs allowed
 * - E is the type of the element that the returned ref gets attached to
 * - I is the type of item element
 */
export function UnmanagedInteractiveGroupProvider<
  T extends InteractiveGroupItemId = string,
  E extends HTMLElement = HTMLDivElement,
  I extends HTMLElement = HTMLElement
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
  onUnselect,
  parentRef,
  reducer,
  selectOnFocus,
  triggerLinks,
  ...props
}: UnmanagedInteractiveGroupProviderProps<T, E, I>): React.ReactElement {
  const previousValue = useRef<Omit<UseInteractiveGroupResponse<T, E, I>, 'ref'>>(
    {} as UseInteractiveGroupResponse<T, E, I>,
  );

  const {
    focusedIndex,
    handleItemClick,
    isSelected,
    ref,
    selectedIds,
    selectId,
    setFocused,
    unselectId,
  } = useInteractiveGroup<T, E, I>({
    allowReselect,
    disabled,
    maxSelect,
    minSelect,
    onItemClick,
    onItemFocus,
    onKeyDown,
    onSelect,
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
      // @ts-ignore [TODO:ts] WTF
      draftState.selectedIds = selectedIds;
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

UnmanagedInteractiveGroupProvider.displayName = 'UnmanagedInteractiveGroupProvider';
