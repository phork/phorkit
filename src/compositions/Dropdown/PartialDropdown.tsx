import { cx } from '@emotion/css';
import debounce from 'lodash.debounce';
import { nanoid } from 'nanoid';
import React, { useCallback, useEffect, useImperativeHandle, useMemo, useReducer, useRef, useState } from 'react';
import { StateColor, ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { useComponentId } from '../../hooks/useComponentId';
import { useDeepFocusGroup } from '../../hooks/useDeepFocusGroup';
import { useHandleEscape } from '../../hooks/useHandleEscape';
import { useTranslations } from '../../hooks/useTranslations';
import { useTriggerFocus } from '../../hooks/useTriggerFocus';
import { makeCancelable } from '../../utils/makeCancelable';
import { RenderFromPropElement } from '../../utils/renderFromProp';
import { PencilSlashIcon, SearchIcon, TimesIcon } from '../../icons';
import { ArrowDownIcon } from '../../icons/ArrowDownIcon';
import { SpinnerIcon } from '../../icons/SpinnerIcon';
import {
  FormboxContainer,
  FormboxIcon,
  FormboxIconRenderProps,
  FormboxInputWithFormatting,
  FormboxReadOnly,
  FormboxValue,
} from '../../components/Form/Formbox';
import { PartialInteractiveListProps } from '../InteractiveList';
import { getDropdownSelectedView } from './utils';
import styles from './styles/Dropdown.module.css';
import sizeStyles from './styles/DropdownSizes.module.css';
import { DropdownContent, DropdownContentProps, DropdownContentHandles } from './DropdownContent';
import { dropdownActions as ACTIONS } from './dropdownActions';
import { dropdownReducer } from './dropdownReducer';
import {
  DropdownOption,
  DropdownInputVariant,
  DropdownLayout,
  DropdownTranslations,
  DropdownListSize,
  DropdownSize,
} from './types';

const arrowIconSizes = {
  medium: 8,
  large: 8,
  xlarge: 9,
  '2xlarge': 11,
  '3xlarge': 13,
  '4xlarge': 14,
  '5xlarge': 14,
  '6xlarge': 14,
  '7xlarge': 16,
  '8xlarge': 16,
};

const listSizes: Record<string, DropdownListSize> = {
  medium: 'small',
  large: 'medium',
  xlarge: 'large',
  '2xlarge': 'large',
  '3xlarge': 'xlarge',
  '4xlarge': 'xlarge',
  '5xlarge': 'xlarge',
  '6xlarge': 'xlarge',
  '7xlarge': 'xlarge',
  '8xlarge': 'xlarge',
};

const FOCUS_REFS = {
  CLEAR: 'clear',
  CONTAINER: 'container',
  INPUT: 'input',
  LIST: 'list',
  TOGGLE: 'toggle',
};

export const dropdownTranslations: DropdownTranslations = {
  numSelectedSingular: '{0} item selected',
  numSelectedPlural: '{0} items selected',
  readOnlyLabel: 'Read only',
  clearLabel: 'Clear',
};

export type PartialDropdownProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onInputChange' | 'onSelect' | 'onSubmit' | 'placeholder'
> &
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
  > &
  ThemeProps & {
    alwaysVisibleDropdown?: true;
    arrowIconSize?: number;
    className?: string;
    disabled?: boolean;
    disabledIds?: readonly string[];
    formattedValue?: React.ReactChild;
    getFilteredOptions?: (filter: string) => Promise<readonly DropdownOption[]>;
    iconBefore?: RenderFromPropElement<FormboxIconRenderProps>;
    id?: string;
    inputVariant?: DropdownInputVariant;
    label?: string;
    layout?: DropdownLayout;
    onClear?: () => void;
    onClose?: () => void;
    onInputChange?: (input?: string) => void;
    onOpen?: () => void;
    onSelect?: (id: string, selectedIds: readonly string[]) => void;
    /** This fires when items are selected or unselected */
    onSelectionChange?: (selectedIds: readonly string[] | undefined) => void;
    onSubmit?: (event: React.KeyboardEvent<HTMLInputElement>, value: string) => void;
    onUnselect?: (id: string, selectedIds: readonly string[] | undefined) => void;
    options: readonly DropdownOption[];
    placeholder?: FormboxValue | React.ReactChild;
    readOnly?: boolean;
    /** The reducer comes from `useReducer(interactiveGroupReducer)` and is used to track selection */
    reducer: PartialInteractiveListProps['reducer'];
    /** A searchable dropdown should have no options unless a search term has been entered */
    searchable?: boolean;
    size?: DropdownSize;
    style?: React.CSSProperties;
    transitional?: boolean;
    translations?: Partial<DropdownTranslations>;
    /** When using the withNotification HOC the empty content notice must be inline if there's a notification */
    usingNotification?: boolean;
    validity?: StateColor;
  };

export type PartialDropdownHandles = {
  container: HTMLDivElement;
  list: DropdownContentHandles;
  input: HTMLInputElement;
  toggle: HTMLDivElement;
};

export type PartialDropdownRef = React.ForwardedRef<PartialDropdownHandles>;

export function PartialDropdownBase(
  {
    allowReselect = false,
    alwaysVisibleDropdown,
    arrowIconSize: initArrowIconSize,
    className,
    contrast = false,
    disabled = false,
    disabledIds,
    emptyNotification,
    formattedValue: initFormattedValue,
    getFilteredOptions,
    iconBefore: initIconBefore,
    id,
    inputVariant = 'underline',
    label,
    layout = 'raised',
    listColor = 'primary',
    listSize: initListSize = 'medium',
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
    onSubmit,
    onUnselect,
    options,
    placeholder,
    readOnly = false,
    reducer,
    searchable = false,
    size = 'large',
    themeId: initThemeId,
    transitional = false,
    translations: customTranslations,
    unthemed = false,
    usingNotification = false,
    validity,
    ...props
  }: PartialDropdownProps,
  forwardedRef: React.ForwardedRef<PartialDropdownHandles>,
): React.ReactElement<PartialDropdownProps> {
  const { generateComponentId } = useComponentId(id);

  const [selectedState] = reducer;
  const [filteredOptions, setFilteredOptions] = useState<readonly DropdownOption[] | undefined>();
  const themeId = useThemeId(initThemeId);

  const translations = useTranslations<DropdownTranslations>({
    customTranslations,
    fallbackTranslations: dropdownTranslations,
  });

  const clearRef = useRef<HTMLButtonElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);
  const inputRef = useRef<HTMLInputElement>(null!);
  const listRef = useRef<DropdownContentHandles>(null!);
  const toggleRef = useRef<HTMLDivElement>(null!);

  // the parent component can call forwardedRef.current.[container | input | list | toggle]
  useImperativeHandle(forwardedRef, () => ({
    get container(): HTMLDivElement {
      return containerRef.current;
    },
    get input(): HTMLInputElement {
      return inputRef.current;
    },
    get list(): DropdownContentHandles {
      return listRef.current;
    },
    get toggle(): HTMLDivElement {
      return toggleRef.current;
    },
  }));

  // to track the state when the mousedown event happened
  const mouseDownRef = useRef<{
    isDropdownVisible?: boolean;
    isListClicked?: boolean;
  }>({});

  const previous = useRef<{
    input?: string;
    isDropdownVisible?: boolean;
    isFocused?: boolean;
    isInputFocused?: boolean;
  }>({});

  const [dropdownState, dropdownDispatch] = useReducer(dropdownReducer, {
    busy: false,
    id: id || nanoid(),
    input: '',
    listVisible: false,
  });

  const { addRef, clearRefs, handleFocus, handleBlur, isIdFocused } = useDeepFocusGroup({}, { blurDelay: 150 });
  const { focus, cancel } = useTriggerFocus({ focusDelay: 150 });

  const isClearFocused = isIdFocused(FOCUS_REFS.CLEAR);
  const isContainerFocused = isIdFocused(FOCUS_REFS.CONTAINER);
  const isInputFocused = isIdFocused(FOCUS_REFS.INPUT);
  const isListFocused = isIdFocused(FOCUS_REFS.LIST);
  const isToggleFocused = isIdFocused(FOCUS_REFS.TOGGLE);
  const isFocused = isClearFocused || isContainerFocused || isInputFocused || isListFocused || isToggleFocused;

  const isDropdownVisible = (isFocused && dropdownState.listVisible) || alwaysVisibleDropdown;
  const isListEmpty = !selectedState.items?.getAll().length;
  const isFilterable = !!getFilteredOptions;
  const isClearable = isFilterable && !!dropdownState.input && (isInputFocused || isClearFocused || isDropdownVisible);

  // prepend the currently selected option(s) to the filtered options
  const processedOptions = useMemo(() => {
    if (filteredOptions) {
      const filteredIds = filteredOptions?.map(({ id }) => id);
      return [
        ...(options?.filter(
          option => selectedState.selectedIds?.includes(option.id) && !filteredIds.includes(option.id),
        ) || []),
        ...(filteredOptions || []),
      ];
    }
    return options;
  }, [filteredOptions, options, selectedState.selectedIds]);

  // debounce the filtering; use a ref so it doesn't recreate the function on re-render
  const debouncedFilter = useRef<ReturnType<typeof debounce> | undefined>();
  const cancelFilterPromise = useRef<(() => void) | undefined>();

  useEffect(() => {
    debouncedFilter.current = debounce((input: string) => {
      if (getFilteredOptions) {
        const { promise, cancel } = makeCancelable<readonly DropdownOption[] | undefined>(getFilteredOptions?.(input));
        cancelFilterPromise.current = cancel;

        promise
          .then(options => {
            setFilteredOptions(options || []);
            dropdownDispatch({ type: ACTIONS.UNSET_BUSY });
            dropdownDispatch({ type: ACTIONS.SHOW_DROPDOWN });
          })
          // getFilteredOptions should handle error cases, this is here to catch canceled promises
          .catch(() => {}); /* eslint-disable-line @typescript-eslint/no-empty-function */
      }
    }, 1000);

    return () => {
      debouncedFilter.current?.cancel();
      cancelFilterPromise.current?.();
    };
  }, [getFilteredOptions]);

  useEffect(() => {
    clearRefs();

    addRef<HTMLButtonElement>({ id: FOCUS_REFS.CLEAR, ref: clearRef, passive: true });
    addRef<HTMLInputElement>({ id: FOCUS_REFS.INPUT, ref: inputRef, passive: true });
    addRef<HTMLDivElement>({ id: FOCUS_REFS.TOGGLE, ref: toggleRef, passive: true });
    addRef<HTMLDivElement, 'container'>({ id: FOCUS_REFS.LIST, ref: listRef, passive: true, handle: 'container' });
    addRef<HTMLDivElement>({ id: FOCUS_REFS.CONTAINER, ref: containerRef, passive: true });
  }, [addRef, clearRefs]);

  // when the overall component focus state changes ...
  useEffect(() => {
    if (!isFocused && previous.current.isFocused) {
      dropdownDispatch({ type: ACTIONS.HIDE_DROPDOWN });
    } else if (isFocused && !previous.current.isFocused) {
      if (isFilterable) {
        focus<HTMLInputElement>({ ref: inputRef });
      }
    }
    previous.current.isFocused = isFocused;
  }, [focus, isFilterable, isFocused, isToggleFocused]);

  // when the input focus state changes ...
  useEffect(() => {
    if (isInputFocused && !previous.current.isInputFocused && options !== undefined) {
      dropdownDispatch({ type: ACTIONS.SHOW_DROPDOWN });
    }
    previous.current.isInputFocused = isInputFocused;
  }, [isInputFocused, options]);

  // when the dropdown visibility changes ...
  useEffect(() => {
    if (isDropdownVisible !== previous.current.isDropdownVisible) {
      if (isDropdownVisible) {
        !isFilterable && focus<HTMLUListElement, 'list'>({ ref: listRef, handle: 'list' });
        onOpen && onOpen();
      } else {
        onClose && onClose();
      }
    }
    previous.current.isDropdownVisible = !!isDropdownVisible;
  }, [focus, isDropdownVisible, isFilterable, isListFocused, onClose, onOpen]);

  // when the search or filter input changes ...
  useEffect(() => {
    if (
      dropdownState.input !== previous.current.input &&
      Object.prototype.hasOwnProperty.call(previous.current, 'input')
    ) {
      if (dropdownState.input) {
        dropdownDispatch({ type: ACTIONS.SET_BUSY });
        debouncedFilter.current?.(dropdownState.input);
      }
      onInputChange && onInputChange(dropdownState.input);
    }
    previous.current.input = dropdownState.input;
  }, [dropdownState.input, onInputChange]);

  // if the select is handled by Enter or click and only one option can be selected then hide the dropdown
  const handleSelect: DropdownContentProps['onSelect'] = (event, { id }, selectedIds) => {
    if (id !== undefined) {
      if (
        event &&
        maxSelect === 1 &&
        (event.type === 'click' || (event.type === 'keydown' && 'key' in event && event.key === 'Enter'))
      ) {
        dropdownDispatch({ type: ACTIONS.HIDE_DROPDOWN });
        focus<HTMLDivElement>({ ref: toggleRef });
      }

      onSelect && onSelect(id, selectedIds);
    }
  };

  // if the unselect is handled by Enter or click and only one option can be selected then hide the dropdown
  const handleUnselect: DropdownContentProps['onUnselect'] = (event, { id }, selectedIds) => {
    if (id !== undefined) {
      if (Array.isArray(selectedIds)) {
        if (
          event &&
          maxSelect === 1 &&
          (event.type === 'click' || (event.type === 'keydown' && 'key' in event && event.key === 'Enter'))
        ) {
          dropdownDispatch({ type: ACTIONS.HIDE_DROPDOWN });
          focus<HTMLDivElement>({ ref: toggleRef });
        }
      }

      onUnselect && onUnselect(id, selectedIds);
    }
  };

  /**
   * Because focus and blur events fire before the click events,
   * we must capture the dropdown states in the mousedown phase
   * before these other events interfere. The ensures that the
   * click event will be able to know what the dropdownState
   * was when it was actually clicked.
   */
  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();

      mouseDownRef.current = {
        isDropdownVisible,
        isListClicked: listRef.current?.container?.contains(event.target as Node),
      };
    },
    [isDropdownVisible],
  );

  // focuses the input and toggles the dropdown visibility
  const handleClick = useCallback(() => {
    if (!mouseDownRef.current.isListClicked) {
      if (mouseDownRef.current.isDropdownVisible) {
        isFilterable ? focus<HTMLInputElement>({ ref: inputRef }) : focus<HTMLDivElement>({ ref: toggleRef });
        dropdownDispatch({ type: ACTIONS.HIDE_DROPDOWN });
      } else {
        isFilterable && focus<HTMLInputElement>({ ref: inputRef });
        dropdownDispatch({ type: ACTIONS.SHOW_DROPDOWN });
      }
    }

    mouseDownRef.current = {};
  }, [focus, isFilterable]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const isInputTarget = (event.target as HTMLDivElement).tagName.toLowerCase() === 'input';

      switch (event.key) {
        // with the alt key it focuses the dropdown if visible, or shows it if not visible; without alt shows and focuses the dropdown
        case 'ArrowDown':
          if (event.altKey) {
            if (isDropdownVisible) {
              event.preventDefault();
              event.stopPropagation();
              focus<HTMLUListElement, 'list'>({ ref: listRef, handle: 'list' });
            } else {
              event.preventDefault();
              event.stopPropagation();
              dropdownDispatch({ type: ACTIONS.SHOW_DROPDOWN });
            }
          } else {
            if (!isListFocused) {
              event.preventDefault();
              event.stopPropagation();
              dropdownDispatch({ type: ACTIONS.SHOW_DROPDOWN });
              focus<HTMLUListElement, 'list'>({ ref: listRef, handle: 'list' });
            }
          }
          break;

        // with the alt key it focuses the form if focus was in the dropdown, otherwise it just closes the dropdown
        case 'ArrowUp':
          if (event.altKey) {
            if (isListFocused) {
              if (isFilterable) {
                event.preventDefault();
                event.stopPropagation();
                focus<HTMLInputElement>({ ref: inputRef });
              } else {
                event.preventDefault();
                event.stopPropagation();
                dropdownDispatch({ type: ACTIONS.HIDE_DROPDOWN });
                focus<HTMLDivElement>({ ref: toggleRef });
              }
            } else if (isDropdownVisible) {
              event.preventDefault();
              event.stopPropagation();
              dropdownDispatch({ type: ACTIONS.HIDE_DROPDOWN });
            }
          }
          break;

        // if the input wasn't part of the form or the clear button then show and focus the list
        case 'Enter':
        case ' ':
          if (!isListFocused && !isClearFocused && !isInputTarget) {
            event.preventDefault();
            event.stopPropagation();
            dropdownDispatch({ type: ACTIONS.SHOW_DROPDOWN });
            focus<HTMLUListElement, 'list'>({ ref: listRef, handle: 'list' });
          }
          break;
      }
    },
    [focus, isClearFocused, isDropdownVisible, isFilterable, isListFocused],
  );

  // if the `used` flag is true the list provider has already used that keydown event
  const handleListKeyDown = useCallback(
    (event: KeyboardEvent, { used }: { used?: boolean } = {}) => {
      if (!used && !dropdownState.listVisible && event.key === 'Enter') {
        dropdownDispatch({ type: ACTIONS.SHOW_DROPDOWN });
      } else if (isListFocused && dropdownState.listVisible && event.key === 'Enter') {
        dropdownDispatch({ type: ACTIONS.HIDE_DROPDOWN });
      }
    },
    [dropdownState.listVisible, isListFocused],
  );

  const handleInputChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event): void => {
      event.preventDefault();

      const value = event.target.value;
      if (value !== dropdownState.input) {
        if (value && value !== '') {
          dropdownDispatch({
            type: ACTIONS.SET_FILTER,
            input: value as string,
          });
        } else {
          dropdownDispatch({ type: ACTIONS.CLEAR_FILTER });
        }
      }

      if (!value && value !== '') {
        setFilteredOptions(undefined);
      }
    },
    [dropdownState.input],
  );

  const handleInputKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      dropdownDispatch({ type: ACTIONS.SHOW_DROPDOWN });
    }
  }, []);

  const handleInputClear = useCallback(
    (
      event:
        | React.KeyboardEvent<HTMLButtonElement>
        | React.MouseEvent<HTMLButtonElement>
        | React.TouchEvent<HTMLButtonElement>,
    ): void => {
      event.stopPropagation();
      dropdownDispatch({ type: ACTIONS.CLEAR_FILTER });
      setFilteredOptions(undefined);
      focus<HTMLInputElement>({ ref: inputRef });

      onClear && onClear();
    },
    [focus, onClear],
  );

  const handleEscape = useCallback(() => {
    cancel();
    dropdownDispatch({ type: ACTIONS.HIDE_DROPDOWN });
  }, [cancel]);

  useHandleEscape({
    ref: containerRef,
    onEscape: handleEscape,
    stopPropagation: isDropdownVisible,
  });

  const color = contrast ? 'contrast' : 'primary';
  const transparent = layout === 'contained' && isDropdownVisible && ['underline', 'filled'].includes(inputVariant);

  const hasInputValue = dropdownState.input && dropdownState.input !== '';
  const showFilter = isFilterable && (isInputFocused || isClearFocused || (isDropdownVisible && hasInputValue));
  const inputValue = showFilter ? dropdownState.input : '';
  const selectedView = getDropdownSelectedView({ options: processedOptions, maxSelect, selectedState, translations });
  const formattedValue = initFormattedValue || selectedView;

  // the no content notice should be hidden when searching or when the dropdown is searchable and has not been searched
  const hideNoContent = dropdownState.busy || (searchable && !dropdownState.input);

  const iconBefore = showFilter ? <SearchIcon size={12} /> : initIconBefore;
  const showReadOnlyIcon = readOnly;
  const showSpinnerIcon = !!dropdownState.busy;
  const showClearableIcon = isClearable && !dropdownState.busy;
  const showArrowIcons = !showReadOnlyIcon && !showSpinnerIcon && !showClearableIcon;

  const listSize = initListSize || listSizes[size];
  const arrowIconSize = initArrowIconSize || arrowIconSizes[size];

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={cx(
        styles.dropdown,
        readOnly && styles['dropdown--readOnly'],
        sizeStyles[`dropdown--${size}`],
        disabled && styles['is-disabled'],
        isClearable && styles['is-clearable'],
        isDropdownVisible && styles['is-visible'],
        themeId && !unthemed && styles[`dropdown--${themeId}`],
        color && !unthemed && styles[`dropdown--${color}`],
        className,
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      ref={containerRef}
      {...props}
    >
      <FormboxContainer<'div'>
        hasIconAfter
        aria-haspopup={readOnly ? false : 'listbox'}
        as="div"
        className={styles.dropdownInput}
        contrast={contrast}
        disabled={disabled}
        empty={selectedState.selectedIds?.length === 0 && !placeholder}
        focused={isFocused}
        hasIconBefore={!!iconBefore}
        label={label}
        onBlur={handleBlur}
        onFocus={handleFocus}
        readOnly={readOnly}
        ref={toggleRef}
        role={readOnly ? undefined : 'button'}
        size={size}
        tabIndex={readOnly || (isListFocused && !isFilterable) || isInputFocused ? -1 : 0}
        themeId={themeId}
        transitional={transitional}
        transparent={transparent}
        type="input"
        validity={validity}
        variant={inputVariant}
      >
        {iconBefore && <FormboxIcon icon={iconBefore} position="before" variant={inputVariant} />}

        {isFilterable && !readOnly ? (
          <FormboxInputWithFormatting<'input'>
            alwaysUseFormatting
            contrast={contrast}
            focused={isFocused}
            formattedValue={isInputFocused || isClearFocused ? undefined : formattedValue}
            hasValue={inputValue !== undefined && inputValue !== ''}
            placeholder={placeholder}
            themeId={themeId}
            variant={inputVariant}
          >
            <input
              aria-autocomplete="list"
              aria-controls={generateComponentId('list')}
              aria-expanded={isDropdownVisible}
              disabled={disabled}
              onBlur={handleBlur}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onKeyDown={handleInputKeyDown}
              ref={inputRef}
              role="combobox"
              type="text"
              value={inputValue}
            />
          </FormboxInputWithFormatting>
        ) : (
          <FormboxReadOnly contrast={contrast} formattedValue={formattedValue} placeholder={placeholder} />
        )}

        {showReadOnlyIcon && (
          <FormboxIcon
            icon={<PencilSlashIcon scale="small" title={translations.readOnlyLabel} />}
            position="after"
            variant={inputVariant}
          />
        )}

        {showArrowIcons && (
          <FormboxIcon
            icon={
              <ArrowDownIcon
                className={cx(styles.dropdownArrowIcon, isDropdownVisible && styles['dropdownArrowIcon--inverted'])}
                size={arrowIconSize}
              />
            }
            position="after"
            variant={inputVariant}
          />
        )}

        {showSpinnerIcon && <FormboxIcon icon={<SpinnerIcon size={12} />} position="after" variant={inputVariant} />}

        {showClearableIcon && (
          <FormboxIcon
            actionable
            icon={
              <button
                aria-label={translations.clearLabel}
                className={styles.dropdownButtonIcon}
                onBlur={handleBlur}
                onClick={handleInputClear}
                onFocus={handleFocus}
                ref={clearRef}
                type="button"
              >
                <TimesIcon scale="xsmall" title={translations.clearLabel} />
              </button>
            }
            position="after"
            variant={inputVariant}
          />
        )}
      </FormboxContainer>

      <DropdownContent
        allowReselect={allowReselect}
        contrast={contrast}
        disabled={!isDropdownVisible || isClearFocused}
        disabledIds={disabledIds}
        emptyNotification={emptyNotification}
        filter={dropdownState.input}
        focused={isListFocused}
        hideNoContent={hideNoContent}
        id={generateComponentId('list')}
        inlineDropdownEmpty={usingNotification}
        inputVariant={inputVariant}
        isDropdownVisible={isDropdownVisible}
        isEmpty={isListEmpty}
        layout={layout}
        listColor={listColor}
        listSize={listSize}
        listVariant={listVariant}
        maxSelect={maxSelect}
        minSelect={minSelect}
        onItemFocus={onItemFocus}
        onListBlur={handleBlur}
        onListFocus={handleFocus}
        onListKeyDown={handleListKeyDown}
        onSelect={handleSelect}
        onSelectionChange={onSelectionChange}
        onUnselect={handleUnselect}
        options={processedOptions}
        reducer={reducer}
        ref={listRef}
        size={size}
        themeId={themeId}
        unthemed={unthemed}
      />
    </div>
  );
}

/**
 * A dropdown is similar to a select component in
 * that it provides a list of selectable items. The
 * items can be filtered or searched. A searchable
 * dropdown is similar to a filterable dropdown except
 * it starts with no initial values.
 *
 * The partial dropdown accepts a reducer from the
 * `InteractiveGroup` component which maintains a record
 * of all the items in the dropdown and which items are
 * focused and which are selected.
 *
 * Generally the `Dropdown` component should be used.
 * The partial dropdown component is only necessary
 * in cases when the parent needs access to the
 * reducer and the state.
 *
 * This uses the `Formbox` and `InteractiveList` components.
 */
export const PartialDropdown = React.forwardRef(PartialDropdownBase);

// note that the base element cannot have a displayName because it breaks Storybook
PartialDropdown.displayName = 'PartialDropdown';
