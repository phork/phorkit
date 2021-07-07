import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../../types';
import { useThemeId } from '../../../hooks/useThemeId';
import styles from './styles/FormboxInput.module.css';

export interface FormboxInputFormattedProps extends React.HTMLAttributes<HTMLDivElement>, ThemeProps {
  children?: React.ReactChild;
  className?: string;
  hidden?: boolean;
  /** When used as a placeholder there will be some transparency */
  isPlaceholder?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

/** The is for form inputs that have HTML values or placeholders (as opposed to plain text) */
export const FormboxInputFormatted = React.forwardRef<HTMLDivElement, FormboxInputFormattedProps>(
  (
    { children, className, contrast = false, hidden = false, isPlaceholder, themeId: initThemeId, ...props },
    forwardedRef,
  ): React.ReactElement<FormboxInputFormattedProps, 'div'> => {
    const themeId = useThemeId(initThemeId);
    const color = contrast ? 'contrast' : 'primary';

    return (
      <div
        className={cx(
          styles.formboxInput,
          isPlaceholder && styles['formboxInput--placeholder'],
          hidden && styles['formboxInput--hidden'],
          styles[`formboxInput--${color}`],
          themeId && styles[`formboxInput--${themeId}`],
          className,
        )}
        ref={forwardedRef}
        {...props}
      >
        {children}
      </div>
    );
  },
);

FormboxInputFormatted.displayName = 'FormboxInputFormatted';
