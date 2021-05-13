import { cx } from '@emotion/css';
import React, { useCallback, useRef } from 'react';
import { MergeProps } from '../../../types';
import { useThemeId } from '../../../hooks/useThemeId';
import { useTranslations } from '../../../hooks/useTranslations';
import { makeCombineRefs } from '../../../utils/combineRefs';
import { TimesIcon } from '../../../icons/TimesIcon';
import { Formbox, FormboxProps, FormboxValue, FormboxTranslations, formboxTranslations } from '../Formbox/Formbox';
import styles from './styles/Textbox.module.css';

export type TextboxTranslations = FormboxTranslations & {
  clearLabel: string;
};

export const textboxTranslations: TextboxTranslations = {
  ...formboxTranslations,
  clearLabel: 'Clear',
};

export interface LocalTextboxProps {
  centered?: boolean;
  clearable?: boolean;
  inputProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onKeyDown' | 'placeholder' | 'type'>;
  max?: number;
  min?: number;
  onChange?: (
    event: React.ChangeEvent | React.KeyboardEvent | React.MouseEvent | React.TouchEvent,
    value: FormboxValue,
    props?: { cleared?: boolean },
  ) => void;
  onSubmit?: (event: React.KeyboardEvent<HTMLInputElement>, value: string) => void;
  placeholder?: string;
  step?: number;
  type?: 'text' | 'number' | 'email' | 'password';
}

export type TextboxProps = MergeProps<
  Omit<FormboxProps<'label', 'input'>, 'as' | 'input' | 'ref'>,
  LocalTextboxProps
> & {
  ref?: React.Ref<HTMLInputElement>;
};

function TextboxBase(
  {
    autoFocus,
    centered,
    className,
    clearable: initClearable,
    contrast,
    disabled,
    iconAfter,
    iconAfterActionable,
    iconBefore,
    id,
    inputProps: initInputProps,
    label,
    max,
    min,
    name,
    onBlur,
    onChange,
    onFocus,
    onIconBlur,
    onIconFocus,
    onSubmit,
    placeholder,
    readOnly,
    silentReadOnly,
    step = 1,
    tabIndex,
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
  const inputRef = useRef<HTMLInputElement>(null!);
  const themeId = useThemeId(initThemeId);
  const empty = !(type === 'number' ? Number.isFinite(value) : Boolean(value) || placeholder);
  const clearable = !!(initClearable && (!readOnly || silentReadOnly));
  const translations = useTranslations({ customTranslations, fallbackTranslations: textboxTranslations });
  const { clearLabel } = translations;

  const combineRefs = makeCombineRefs<HTMLInputElement>(inputRef, forwardedRef);

  const handleChange = useCallback(
    (event: React.ChangeEvent | React.KeyboardEvent | React.MouseEvent | React.TouchEvent, value: string) => {
      onChange && onChange(event, type === 'number' ? parseFloat(value) : value);
    },
    [onChange, type],
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

  const renderInput = (): React.ReactElement<HTMLInputElement> => {
    const inputProps = { ...initInputProps };
    if (type === 'number') {
      inputProps.max = max;
      inputProps.min = min;
      inputProps.step = step;
    }

    return (
      <input
        className={cx(styles.textboxInput, centered && styles['textboxInput--centered'])}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        type={type}
        {...inputProps}
      />
    );
  };

  return (
    <Formbox<'label', 'input'>
      as="label"
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={autoFocus}
      className={className}
      contrast={contrast}
      disabled={disabled}
      empty={empty}
      iconAfter={iconAfter || (clearable && !empty && renderClearableIcon()) || undefined}
      iconAfterActionable={iconAfterActionable || clearable}
      iconBefore={iconBefore}
      id={id}
      input={renderInput()}
      label={label}
      name={name}
      onBlur={onBlur}
      onChange={handleChange}
      onFocus={onFocus}
      onIconBlur={onIconBlur}
      onIconFocus={onIconFocus}
      placeholder={placeholder}
      readOnly={readOnly}
      ref={combineRefs}
      silentReadOnly={silentReadOnly}
      tabIndex={tabIndex}
      themeId={themeId}
      transitional={transitional}
      type="input"
      unthemed={unthemed}
      validity={validity}
      value={value}
      variant={variant}
      width={width}
      {...props}
    />
  );
}

export const Textbox = React.forwardRef(TextboxBase);

TextboxBase.displayName = 'TextboxBase';
Textbox.displayName = 'Textbox';
