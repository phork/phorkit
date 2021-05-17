import { cx } from '@emotion/css';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { StateColor, ThemeProps } from '../../types';
import { useClickAndEscape } from '../../hooks/useClickAndEscape';
import { useSafeTimeout } from '../../hooks/useSafeTimeout';
import { useThemeId } from '../../hooks/useThemeId';
import { useTranslations } from '../../hooks/useTranslations';
import { makeCombineRefs } from '../../utils/combineRefs';
import { SearchIcon } from '../../icons';
import { ArrowDownIcon } from '../../icons/ArrowDownIcon';
import { SpinnerIcon } from '../../icons/SpinnerIcon';
import { Textbox, TextboxProps } from '../../components/Form/Textbox/Textbox';
import { UncontrolledInteractiveListProps } from '../InteractiveList';
import { DropdownContent, DropdownContentProps, DropdownContentHandles } from './DropdownContent';
import { dropdownActions as ACTIONS } from './dropdownActions';
import { dropdownReducer } from './dropdownReducer';
import styles from './styles/Dropdown.module.css';
import { DropdownOption, DropdownInputVariant, DropdownLayout, DropdownTranslations } from './types';
import { getDropdownSelectedView } from './utils';

export const dropdownTranslations: DropdownTranslations = {
  numSelectedSingular: '{0} item selected',
  numSelectedPlural: '{0} items selected',
};

export interface DropdownProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onInputChange' | 'onSelect' | 'onSubmit'>,
    Partial<
      Pick<
        DropdownContentProps,
        | 'allowReselect'
        | 'emptyNotification'
        | 'listVariant'
        | 'listSize'
        | 'listColor'
        | 'maxSelect'
        | 'minSelect'
        | 'onItemFocus'
      >
    >,
    ThemeProps {
  arrowIconSize?: number;
  className?: string;
  disabled?: boolean;
  disabledIds?: Array<DropdownOption['id']>;
  getFilteredOptions?: (filter: string) => Promise<DropdownOption[]>;
  iconAfter?: TextboxProps['iconAfter'];
  iconBefore?: TextboxProps['iconBefore'];
  id?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  inputVariant?: DropdownInputVariant;
  label?: string;
  layout?: DropdownLayout;
  onClear?: () => void;
  onClose?: () => void;
  onInputChange?: (input?: string) => void;
  onOpen?: () => void;
  onSelect?: (id: string, selectedIds: string[]) => void;
  /** This fires when items are selected or unselected */
  onSelectionChange?: (selectedIds: string[] | undefined) => void;
  onSubmit?: TextboxProps['onSubmit'];
  onUnselect?: (id: string, selectedIds: string[] | undefined) => void;
  options: DropdownOption[];
  readOnlyValue?: React.ReactChild;
  reducer: UncontrolledInteractiveListProps['reducer'];
  ref?: React.Ref<HTMLDivElement>;
  transitional?: boolean;
  translations?: DropdownTranslations;
  validity?: StateColor;
}

/** The dropdown is an uncontrolled component */
function DropdownBase(
  {
    allowReselect,
    arrowIconSize = 8,
    className,
    contrast,
    disabled,
    disabledIds,
    emptyNotification,
    getFilteredOptions,
    iconAfter: initIconAfter,
    iconBefore: initIconBefore,
    id,
    inputRef: forwardedInputRef,
    inputVariant = 'underline',
    label,
    layout = 'raised',
    listColor,
    listSize,
    listVariant,
    maxSelect = 1,
    minSelect = 0,
    onClear,
    onClose,
    onInputChange,
    onItemFocus,
    onOpen,
    onSelect,
    onSelectionChange,
    onUnselect,
    onSubmit,
    options,
    placeholder,
    readOnlyValue: initReadOnlyValue,
    reducer,
    themeId: initThemeId,
    unthemed,
    transitional,
    translations: customTranslations,
    validity,
    ...props
  }: DropdownProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
): React.ReactElement<DropdownProps, 'div'> {
  const [selectedState] = reducer;
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [filteredOptions, setFilteredOptions] = useState<DropdownOption[] | undefined>();

  const ref = useRef<HTMLDivElement>(null!);
  const contentRef = useRef<DropdownContentHandles>(null!);
  const inputRef = useRef<HTMLInputElement>(null!);

  const combineRefs = makeCombineRefs<HTMLDivElement>(ref, forwardedRef);
  const combineInputRefs = makeCombineRefs<HTMLInputElement>(inputRef, forwardedInputRef);

  const mouseDownRef = useRef<{
    isFocused?: boolean;
    isDropdownVisible?: boolean;
    isDropdownClicked?: boolean;
  }>({});

  const previous = useRef<{
    input?: string;
    isDropdownVisible?: boolean;
    selectedIds?: string[];
    options?: DropdownOption[];
  }>({});

  const translations = useTranslations<DropdownTranslations>({
    customTranslations,
    fallbackTranslations: dropdownTranslations,
  });

  const themeId = useThemeId(initThemeId);
  const [dropdownState, dropdownDispatch] = useReducer(dropdownReducer, {
    busy: false,
    clearFocus: false,
    id: id || uuid(),
    input: '',
    inputFocus: false,
    listFocus: false,
    listVisible: false,
  });

  const isDropdownVisible = isFocused && dropdownState.listVisible;
  const isEmpty = !selectedState.items?.getAll().length;
  const isClearable =
    getFilteredOptions &&
    !!dropdownState.input &&
    (dropdownState.inputFocus || dropdownState.clearFocus || isDropdownVisible);

  // prepend the currently selected options to the filtered options
  const processedOptions = useMemo(() => {
    if (filteredOptions) {
      const filteredIds = filteredOptions?.map(({ id }) => id);
      return [
        ...options.filter(option => selectedState.selectedIds?.includes(option.id) && !filteredIds.includes(option.id)),
        ...(filteredOptions || []),
      ];
    }
    return options;
  }, [filteredOptions, options, selectedState.selectedIds]);

  const focusInput = () => inputRef.current?.focus();
  const focusList = () => contentRef.current?.list?.focus();

  const hideDropdown = useCallback(() => dropdownDispatch({ type: ACTIONS.HIDE_DROPDOWN }), []);
  const showDropdown = useCallback(() => dropdownDispatch({ type: ACTIONS.SHOW_DROPDOWN }), []);
  const handleListBlur = useCallback(() => dropdownDispatch({ type: ACTIONS.UNSET_LIST_FOCUS }), []);
  const handleListFocus = useCallback(() => dropdownDispatch({ type: ACTIONS.SET_LIST_FOCUS }), []);
  const handleClearBlur = useCallback(() => dropdownDispatch({ type: ACTIONS.UNSET_CLEAR_FOCUS }), []);
  const handleClearFocus = useCallback(() => dropdownDispatch({ type: ACTIONS.SET_CLEAR_FOCUS }), []);
  const handleInputBlur = useCallback(() => dropdownDispatch({ type: ACTIONS.UNSET_INPUT_FOCUS }), []);
  const handleInputFocus = useCallback(() => dropdownDispatch({ type: ACTIONS.SET_INPUT_FOCUS }), []);
  const handleInputClick = useCallback(() => !getFilteredOptions && focusList(), [getFilteredOptions]);

  const { setSafeTimeout, clearSafeTimeout } = useSafeTimeout();
  const safeHandleInputFocus = () => setSafeTimeout(handleInputFocus);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFilter = useCallback(
    debounce(input => {
      getFilteredOptions?.(input).then(options => {
        setFilteredOptions(options || []);
        dropdownDispatch({ type: ACTIONS.UNSET_BUSY });
      });
    }, 1000),
    [getFilteredOptions],
  );

  // define a cleanup event to cancel the filtering
  useEffect((): (() => void) => () => handleFilter.cancel(), [handleFilter]);

  /**
   * When any of the focus states change to false, wait a
   * moment for them to reconcile, otherwise changing from
   * one focused element to another will trigger a momentary
   * unfocus event which will break tabbing from a filtered
   * list to the dropdown.
   */
  useEffect(() => {
    clearSafeTimeout('setIsFocused');
    if (dropdownState.inputFocus || dropdownState.listFocus || dropdownState.clearFocus) {
      setIsFocused(true);
    } else {
      setSafeTimeout(() => setIsFocused(false), 150, 'setIsFocused');
    }
  }, [dropdownState.inputFocus, dropdownState.listFocus, dropdownState.clearFocus, clearSafeTimeout, setSafeTimeout]);

  // when the dropdown visibility changes ...
  useEffect(() => {
    if (isDropdownVisible !== previous.current.isDropdownVisible) {
      if (isDropdownVisible) {
        !getFilteredOptions && focusList();
        onOpen && onOpen();
      } else {
        onClose && onClose();
      }
    }
    previous.current.isDropdownVisible = !!isDropdownVisible;
  }, [isDropdownVisible, getFilteredOptions, onOpen, onClose]);

  // when the options change ...
  useEffect(() => {
    if (options !== previous.current.options) {
      showDropdown();
    }
    previous.current.options = options;
  }, [showDropdown, options]);

  // when the search or filter input changes ...
  useEffect(() => {
    if (
      dropdownState.input !== previous.current.input &&
      Object.prototype.hasOwnProperty.call(previous.current, 'input')
    ) {
      if (dropdownState.input) {
        dropdownDispatch({ type: ACTIONS.SET_BUSY });
        handleFilter(dropdownState.input);
      }
      onInputChange && onInputChange(dropdownState.input);
    }
    previous.current.input = dropdownState.input;
  }, [dropdownState.input, handleFilter, onInputChange]);

  const handleSelect: DropdownContentProps['onSelect'] = (event, { id }, selectedIds) => {
    if (id !== undefined) {
      if (
        event &&
        maxSelect === 1 &&
        (event.type === 'click' || (event.type === 'keydown' && 'key' in event && event.key === 'Enter'))
      ) {
        hideDropdown();
      }

      onSelect && onSelect(id, selectedIds);
    }
  };

  const handleUnselect: DropdownContentProps['onUnselect'] = (event, { id }, selectedIds) => {
    if (id !== undefined) {
      if (Array.isArray(selectedIds)) {
        if (
          event &&
          maxSelect === 1 &&
          (event.type === 'click' || (event.type === 'keydown' && 'key' in event && event.key === 'Enter'))
        ) {
          hideDropdown();
        }
      }

      onUnselect && onUnselect(id, selectedIds);
    }
  };

  const handleInputChange = useCallback(
    (
      event: React.ChangeEvent | React.KeyboardEvent | React.MouseEvent | React.TouchEvent,
      value: string | number,
      { cleared }: { cleared?: boolean } = {},
    ): void => {
      event.preventDefault();

      if (value !== dropdownState.input) {
        if (value) {
          dropdownDispatch({
            type: ACTIONS.SET_FILTER,
            input: value as string,
          });
        } else {
          dropdownDispatch({ type: ACTIONS.CLEAR_FILTER });
        }
      }

      if (cleared) {
        focusInput();
        onClear && onClear();
      }

      if (cleared || !value) {
        setFilteredOptions(undefined);
      }
    },
    [onClear, dropdownState.input],
  );

  /**
   * Because focus and blur events fire before the click events,
   * we must capture the component dropdownState in the mousedown
   * phase before these other events interfere. The ensures that
   * the click event will be able to know what the dropdownState
   * was when it was actually clicked.
   */
  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();

      mouseDownRef.current = {
        isFocused,
        isDropdownVisible,
        isDropdownClicked: contentRef.current?.container?.contains(event.target as Node),
      };
    },
    [isDropdownVisible, isFocused],
  );

  const handleClick = useCallback(() => {
    if (mouseDownRef.current.isDropdownVisible && !mouseDownRef.current.isDropdownClicked && !isClearable) {
      hideDropdown();
    }
  }, [hideDropdown, isClearable]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === ' ' && (event.target as HTMLDivElement).tagName.toLowerCase() !== 'input') {
      event.preventDefault();
      dropdownDispatch({
        type: ACTIONS.SHOW_DROPDOWN,
      });
    }
  }, []);

  // if the `used` flag is true the list provider has already used that keydown event
  const handleListKeyDown = useCallback(
    (event: KeyboardEvent, { used }: { used?: boolean } = {}) => {
      if (!used && !dropdownState.listVisible && event.key === 'Enter') {
        dropdownDispatch({
          type: ACTIONS.SHOW_DROPDOWN,
        });
      } else if (dropdownState.listFocus && dropdownState.listVisible && event.key === 'Enter') {
        dropdownDispatch({
          type: ACTIONS.HIDE_DROPDOWN,
        });
      }
    },
    [dropdownState.listFocus, dropdownState.listVisible],
  );

  useClickAndEscape({
    ref,
    onBlur: hideDropdown,
    onFocus: showDropdown,
    stopPropagation: isDropdownVisible,
  });

  const showFilter = !!(getFilteredOptions && (dropdownState.inputFocus || (isDropdownVisible && dropdownState.input)));
  const inputValue = showFilter ? dropdownState.input : undefined;
  const selectedView = getDropdownSelectedView({ options, maxSelect, selectedState, translations });
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

  // readOnly cannot change during focus because the re-render may mess up tabbing to change focus
  const readOnly = !(getFilteredOptions && isDropdownVisible) || !isFocused;
  const readOnlyValue = initReadOnlyValue || selectedView;

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
      onFocus={showDropdown}
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
        iconAfter={(dropdownState.busy && dropdownState.listVisible && SpinnerIcon) || iconAfter}
        iconBefore={iconBefore}
        id={dropdownState.id}
        // the key is used to force an update on select
        key={selectedState.selectedIds?.join(',')}
        label={label}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
        onClick={handleInputClick}
        onFocus={safeHandleInputFocus}
        onIconBlur={handleClearBlur}
        onIconFocus={handleClearFocus}
        onSubmit={onSubmit}
        placeholder={placeholder}
        readOnly={readOnly}
        readOnlyValue={readOnlyValue}
        ref={combineInputRefs}
        role={getFilteredOptions ? undefined : 'button'}
        silentReadOnly
        // don't allow this to be tabbed to if input is read only and focus is already in the component
        tabIndex={isFocused && !getFilteredOptions ? -1 : 0}
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
        contrast={contrast}
        disabledIds={disabledIds}
        emptyNotification={emptyNotification}
        inputVariant={inputVariant}
        isDropdownVisible={isDropdownVisible}
        isEmpty={isEmpty}
        layout={layout}
        listColor={listColor}
        listSize={listSize}
        listVariant={listVariant}
        maxSelect={maxSelect}
        minSelect={minSelect}
        onItemFocus={onItemFocus}
        onListBlur={handleListBlur}
        onListFocus={handleListFocus}
        onListKeyDown={handleListKeyDown}
        onSelect={handleSelect}
        onSelectionChange={onSelectionChange}
        onUnselect={handleUnselect}
        options={processedOptions}
        parentRef={ref}
        reducer={reducer}
        ref={contentRef}
        dropdownState={dropdownState}
        themeId={themeId}
        unthemed={unthemed}
      />
    </div>
  );
}

export const Dropdown = React.forwardRef(DropdownBase) as typeof DropdownBase;

DropdownBase.displayName = 'DropdownBase';
Dropdown.displayName = 'Dropdown';
