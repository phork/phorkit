import { cx } from '@emotion/css';
import React, { useMemo, useRef } from 'react';
import { MergeElementProps, ThemeProps } from '../../types';
import { useAccessibility } from '../../context';
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
  /** allowReselect is used by DropdownWithTags so an item can be added, removed and re-added */
  allowReselect?: boolean;
  className?: string;
  containerRef: React.RefObject<HTMLDivElement>;
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
  /** mimicSelectOnFocus is required by DropdownWithTags so keyboard navigation doesn't keep selecting items but it looks like a regular dropdown */
  mimicSelectOnFocus?: boolean;
  onListBlur: InteractiveListProps['onBlur'];
  onListFocus: InteractiveListProps['onFocus'];
  onListKeyDown: InteractiveListProps['onKeyDown'];
  onSelect: InteractiveListProps['onSelect'];
  onUnselect: () => void;
  options: DropdownOption[];
  state: Pick<DropdownState, 'clearFocus' | 'input' | 'listFocus' | 'listVisible' | 'selected'>;
}

export type DropdownContentProps = MergeElementProps<'div', LocalDropdownContentProps>;

function DropdownContentBase(
  {
    allowReselect,
    className,
    containerRef,
    contrast,
    disabledIds,
    emptyNotification,
    inputVariant,
    isDropdownVisible,
    isEmpty,
    layout = 'raised',
    listDefaults,
    listVariant,
    listSize,
    listColor,
    mimicSelectOnFocus,
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
  forwardedRef: React.ForwardedRef<HTMLUListElement>,
): React.ReactElement<HTMLDivElement> | null {
  const accessible = useAccessibility();
  const ref = useRef<HTMLDivElement>(null!);

  const items = useMemo(
    () => options?.map(({ selectedLabel, ...option }) => ({ ...option, disabled: disabledIds?.includes(option.id) })),
    [disabledIds, options],
  );

  return items ? (
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
      ref={ref}
      {...props}
    >
      <div className={cx(styles.dropdownOptions, isEmpty && styles['is-empty'])}>
        <InteractiveList
          allowReselect={allowReselect}
          color={listColor || listDefaults.color}
          containerRef={ref}
          contrast={contrast}
          disabled={!state.listVisible || state.clearFocus}
          hideFocusOutline
          initialSelected={state.selected ? state.selected.id : undefined}
          items={items}
          mimicSelectOnFocus={mimicSelectOnFocus}
          onBlur={onListBlur}
          onFocus={onListFocus}
          onKeyDown={onListKeyDown}
          onSelect={onSelect}
          onUnselect={onUnselect}
          ref={forwardedRef}
          selectOnFocus={!mimicSelectOnFocus}
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
