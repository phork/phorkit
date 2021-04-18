import { cx } from '@emotion/css';
import React, { useMemo, useRef } from 'react';
import { MergeElementProps, ThemeProps } from '../../types';
import {
  DropdownOption,
  DropdownListOutline,
  DropdownListSize,
  DropdownListVariant,
  DropdownLayout,
  DropdownInputVariant,
} from './types';
import { useAccessibility } from '../../context';
import { RenderFromPropElement } from '../../utils';
import { InteractiveList, InteractiveListProps } from '../InteractiveList/InteractiveList';
import { DropdownEmpty } from './DropdownEmpty';
import { DropdownState } from './dropdownReducer';
import styles from './styles/Dropdown.module.css';

export interface LocalDropdownContentProps extends ThemeProps {
  /** allowReselect is used by DropdownWithTags so an item can be added, removed and re-added */
  allowReselect?: boolean;
  className?: string;
  containerRef: React.RefObject<HTMLDivElement>;
  disabledIds?: Array<DropdownOption['id']>;
  emptyNotification?: RenderFromPropElement;
  inputVariant?: DropdownInputVariant;
  isDropdownVisible?: boolean;
  isEmpty?: boolean;
  layout: DropdownLayout;
  listDefaults: { outline: DropdownListOutline; size: DropdownListSize; variant: DropdownListVariant };
  listOutline?: DropdownListOutline;
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
    listOutline,
    listSize,
    listVariant,
    mimicSelectOnFocus,
    onListBlur,
    onListFocus,
    onListKeyDown,
    onSelect,
    onUnselect,
    options,
    state,
    themeId,
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
          containerRef={ref}
          contrast={contrast}
          disabled={!state.listVisible || state.clearFocus}
          items={items}
          onBlur={onListBlur}
          initialSelected={state.selected ? state.selected.id : undefined}
          mimicSelectOnFocus={mimicSelectOnFocus}
          onFocus={onListFocus}
          onKeyDown={onListKeyDown}
          onSelect={onSelect}
          onUnselect={onUnselect}
          ref={forwardedRef}
          outline={listOutline || listDefaults.outline}
          selectOnFocus={!mimicSelectOnFocus}
          size={listSize || listDefaults.size}
          tabIndex={isDropdownVisible ? 0 : -1}
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
