import { cx } from '@emotion/css';
import React, { useImperativeHandle, useMemo, useRef } from 'react';
import { MergeElementProps, ThemeProps } from '../../types';
import { useAccessibility } from '../../context';
import { useDeepFocus } from '../../hooks/useDeepFocus';
import { InteractiveList, InteractiveListProps } from '../InteractiveList/InteractiveList';
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

export interface LocalDropdownContentProps extends ThemeProps {
  /** This is used by DropdownWithTags so an item can be added, removed and re-added */
  allowReselect?: boolean;
  className?: string;
  disabledIds?: Array<DropdownOption['id']>;
  emptyNotification?: DropdownEmptyProps['children'];
  inputVariant?: DropdownInputVariant;
  isDropdownVisible?: boolean;
  isEmpty?: boolean;
  layout: DropdownLayout;
  listColor?: DropdownListColor;
  listDefaults: { variant: DropdownListVariant; size: DropdownListSize; color: DropdownListColor };
  listSize?: DropdownListSize;
  listVariant?: DropdownListVariant;
  onItemFocus: InteractiveListProps['onItemFocus'];
  onListBlur: React.FocusEventHandler<HTMLDivElement>;
  onListFocus: React.FocusEventHandler<HTMLDivElement>;
  onListKeyDown: InteractiveListProps['onKeyDown'];
  onSelect: InteractiveListProps['onSelect'];
  onUnselect: () => void;
  options: DropdownOption[];
  parentRef: React.RefObject<HTMLDivElement>;
  state: Pick<DropdownState, 'clearFocus' | 'input' | 'listFocus' | 'listVisible' | 'selected'>;
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
    listDefaults,
    listSize,
    listVariant,
    onItemFocus,
    onListBlur,
    onListFocus,
    onListKeyDown,
    onSelect,
    onUnselect,
    options,
    state,
    themeId,
    unthemed,
    ...props
  }: DropdownContentProps,
  forwardedRef: React.ForwardedRef<DropdownContentHandles>,
): React.ReactElement<HTMLDivElement> | null {
  const accessible = useAccessibility();

  const containerRef = useRef<HTMLDivElement>(null!);
  const listRef = useRef<HTMLUListElement>(null!);

  const { focused, handleBlur, handleFocus } = useDeepFocus<HTMLDivElement>(containerRef, {
    onBlur: onListBlur ? event => onListBlur(event) : undefined,
    onFocus: onListFocus ? event => onListFocus(event) : undefined,
  });

  useImperativeHandle(forwardedRef, () => ({
    get container(): HTMLDivElement {
      return containerRef.current;
    },
    get list(): HTMLUListElement {
      return listRef.current;
    },
  }));

  const items = useMemo(
    () => options?.map(({ selectedLabel, ...option }) => ({ ...option, disabled: disabledIds?.includes(option.id) })),
    [disabledIds, options],
  );

  return items ? (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      className={cx(
        styles.dropdownOptionsContainer,
        layout && styles[`dropdownOptionsContainer--${layout}`],
        inputVariant && styles[`dropdownOptionsContainer--${inputVariant}`],
        accessible && styles['is-accessible'],
        state.listFocus && styles['is-focused'],
        isDropdownVisible && styles['is-visible'],
        className,
      )}
      onBlur={handleBlur}
      onFocus={handleFocus}
      ref={containerRef}
      {...props}
    >
      <div className={cx(styles.dropdownOptions, isEmpty && styles['is-empty'])}>
        <InteractiveList
          allowReselect={allowReselect}
          // mimicSelectOnFocus is necessary so that keyboard navigation doesn't keep selecting items but it looks like a regular dropdown
          color={listColor || listDefaults.color}
          contrast={contrast}
          disabled={!state.listVisible || state.clearFocus}
          focused={focused}
          hideFocusOutline
          initialSelected={state.selected ? state.selected.id : undefined}
          items={items}
          mimicSelectOnFocus
          onItemFocus={onItemFocus}
          onKeyDown={onListKeyDown}
          onSelect={onSelect}
          onUnselect={onUnselect}
          parentRef={containerRef}
          ref={listRef}
          size={listSize || listDefaults.size}
          tabIndex={isDropdownVisible ? 0 : -1}
          unthemed={unthemed}
          variant={listVariant || listDefaults.variant}
        >
          <DropdownEmpty contrast={contrast} themeId={themeId} filter={state.input} layout={layout}>
            {emptyNotification}
          </DropdownEmpty>
        </InteractiveList>
      </div>
    </div>
  ) : null;
}

export const DropdownContent = React.forwardRef(DropdownContentBase);

DropdownContentBase.displayName = 'DropdownContentBase';
DropdownContent.displayName = 'DropdownContent';
