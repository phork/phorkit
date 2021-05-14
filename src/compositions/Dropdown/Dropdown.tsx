import { cx } from '@emotion/css';
import debounce from 'lodash.debounce';
import React, { useCallback, useMemo, useEffect, useReducer, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { StateColor, ThemeProps } from '../../types';
import { useClickAndEscape } from '../../hooks/useClickAndEscape';
import { useSafeTimeout } from '../../hooks/useSafeTimeout';
import { useThemeId } from '../../hooks/useThemeId';
import { makeCombineRefs } from '../../utils/combineRefs';
import { SearchIcon } from '../../icons';
import { ArrowDownIcon } from '../../icons/ArrowDownIcon';
import { SpinnerIcon } from '../../icons/SpinnerIcon';
import { Textbox, TextboxProps } from '../../components/Form/Textbox/Textbox';
import { DropdownContent, DropdownContentProps } from './DropdownContent';
import { dropdownActions as ACTIONS } from './dropdownActions';
import { dropdownReducer as reducer } from './dropdownReducer';
import styles from './styles/Dropdown.module.css';
import { DropdownOption, DropdownInputVariant, DropdownLayout, DropdownListSize, DropdownListVariant } from './types';

export interface DropdownProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSelect' | 'onSubmit'>,
    Partial<
      Pick<
        DropdownContentProps,
        'allowReselect' | 'emptyNotification' | 'listVariant' | 'listSize' | 'listColor' | 'onItemFocus'
      >
    >,
    ThemeProps {
  arrowIconSize?: number;
  className?: string;
  disabled?: boolean;
  disabledIds?: Array<DropdownOption['id']>;
  dropdownContent: typeof DropdownContent;
  /** After the select events have been registered then reset the dropdown to empty */
  forgetSelection?: boolean;
  iconBefore?: TextboxProps['iconBefore'];
  iconAfter?: TextboxProps['iconAfter'];
  id?: string;
  initialSelected?: DropdownOption;
  inputRef?: React.Ref<HTMLInputElement>;
  inputVariant?: DropdownInputVariant;
  label?: string;
  layout?: DropdownLayout;
  onChange?: (input?: string) => void;
  onClear?: () => void;
  onClose?: () => void;
  onFilter?: (filter: string) => Promise<DropdownOption[]>;
  onOpen?: () => void;
  onSelect: (option?: DropdownOption) => void;
  onSubmit?: TextboxProps['onSubmit'];
  options: DropdownOption[];
  ref?: React.Ref<HTMLDivElement>;
  readOnlyValue?: React.ReactChild;
  transitional?: boolean;
  validity?: StateColor;
}

/** The dropdown is a controlled component */
function DropdownBase(
  {
    allowReselect,
    arrowIconSize = 8,
    className,
    contrast,
    disabled,
    disabledIds,
    dropdownContent: DropdownContent,
    emptyNotification,
    forgetSelection,
    iconAfter: initIconAfter,
    iconBefore: initIconBefore,
    id,
    initialSelected,
    inputRef: forwardedInputRef,
    inputVariant = 'underline',
    label,
    layout = 'raised',
    listVariant,
    listSize,
    listColor,
    onChange,
    onClear,
    onClose,
    onFilter,
    onItemFocus,
    onOpen,
    onSelect,
    onSubmit,
    options: initOptions,
    placeholder,
    readOnlyValue,
    themeId: initThemeId,
    unthemed,
    transitional,
    validity,
    ...props
  }: DropdownProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
): React.ReactElement<DropdownProps, 'div'> {
  const ref = useRef<HTMLDivElement>(null!);
  const listRef = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null!);

  const combineRefs = makeCombineRefs<HTMLDivElement>(ref, forwardedRef);
  const combineInputRefs = makeCombineRefs<HTMLInputElement>(inputRef, forwardedInputRef);

  const mouseDownRef = useRef<{
    isFocused?: boolean;
    isDropdownVisible?: boolean;
  }>({});

  const previous = useRef<{
    input?: string;
    isDropdownVisible?: boolean;
    selected?: DropdownOption;
    options?: DropdownOption[];
  }>({});

  const themeId = useThemeId(initThemeId);
  const [state, dispatch] = useReducer(reducer, {
    busy: false,
    clearFocus: false,
    id: id || uuid(),
    input: '',
    inputFocus: false,
    listFocus: false,
    listVisible: false,
    options: undefined,
    selected: initialSelected,
  });

  const listDefaults = useMemo(
    () =>
      ({
        raised: {
          color: 'primary',
          size: 'medium' as DropdownListSize,
          variant: 'unboxed' as DropdownListVariant,
        } as DropdownContentProps['listDefaults'],
        contained: {
          color: 'primary',
          size: 'medium' as DropdownListSize,
          variant: 'unboxed' as DropdownListVariant,
        } as DropdownContentProps['listDefaults'],
      }[layout]),
    [layout],
  );

  const options = useMemo(() => state.options || initOptions, [state.options, initOptions]);
  const isFocused = state.inputFocus || state.listFocus || state.clearFocus;
  const isDropdownVisible = isFocused && state.listVisible;
  const isEmpty = !options || !options.length;
  const isClearable = onFilter && !!state.input && (state.inputFocus || state.clearFocus || isDropdownVisible);

  const focusInput = () => inputRef.current?.focus();
  const focusList = () => listRef.current?.focus();

  const handleHideDropdown = useCallback(() => dispatch({ type: ACTIONS.HIDE_DROPDOWN }), []);
  const handleShowDropdown = useCallback(() => dispatch({ type: ACTIONS.SHOW_DROPDOWN }), []);
  const handleListBlur = useCallback(() => dispatch({ type: ACTIONS.UNSET_LIST_FOCUS }), []);
  const handleListFocus = useCallback(() => dispatch({ type: ACTIONS.SET_LIST_FOCUS }), []);
  const handleClearBlur = useCallback(() => dispatch({ type: ACTIONS.UNSET_CLEAR_FOCUS }), []);
  const handleClearFocus = useCallback(() => dispatch({ type: ACTIONS.SET_CLEAR_FOCUS }), []);
  const handleInputBlur = useCallback(() => dispatch({ type: ACTIONS.UNSET_INPUT_FOCUS }), []);
  const handleInputFocus = useCallback(() => dispatch({ type: ACTIONS.SET_INPUT_FOCUS }), []);
  const handleInputClick = useCallback(() => !onFilter && focusList(), [onFilter]);

  const handleBlur = handleHideDropdown;
  const handleFocus = handleShowDropdown;

  const { setSafeTimeout } = useSafeTimeout();
  const safeHandleInputFocus = () => setSafeTimeout(handleInputFocus);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFilter = useCallback(
    debounce(input => {
      onFilter?.(input).then(options => {
        dispatch({
          type: ACTIONS.SET_OPTIONS,
          options,
        });
      });
    }, 1000),
    [onFilter],
  );

  // define a cleanup event to cancel the filtering
  useEffect((): (() => void) => () => handleFilter.cancel(), [handleFilter]);

  // when the dropdown visibility changes ...
  useEffect(() => {
    if (isDropdownVisible !== previous.current.isDropdownVisible) {
      if (isDropdownVisible) {
        !onFilter && focusList();
        onOpen && onOpen();
      } else {
        onClose && onClose();
      }
    }
    previous.current.isDropdownVisible = !!isDropdownVisible;
  }, [isDropdownVisible, onFilter, onOpen, onClose]);

  // when the options change ...
  useEffect(() => {
    if (options !== previous.current.options) {
      handleShowDropdown();
    }
    previous.current.options = options;
  }, [handleShowDropdown, options]);

  // when the selected item changes ...
  useEffect(() => {
    if (
      state.selected !== previous.current.selected &&
      Object.prototype.hasOwnProperty.call(previous.current, 'selected')
    ) {
      onSelect && onSelect(state.selected);

      if (forgetSelection) {
        dispatch({ type: ACTIONS.UNSET_SELECTED });
      }
    }
    previous.current.selected = state.selected;
  }, [state.selected, onSelect, forgetSelection]);

  // when the search or filter input changes ...
  useEffect(() => {
    if (state.input !== previous.current.input && Object.prototype.hasOwnProperty.call(previous.current, 'input')) {
      if (state.input) {
        dispatch({ type: ACTIONS.SET_BUSY });
        handleFilter(state.input);
      }
      onChange && onChange(state.input);
    }
    previous.current.input = state.input;
  }, [state.input, handleFilter, onChange]);

  const handleSelect: DropdownContentProps['onSelect'] = (event, { index }) => {
    dispatch({
      type:
        event && (event.type === 'click' || (event.type === 'keydown' && 'key' in event && event.key === 'Enter'))
          ? ACTIONS.SET_SELECTED_AND_HIDE_DROPDOWN
          : ACTIONS.SET_SELECTED,
      selected: index !== undefined ? options[index] : undefined,
    });
  };

  const handleUnselect: DropdownContentProps['onUnselect'] = () => dispatch({ type: ACTIONS.UNSET_SELECTED });

  const handleInputChange = useCallback(
    (
      event: React.ChangeEvent | React.KeyboardEvent | React.MouseEvent | React.TouchEvent,
      value: string | number,
      { cleared }: { cleared?: boolean } = {},
    ) => {
      event.preventDefault();

      if (cleared) {
        focusInput();
        onClear && onClear();
      }

      if (value !== state.input) {
        if (value) {
          return dispatch({
            type: ACTIONS.SET_FILTER,
            input: value as string,
          });
        }
        return dispatch({ type: ACTIONS.CLEAR_FILTER });
      }
      return undefined;
    },
    [onClear, state.input],
  );

  /**
   * Because focus and blur events fire before the click events we must
   * capture the component state in the mousedown phase before these
   * other events interfere. The ensures that the click event will be
   * able to know what the state was when it was actually clicked.
   */
  const handleMouseDown = useCallback(() => {
    mouseDownRef.current = {
      isFocused,
      isDropdownVisible,
    };
  }, [isDropdownVisible, isFocused]);

  const handleClick = useCallback(() => {
    if (mouseDownRef.current.isDropdownVisible && !isClearable) {
      handleHideDropdown();
    }
  }, [handleHideDropdown, isClearable]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === ' ' && (event.target as HTMLDivElement).tagName.toLowerCase() !== 'input') {
      event.preventDefault();
      dispatch({
        type: ACTIONS.SHOW_DROPDOWN,
      });
    }
  }, []);

  // if the `used` flag is true the list provider has already used that keydown event
  const handleListKeyDown = useCallback(
    (event: KeyboardEvent, { used }: { used?: boolean } = {}) => {
      if (!used && !state.listVisible && event.key === 'Enter') {
        dispatch({
          type: ACTIONS.SHOW_DROPDOWN,
        });
      } else if (state.listFocus && state.listVisible && event.key === 'Enter') {
        dispatch({
          type: ACTIONS.HIDE_DROPDOWN,
        });
      }
    },
    [state.listFocus, state.listVisible],
  );

  useClickAndEscape({ ref, onBlur: handleBlur, onFocus: handleFocus, stopPropagation: isDropdownVisible });

  const showFilter = onFilter && (state.inputFocus || (isDropdownVisible && state.input));
  const inputValue = showFilter
    ? state.input
    : state.selected &&
      ((typeof state.selected.label === 'string' ? state.selected.label : undefined) ||
        (typeof state.selected.label === 'number' ? state.selected.label : undefined) ||
        state.selected.value);
  const selectedView = state.selected?.selectedLabel;
  const color = contrast ? 'contrast' : 'primary';

  // remove the dropdown arrows to make room for the clearable "x"
  const iconAfter = isClearable
    ? undefined
    : initIconAfter || (
        <ArrowDownIcon
          size={arrowIconSize}
          className={cx(styles.dropdownArrowIcon, isDropdownVisible && styles['dropdownArrowIcon--inverted'])}
        />
      );

  // when showing a search input add a search icon
  const iconBefore = showFilter ? <SearchIcon size={12} /> : initIconBefore;

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={cx(
        styles.dropdown,
        disabled && styles['is-disabled'],
        isClearable && styles['is-clearable'],
        isDropdownVisible && styles['is-visible'],
        themeId && !unthemed && styles[`dropdown--${themeId}`],
        color && !unthemed && styles[`dropdown--${color}`],
        className,
      )}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      ref={combineRefs}
      {...props}
    >
      <Textbox
        // make sure that a focus transfer from the icon to the input is registered
        alwaysTriggerFocus
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={isFocused}
        clearable={isClearable}
        className={styles.dropdownInput}
        contrast={contrast}
        iconAfter={(state.busy && state.listVisible && SpinnerIcon) || iconAfter}
        iconBefore={iconBefore}
        id={state.id}
        // the key is used to force an update on select
        key={initialSelected && initialSelected.id}
        label={label}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
        onClick={handleInputClick}
        onFocus={safeHandleInputFocus}
        onIconBlur={handleClearBlur}
        onIconFocus={handleClearFocus}
        onSubmit={onSubmit}
        placeholder={placeholder}
        readOnly={!onFilter}
        readOnlyValue={readOnlyValue || selectedView}
        ref={combineInputRefs}
        role={onFilter ? undefined : 'button'}
        silentReadOnly
        // don't allow this to be tabbed to if input is read only and focus is already in the component
        tabIndex={isFocused && !onFilter ? -1 : 0}
        themeId={themeId}
        transitional={transitional}
        transparent={layout === 'contained' && isDropdownVisible && ['underline', 'filled'].includes(inputVariant)}
        unthemed={unthemed}
        validity={validity}
        value={inputValue}
        variant={inputVariant}
      />

      <DropdownContent
        allowReselect={allowReselect}
        containerRef={ref}
        contrast={contrast}
        disabledIds={disabledIds}
        emptyNotification={emptyNotification}
        inputVariant={inputVariant}
        isDropdownVisible={isDropdownVisible}
        isEmpty={isEmpty}
        layout={layout}
        listDefaults={listDefaults}
        listVariant={listVariant}
        listSize={listSize}
        listColor={listColor}
        onItemFocus={onItemFocus}
        onListBlur={handleListBlur}
        onListFocus={handleListFocus}
        onListKeyDown={handleListKeyDown}
        onSelect={handleSelect}
        onUnselect={handleUnselect}
        options={options}
        ref={listRef}
        state={state}
        themeId={themeId}
        unthemed={unthemed}
      />
    </div>
  );
}

export const Dropdown = React.forwardRef(DropdownBase) as typeof DropdownBase;

DropdownBase.displayName = 'DropdownBase';
Dropdown.displayName = 'Dropdown';
