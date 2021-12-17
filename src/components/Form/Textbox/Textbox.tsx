import { cx } from '@emotion/css';
import React, { useCallback, useRef } from 'react';
import { MergeProps } from '../../../types';
import { useThemeId } from '../../../context/Theme';
import { useTranslations } from '../../../hooks/useTranslations';
import { makeCombineRefs } from '../../../utils/combineRefs';
import { TimesIcon } from '../../../icons/TimesIcon';
import {
  Formbox,
  FormboxInputWithFormatting,
  FormboxReadOnly,
  FormboxProps,
  FormboxValue,
  FormboxTranslations,
  formboxTranslations,
  useAutoFilled,
} from '../Formbox';
import styles from './styles/Textbox.module.css';

const clearableIconSizes = {
  medium: 8,
  large: 8,
  xlarge: 9,
  '2xlarge': 11,
  '3xlarge': 12,
  '4xlarge': 12,
  '5xlarge': 12,
  '6xlarge': 12,
  '7xlarge': 14,
  '8xlarge': 14,
};

export type TextboxTranslations = FormboxTranslations & {
  clearLabel: string;
};

export const textboxTranslations: TextboxTranslations = {
  ...formboxTranslations,
  clearLabel: 'Clear',
};

export type LocalTextboxProps = Pick<
  FormboxProps,
  | 'alwaysTriggerBlur'
  | 'alwaysTriggerFocus'
  | 'className'
  | 'contrast'
  | 'disabled'
  | 'iconAfter'
  | 'iconAfterActionable'
  | 'iconAfterClassName'
  | 'iconBefore'
  | 'iconBeforeActionable'
  | 'iconBeforeClassName'
  | 'id'
  | 'inputWidth'
  | 'label'
  | 'onBlur'
  | 'onFocus'
  | 'persistEvents'
  | 'readOnly'
  | 'required'
  | 'size'
  | 'style'
  | 'themeId'
  | 'transitional'
  | 'translations'
  | 'transparent'
  | 'unthemed'
  | 'validity'
  | 'variant'
  | 'visuallyFocused'
  | 'width'
> & {
  /** The formatted value will be hidden while the input is focused unless this is true */
  alwaysShowFormatting?: boolean;
  /** If the value will have HTML formatting then this should be true */
  alwaysUseFormatting?: boolean;
  /** This should rarely be used because it's not a11y friendly */
  autoFocus?: boolean;
  centered?: boolean;
  /** This can be used to show an HTML value or any sort of value that's different from the actual value */
  formattedValue?: React.ReactChild;
  clearable?: boolean;
  inputClassName?: string;
  /** The visible width, in characters, of the input */
  inputSize?: number;
  inputStyle?: React.CSSProperties;
  max?: number;
  maxLength?: number;
  min?: number;
  name?: string;
  onAnimationStart?: React.AnimationEventHandler<HTMLInputElement>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: FormboxValue) => void;
  onInputBlur?: React.FocusEventHandler<HTMLInputElement>;
  onInputFocus?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>, value: string) => void;
  onClear?: (event: React.KeyboardEvent | React.MouseEvent | React.TouchEvent) => void;
  onSubmit?: (event: React.KeyboardEvent<HTMLInputElement>, value: string) => void;
  /** This can be used to show HTML, or if it's undefined it will default to the plain input placeholder */
  placeholder?: FormboxValue | React.ReactChild;
  step?: number;
  type?: 'color' | 'date' | 'email' | 'number' | 'password' | 'text' | 'time';
  value?: FormboxValue;
};

export type TextboxProps = MergeProps<React.ComponentPropsWithoutRef<'input'>, LocalTextboxProps> & {
  formboxProps?: Omit<FormboxProps, keyof LocalTextboxProps | 'autoFilled'>;
};

export type TextboxRef = React.ForwardedRef<HTMLInputElement>;

export function TextboxBase(
  {
    alwaysShowFormatting,
    alwaysTriggerBlur,
    alwaysTriggerFocus,
    alwaysUseFormatting,
    autoFocus,
    centered,
    className,
    clearable: initClearable,
    contrast = false,
    disabled,
    formattedValue,
    formboxProps,
    iconAfter,
    iconAfterActionable,
    iconBefore,
    iconBeforeActionable,
    id,
    inputClassName,
    inputSize,
    inputStyle,
    inputWidth,
    label,
    max,
    maxLength,
    min,
    name,
    onAnimationStart,
    onBlur,
    onChange,
    onClear,
    onFocus,
    onInputBlur,
    onInputFocus,
    onKeyDown,
    onPaste,
    onSubmit,
    persistEvents,
    placeholder,
    readOnly,
    required,
    size = 'large',
    step = 1,
    style,
    tabIndex = 0,
    themeId: initThemeId,
    transitional,
    translations: customTranslations,
    transparent,
    type = 'text',
    unthemed,
    validity,
    value = '',
    variant,
    visuallyFocused,
    width,
    ...props
  }: TextboxProps,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
): React.ReactElement<TextboxProps> {
  const themeId = useThemeId(initThemeId);
  const translations = useTranslations<TextboxTranslations>({
    customTranslations,
    fallbackTranslations: textboxTranslations,
  });
  const { clearLabel } = translations;

  const { autoFilled, handleAnimationStart } = useAutoFilled<HTMLInputElement>({ onAnimationStart });

  const inputRef = useRef<HTMLInputElement>(null);
  const combineRefs = makeCombineRefs<HTMLInputElement>(inputRef, forwardedRef);

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    event => {
      if (value !== event.target.value) {
        onChange && onChange(event, event.target.value);
      }
    },
    [onChange, value],
  );

  const handleClear = useCallback(
    (event: React.KeyboardEvent | React.MouseEvent | React.TouchEvent) => {
      event.preventDefault();
      onClear && onClear(event);
      inputRef.current && inputRef.current.focus();
    },
    [onClear],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (onSubmit && event.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();

        onSubmit(event, (event.target as HTMLInputElement).value);
      } else {
        onKeyDown && onKeyDown(event, (event.target as HTMLInputElement).value);
      }
    },
    [onKeyDown, onSubmit],
  );

  const renderClearableIcon = () => {
    return (
      <button aria-label={clearLabel} className={styles.textboxButton} onClick={handleClear} type="button">
        <TimesIcon size={clearableIconSizes[size]} title={clearLabel} />
      </button>
    );
  };

  // an input is considered empty if there is nothing to show in the input (eg. value or placeholder)
  const hasValue = type === 'number' ? Number.isFinite(value) : Boolean(value);
  const isEmpty = !hasValue && !formattedValue && placeholder === undefined;
  const isClearable = initClearable && hasValue && !readOnly;

  return (
    <Formbox
      alwaysTriggerBlur={alwaysTriggerBlur}
      alwaysTriggerFocus={alwaysTriggerFocus}
      autoFilled={autoFilled}
      centered={centered}
      className={className}
      contrast={contrast}
      disabled={disabled}
      empty={isEmpty}
      iconAfter={iconAfter || (isClearable && renderClearableIcon()) || undefined}
      iconAfterActionable={iconAfterActionable || isClearable}
      iconBefore={iconBefore}
      iconBeforeActionable={iconBeforeActionable}
      id={id}
      inputWidth={inputWidth}
      label={label}
      onBlur={onBlur}
      onFocus={onFocus}
      persistEvents={persistEvents}
      readOnly={readOnly}
      required={required}
      size={size}
      style={style}
      themeId={themeId}
      transitional={transitional}
      translations={translations}
      transparent={transparent}
      type="input"
      unthemed={unthemed}
      validity={validity}
      variant={variant}
      visuallyFocused={visuallyFocused}
      width={width}
      {...formboxProps}
    >
      {({ id, focused, required, variant }) =>
        readOnly ? (
          <FormboxReadOnly
            centered={centered}
            contrast={contrast}
            formattedValue={formattedValue}
            id={id}
            value={value}
          />
        ) : (
          <FormboxInputWithFormatting<'input'>
            alwaysShowFormatting={alwaysShowFormatting}
            alwaysUseFormatting={alwaysUseFormatting}
            centered={centered}
            contrast={contrast}
            focused={focused}
            formattedValue={formattedValue}
            hasValue={hasValue}
            placeholder={placeholder}
            themeId={themeId}
            variant={variant}
          >
            <input
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={autoFocus}
              className={cx(styles.textboxInput, centered && styles['textboxInput--centered'], inputClassName)}
              disabled={disabled}
              id={id}
              maxLength={maxLength}
              name={name}
              onAnimationStart={handleAnimationStart}
              onBlur={onInputBlur}
              onChange={handleChange}
              onFocus={onInputFocus}
              onKeyDown={handleKeyDown}
              onPaste={onPaste}
              ref={combineRefs}
              required={required}
              size={inputSize}
              style={inputStyle}
              tabIndex={tabIndex}
              type={type}
              value={value}
              {...(type === 'number'
                ? {
                    max,
                    min,
                    step,
                  }
                : {})}
              {...props}
            />
          </FormboxInputWithFormatting>
        )
      }
    </Formbox>
  );
}
/**
 * The textbox component extends the `Formbox` component and
 * contains both a text form input and a label. It accepts
 * custom icons, a placeholder value, a read only state (in
 * addition to a disabled state) and several custom style
 * options. It also accepts a clearable flag which will
 * add a clear button.
 *
 * The value and placeholder value can be displayed in HTML
 * or the standard plain-text format.
 *
 * The value state should be stored outside of this component
 * and is updated by the `onChange` callback.
 */
export const Textbox = React.forwardRef(TextboxBase);

// note that the base element cannot have a displayName because it breaks Storybook
Textbox.displayName = 'Textbox';
