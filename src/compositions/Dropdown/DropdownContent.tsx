import { cx } from '@emotion/css';
import React, { useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { MergeElementProps, ThemeProps } from '../../types';
import { useAccessibility } from '../../context';
import { useDeepFocus } from '../../hooks/useDeepFocus';
import { generateInteractiveGroupActions } from '../../components/InteractiveGroup/generateInteractiveGroupActions';
import { UnmanagedInteractiveList, UnmanagedInteractiveListProps } from '../InteractiveList/UnmanagedInteractiveList';
import { DropdownEmpty, DropdownEmptyProps } from './DropdownEmpty';
import { DropdownState } from './dropdownReducer';
import styles from './styles/Dropdown.module.css';
import {
  DropdownInputVariant,
  DropdownLayout,
  DropdownListColor,
  DropdownListSize,
  DropdownListVariant,
  DropdownOption,
} from './types';
import { getListDefaults } from './utils';

export interface LocalDropdownContentProps extends ThemeProps {
  /** This is used by DropdownWithTags so an item can be added, removed and re-added */
  allowReselect?: boolean;
  className?: string;
  disabledIds?: Array<DropdownOption['id']>;
  dropdownState: Pick<DropdownState, 'clearFocus' | 'input' | 'listFocus' | 'listVisible'>;
  emptyNotification?: DropdownEmptyProps['children'];
  inputVariant?: DropdownInputVariant;
  isDropdownVisible?: boolean;
  isEmpty?: boolean;
  layout: DropdownLayout;
  listColor?: DropdownListColor;
  listSize?: DropdownListSize;
  listVariant?: DropdownListVariant;
  maxSelect?: number;
  minSelect?: number;
  onItemFocus: UnmanagedInteractiveListProps['onItemFocus'];
  onListBlur: React.FocusEventHandler<HTMLDivElement>;
  onListFocus: React.FocusEventHandler<HTMLDivElement>;
  onListKeyDown: UnmanagedInteractiveListProps['onKeyDown'];
  onSelect: UnmanagedInteractiveListProps['onSelect'];
  onUnselect: UnmanagedInteractiveListProps['onUnselect'];
  options?: DropdownOption[];
  parentRef: React.RefObject<HTMLDivElement>;
  reducer: UnmanagedInteractiveListProps['reducer'];
}

export type DropdownContentProps = MergeElementProps<'div', LocalDropdownContentProps>;

export interface DropdownContentHandles {
  container: HTMLDivElement;
  list: HTMLUListElement;
}

function DropdownContentBase(
  {
    allowReselect,
    className,
    parentRef,
    contrast,
    disabledIds,
    emptyNotification,
    inputVariant,
    isDropdownVisible,
    isEmpty,
    layout = 'raised',
    listColor,
    listSize,
    listVariant,
    maxSelect = 1,
    minSelect = 0,
    onItemFocus,
    onListBlur,
    onListFocus,
    onListKeyDown,
    onSelect,
    onUnselect,
    options,
    reducer,
    dropdownState,
    themeId,
    unthemed,
    ...props
  }: DropdownContentProps,
  forwardedRef: React.ForwardedRef<DropdownContentHandles>,
): React.ReactElement<HTMLDivElement> | null {
  const [selectedState, selectedDispatch] = reducer;

  const { setItems, focusFirst } = useMemo(
    () => generateInteractiveGroupActions(selectedDispatch, minSelect, maxSelect, false),
    [selectedDispatch, minSelect, maxSelect],
  );

  const accessible = useAccessibility();
  const containerRef = useRef<HTMLDivElement>(null!);
  const listRef = useRef<HTMLUListElement>(null!);

  // the parent component can call forwardedRef.current.container and forwardedRef.current.list
  useImperativeHandle(forwardedRef, () => ({
    get container(): HTMLDivElement {
      return containerRef.current;
    },
    get list(): HTMLUListElement {
      return listRef.current;
    },
  }));

  const { focused, handleBlur, handleFocus } = useDeepFocus<HTMLDivElement>(containerRef, {
    onBlur: onListBlur ? event => onListBlur(event) : undefined,
    onFocus: onListFocus ? event => onListFocus(event) : undefined,
  });

  /**
   * Remove the selected label from the items because the
   * interactive list doesn't need it, and add a disabled
   * and highlighted flag.
   */
  const items = useMemo(
    () =>
      options?.map(({ selectedLabel, ...option }) => ({
        ...option,
        disabled: disabledIds?.includes(option.id),
        highlighted: selectedState.selectedIds?.includes(option.id),
      })) || [],
    [options, disabledIds, selectedState.selectedIds],
  );

  const numItems = items.length;

  // if the items change then update the interactive list state
  useEffect(() => {
    if (items.length !== numItems) {
      focusFirst();
    }
    setItems(items);
  }, [items, selectedDispatch, focusFirst, setItems, numItems]);

  const listDefaults = getListDefaults(layout);

  return items ? (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      className={cx(
        styles.dropdownOptionsContainer,
        layout && styles[`dropdownOptionsContainer--${layout}`],
        inputVariant && styles[`dropdownOptionsContainer--${inputVariant}`],
        accessible && styles['is-accessible'],
        dropdownState.listFocus && styles['is-focused'],
        isDropdownVisible && styles['is-visible'],
        className,
      )}
      onBlur={handleBlur}
      onFocus={handleFocus}
      ref={containerRef}
      {...props}
    >
      <div className={cx(styles.dropdownOptions, isEmpty && styles['is-empty'])}>
        <UnmanagedInteractiveList
          allowReselect={allowReselect}
          color={listColor || listDefaults.color}
          contrast={contrast}
          disabled={!dropdownState.listVisible || dropdownState.clearFocus}
          focused={focused}
          hideFocusOutline
          // mimicSelectOnFocus is necessary so that keyboard navigation doesn't keep selecting items but it looks like a regular dropdown
          mimicSelectOnFocus
          maxSelect={maxSelect}
          minSelect={minSelect}
          onItemFocus={onItemFocus}
          onKeyDown={onListKeyDown}
          onSelect={onSelect}
          onUnselect={onUnselect}
          parentRef={containerRef}
          reducer={reducer}
          ref={listRef}
          size={listSize || listDefaults.size}
          tabIndex={isDropdownVisible ? 0 : -1}
          unthemed={unthemed}
          variant={listVariant || listDefaults.variant}
        >
          <DropdownEmpty contrast={contrast} themeId={themeId} filter={dropdownState.input} layout={layout}>
            {emptyNotification}
          </DropdownEmpty>
        </UnmanagedInteractiveList>
      </div>
    </div>
  ) : null;
}

export const DropdownContent = React.forwardRef(DropdownContentBase);

DropdownContentBase.displayName = 'DropdownContentBase';
DropdownContent.displayName = 'DropdownContent';
