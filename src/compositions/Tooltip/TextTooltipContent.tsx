import React from 'react';
import { AnyPosition, Theme } from '../../types';
import { ThemeColors, themes } from '../../config';
import { useThemeId } from '../../context/Theme';
import { Card, CardProps } from '../../components/Card/Card';
import { StyledPaper } from '../../components/Paper/StyledPaper';
import { Typography } from '../../components/Typography/Typography';

export type TextTooltipContentProps = CardProps & {
  contrast?: boolean;
  position: AnyPosition;
  scrollable?: boolean;
  width?: number | string;
};

export const getTextTooltipColors = (themeId: Theme, contrast?: boolean) => {
  const color = contrast ? 'contrast' : 'primary';
  const textColor = themes[themeId][`${color}-palette-text-color` as keyof ThemeColors] as string;
  const backgroundColor = themes[themeId][`${color}-palette-background-color` as keyof ThemeColors] as string;
  const focusedOutlineColor = themes[themeId][`${color}-palette-text-color` as keyof ThemeColors] as string;
  const borderColor = themes[themeId][`${color}-palette-border-color` as keyof ThemeColors] as string;
  const scrollbarColor = themes[themeId][`${color}-scrollbar-thumb-color` as keyof ThemeColors] as string;

  return { textColor, backgroundColor, borderColor, focusedOutlineColor, scrollbarColor };
};

/**
 * The text tooltip content component wraps the children
 * of a tooltip with a standard background, border, border
 * radius and font style.
 *
 * This uses the Card, StyledPaper and Typography
 * components.
 */
export function TextTooltipContent({
  children,
  contrast = false,
  position,
  scrollable = false,
  themeId: initThemeId,
  width = 300,
  ...props
}: TextTooltipContentProps): JSX.Element {
  const themeId = useThemeId(initThemeId);
  const { textColor, backgroundColor, borderColor, focusedOutlineColor, scrollbarColor } = getTextTooltipColors(
    themeId,
    contrast,
  );

  const paperStyle: React.CSSProperties = {};
  if (position && ['left-top', 'left-bottom', 'right-top', 'right-bottom'].includes(position)) {
    switch (position) {
      case 'left-top':
        paperStyle['borderTopRightRadius'] = 0;
        break;

      case 'left-bottom':
        paperStyle['borderBottomRightRadius'] = 0;
        break;

      case 'right-top':
        paperStyle['borderTopLeftRadius'] = 0;
        break;

      case 'right-bottom':
        paperStyle['borderBottomLeftRadius'] = 0;
        break;
    }
  }

  return (
    <Card full raised themeId={themeId} {...props}>
      <StyledPaper
        bordered
        backgroundColor={contrast ? `var(--phork-contrast-color, ${backgroundColor})` : backgroundColor}
        borderColor={borderColor}
        container="popover"
        focusedOutlineColor={focusedOutlineColor}
        scrollable={scrollable}
        scrollbarColor={scrollbarColor}
        style={{ borderRadius: '2px', width: typeof width === 'number' ? `${width}px` : width, ...paperStyle }}
        textColor={textColor}
      >
        <Typography as="div" size="small" themeId={themeId} variants={['line-height-comfy', 'wrap']}>
          {children}
        </Typography>
      </StyledPaper>
    </Card>
  );
}

TextTooltipContent.displayName = 'TextTooltipContent';
