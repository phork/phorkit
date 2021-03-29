import React from 'react';
import { SequentialVariant, StateColor, ThemeProps } from '../../types';
import { useThemeId } from '../../hooks/useThemeId';
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
  contrast,
  themeId: initThemeId,
  ...props
}: DropoverContentProps): React.ReactElement<DropoverContentProps, 'div'> {
  const themeId = useThemeId(initThemeId);
  const color = contrast ? 'contrast' : initColor;

  return (
    <Card themeId={themeId} raised full {...props}>
      <Paper full color={color} container="popover" themeId={themeId}>
        <Rhythm mt={6} grouped>
          {children}
        </Rhythm>
      </Paper>
    </Card>
  );
}
