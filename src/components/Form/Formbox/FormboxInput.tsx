import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../../types';
import { useThemeId } from '../../../hooks/useThemeId';
import styles from './styles/FormboxInput.module.css';
import { FormboxInputElementType } from './types';

export interface FormboxInputProps<I extends FormboxInputElementType> extends ThemeProps {
  children?: React.ReactElement<HTMLElementTagNameMap[I]>;
  className?: string;
  contrast?: boolean;
  hidden?: boolean;
  placeholder?: string | number;
  tabIndex?: number;
}

/** This clones its input/select/textarea child and adds the styles and placeholder to it */
export const FormboxInput = <I extends FormboxInputElementType>({
  children,
  className,
  contrast,
  hidden,
  placeholder,
  tabIndex,
  themeId: initThemeId,
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
          children.props.className,
          className,
        ),
        tabIndex: tabIndex === undefined ? 0 : tabIndex,
        ...(placeholder !== undefined && placeholder ? { placeholder } : {}),
      })
    : null;
};

FormboxInput.displayName = 'FormboxInput';
