import { cx } from '@emotion/css';
import React from 'react';
import { MergeElementPropsWithoutRef, ThemeProps } from '../../../types';
import { useThemeId } from '../../../context/Theme';
import styles from './styles/MultiColorSliderTick.module.css';

export type LocalMultiColorSliderTickProps = ThemeProps & {
  active?: boolean;
  className: string;
  colors: readonly string[];
  number: number;
  style: React.CSSProperties;
};

export type MultiColorSliderTickProps = MergeElementPropsWithoutRef<'div', LocalMultiColorSliderTickProps>;

/**
 * The multi color slider tick is used by the `Slider`
 * component to render each tick of the `MultiColorSlider`
 * component. A tick in this case is actually just the
 * space between each segment.
 */
export function MultiColorSliderTick({
  active,
  number,
  className,
  colors,
  themeId: initThemeId,
  ...props
}: MultiColorSliderTickProps): JSX.Element {
  const themeId = useThemeId(initThemeId);

  return (
    <div
      className={cx(styles.multiColorSliderTick, themeId && styles[`multiColorSliderTick--${themeId}`], className)}
      {...props}
    />
  );
}

MultiColorSliderTick.displayName = 'MultiColorSliderTick';
