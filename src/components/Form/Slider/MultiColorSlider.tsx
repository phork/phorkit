import { cx } from '@emotion/css';
import React, { useCallback, useMemo, useState } from 'react';
import { AccentColor, MergeProps, StateColor } from '../../../types';
import { ThemeColors, themes } from '../../../config/themes';
import { useThemeId } from '../../../context/Theme';
import styles from './styles/Slider.module.css';
import { MultiColorSliderTick } from './MultiColorSliderTick';
import { MultiColorSliderTrack } from './MultiColorSliderTrack';
import { StyledSlider, StyledSliderProps } from './StyledSlider';

export interface LocalMultiColorSliderProps {
  colors: Array<StateColor | AccentColor | string>;
}

export type MultiColorSliderProps = MergeProps<
  Omit<
    StyledSliderProps,
    | 'contrast'
    | 'handleBackgroundColor'
    | 'max'
    | 'min'
    | 'snap'
    | 'snapNext'
    | 'step'
    | 'tick'
    | 'tickBackgroundColor'
    | 'tickElement'
    | 'tickProps'
    | 'trackBackgroundColor'
    | 'trackElement'
    | 'trackFillBackgroundColor'
    | 'trackProps'
    | 'unstyled'
    | 'validity'
  >,
  LocalMultiColorSliderProps
>;

export function MultiColorSlider({
  className,
  colors: initColors,
  onChange,
  themeId: initThemeId,
  value,
  ...props
}: MultiColorSliderProps) {
  const themeId = useThemeId(initThemeId);
  const theme = themes[themeId];

  const colors = useMemo(
    () =>
      initColors.map(color =>
        ['success', 'warning', 'danger', 'accent-primary'].includes(color)
          ? (theme[`color-${color}` as keyof ThemeColors] as string)
          : color,
      ),
    [initColors, theme],
  );

  const [activeColor, setActiveColor] = useState<string>((value && colors[value - 1]) || theme['color-neutral']);

  const handleChange = useCallback(
    (event, value) => {
      setActiveColor(colors[value - 1] || theme['color-neutral']);
      onChange && onChange(event, value);
    },
    [colors, onChange, theme],
  );

  return (
    <StyledSlider
      snap
      snapNext
      className={cx(styles['slider--noHandle'], className)}
      handleBackgroundColor={activeColor}
      max={colors.length}
      min={0}
      onChange={handleChange}
      step={1}
      tick={1}
      tickBackgroundColor="transparent"
      tickElement={MultiColorSliderTick}
      tickProps={{ colors, themeId, variant: 'divider' }}
      trackBackgroundColor={theme['color-FG0-O10']}
      trackElement={MultiColorSliderTrack}
      trackFillBackgroundColor="transparent"
      trackProps={{ colors }}
      value={value}
      {...props}
    />
  );
}

MultiColorSlider.displayName = 'MultiColorSlider';
