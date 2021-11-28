import { cx } from '@emotion/css';
import React from 'react';
import { AsReactType, StateColor, MergeElementPropsWithoutRef, ThemeProps } from '../../../types';
import { useThemeId } from '../../../context/Theme';
import styles from './styles/Label.module.css';

export type LocalLabelProps = ThemeProps & {
  children: React.ReactChild | React.ReactFragment;
  className?: string;
  disabled?: boolean;
  /** Manually apply the focus styles; this does not affect focus */
  focused?: boolean;
  /** A muted label looks like a disabled label but has a hover state of a regular label */
  muted?: boolean;
  noWrap?: boolean;
  strength?: 'transitioned' | 'standard' | 'legend';
  style?: React.CSSProperties;
  validity?: StateColor;
};

export type LabelProps<T extends React.ElementType = 'div'> = AsReactType<T> &
  MergeElementPropsWithoutRef<T, LocalLabelProps>;

/**
 * A form label can have one of several strengths and
 * colors. It can be a standard HTML label, a div or a
 * custom element.
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
