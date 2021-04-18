import { cx } from '@emotion/css';
import React from 'react';
import { MergeElementProps, ThemeProps } from '../../../types';
import { useThemeId } from '../../../hooks/useThemeId';
import styles from './styles/MultiColorSliderTick.module.css';

export interface LocalMultiColorSliderTickProps extends ThemeProps {
  active?: boolean;
  className: string;
  colors: string[];
  number: number;
  style: React.CSSProperties;
  variant?: 'divider';
}

export type MultiColorSliderTickProps = MergeElementProps<'div', LocalMultiColorSliderTickProps>;

export function MultiColorSliderTick({
  active,
  number,
  className,
  colors,
  style,
  themeId: initThemeId,
  variant,
  ...props
}: MultiColorSliderTickProps): React.ReactElement<MultiColorSliderTickProps, 'div'> {
  const themeId = useThemeId(initThemeId);

  return (
    <div
      className={cx(
        styles.multiColorSliderTick,
        themeId && styles[`multiColorSliderTick--${themeId}`],
        variant && styles[`multiColorSliderTick--${variant}`],
        !active && variant !== 'divider' && styles['is-inactive'],
        className,
      )}
      style={
        variant !== 'divider'
          ? {
              backgroundColor: colors[Math.max(0, number - 1)],
              ...(style || {}),
            }
          : style
      }
      {...props}
    />
  );
}

MultiColorSliderTick.displayName = 'MultiColorSliderTick';
