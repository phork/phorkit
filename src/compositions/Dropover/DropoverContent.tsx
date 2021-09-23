import React from 'react';
import { SequentialVariant, StateColor, ThemeProps } from '../../types';
import { useThemeId } from '../../context/Theme';
import { Card, CardProps } from '../../components/Card/Card';
import { Paper } from '../../components/Paper/Paper';
import { Rhythm } from '../../components/Rhythm/Rhythm';

export interface DropoverContentProps extends CardProps, ThemeProps {
  color?: SequentialVariant | StateColor;
}

export function DropoverContent({
  children,
  className,
  color: initColor = 'primary',
  contrast = false,
  themeId: initThemeId,
  ...props
}: DropoverContentProps): React.ReactElement<DropoverContentProps> {
  const themeId = useThemeId(initThemeId);
  const color = contrast ? 'contrast' : initColor;

  return (
    <Card full raised themeId={themeId} {...props}>
      <Paper full color={color} container="popover" themeId={themeId}>
        <Rhythm grouped mt={6}>
          {children}
        </Rhythm>
      </Paper>
    </Card>
  );
}

DropoverContent.displayName = 'DropoverContent';
