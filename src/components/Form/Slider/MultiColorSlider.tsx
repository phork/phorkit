import React, { useCallback, useMemo, useState } from 'react';
import { AccentColor, MergeProps, StateColor } from '../../../types';
import { ThemeColors, themes } from '../../../config/themes';
import { useAccessibility } from '../../../context/Accessibility';
import { useThemeId } from '../../../hooks/useThemeId';
import { MultiColorSliderTick } from './MultiColorSliderTick';
import { MultiColorSliderTrack } from './MultiColorSliderTrack';
import { StyledSlider, StyledSliderProps } from './StyledSlider';
import styles from './styles/Slider.module.css';

export interface LocalMultiColorSliderProps {
  colors: Array<StateColor | AccentColor | string>;
  variant?: 'divider';
}

export type MultiColorSliderProps = MergeProps<
  Omit<
    StyledSliderProps,
    | 'handleBackgroundColor'
    | 'tickBackgroundColor'
    | 'tickElement'
    | 'tickProps'
    | 'trackBackground'
    | 'trackElement'
    | 'trackFillBackground'
    | 'trackProps'
  >,
  LocalMultiColorSliderProps
> & {
  ref?: React.Ref<HTMLInputElement>;
};

export function MultiColorSlider({
  colors: initColors,
  onChange,
  themeId: initThemeId,
  value,
  variant,
  ...props
}: MultiColorSliderProps) {
  const accessible = useAccessibility();
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

  const [activeColor, setActiveColor] = useState<string>((value && colors[value - 1]) || theme['color-accent-primary']);

  const handleChange = useCallback(
    (event, value) => {
      setActiveColor(colors[value - 1] || theme['color-accent-primary']);
      onChange && onChange(event, value);
    },
    [colors, onChange, theme],
  );

  return (
    <StyledSlider
      className={variant === 'divider' && !accessible ? styles['slider--noHandle'] : undefined}
      handleBackgroundColor={activeColor}
      max={colors.length}
      min={0}
      onChange={handleChange}
      snap
      snapNext={variant === 'divider'}
      step={1}
      tick={1}
      tickBackgroundColor="transparent"
      tickElement={MultiColorSliderTick}
      tickProps={{ colors, themeId, variant }}
      trackBackground={theme['color-FG0-O10']}
      trackElement={MultiColorSliderTrack}
      trackFillBackground="transparent"
      trackProps={{ colors }}
      value={value}
      {...props}
    />
  );
}

MultiColorSlider.displayName = 'MultiColorSlider';
