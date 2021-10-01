import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps } from '../../../types';
import { useThemeId } from '../../../context/Theme';
import styles from './styles/FormboxInput.module.css';
import { FormboxValue } from './types';

export interface FormboxReadOnlyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'placeholder'>, ThemeProps {
  centered?: boolean;
  className?: string;
  formattedValue?: React.ReactChild;
  id?: string;
  placeholder?: FormboxValue | React.ReactChild;
  value?: FormboxValue | FormboxValue[];
}

export const FormboxReadOnly = React.forwardRef<HTMLDivElement, FormboxReadOnlyProps>(
  (
    { centered, className, contrast = false, formattedValue, id, placeholder, themeId: initThemeId, value, ...props },
    forwardedRef,
  ): React.ReactElement<FormboxReadOnlyProps, 'div'> => {
    const themeId = useThemeId(initThemeId);
    const color = contrast ? 'contrast' : 'primary';

    const isPlaceholder =
      placeholder !== undefined &&
      formattedValue === undefined &&
      (value === undefined || (Array.isArray(value) && value.length === 0));

    return (
      <div
        className={cx(
          styles.formboxInput,
          styles['formboxInput--readOnly'],
          centered && styles['formboxInput--centered'],
          isPlaceholder && styles['formboxInput--placeholder'],
          styles[`formboxInput--${color}`],
          themeId && styles[`formboxInput--${themeId}`],
          className,
        )}
        id={id}
        ref={forwardedRef}
        {...props}
      >
        {formattedValue ||
          (Array.isArray(value) ? (
            <div className={cx(styles.formboxReadOnlyList)}>
              {value.map((value: FormboxValue) => (
                <div key={value}>{value}</div>
              ))}
            </div>
          ) : (
            value || placeholder
          ))}
        &nbsp;
      </div>
    );
  },
);

FormboxReadOnly.displayName = 'FormboxReadOnly';
