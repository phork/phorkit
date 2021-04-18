import { cx } from '@emotion/css';
import React from 'react';
import { AsType, StateColor, MergeElementProps, ThemeProps } from '../../../types';
import { useThemeId } from '../../../hooks/useThemeId';
import styles from './styles/Label.module.css';

export interface LocalLabelProps extends ThemeProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  focused?: boolean;
  muted?: boolean;
  strength?: 'transitioned' | 'standard' | 'legend';
  validity?: StateColor;
}

export type LabelProps<T extends React.ElementType = 'div'> = AsType<T> & MergeElementProps<T, LocalLabelProps>;

export function Label<T extends React.ElementType = 'div'>({
  as,
  children,
  className,
  contrast,
  disabled,
  focused,
  muted,
  strength,
  themeId: initThemeId,
  validity,
  ...props
}: LabelProps<T>): React.ReactElement {
  const themeId = useThemeId(initThemeId);
  const color = contrast ? 'contrast' : 'primary';

  const classes = cx(
    styles.label,
    disabled && styles['is-disabled'],
    focused && styles['is-focused'],
    muted && styles['is-muted'],
    validity && styles[`is-${validity}`],
    strength && styles[`label--${strength}`],
    themeId && styles[`label--${themeId}`],
    color && styles[`label--${color}`],
    className,
  );

  return React.createElement(
    as || 'div',
    {
      className: classes,
      ...props,
    },
    children,
  );
}

Label.displayName = 'Label';
