import { cx } from '@emotion/css';
import React, { useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { MergeElementProps, ThemeProps } from '../../types';
import { useAccessibility } from '../../context';
import { InteractiveGroupItemType } from '../../components';
import { generateInteractiveGroupActions } from '../../components/InteractiveGroup/generateInteractiveGroupActions';
import {
  UncontrolledInteractiveList,
  UncontrolledInteractiveListProps,
} from '../InteractiveList/UncontrolledInteractiveList';
import { DropdownEmpty, DropdownEmptyProps } from './DropdownEmpty';
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
  disabled?: boolean;
  disabledIds?: Array<DropdownOption['id']>;
  emptyNotification?: DropdownEmptyProps['children'];
  filter?: string;
  focused?: boolean;
  hideNoContent?: boolean;
  /** The empty dropdown notification should be inline when using withNotification */
  inlineDropdownEmpty?: boolean;
  inputVariant?: DropdownInputVariant;
  isDropdownVisible?: boolean;
  isEmpty?: boolean;
  layout: DropdownLayout;
  listColor?: DropdownListColor;
  listSize?: DropdownListSize;
  listVariant?: DropdownListVariant;
  maxSelect?: number;
  minSelect?: number;
  onItemFocus: UncontrolledInteractiveListProps['onItemFocus'];
  onListBlur: React.FocusEventHandler<HTMLUListElement>;
  onListFocus: React.FocusEventHandler<HTMLUListElement>;
  onListKeyDown: UncontrolledInteractiveListProps['onKeyDown'];
  onSelect: UncontrolledInteractiveListProps['onSelect'];
  onSelectionChange: UncontrolledInteractiveListProps['onSelectionChange'];
  onUnselect: UncontrolledInteractiveListProps['onUnselect'];
  options?: DropdownOption[];
  reducer: UncontrolledInteractiveListProps['reducer'];
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
    contrast,
    disabled,
    disabledIds,
    emptyNotification,
    filter,
    focused,
    hideNoContent,
    inlineDropdownEmpty,
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
    onSelectionChange,
    onUnselect,
    options,
    reducer,
    themeId,
    unthemed,
    ...props
  }: DropdownContentProps,
  forwardedRef: React.ForwardedRef<DropdownContentHandles>,
): React.ReactElement<HTMLDivElement> | null {
  const [selectedState, selectedDispatch] = reducer;

  const { setItems, focusSelected } = useMemo(
    () => generateInteractiveGroupActions(selectedDispatch, minSelect, maxSelect, false),
    [selectedDispatch, minSelect, maxSelect],
  );

  const accessible = useAccessibility();
  const containerRef = useRef<HTMLDivElement>(null!);
  const listRef = useRef<HTMLUListElement>(null!);

  const previous = useRef<{
    isDropdownVisible?: boolean;
    items?: InteractiveGroupItemType<string>[];
  }>({});

  // the parent component can call forwardedRef.current.container and forwardedRef.current.list
  useImperativeHandle(forwardedRef, () => ({
    get container(): HTMLDivElement {
      return containerRef.current;
    },
    get list(): HTMLUListElement {
      return listRef.current;
    },
  }));

  /**
   * Remove the selected label from the items because the
   * interactive list doesn't need it, and add a disabled
   * and highlighted flag.
   */
  const items = useMemo(
    () =>
      options?.map(({ selectedLabel, ...option }) => {
        const isSelected = selectedState.selectedIds?.includes(option.id);
        return {
          ...option,
          disabled: disabledIds?.includes(option.id),
          highlighted: isSelected,
        };
      }) || [],
    [options, disabledIds, selectedState.selectedIds],
  );

  // if the items change then update the items
  useEffect(() => {
    setItems(items);
  }, [items, setItems]);

  // if the dropdown changes visibility or the item length changes then focus the selected item
  useEffect(() => {
    if (
      (isDropdownVisible && !previous.current.isDropdownVisible) ||
      selectedState.items.getAll().length !== previous.current.items?.length
    ) {
      focusSelected();

      previous.current.isDropdownVisible = !!isDropdownVisible;
      previous.current.items = selectedState.items.getAll();
    }
  }, [focusSelected, isDropdownVisible, selectedState.items]);

  const listDefaults = getListDefaults(layout);
  const variant = listVariant || listDefaults.variant;
  const showNoContent = !hideNoContent && items.length === 0;

  return items ? (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      className={cx(
        styles.dropdownOptionsContainer,
        layout && styles[`dropdownOptionsContainer--${layout}`],
        inlineDropdownEmpty && showNoContent && styles['dropdownOptionsContainer--inline'],
        inputVariant && styles[`dropdownOptionsContainer--${inputVariant}`],
        accessible && styles['is-accessible'],
        focused && styles['is-focused'],
        isDropdownVisible && styles['is-visible'],
        className,
      )}
      ref={containerRef}
      {...props}
    >
      <div className={cx(styles.dropdownOptions, isEmpty && styles['is-empty'])}>
        <UncontrolledInteractiveList
          allowReselect={allowReselect}
          color={listColor || listDefaults.color}
          contrast={contrast}
          disabled={disabled}
          focused={focused === true ? true : undefined}
          hideFocusOutline
          // mimicSelectOnFocus is necessary so that keyboard navigation doesn't keep selecting items but it looks like a regular dropdown
          mimicSelectOnFocus
          maxSelect={maxSelect}
          minSelect={minSelect}
          onItemFocus={onItemFocus}
          onKeyDown={onListKeyDown}
          onBlur={onListBlur}
          onFocus={onListFocus}
          onSelect={onSelect}
          onSelectionChange={onSelectionChange}
          onUnselect={onUnselect}
          parentRef={containerRef}
          reducer={reducer}
          rounded={layout === 'contained' && inputVariant && ['underline', 'filled'].includes(inputVariant)}
          ref={listRef}
          size={listSize || listDefaults.size}
          tabIndex={isDropdownVisible ? 0 : -1}
          unthemed={unthemed}
          variant={variant}
        >
          {!hideNoContent && (
            <DropdownEmpty contrast={contrast} themeId={themeId} filter={filter} layout={layout}>
              {emptyNotification}
            </DropdownEmpty>
          )}
        </UncontrolledInteractiveList>
      </div>
    </div>
  ) : null;
}

export const DropdownContent = React.forwardRef(DropdownContentBase);

DropdownContentBase.displayName = 'DropdownContentBase';
DropdownContent.displayName = 'DropdownContent';
