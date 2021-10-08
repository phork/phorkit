import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../../types';
import styles from './styles/FormboxInput.module.css';
import { FormboxInput } from './FormboxInput';
import { FormboxInputFormatted, FormboxInputFormattedProps } from './FormboxInputFormatted';
import { FormboxInputElementType, FormboxValue, FormboxVariant } from './types';

export type FormboxInputWithFormattingProps<I extends FormboxInputElementType> = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'placeholder'
> &
  ThemeProps & {
    /** The formatted value will be hidden while the input is focused unless this is true */
    alwaysShowFormatting?: boolean;
    /** If the value will have HTML formatting then this should be true */
    alwaysUseFormatting?: boolean;
    centered?: boolean;
    children?: React.ReactElement<HTMLElementTagNameMap[I]>;
    className?: string;
    contrast?: boolean;
    /** Manually apply the focus styles; this does not affect focus */
    focused?: boolean;
    formattedValue?: React.ReactChild;
    /** This is whether there's an input value (excluding the formatted value) */
    hasValue?: boolean;
    placeholder?: FormboxValue | FormboxInputFormattedProps['children'];
    variant: FormboxVariant;
  };

/**
 * This is a wrapper for a `FormboxInput` that can have
 * HTML values and/or placeholders. It's used to hide
 * and show the input value or placeholder as necessary
 * and to make sure that the size doesn't change when
 * changing between placeholder and value views.
 */
export const FormboxInputWithFormatting = <I extends FormboxInputElementType>({
  alwaysShowFormatting = false,
  alwaysUseFormatting = false,
  centered,
  children,
  className,
  contrast = false,
  focused = false,
  formattedValue,
  hasValue = false,
  placeholder,
  themeId,
  variant,
  ...props
}: FormboxInputWithFormattingProps<I>): React.ReactElement<HTMLElementTagNameMap[I]> | null => {
  const hasHtmlValue = formattedValue !== undefined;
  const hasHtmlPlaceholder =
    placeholder !== undefined && typeof placeholder !== 'string' && typeof placeholder !== 'number';

  // if either the placeholder or the value is formatted we should always show the formatted configuration
  const hasHtmlValueOrPlaceholder = hasHtmlPlaceholder || hasHtmlValue;
  const shouldUseFormatting = hasHtmlValueOrPlaceholder || alwaysUseFormatting;

  // components are hidden with opacity so that formatted values can take up space and focus works on inputs
  const isFormattedUsedAsPlaceholder = shouldUseFormatting && !hasValue && !hasHtmlValue && placeholder !== undefined;
  const isFormattedHidden = (!isFormattedUsedAsPlaceholder && !hasHtmlValue) || (focused && hasValue);
  const isInputHidden = hasHtmlValue && !focused;

  return shouldUseFormatting ? (
    <div className={cx(styles.formboxInputWithFormatting, className)} {...props}>
      <FormboxInputFormatted
        centered={centered}
        className={styles.formboxInputWithFormatting__formatted}
        contrast={contrast}
        hidden={isFormattedHidden && !alwaysShowFormatting}
        isPlaceholder={isFormattedUsedAsPlaceholder}
        themeId={themeId}
      >
        {/* even if there is no actual value use a non-breaking space to force the container to the right height */}
        {formattedValue || placeholder || <>&nbsp;</>}
      </FormboxInputFormatted>
      <FormboxInput
        className={styles.formboxInputWithFormatting__input}
        contrast={contrast}
        hidden={isInputHidden}
        themeId={themeId}
        variant={variant}
      >
        {children}
      </FormboxInput>
    </div>
  ) : (
    <FormboxInput
      contrast={contrast}
      placeholder={typeof placeholder === 'string' || typeof placeholder === 'number' ? placeholder : undefined}
      themeId={themeId}
      variant={variant}
    >
      {children}
    </FormboxInput>
  );
};

FormboxInputWithFormatting.displayName = 'FormboxInputWithFormatting';
