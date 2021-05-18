import { cx } from '@emotion/css';
import React, { useCallback, useRef } from 'react';
import { MergeProps } from '../../../types';
import { useThemeId } from '../../../hooks/useThemeId';
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
} from '../Formbox';
import styles from './styles/Textbox.module.css';

export type TextboxTranslations = FormboxTranslations & {
  clearLabel: string;
};

export const textboxTranslations: TextboxTranslations = {
  ...formboxTranslations,
  clearLabel: 'Clear',
};

export interface LocalTextboxProps {
  /** This should be set to true if the value has custom HTML formatting */
  alwaysUseFormatting?: boolean;
  /** This should rarely be used because it's not a11y friendly */
  autoFocus?: boolean;
  centered?: boolean;
  /** This can be used to show an HTML value or any sort of value that's different from the actual value */
  formattedValue?: React.ReactChild;
  clearable?: boolean;
  inputClassName?: string;
  inputProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'onKeyDown' | 'ref' | 'type'>;
  max?: number;
  min?: number;
  name?: string;
  onChange?: (
    event: React.ChangeEvent | React.KeyboardEvent | React.MouseEvent | React.TouchEvent,
    value: FormboxValue,
    props?: { cleared?: boolean },
  ) => void;
  onSubmit?: (event: React.KeyboardEvent<HTMLInputElement>, value: string) => void;
  /** This can be used to show HTML, or if it's undefined it will default to the plain input placeholder */
  placeholder?: FormboxValue | React.ReactChild;
  step?: number;
  type?: 'color' | 'date' | 'email' | 'number' | 'password' | 'text' | 'time';
  value?: FormboxValue;
}

export type TextboxProps = MergeProps<Omit<FormboxProps, 'as' | 'children' | 'ref'>, LocalTextboxProps>;

function TextboxBase(
  {
    alwaysUseFormatting,
    autoFocus,
    centered,
    className,
    clearable: initClearable,
    contrast,
    disabled,
    formattedValue,
    iconAfter,
    iconAfterActionable,
    iconBefore,
    id,
    inputClassName,
    inputProps: initInputProps,
    label,
    max,
    min,
    name,
    onBlur,
    onChange,
    onFocus,
    onSubmit,
    placeholder,
    readOnly,
    step = 1,
    tabIndex = 0,
    themeId: initThemeId,
    transitional,
    translations: customTranslations,
    type = 'text',
    unthemed,
    validity,
    value = '',
    variant,
    width,
    ...props
  }: TextboxProps,
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
): React.ReactElement<TextboxProps, 'label'> {
  const themeId = useThemeId(initThemeId);
  const translations = useTranslations({ customTranslations, fallbackTranslations: textboxTranslations });
  const { clearLabel } = translations;

  const inputRef = useRef<HTMLInputElement>(null);
  const combineRefs = makeCombineRefs<HTMLInputElement>(inputRef, forwardedRef);

  const inputProps = { ...initInputProps };
  if (type === 'number') {
    inputProps.max = max;
    inputProps.min = min;
    inputProps.step = step;
  }

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
      onChange && onChange(event, '', { cleared: true });
      inputRef.current && inputRef.current.focus();
    },
    [onChange],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (onSubmit && event.key === 'Enter') {
        onSubmit(event, (event.target as HTMLInputElement).value);
      }
    },
    [onSubmit],
  );

  const renderClearableIcon = () => {
    return (
      <button aria-label={clearLabel} className={styles.textboxButton} type="button" onClick={handleClear}>
        <TimesIcon scale="xsmall" title={clearLabel} />
      </button>
    );
  };

  // an input is considered empty if there is nothing to show in the input (eg. value or placeholder)
  const hasValue = type === 'number' ? Number.isFinite(value) : Boolean(value);
  const isEmpty = !hasValue && !formattedValue && placeholder === undefined;
  const isClearable = initClearable && hasValue && !readOnly;

  return (
    <Formbox
      className={className}
      contrast={contrast}
      disabled={disabled}
      empty={isEmpty}
      iconAfter={iconAfter || (isClearable && renderClearableIcon()) || undefined}
      iconAfterActionable={iconAfterActionable || isClearable}
      iconBefore={iconBefore}
      id={id}
      label={label}
      onBlur={onBlur}
      onFocus={onFocus}
      readOnly={readOnly}
      themeId={themeId}
      transitional={transitional}
      type="input"
      unthemed={unthemed}
      validity={validity}
      variant={variant}
      width={width}
      {...props}
    >
      {({ id, focused, required }) =>
        readOnly ? (
          <FormboxReadOnly formattedValue={formattedValue} id={id} value={value} />
        ) : (
          <FormboxInputWithFormatting<'input'>
            alwaysUseFormatting={alwaysUseFormatting}
            contrast={contrast}
            focused={focused}
            formattedValue={formattedValue}
            hasValue={hasValue}
            placeholder={placeholder}
            tabIndex={tabIndex}
            themeId={themeId}
          >
            <input
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={autoFocus}
              className={cx(styles.textboxInput, centered && styles['textboxInput--centered'], inputClassName)}
              disabled={disabled}
              id={id}
              name={name}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              ref={combineRefs}
              required={required}
              type={type}
              value={value}
              {...inputProps}
            />
          </FormboxInputWithFormatting>
        )
      }
    </Formbox>
  );
}

export const Textbox = React.forwardRef(TextboxBase);

TextboxBase.displayName = 'TextboxBase';
Textbox.displayName = 'Textbox';
