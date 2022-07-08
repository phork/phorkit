import { Dispatch, useCallback, useEffect, useMemo, useRef } from 'react';
import { useElementEventListener } from '../../hooks/useElementEventListener';
import { generateInteractiveGroupActions, GeneratedInteractiveGroupActions } from './generateInteractiveGroupActions';
import { InteractiveGroupEventTypes, InteractiveGroupStateAction } from './interactiveGroupActions';
import { InteractiveGroupState } from './interactiveGroupReducer';
import {
  selectFocusedIndex,
  selectFocusedEvent,
  selectItems,
  selectTriggeredTime,
  selectSelectedEvent,
  selectSelectedTime,
  selectUnselectedEvent,
  selectTriggeredId,
  selectSelectedIds,
} from './interactiveGroupSelector';
import { InteractiveGroupItemId, InteractiveGroupSelectEventHandlerProps } from './types';

export type UseInteractiveGroupProps<T extends InteractiveGroupItemId = string> = {
  /** This will allow an already selected item to be re-triggered */
  allowReselect?: boolean;
  /** This disables interaction across the whole group */
  disabled?: boolean;
  /** Set minSelect to 0 to allow unselecting the current item */
  minSelect?: number;
  /** Set maxSelect to -1 to allow an unlimited amount */
  maxSelect?: number;
  onItemClick?: (event: React.MouseEvent | React.TouchEvent, id: T) => void;
  onItemFocus?: (event: InteractiveGroupEventTypes['event'] | undefined, props: { id: T; index: number }) => void;
  onKeyDown?: (event: KeyboardEvent, props?: { used?: boolean }) => void;
  /** This fires for every item that has been selected */
  onSelect?: (
    event: InteractiveGroupEventTypes['event'],
    props: InteractiveGroupSelectEventHandlerProps<T>,
    selectedIds: readonly T[],
  ) => void;
  /** This fires whenever a selection changes, and groups together select and unselect changes */
  onSelectionChange?: (selectedIds: readonly T[]) => void;
  /** This fires for every item that is unselected, including when the item is unselected because another item has been selected */
  onUnselect?: (
    event: InteractiveGroupEventTypes['event'],
    props: InteractiveGroupSelectEventHandlerProps<T>,
    selectedIds?: readonly T[],
  ) => void;
  /** Only events that happen within the parent ref will affect the component */
  parentRef?: React.RefObject<HTMLElement>;
  /** The reducer comes directly from useReducer() and is managed separately so that other components can manage the state */
  reducer: [InteractiveGroupState<T>, Dispatch<InteractiveGroupStateAction<T>>];
  /** If this is set then an item will be selected automatically when it's focused */
  selectOnFocus?: boolean;
  /** If an item contains a link that link will be triggered when the item is selected */
  triggerLinks?: boolean;
};

export type UseInteractiveGroupResponse<
  T extends InteractiveGroupItemId = string,
  E extends HTMLElement = HTMLDivElement,
  I extends HTMLElement = HTMLElement,
> = {
  /** The index of the focused item */
  focusedIndex?: number;
  /** A function to call from each item's onClick handler */
  handleItemClick: (event: React.MouseEvent<I> | React.TouchEvent<I>, id: T) => void;
  /** A ref to be set on the container element */
  ref: React.Ref<E>;
  /** Checks if an item is selected by its ID */
  isSelected: (id: T) => boolean;
  /** Returns a list of selected IDs */
  selectedIds?: readonly T[];
  /** Sets an item to focused by its ID */
  setFocused: (id: T, props: Parameters<GeneratedInteractiveGroupActions<T>['setFocusedByIndex']>[1]) => void;
  /** Sets an item as selected by its ID */
  selectId: GeneratedInteractiveGroupActions<T>['selectId'];
  /** Sets an item as unselected by its ID */
  unselectId: GeneratedInteractiveGroupActions<T>['unselectId'];
};

/**
 * Adds a `keydown` listener to the `document` and
 * returns a `handleItemClick` listener to attach to
 * each item. Together these listeners will wait for
 * actions that change the focused and selected items
 * and will update the reducer state accordingly. Also
 * returns functions to trigger the select, unselect and
 * focus of items. It's up to the consumer of this hook
 * to use this triggered data to update the UI.
 *
 * When the selected and focused item(s) change this
 * fires a series of callbacks.
 *
 * When the `selectedIds` change, first the `onUnselect`
 * callback is fired for every ID that was removed,
 * then an `onSelect` callback is fired for every ID
 * that was added, and finally the `onSelectionChange`
 * callback is fired once.
 *
 * @template T,E,I
 * @param {T} - The type of item IDs allowed
 * @param {E} - The HTML element type that the returned ref gets attached to
 * @param {I} - The HTML element type of the items
 */
export function useInteractiveGroup<
  T extends InteractiveGroupItemId = string,
  E extends HTMLElement = HTMLDivElement,
  I extends HTMLElement = HTMLElement,
>({
  allowReselect = false,
  disabled = false,
  minSelect = 1,
  maxSelect = 1,
  onItemClick,
  onItemFocus,
  onKeyDown,
  onSelect,
  onSelectionChange,
  onUnselect,
  parentRef,
  reducer,
  selectOnFocus = false,
  triggerLinks = false,
}: UseInteractiveGroupProps<T>): UseInteractiveGroupResponse<T, E, I> {
  const previousState = useRef<{
    focusedIndex?: InteractiveGroupState<T>['focusedIndex'];
    selectedIds?: InteractiveGroupState<T>['selectedIds'];
    selectedTime?: number;
    triggeredTime?: number;
  }>({});

  const [state, dispatch] = reducer;
  const ref = useRef<E>(null);

  const {
    focusFirst,
    focusLast,
    focusNext,
    focusPrevious,
    selectFirst,
    selectFocused,
    selectId,
    selectLast,
    selectNext,
    selectPrevious,
    setFocusedByIndex,
    toggleSelected,
    toggleSelectedFocused,
    unselectId,
  } = useMemo(
    () => generateInteractiveGroupActions(dispatch, minSelect, maxSelect, allowReselect),
    [dispatch, minSelect, maxSelect, allowReselect],
  );

  const items = selectItems(state);
  const focusedEvent = selectFocusedEvent(state);
  const focusedIndex = selectFocusedIndex(state);
  const selectedEvent = selectSelectedEvent(state);
  const selectedIds = selectSelectedIds(state);
  const selectedTime = selectSelectedTime(state);
  const triggeredId = selectTriggeredId(state);
  const triggeredTime = selectTriggeredTime(state);
  const unselectedEvent = selectUnselectedEvent(state);

  const isSelected: UseInteractiveGroupResponse<T, E, I>['isSelected'] = id =>
    !!(Array.isArray(state.selectedIds) && state.selectedIds.includes(id));

  // call the onItemFocus callback if the focus changes
  useEffect(() => {
    if (focusedIndex && focusedIndex !== previousState.current.focusedIndex) {
      focusedIndex &&
        onItemFocus &&
        onItemFocus(focusedEvent, {
          id: (items.at(focusedIndex) || {}).id,
          index: focusedIndex,
        });
    }
    previousState.current.focusedIndex = focusedIndex;
  }, [focusedIndex, focusedEvent, onItemFocus, items]);

  // call the item's trigger function if the triggered item changes (use timestamp tracking here so trigger can fire multiple times)
  useEffect(() => {
    if (triggeredTime && triggeredTime !== previousState.current.triggeredTime) {
      const item = items.getItemById(triggeredId);
      item && item.triggerOnly && item.triggerOnly();
    }
    previousState.current.triggeredTime = triggeredTime;
  }, [items, triggeredTime, triggeredId]);

  // call onSelect and/or onUnselect if the selected item changes
  useEffect(() => {
    if (
      (previousState.current.selectedIds !== selectedIds ||
        (allowReselect && previousState.current.selectedTime !== selectedTime)) &&
      Object.prototype.hasOwnProperty.call(previousState.current, 'selectedIds')
    ) {
      const wasPreviouslySelected = (id: T): boolean => previousState.current.selectedIds?.includes(id) || false;
      const isCurrentlySelected = (id: T): boolean => selectedIds?.includes(id) || false;

      const handleSelectedId = (id: T, allowReselect?: boolean) => {
        if (id !== undefined && onSelect && (allowReselect || !wasPreviouslySelected(id))) {
          onSelect(
            selectedEvent,
            {
              ...items.getItemById(id),
              id,
              index: items.getIndexById(id),
            },
            selectedIds,
          );
        }
      };

      const handleUnselectedId = (id: T) => {
        if (id !== undefined && onUnselect && !isCurrentlySelected(id)) {
          onUnselect(
            unselectedEvent,
            {
              id,
              index: items.getIndexById(id),
            },
            selectedIds,
          );
        }
      };

      // trigger onUnselect callbacks for any former selections
      if (onUnselect && Array.isArray(previousState.current.selectedIds)) {
        previousState.current.selectedIds.forEach(id => handleUnselectedId(id));
      }

      // trigger onSelect callbacks for any new selections
      if (onSelect && Array.isArray(selectedIds)) {
        selectedIds.forEach(id => handleSelectedId(id, allowReselect));
      }

      // trigger the onSelect callback for a re-select if not multi-select
      if (
        allowReselect &&
        maxSelect === 1 &&
        previousState.current.selectedIds === selectedIds &&
        previousState.current.selectedTime !== selectedTime &&
        selectedIds.length > 0
      ) {
        handleSelectedId(selectedIds[0], true);
      }

      // trigger the onSelection change callback with the new selection
      onSelectionChange && onSelectionChange(selectedIds);

      /**
       * Manually trigger the link of <a> tags. If the target is the <a>
       * tag don't trigger on click or Enter. This dispatches a
       * MouseEvent so it doesn't interfere with the accessibility context.
       */
      const event = selectedEvent;
      if (
        typeof window !== 'undefined' &&
        triggerLinks &&
        event &&
        ((event.target as HTMLElement)?.tagName.toLowerCase() !== 'a' || ('key' in event && event.key === ' '))
      ) {
        const link =
          (event.target as HTMLElement).tagName.toLowerCase() === 'a'
            ? event.target
            : (event.target as HTMLElement).querySelector('a');
        link && link.dispatchEvent(new window.MouseEvent('click'));
      }
    }

    previousState.current.selectedIds = selectedIds;
    selectedIds && (previousState.current.selectedTime = selectedTime);
  }, [
    selectedIds,
    selectedEvent,
    unselectedEvent,
    onSelect,
    items,
    onUnselect,
    selectedTime,
    allowReselect,
    triggerLinks,
    maxSelect,
    onSelectionChange,
  ]);

  const setFocused: UseInteractiveGroupResponse<T>['setFocused'] = useCallback(
    (id, props) => setFocusedByIndex(items.getIndexById(id), props),
    [items, setFocusedByIndex],
  );

  const handleItemClick: UseInteractiveGroupResponse<T>['handleItemClick'] = useCallback(
    (event, id) => {
      event.persist();
      event.stopPropagation();

      !disabled && toggleSelected(id, { event });
      onItemClick && onItemClick(event, id);
    },
    [disabled, onItemClick, toggleSelected],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (disabled) return undefined;

      /**
       * If the alt key is used then disregard all the
       * keyboard events because alt usually has a special
       * purpose like exiting out of a combobox dropdown.
       */
      if (event.altKey) return undefined;

      const isEventWithinContainer = (event: KeyboardEvent): boolean => {
        const container = (parentRef && parentRef.current) || ref.current;
        return !!container && container.contains(event.target as HTMLElement);
      };
      if (!isEventWithinContainer(event)) return undefined;

      // don't allow any keyboard actions if in a form input because even if arrow keys technically work the selection keys won't
      const tagName = (event.target as HTMLElement).tagName.toLowerCase();
      if (!disabled && tagName !== 'input') {
        let action;
        if (items) {
          if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
            action = selectOnFocus ? selectPrevious : focusPrevious;
          } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
            action = selectOnFocus ? selectNext : focusNext;
          } else if (event.key === 'Home') {
            action = selectOnFocus ? selectFirst : focusFirst;
          } else if (event.key === 'End') {
            action = selectOnFocus ? selectLast : focusLast;
          } else if (event.key === 'Enter') {
            action = selectFocused;
          } else if (event.key === ' ') {
            action = toggleSelectedFocused;
          }

          /**
           * Pass a `used` flag for all forwarded keydown events where
           * this component has already handled the event so the callback
           * can decide if it should re-use the keydown event or ignore it.
           */
          if (action) {
            event.preventDefault();
            event.stopPropagation();

            onKeyDown && onKeyDown(event, { used: true });
            return action({ event });
          }
        }
      }

      onKeyDown && onKeyDown(event);
      return undefined;
    },
    [
      disabled,
      focusFirst,
      focusLast,
      focusNext,
      focusPrevious,
      items,
      onKeyDown,
      parentRef,
      selectFirst,
      selectFocused,
      selectLast,
      selectNext,
      selectOnFocus,
      selectPrevious,
      toggleSelectedFocused,
    ],
  );

  useElementEventListener({ eventType: 'keydown', callback: handleKeyDown as EventListener, capture: true });

  return {
    focusedIndex,
    handleItemClick,
    isSelected,
    ref,
    selectedIds,
    setFocused,
    selectId,
    unselectId,
  };
}
