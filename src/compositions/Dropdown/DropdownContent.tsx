import { cx } from '@emotion/css';
import React, { useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { MergeElementProps, ThemeProps } from '../../types';
import { useAccessibility } from '../../context/Accessibility/useAccessibility';
import { InteractiveGroupItemType, generateInteractiveGroupActions } from '../../components/InteractiveGroup';
import { ScrollSyncVirtualized, ScrollSync } from '../../components/ScrollSync';
import { PartialInteractiveList, PartialInteractiveListProps } from '../InteractiveList/PartialInteractiveList';
import styles from './styles/Dropdown.module.css';
import { DropdownEmpty, DropdownEmptyProps } from './DropdownEmpty';
import {
  DropdownInputVariant,
  DropdownLayout,
  DropdownListColor,
  DropdownListSize,
  DropdownListVariant,
  DropdownOption,
  DropdownSize,
} from './types';

export type LocalDropdownContentProps = ThemeProps & {
  /** This is used by DropdownWithTags so an item can be added, removed and re-added */
  allowReselect?: boolean;
  className?: string;
  disabled?: boolean;
  disabledIds?: readonly string[];
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
  onItemFocus: PartialInteractiveListProps['onItemFocus'];
  onListBlur: React.FocusEventHandler<HTMLUListElement>;
  onListFocus: React.FocusEventHandler<HTMLUListElement>;
  onListKeyDown: PartialInteractiveListProps['onKeyDown'];
  onSelect: PartialInteractiveListProps['onSelect'];
  onSelectionChange: PartialInteractiveListProps['onSelectionChange'];
  onUnselect: PartialInteractiveListProps['onUnselect'];
  options?: readonly DropdownOption[];
  reducer: PartialInteractiveListProps['reducer'];
  size: DropdownSize;
};

export type DropdownContentProps = MergeElementProps<'div', LocalDropdownContentProps>;

export type DropdownContentHandles = {
  container: HTMLDivElement;
  list: HTMLUListElement;
};

const onClickPreventDefault: React.MouseEventHandler = event => event.preventDefault();

export function DropdownContentBase(
  {
    allowReselect = false,
    className,
    contrast = false,
    disabled = false,
    disabledIds,
    emptyNotification,
    filter,
    focused = false,
    hideNoContent = false,
    inlineDropdownEmpty = false,
    inputVariant,
    isDropdownVisible = false,
    isEmpty = false,
    layout = 'raised',
    listColor = 'primary',
    listSize = 'medium',
    listVariant = 'unboxed',
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
    size,
    themeId,
    unthemed = false,
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
    items?: readonly InteractiveGroupItemType<string>[];
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
   * Remove the selected label from the options because the
   * interactive list doesn't need it, and add a disabled
   * and highlighted flag and then save these items in the
   * reducer state.
   */
  useEffect(() => {
    setItems(
      options?.map(({ selectedLabel, ...option }) => {
        const isSelected = selectedState.selectedIds?.includes(option.id);
        return {
          ...option,
          disabled: disabledIds?.includes(option.id),
          highlighted: isSelected,
        };
      }) || [],
    );
  }, [options, disabledIds, selectedState.selectedIds, setItems]);

  const items = selectedState.items.getAll();

  // if the dropdown changes visibility or the item length changes then focus the selected item
  useEffect(() => {
    if ((isDropdownVisible && !previous.current.isDropdownVisible) || items.length !== previous.current.items?.length) {
      focusSelected();

      previous.current.isDropdownVisible = !!isDropdownVisible;
      previous.current.items = items;
    }
  }, [focusSelected, isDropdownVisible, items]);

  const showNoContent = !hideNoContent && items.length === 0;

  return items ? (
    <ScrollSync vertical>
      {generateRef => (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
        <div
          aria-hidden={!isDropdownVisible}
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
          <div className={cx(styles.dropdownOptions, isEmpty && styles['is-empty'])} ref={generateRef('list')}>
            <PartialInteractiveList
              hideFocusOutline
              // mimicSelectOnFocus is necessary so that keyboard navigation doesn't keep selecting items but it looks like a regular dropdown
              mimicSelectOnFocus
              allowReselect={allowReselect}
              color={listColor}
              contrast={contrast}
              disabled={disabled}
              focused={focused === true ? true : undefined}
              maxSelect={maxSelect}
              minSelect={minSelect}
              onBlur={onListBlur}
              onFocus={onListFocus}
              onItemFocus={onItemFocus}
              onKeyDown={onListKeyDown}
              onSelect={onSelect}
              onSelectionChange={onSelectionChange}
              onUnselect={onUnselect}
              parentRef={containerRef}
              reducer={reducer}
              ref={listRef}
              rounded={layout === 'contained' && inputVariant && ['underline', 'filled'].includes(inputVariant)}
              // this MUST use auto for the scroll behavior so that it plays nicely with scroll sync
              scrollBehavior="auto"
              size={listSize}
              tabIndex={isDropdownVisible ? 0 : -1}
              unthemed={unthemed}
              variant={listVariant}
            >
              {!hideNoContent && (
                <DropdownEmpty contrast={contrast} filter={filter} layout={layout} themeId={themeId}>
                  {emptyNotification}
                </DropdownEmpty>
              )}
            </PartialInteractiveList>
          </div>
          <ScrollSyncVirtualized<HTMLUListElement>
            className={cx(
              styles.dropdownOptionsScrollSync,
              layout && styles[`dropdownOptionsScrollSync--${layout}`],
              inputVariant && styles[`dropdownOptionsScrollSync--${inputVariant}`],
            )}
            onClick={onClickPreventDefault}
            orientation="vertical"
            ref={generateRef('scrollbar')}
            size="medium"
            syncRef={listRef}
            themeId={themeId}
          />
        </div>
      )}
    </ScrollSync>
  ) : null;
}

/**
 * This renders an interactive list of items for the
 * dropdown, or if no items are available it renders
 * the empty dropdown notification.
 *
 * This uses the `InteractiveGroup` and `InteractiveList`
 * components.
 */
export const DropdownContent = React.forwardRef(DropdownContentBase);

DropdownContentBase.displayName = 'DropdownContentBase';
DropdownContent.displayName = 'DropdownContent';
