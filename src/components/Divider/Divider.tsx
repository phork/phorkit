import { cx } from '@emotion/css';
import React from 'react';
import { ThemeProps, Orientation, SequentialVariant, Volume } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
import styles from './styles/Divider.module.css';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement>, ThemeProps {
  className?: string;
  orientation?: Orientation;
  variant?: SequentialVariant;
  volume?: Volume;
}

export function Divider({
  className,
  contrast,
  orientation = 'horizontal',
  themeId: initThemeId,
  unthemed,
  variant: initVariant = 'primary',
  volume,
  ...props
}: DividerProps): React.ReactElement<DividerProps, 'div'> {
  const themeId = useThemeId(initThemeId);
  const variant = contrast ? 'contrast' : initVariant;

  return (
    <div
      className={cx(
        styles.divider,
        styles[`divider--${orientation}`],
        themeId && !unthemed && styles[`divider--${themeId}`],
        variant && styles[`divider--${variant}`],
        volume && styles[`divider--${volume}`],
        className,
      )}
      {...props}
    />
  );
}

Divider.displayName = 'Divider';
