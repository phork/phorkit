import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { useElementEventListener } from '../../hooks/useElementEventListener';
import { generateInteractiveGroupActions, GeneratedInteractiveGroupActions } from './generateInteractiveGroupActions';
import { InteractiveGroupEventTypes } from './interactiveGroupActions';
import {
  interactiveGroupReducer as reducer,
  getInteractiveGroupInitialState as getInitialState,
} from './interactiveGroupReducer';
import {
  selectFocusedIndex,
  selectFocusedEvent,
  selectItems,
  selectTriggeredTime,
  selectSelectedEvent,
  selectSelectedTime,
  selectUnselectedEvent,
  selectTriggeredId,
  selectSelectedId,
} from './interactiveGroupSelector';
import { InteractiveGroupItemType } from './types';

export interface UseInteractiveGroupInterface {
  allowMultiSelect?: boolean;
  /* This will allow an already selected item to be re-triggered */
  allowReselect?: boolean;
  disableUnselect?: boolean;
  containerRef?: React.RefObject<HTMLElement>;
  /* This disables interaction across the whole group */
  disabled?: boolean;
  initialSelected?: string | string[];
  items: InteractiveGroupItemType[];
  onItemClick?: (event: React.MouseEvent | React.TouchEvent, id: string) => void;
  onItemFocus?: (event: InteractiveGroupEventTypes['event'] | undefined, props: { id: string; index: number }) => void;
  onKeyDown?: (event: KeyboardEvent, props?: { used?: boolean }) => void;
  onSelect?: (event: InteractiveGroupEventTypes['event'], props: { id?: string; index?: number }) => void;
  onUnselect?: (event: InteractiveGroupEventTypes['event'], props: { id?: string }) => void;
  selectOnFocus?: boolean;
  /** If this is set and an item contains a link, when the item is selected that link will be triggered */
  triggerLinks?: boolean;
}

export type UseInteractiveGroupResponse<E extends HTMLElement = HTMLDivElement, I extends HTMLElement = HTMLElement> = {
  focusedIndex?: number;
  handleItemClick: (event: React.MouseEvent<I> | React.TouchEvent<I>, id: string) => void;
  ref: React.Ref<E>;
  isSelected: (id: string) => boolean;
  selectedId?: string | string[];
  setFocused: (id: string, props: Parameters<GeneratedInteractiveGroupActions['setFocusedByIndex']>[1]) => void;
  setSelected: GeneratedInteractiveGroupActions['setSelected'];
  unsetSelected: GeneratedInteractiveGroupActions['unsetSelected'];
};

/**
 * - E is the type of the element that the returned ref gets attached to
 * - I is the type of item element
 * - C is the containerRef element type (optional)
 */
export function useInteractiveGroup<E extends HTMLElement = HTMLDivElement, I extends HTMLElement = HTMLElement>({
  allowMultiSelect,
  allowReselect,
  disableUnselect,
  containerRef,
  disabled,
  initialSelected,
  items: initialItems,
  onItemClick,
  onItemFocus,
  onKeyDown,
  onSelect,
  onUnselect,
  selectOnFocus,
  triggerLinks,
}: UseInteractiveGroupInterface): UseInteractiveGroupResponse<E, I> {
  const previousState = useRef<{
    focusedIndex?: number;
    triggeredTime?: number;
    selectedTime?: number;
    selectedId?: string | string[];
  }>({});
  const ref = useRef<E>(null!);
  const [state, dispatch] = useReducer(reducer, { initialItems, initialSelected }, getInitialState);

  const {
    setItems,
    setFocusedByIndex,
    setSelected,
    unsetSelected,
    toggleSelected,
    selectFocused,
    toggleSelectedFocused,
    selectPrevious,
    focusPrevious,
    selectNext,
    focusNext,
    selectFirst,
    focusFirst,
    selectLast,
    focusLast,
  } = useMemo(() => generateInteractiveGroupActions(dispatch, disableUnselect, allowMultiSelect, allowReselect), [
    dispatch,
    disableUnselect,
    allowMultiSelect,
    allowReselect,
  ]);

  const items = selectItems(state);
  const focusedEvent = selectFocusedEvent(state);
  const focusedIndex = selectFocusedIndex(state);
  const selectedEvent = selectSelectedEvent(state);
  const selectedId = selectSelectedId(state);
  const selectedTime = selectSelectedTime(state);
  const triggeredId = selectTriggeredId(state);
  const triggeredTime = selectTriggeredTime(state);
  const unselectedEvent = selectUnselectedEvent(state);

  const isSelected: UseInteractiveGroupResponse<E, I>['isSelected'] = id =>
    allowMultiSelect
      ? state.selectedId !== undefined && Array.isArray(state.selectedId) && state.selectedId.includes(id)
      : state.selectedId === id;

  // update the state if the items change
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems, setItems]);

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

  // call the trigger callback if the triggered item changes (use timestamp tracking here so trigger can fire multiple times)
  useEffect(() => {
    if (triggeredTime && triggeredTime !== previousState.current.triggeredTime) {
      const item = items.getItemById(triggeredId);
      item && item.triggerOnly && item.triggerOnly();
    }
    previousState.current.triggeredTime = triggeredTime;
  }, [items, triggeredTime, triggeredId]);

  // call the onSelect or onUnselect callback if the selected item changes
  useEffect(() => {
    if (
      (previousState.current.selectedId !== selectedId ||
        (allowReselect && previousState.current.selectedTime !== selectedTime)) &&
      Object.prototype.hasOwnProperty.call(previousState.current, 'selectedId')
    ) {
      const wasPreviouslySelected = (id: string): boolean => {
        if (previousState.current.selectedId) {
          if (Array.isArray(previousState.current.selectedId)) {
            return previousState.current.selectedId.includes(id);
          }
          return previousState.current.selectedId === id;
        }
        return false;
      };

      const isCurrentlySelected = (id: string): boolean => {
        if (selectedId) {
          if (Array.isArray(selectedId)) {
            return selectedId.includes(id);
          }
          return selectedId === id;
        }
        return false;
      };

      const handleSelectedId = (id: string | undefined, allowReselect?: boolean) => {
        if (id && onSelect && (allowReselect || !wasPreviouslySelected(id))) {
          onSelect(selectedEvent, {
            ...items.getItemById(id),
            id,
            index: items.getIndexById(id),
          });
        }
      };

      const handleUnselectedId = (id: string | undefined) => {
        if (id && onUnselect && !isCurrentlySelected(id)) {
          onUnselect(unselectedEvent, {
            id,
          });
        }
      };

      // trigger onUnselect callbacks for any former selections
      if (onUnselect) {
        if (Array.isArray(previousState.current.selectedId)) {
          previousState.current.selectedId.forEach(id => handleUnselectedId(id));
        } else {
          handleUnselectedId(previousState.current.selectedId);
        }
      }

      // trigger onSelect callbacks for any new selections
      if (onSelect) {
        if (Array.isArray(selectedId)) {
          selectedId.forEach(id => handleSelectedId(id));
        } else {
          handleSelectedId(selectedId);
        }
      }

      // trigger the onSelect callback for a re-select if not multi-select
      if (
        allowReselect &&
        previousState.current.selectedId === selectedId &&
        previousState.current.selectedTime !== selectedTime &&
        !Array.isArray(selectedId)
      ) {
        handleSelectedId(selectedId, true);
      }

      // manually trigger the link of <a> tags (if the target is the <a> tag don't trigger on click or Enter)
      // dispatch a MouseEvent so it doesn't interfere with the accessibility context
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

    previousState.current.selectedId = selectedId;
    selectedId && (previousState.current.selectedTime = selectedTime);
  }, [
    selectedId,
    selectedEvent,
    unselectedEvent,
    onSelect,
    items,
    onUnselect,
    selectedTime,
    allowReselect,
    triggerLinks,
  ]);

  const setFocused: UseInteractiveGroupResponse['setFocused'] = useCallback(
    (id, props) => setFocusedByIndex(items.getIndexById(id), props),
    [items, setFocusedByIndex],
  );

  const handleItemClick: UseInteractiveGroupResponse['handleItemClick'] = useCallback(
    (event, id) => {
      event.persist();
      !disabled && toggleSelected(id, { event });
      onItemClick && onItemClick(event, id);
    },
    [disabled, onItemClick, toggleSelected],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (disabled) return undefined;

      const isEventWithinContainer = (event: KeyboardEvent): boolean => {
        const container = (containerRef && containerRef.current) || ref.current;
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
            onKeyDown && onKeyDown(event, { used: true });
            return action({ event });
          }
        }
      }

      onKeyDown && onKeyDown(event);
      return undefined;
    },
    [
      containerRef,
      disabled,
      focusFirst,
      focusLast,
      focusNext,
      focusPrevious,
      items,
      onKeyDown,
      selectFirst,
      selectFocused,
      selectLast,
      selectNext,
      selectOnFocus,
      selectPrevious,
      toggleSelectedFocused,
    ],
  );

  useElementEventListener({ eventType: 'keydown', callback: handleKeyDown as EventListener, options: true });

  return {
    focusedIndex,
    handleItemClick,
    isSelected,
    ref,
    selectedId,
    setFocused,
    setSelected,
    unsetSelected,
  };
}
