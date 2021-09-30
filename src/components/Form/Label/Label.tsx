import { cx } from '@emotion/css';
import React from 'react';
import { AsReactType, StateColor, MergeElementPropsWithoutRef, ThemeProps } from '../../../types';
import { useThemeId } from '../../../context/Theme';
import styles from './styles/Label.module.css';

export interface LocalLabelProps extends ThemeProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  /** Manually apply the focus styles; this does not affect focus */
  focused?: boolean;
  muted?: boolean;
  noWrap?: boolean;
  strength?: 'transitioned' | 'standard' | 'legend';
  style?: React.CSSProperties;
  validity?: StateColor;
}

export type LabelProps<T extends React.ElementType = 'div'> = AsReactType<T> &
  MergeElementPropsWithoutRef<T, LocalLabelProps>;

/**
 * The label component creates an element with standardized
 * color and size styling. The component can be a label, a div
 * or a custom element.
 */
export function Label<T extends React.ElementType = 'div'>({
  as,
  children,
  className,
  contrast = false,
  disabled = false,
  focused = false,
  muted = false,
  noWrap = false,
  strength,
  themeId: initThemeId,
  unthemed = false,
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
    themeId && !unthemed && styles[`label--${themeId}`],
    color && !unthemed && styles[`label--${color}`],
    noWrap && styles['label--noWrap'],
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
