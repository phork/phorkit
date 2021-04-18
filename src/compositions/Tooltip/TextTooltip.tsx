import React from 'react';
import { AnyPosition, ThemeProps } from '../../types';
import { ThemeColors, themes } from '../../config';
import { useThemeId } from '../../hooks/useThemeId';
import { renderFromPropWithFallback } from '../../utils/renderFromProp';
import { Card } from '../../components/Card/Card';
import { ForwardProps } from '../../components/ForwardProps';
import { StyledPaper } from '../../components/Paper/StyledPaper';
import { Typography } from '../../components/Typography/Typography';
import { PopoverContentRenderChildrenProps } from '../Popover/PopoverContentInline';
import { Tooltip, TooltipProps } from './Tooltip';

export interface TextTooltipProps
  extends Omit<TooltipProps, 'layout' | 'triangleColor' | 'triangleBorderColor'>,
    ThemeProps {
  scrollable?: boolean;
}

export function TextTooltip({
  children,
  component,
  contrast,
  focusable,
  scrollable,
  themeId: initThemeId,
  width = 300,
  ...props
}: TextTooltipProps): React.ReactElement {
  const themeId = useThemeId(initThemeId);
  const color = contrast ? 'contrast' : 'primary';
  const textColor = themes[themeId][`${color}-text-color` as keyof ThemeColors] as string;
  const backgroundColor = themes[themeId][`${color}-background-color` as keyof ThemeColors] as string;
  const borderColor = themes[themeId][`${color}-border-color` as keyof ThemeColors] as string;

  return (
    <Tooltip
      component={component}
      focusable={focusable}
      layout="vertical"
      triangleBorderColor={borderColor}
      triangleColor={backgroundColor}
      width={width}
      {...props}
    >
      <ForwardProps<Partial<Omit<PopoverContentRenderChildrenProps, 'position'>> & { position?: AnyPosition }>>
        {({ focusRef, position }) => {
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
            <Card raised full themeId={themeId}>
              <StyledPaper
                backgroundColor={backgroundColor}
                borderColor={borderColor}
                bordered
                textColor={textColor}
                scrollable={scrollable}
                style={{ borderRadius: '2px', ...paperStyle }}
                container="popover"
              >
                <Typography as="div" size="s" themeId={themeId} variants="line-height-comfy">
                  {renderFromPropWithFallback(children, focusable ? { focusRef } : undefined)}
                </Typography>
              </StyledPaper>
            </Card>
          );
        }}
      </ForwardProps>
    </Tooltip>
  );
}

TextTooltip.displayName = 'TextTooltip';
