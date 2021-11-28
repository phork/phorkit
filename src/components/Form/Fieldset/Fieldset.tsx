import { cx } from '@emotion/css';
import React from 'react';
import { MergeElementProps, ThemeProps } from '../../../types';
import { useThemeId } from '../../../context/Theme';
import { Label } from '../Label';
import styles from './styles/Fieldset.module.css';

export type LocalFieldsetProps = Omit<ThemeProps, 'unthemed'> & {
  children: React.ReactElement | string;
  className?: string;
  legend?: React.ReactChild | React.ReactFragment | null;
  style?: React.CSSProperties;
};

export type FieldsetProps = MergeElementProps<'fieldset', LocalFieldsetProps>;

/**
 * The fieldset component groups together several
 * related form elements. It combines a standard
 * form fieldset with an optional legend.
 */
export function FieldsetBase(
  { children, className, contrast = false, legend, themeId: initThemeId, ...props }: FieldsetProps,
  forwardedRef: React.ForwardedRef<HTMLFieldSetElement>,
): React.ReactElement<FieldsetProps> {
  const themeId = useThemeId(initThemeId);

  return (
    <fieldset className={cx(styles.fieldset, className)} ref={forwardedRef} {...props}>
      {legend && (
        <Label as="legend" className={styles.fieldset__legend} contrast={contrast} strength="legend" themeId={themeId}>
          {legend}
        </Label>
      )}
      {children}
    </fieldset>
  );
}

export const Fieldset = React.forwardRef(FieldsetBase);

// note that the base element cannot have a displayName because it breaks Storybook
Fieldset.displayName = 'Fieldset';
