import { cx } from '@emotion/css';
import React from 'react';
import { MergeElementProps, ThemeProps } from '../../../types';
import { useThemeId } from '../../../hooks/useThemeId';
import { Label } from '../Label';
import styles from './styles/Fieldset.module.css';

export interface LocalFieldsetProps extends ThemeProps {
  children: React.ReactElement | string;
  className?: string;
  legend?: React.ReactNode;
}

export type FieldsetProps = MergeElementProps<'fieldset', LocalFieldsetProps>;

export function Fieldset({
  children,
  className,
  contrast,
  legend,
  themeId: initThemeId,
  ...props
}: FieldsetProps): React.ReactElement<FieldsetProps, 'fieldset'> {
  const themeId = useThemeId(initThemeId);

  const renderLegend = () => {
    return legend ? (
      <Label as="legend" className={styles.fieldset__legend} contrast={contrast} strength="legend" themeId={themeId}>
        {legend}
      </Label>
    ) : null;
  };

  return (
    <fieldset className={cx(styles.fieldset, className)} {...props}>
      {renderLegend()}
      {children}
    </fieldset>
  );
}

Fieldset.displayName = 'Fieldset';
