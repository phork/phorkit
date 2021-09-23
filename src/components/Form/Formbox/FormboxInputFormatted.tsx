import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../../types';
import { useThemeId } from '../../../context/Theme';
import styles from './styles/FormboxInput.module.css';

export interface FormboxInputFormattedProps extends React.HTMLAttributes<HTMLDivElement>, ThemeProps {
  centered?: boolean;
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
    { centered, children, className, contrast = false, hidden = false, isPlaceholder, themeId: initThemeId, ...props },
    forwardedRef,
  ): React.ReactElement<FormboxInputFormattedProps> => {
    const themeId = useThemeId(initThemeId);
    const color = contrast ? 'contrast' : 'primary';

    return (
      <div
        className={cx(
          styles.formboxInput,
          isPlaceholder && styles['formboxInput--placeholder'],
          centered && styles['formboxInput--centered'],
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
