import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../../types';
import { FormboxInput } from './FormboxInput';
import { FormboxInputFormatted, FormboxInputFormattedProps } from './FormboxInputFormatted';
import styles from './styles/FormboxInput.module.css';
import { FormboxInputElementType, FormboxValue } from './types';

export interface FormboxInputWithFormattingProps<I extends FormboxInputElementType>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'placeholder'>,
    ThemeProps {
  alwaysUseFormatting?: boolean;
  children?: React.ReactElement<HTMLElementTagNameMap[I]>;
  className?: string;
  contrast?: boolean;
  focused?: boolean;
  formattedValue?: React.ReactChild;
  /** This is whether there's an input value (excluding the formatted value) */
  hasValue?: boolean;
  placeholder?: FormboxValue | FormboxInputFormattedProps['children'];
}

/** This is a wrapper for formbox inputs that can have HTML values and placeholders */
export const FormboxInputWithFormatting = <I extends FormboxInputElementType>({
  alwaysUseFormatting,
  children,
  className,
  contrast,
  focused,
  formattedValue,
  hasValue,
  placeholder,
  themeId,
  ...props
}: FormboxInputWithFormattingProps<I>): React.ReactElement<HTMLElementTagNameMap[I]> | null => {
  const isPlaceholder = !hasValue && !formattedValue && placeholder !== undefined;

  // if either the placeholder or the value is formatted we should always show the formatted configuration
  const hasHtmlValueOrPlaceholder =
    (placeholder && typeof placeholder !== 'string' && typeof placeholder !== 'number') || formattedValue;

  return alwaysUseFormatting || hasHtmlValueOrPlaceholder ? (
    <div className={cx(styles.formboxInputWithFormatting, className)} {...props}>
      <FormboxInputFormatted
        contrast={contrast}
        className={styles.formboxInputWithFormatting__formatted}
        hidden={focused && hasValue}
        isPlaceholder={isPlaceholder}
        themeId={themeId}
      >
        {formattedValue || (hasValue ? undefined : placeholder)}
      </FormboxInputFormatted>
      <FormboxInput
        className={styles.formboxInputWithFormatting__input}
        contrast={contrast}
        hidden={!!formattedValue && !focused}
        themeId={themeId}
      >
        {children}
      </FormboxInput>
    </div>
  ) : (
    <FormboxInput
      contrast={contrast}
      placeholder={typeof placeholder === 'string' || typeof placeholder === 'number' ? placeholder : undefined}
      themeId={themeId}
    >
      {children}
    </FormboxInput>
  );
};

FormboxInputWithFormatting.displayName = 'FormboxInputWithFormatting';
