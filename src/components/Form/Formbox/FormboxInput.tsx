import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../../types';
import { useThemeId } from '../../../context/Theme';
import autoFilledStyles from './styles/FormboxAutoFilled.module.css';
import styles from './styles/FormboxInput.module.css';
import { FormboxInputElementType, FormboxVariant } from './types';

export type FormboxInputProps<I extends FormboxInputElementType> = ThemeProps & {
  children?: React.ReactElement<HTMLElementTagNameMap[I]>;
  className?: string;
  hidden?: boolean;
  placeholder?: string | number;
  tabIndex?: number;
  variant: FormboxVariant;
};

/**
 * The formbox input component clones its input, select
 * or textarea child and adds the styles and placeholder
 * to it.
 */
export const FormboxInput = <I extends FormboxInputElementType>({
  children,
  className,
  contrast = false,
  hidden = false,
  placeholder,
  tabIndex,
  themeId: initThemeId,
  variant,
}: FormboxInputProps<I>): React.ReactElement<HTMLElementTagNameMap[I]> | null => {
  const themeId = useThemeId(initThemeId);
  const color = contrast ? 'contrast' : 'primary';

  return React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement, {
        className: cx(
          styles.formboxInput,
          themeId && styles[`formboxInput--${themeId}`],
          hidden && styles['formboxInput--hidden'],
          styles[`formboxInput--${color}`],
          styles[`formboxInput--${variant}`],
          autoFilledStyles.formboxAutoFilled,
          children.props.className,
          className,
        ),
        tabIndex: tabIndex === undefined ? 0 : tabIndex,
        ...(placeholder !== undefined && placeholder ? { placeholder } : {}),
      })
    : null;
};

FormboxInput.displayName = 'FormboxInput';
